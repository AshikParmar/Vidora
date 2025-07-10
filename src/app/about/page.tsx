import React from 'react';
import Link from "next/link";
import { Play, Upload, Users, Globe, Heart, Shield, Zap, Camera } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Easy Upload",
      description: "Upload your videos in minutes with our intuitive drag-and-drop interface. Support for all major video formats."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Share your content with millions of viewers worldwide. Your videos, your audience, unlimited possibilities."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Connect with creators and viewers from around the world. Build your community and grow together."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Your content is protected with enterprise-grade security. We ensure a safe environment for all users."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Advanced streaming technology ensures your videos load quickly and play smoothly across all devices."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Creator Focused",
      description: "Built by creators, for creators. We provide the tools you need to succeed and monetize your content."
    }
  ];

  const stats = [
    { number: "10M+", label: "Videos Uploaded" },
    { number: "50M+", label: "Active Users" },
    { number: "180+", label: "Countries" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Play className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                VIDORA
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              The next-generation video platform where creativity meets community. Upload, share, and discover amazing content from creators worldwide.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Start Creating
                </button>
              </Link>
              <Link href="/">
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors duration-200">
                  Explore Videos
                </button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            About VIDORA
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            VIDORA is a video sharing platform created to give everyone a voice. Whether you're sharing your first video 
            or you're a seasoned content creator, VIDORA provides the tools and audience to help you succeed.
            Upload, share, and discover amazing content from creators worldwide.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VIDORA?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A creator-friendly platform with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center">
              <div className="text-2xl font-bold text-white">👨‍💻</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Created by a Developer
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              VIDORA is a passion project built from scratch to demonstrate modern web development skills 
              and create a platform where everyone can share their videos with the world.
            </p>
            <div className="text-sm text-gray-500">
              Built with React, Node.js, and modern web technologies
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join VIDORA?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Start your journey today. Upload your first video and become part of the VIDORA community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 justify-center">
                <Upload className="w-5 h-5" />
                Upload Your First Video
              </button>
            </Link>
            <Link href="/">
              <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-200">
                Explore Videos
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Play className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold">VIDORA</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2025 VIDORA. A passion project built for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;