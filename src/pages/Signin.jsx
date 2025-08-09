import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';

export default function SignIn() {
  const [formData, setFormData] = useState({
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
    console.log('Sign In Data:', formData);
    // Handle sign-in logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

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
          className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition"
        >
          Sign In
        </button>

        <div className="my-6 flex items-center justify-center">
          <div className="border-t border-gray-300 w-full" />
          <span className="mx-4 text-sm text-gray-500">or continue with</span>
          <div className="border-t border-gray-300 w-full" />
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            type="button"
            className="flex items-center justify-center w-12 h-12 rounded-full border hover:bg-gray-100 transition"
            aria-label="Sign in with Google"
          >
            <FcGoogle className="text-2xl" />
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-12 h-12 rounded-full border hover:bg-gray-100 transition"
            aria-label="Sign in with Apple"
          >
            <FaApple className="text-xl" />
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-12 h-12 rounded-full border hover:bg-gray-100 transition"
            aria-label="Sign in with Facebook"
          >
            <FaFacebookF className="text-blue-600 text-xl" />
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-black font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
