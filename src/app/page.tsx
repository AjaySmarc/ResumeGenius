'use client';

import Image from 'next/image';
import AuthPage from './Login';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-blue shadow-2xl rounded-2xl p-10 w-full max-w-md space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-purple-700">
          🚀 RESUME<span className="text-blue-500">GENIUS</span>
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Build your professional resume in minutes.
        </p>
        <AuthPage />
      </div>
    </main>
  );
}
