import React, { useState, useRef } from 'react';
import {
  Home,
  FileText,
  User,
  BookOpen,
  Upload,
  Edit3,
  Download,
  Trash2,
  Edit,
  ChevronDown,
  Calendar,
  Mail,
  Phone,
  Info,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
} from 'lucide-react';

const ResumeBuilder = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for demonstration
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: 'Software Engineer Resume',
      date: '2024-01-15',
      type: 'Technical',
    },
    {
      id: 2,
      name: 'Marketing Manager Resume',
      date: '2024-01-10',
      type: 'Marketing',
    },
    {
      id: 3,
      name: 'Data Analyst Resume',
      date: '2024-01-05',
      type: 'Analytics',
    },
  ]);

  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    certifications: '',
    projects: '',
  });

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'new-resume', label: 'New Resume', icon: FileText },
    { id: 'my-info', label: 'My Info', icon: User },
    { id: 'library', label: 'Library', icon: BookOpen },
  ];

  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

const [editingOnlineProfileId, setEditingOnlineProfileId] = useState<string | null>(null);
const [newOnlineProfile, setNewOnlineProfile] = useState<{
  title: string;
  link: string;
  achievements: string;
}>({ title: '', link: '', achievements: '' });


  interface UserData {
  // ... your existing fields ...
  onlineProfiles: Array<{
    id: string;
    title: string;
    link: string;
    achievements: string;
  }>;
}

  const handleDeleteResume = (id: number) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSignOut = () => {
    // In a real app, you would handle auth state change here
    // For this example, we'll just reload the page to simulate going back to auth
    window.location.href = '/authpage';
  };

  const renderHomePage = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Resume Builder
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create professional, ATS-friendly resumes tailored to specific job
          descriptions using our intelligent resume builder.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Smart Resume Generation
          </h3>
          <p className="text-gray-600 text-sm">
            Upload job descriptions and get perfectly tailored resumes that
            match requirements and pass ATS systems.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Profile Management
          </h3>
          <p className="text-gray-600 text-sm">
            Store all your professional information once and reuse it across
            multiple resume variations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Resume Library
          </h3>
          <p className="text-gray-600 text-sm">
            Access, edit, download, and manage all your created resumes in one
            organized library.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Edit3 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Easy Customization
          </h3>
          <p className="text-gray-600 text-sm">
            Edit, rename, and customize your resumes with our intuitive
            interface and real-time preview.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Add Your Information
            </h3>
            <p className="text-gray-600 text-sm">
              Complete your profile with professional details, experience, and
              skills.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Upload Job Description
            </h3>
            <p className="text-gray-600 text-sm">
              Paste the job description you're applying for and let our AI
              analyze it.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Generate & Download
            </h3>
            <p className="text-gray-600 text-sm">
              Get your tailored resume instantly and download it in professional
              format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewResumePage = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Create New Resume
        </h1>
        <p className="text-lg text-gray-600">
          Add your job description below and click upload to get your new
          tailored resume
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete job description here. Include requirements, responsibilities, and preferred qualifications..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />

        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
            <Upload className="w-5 h-5" />
            Upload Now
          </button>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">
          Tips for Best Results:
        </h3>
        <ul className="text-gray-700 space-y-1 text-sm">
          <li>
            • Include the complete job posting with all requirements and
            responsibilities
          </li>
          <li>
            • Make sure your profile information is up to date before generating
          </li>
          <li>
            • The more detailed the job description, the better the tailored
            resume
          </li>
          <li>• Review and edit the generated resume before downloading</li>
        </ul>
      </div>
    </div>
  );

  const renderMyInfoPage = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          My Information
        </h1>
        <p className="text-lg text-gray-600">
          Complete your professional profile to generate tailored resumes
        </p>
      </div>

      <div className="grid gap-8">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-blue-100">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfileImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={userInfo.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={userInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={userInfo.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Professional Summary
          </h2>
          <textarea
            value={userInfo.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Brief professional summary highlighting your key achievements and career goals..."
          />
        </div>

        {/* Experience */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Work Experience
          </h2>
          <textarea
            value={userInfo.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="List your work experience, including job titles, companies, dates, and key achievements..."
          />
        </div>

        {/* Certifications */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Certifications
          </h2>
          <textarea
            value={userInfo.experience}
            onChange={(e) => handleInputChange('certifications', e.target.value)}
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="List your certifications, including job titles, companies, dates, and key achievements..."
          />
        </div>

{/* Online Profiles */}
<div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-900">Online Profiles</h2>
    <button
      onClick={() => {
        setNewOnlineProfile({ title: '', link: '', achievements: '' });
        setEditingOnlineProfileId(null);
      }}
      className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
    >
      + Add Profile
    </button>
  </div>

  {/* Add/Edit Form (shown when editing or adding new) */}
  {(editingOnlineProfileId !== null || newOnlineProfile.title) && (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platform (e.g., LeetCode, GitHub)
          </label>
          <input
            type="text"
            value={newOnlineProfile.title}
            onChange={(e) => setNewOnlineProfile({ ...newOnlineProfile, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="LeetCode"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile URL
          </label>
          <input
            type="url"
            value={newOnlineProfile.link}
            onChange={(e) => setNewOnlineProfile({ ...newOnlineProfile, link: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="https://leetcode.com/username"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Achievements
        </label>
        <textarea
          value={newOnlineProfile.achievements}
          onChange={(e) => setNewOnlineProfile({ ...newOnlineProfile, achievements: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg h-20"
          placeholder="Top 5%, 500+ problems solved, etc."
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => {
            setNewOnlineProfile({ title: '', link: '', achievements: '' });
            setEditingOnlineProfileId(null);
          }}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (editingOnlineProfileId) {
              // Update existing profile
              const updatedProfiles = userInfo.onlineProfiles.map(profile =>
                profile.id === editingOnlineProfileId ? { ...newOnlineProfile, id: editingOnlineProfileId } : profile
              );
              handleInputChange('onlineProfiles', updatedProfiles);
            } else {
              // Add new profile
              const updatedProfiles = [
                ...userInfo.onlineProfiles,
                { ...newOnlineProfile, id: Date.now().toString() }
              ];
              handleInputChange('onlineProfiles', updatedProfiles);
            }
            setNewOnlineProfile({ title: '', link: '', achievements: '' });
            setEditingOnlineProfileId(null);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          {editingOnlineProfileId ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  )}

  {/* Profiles List */}
  <div className="space-y-4">
    {userInfo.onlineProfiles.length === 0 ? (
      <p className="text-gray-500 text-center py-4">No online profiles added yet</p>
    ) : (
      userInfo.onlineProfiles.map((profile) => (
        <div key={profile.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{profile.title}</h3>
              <a 
                href={profile.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                {profile.link}
              </a>
              {profile.achievements && (
                <p className="text-gray-600 text-sm mt-1">{profile.achievements}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setNewOnlineProfile({
                    title: profile.title,
                    link: profile.link,
                    achievements: profile.achievements
                  });
                  setEditingOnlineProfileId(profile.id);
                }}
                className="text-blue-600 hover:text-blue-800 p-1"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const updatedProfiles = userInfo.onlineProfiles.filter(p => p.id !== profile.id);
                  handleInputChange('onlineProfiles', updatedProfiles);
                }}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <textarea
            value={userInfo.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="List your technical and soft skills, separated by commas..."
          />
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Save Information
          </button>
        </div>
      </div>
    </div>
  );

  const renderLibraryPage = () => (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Resume Library
        </h1>
        <p className="text-lg text-gray-600">
          Manage all your created resumes in one place
        </p>
      </div>

      <div className="grid gap-6">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {resume.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Created: {resume.date} • Type: {resume.type}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteResume(resume.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {resumes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No resumes yet
          </h3>
          <p className="text-gray-600 mb-4">
            Create your first resume to get started
          </p>
          <button
            onClick={() => setCurrentPage('new-resume')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Create New Resume
          </button>
        </div>
      )}
    </div>
  );

  const renderAboutPage = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          About ResumeAI
        </h1>
        <p className="text-lg text-gray-600">
          Learn more about our mission and the team behind ResumeAI
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 mb-6">
          ResumeAI was founded with the goal of making job applications easier
          and more effective. We leverage artificial intelligence to help job
          seekers create resumes that stand out and pass through applicant
          tracking systems with ease.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          How We Help
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
          <li>AI-powered resume tailoring based on job descriptions</li>
          <li>ATS optimization to ensure your resume gets seen</li>
          <li>Professional templates that highlight your strengths</li>
          <li>Centralized profile management for multiple applications</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Team</h2>
        <p className="text-gray-700">
          Our team consists of HR professionals, software engineers, and data
          scientists who are passionate about helping people succeed in their
          job search.
        </p>
      </div>
    </div>
  );

  const renderContactUsPage = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you! Reach out with any questions or feedback.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">support@resumeai.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday, 9am - 5pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'new-resume':
        return renderNewResumePage();
      case 'my-info':
        return renderMyInfoPage();
      case 'library':
        return renderLibraryPage();
      case 'about':
        return renderAboutPage();
      case 'contactus':
        return renderContactUsPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ResumeAI</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find((item) => item.id === currentPage)?.label ||
                  (currentPage === 'about' && 'About') ||
                  (currentPage === 'contactus' && 'Contact Us') ||
                  'Dashboard'}
              </h1>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {userInfo.fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {userInfo.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Member since Jan 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        setCurrentPage('about');
                        setProfileDropdown(false);
                      }}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg text-left"
                    >
                      <Info className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">About</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('contactus');
                        setProfileDropdown(false);
                      }}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg text-left"
                    >
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">Contact Us</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg text-left"
                    >
                      <LogOut className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">{renderCurrentPage()}</main>
      </div>
    </div>
  );
};

export default ResumeBuilder;
