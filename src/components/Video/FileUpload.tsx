"use client";

import {
  upload,
} from "@imagekit/next";
import { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";

const { Dragger } = Upload;

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType = "video" }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file: RcFile) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      message.error("Only video files are allowed");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      message.error("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  const customRequest = async (options: any) => {
    const { file, onSuccess: antOnSuccess, onError } = options;

    if (!validateFile(file)) return;

    setUploading(true);
    setError("");

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        folder: "/vidora",
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });

      message.success(`${file.name} uploaded successfully`);
      onSuccess(res);
      antOnSuccess("ok");
    } catch (err) {
      message.error(`${file.name} upload failed`);
      setError("Upload failed");
      onError(err);
    } finally {
      setUploading(false);
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: fileType === "video" ? "video/*" : "image/*",
    customRequest,
    showUploadList: false,
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag {fileType} to this area to upload</p>
        <p className="ant-upload-hint">
          Only {fileType} files under 100MB are allowed
        </p>
      </Dragger>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default FileUpload;
