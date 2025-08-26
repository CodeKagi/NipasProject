import { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
   const [isSignUp, setIsSignUp] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    return (
        <div className="h-screen flex items-center justify-center ">
            <div className="flex w-full max-w-6xl bg-white rounded shadow overflow-hidden">

                {/* Left column: Image */}
                <div className="hidden md:block md:w-1/2 h-[700px]">
                    <img
                        src="https://via.placeholder.com/500x700"
                        alt="Placeholder"
                        className="h-full w-4/5 object-cover bg-gray-400 mx-auto"
                    />
                </div>

                {/* Right column: Sign Up Form */}
                <div className="w-full md:w-1/2 p-8">

                    <div className=' w-4/5'>
                        {/* Logo */}
                        <div className="flex justify-left mb-1">
                            <img
                                src="https://via.placeholder.com/80x80"
                                alt="Logo"
                                className="h-10 w-20"
                            />
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            {isSignUp ? 'Sign Up' : 'Log In'}
                        </h2>

                        {/* Form */}
                        {isSignUp ? (
                            <form className="space-y-4">
                                {/* Name fields */}
                                <div className="flex gap-2">
                                    <div className="w-1/2">
                                        <label className="block mb-1 text-sm font-medium">First Name</label>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full px-4 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block mb-1 text-sm font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full px-4 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                    />
                                </div>

                          {/* Password */}
                            <div className="relative mb-4 flex flex-col">
                                <label className="block mb-1 font-medium text-sm">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="bg-gray-100 w-full px-4 py-1.5 pr-10 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Re-enter Password */}
                            <div className="relative flex flex-col">
                                <label className="block mb-1 font-medium text-sm">Re-enter Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="Re-enter your password"
                                        className="bg-gray-100 w-full px-4 py-1.5 pr-10 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
                                    >
                                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                                {/* Terms */}
                                <div className="flex items-center text-sm">
                                    <input type="checkbox" id="terms" className="mr-2" />
                                    <label htmlFor="terms">
                                        By signing up, I agree with <span className="text-red-600">Terms of Use</span> & <span className="text-red-600">Privacy Policy</span>
                                    </label>
                                </div>

                                {/* Sign Up button */}
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
                                >
                                    Sign Up
                                </button>
                            </form>
                        ) : (
                            <form className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                    />
                                </div>


                                
                          {/* Password */}
                            <div className="relative mb-4 flex flex-col">
                                <label className="block mb-1 font-medium text-sm">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="bg-gray-100 w-full px-4 py-1.5 pr-10 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                                {/* Remember me */}
                                <div className="flex items-center text-sm">
                                    <input type="checkbox" id="remember" className="mr-2" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>

                                {/* Sign In button */}
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
                                >
                                    Sign In
                                </button>
                            </form>
                        )}

                        {/* OR / Social Buttons */}
                        <div className="flex items-center my-4">
                            <hr className="flex-1 border-gray-300" />
                            <span className="mx-2 text-gray-400 text-sm">OR</span>
                            <hr className="flex-1 border-gray-300" />
                        </div>

                               <p className="text-center text-sm text-gray-500 font-medium mb-3">
                            {isSignUp ? 'Sign Up With' : 'Log In With'}
                        </p>

                        <div className="flex justify-center gap-4 mb-4">
                            {/* Google */}
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition">
                                <FaGoogle className="text-white" />
                            </button>
                            {/* Facebook */}
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition">
                                <FaFacebook className="text-white" />
                            </button>
                            {/* Apple */}
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition">
                                <FaApple className="text-white" />
                            </button>
                        </div>

                        {/* Toggle link */}
                        <p className="text-center text-sm text-gray-500 font-medium">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button
                                className="text-red-600 font-medium"
                                onClick={() => setIsSignUp(!isSignUp)}
                            >
                                {isSignUp ? 'Log In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
