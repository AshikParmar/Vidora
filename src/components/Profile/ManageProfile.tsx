import { apiClient } from '@/lib/api-client';
import { RootState } from '@/store';
import { setUser } from '@/store/slices/userSlice';
import { upload } from '@imagekit/next';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



interface ManageProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    username: string;
    email: string;
    avatar: string;
}

const ManageProfile: React.FC<ManageProfileProps> = ({
    isOpen,
    onClose,
}) => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        avatar: ''
    });
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    // Initialize form data when user data loads
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                avatar: user.avatar || ''
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    avatar: 'Image size must be less than 5MB'
                }));
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    avatar: 'Please select a valid image file'
                }));
                return;
            }

            try {
                const authRes = await fetch("/api/auth/imagekit-auth");
                const auth = await authRes.json();

                const res = await upload({
                    file,
                    fileName: file.name + `-${Date.now()}`,
                    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
                    folder: "/images",
                    signature: auth.signature,
                    expire: auth.expire,
                    token: auth.token,
                });
                setFormData(prev => ({
                    ...prev,
                    avatar: res?.url || ''
                }));
            } catch (err) {
                setErrors(prev => ({
                    ...prev,
                    avatar: 'Upload failed'
                }));
            } finally {
                setIsLoading(false);
            }
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleUpdateProfile = async (formData: any) => {
        try {

            // Example API call:
            const response = await apiClient.updateProfile(user._id as string, formData);

            return response;

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const res = await handleUpdateProfile(formData);
            console.log('Profile updated successfully:', res);
            queryClient.invalidateQueries({
                queryKey: ['profile', user._id],
            });
            if (!res || !res.user) {
                console.error('No user data returned from updateProfile');
                return;
            }
            dispatch(setUser(res?.user));
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error - you might want to show a toast notification here
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            username: user.username || '',
            email: user.email || '',
            avatar: user.avatar || ''
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed text-black inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-990 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">Manage Profile</h2>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Profile Picture */}
                    <div className="text-center">
                        <div className="relative inline-block">
                            <img
                                src={formData.avatar || '/avatar.png'}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                            />
                            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors duration-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={isLoading}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Click the camera icon to change your photo</p>
                        {errors.avatar && (
                            <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${errors.username ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your username"
                            disabled={isLoading}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            disabled={true}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageProfile;