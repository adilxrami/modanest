import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Info:', formData);
    // TODO: handle sign-up logic
  };

  const handleOAuth = (provider) => {
    console.log(`Sign up with ${provider}`);
    // TODO: integrate with OAuth provider (e.g. Firebase)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>

        {/* Input Fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition mb-4"
        >
          Sign Up
        </button>

        <div className="text-center text-gray-400 mb-4">or continue with</div>

        {/* Social OAuth Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleOAuth('Google')}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            <span>Sign up with Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('Apple')}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
          >
            <FaApple size={20} />
            <span>Sign up with Apple</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('Facebook')}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
          >
            <FaFacebookF size={20} className="text-blue-600" />
            <span>Sign up with Facebook</span>
          </button>
        </div>

        {/* Sign In Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/signin" className="text-black font-medium hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
