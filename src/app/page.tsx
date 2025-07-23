'use client';

import { useState } from 'react';
import { LogOut, User, Zap, FileText, Star, CheckCircle } from 'lucide-react';
import AdvancedAuthPage from './AuthPage'; // Make sure this path is correct

interface UserData {
  name: string;
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Homepage
        user={user}
        onSignOut={handleSignOut}
        onGetStarted={handleGetStarted}
      />

      {showAuth && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-start justify-center z-[200] p-4">
          <AdvancedAuthPage
            onLogin={handleLogin}
            onClose={() => setShowAuth(false)}
          />
        </div>
      )}
    </div>
  );
}

function Homepage({
  user,
  onSignOut,
  onGetStarted,
}: {
  user: UserData | null;
  onSignOut: () => void;
  onGetStarted: () => void;
}) {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-8xl mx-2 sm:mx-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-50 sticky top-0 z-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RESUMEGENIUS
                </span>
              </div>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onGetStarted}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-8xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Zap className="h-4 w-4" />
                  <span>AI-Powered Resume Builder</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  🚀 RESUMEGENIUS
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Build your professional resume in minutes with our AI-powered
                  platform. Stand out from the crowd and land your dream job.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Create Resume Now
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  View Templates
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-gray-600">Resumes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">5⭐</div>
                  <div className="text-gray-600">User Rating</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Why Choose ResumeGenius?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our platform combines cutting-edge AI with professional design
                  to create resumes that get results.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    AI-Powered
                  </h3>
                  <p className="text-gray-600">
                    Our AI analyzes job descriptions and optimizes your resume
                    content for maximum impact.
                  </p>
                </div>

                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Professional Templates
                  </h3>
                  <p className="text-gray-600">
                    Choose from dozens of professionally designed templates that
                    make you stand out.
                  </p>
                </div>

                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    ATS Optimized
                  </h3>
                  <p className="text-gray-600">
                    All our templates are optimized to pass Applicant Tracking
                    Systems (ATS).
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">RESUMEGENIUS</span>
            </div>
            <p className="text-gray-400">
              © 2024 ResumeGenius. All rights reserved. Built with ❤️ for job
              seekers.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
