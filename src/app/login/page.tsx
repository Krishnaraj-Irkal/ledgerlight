"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiLogIn, FiShield, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const { signin } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            await signin(email, password);
            if (!res.ok) {
                setError(data.message || 'Login failed');
            } else {

                if (data.user.role === 'admin') router.push('/admin/dashboard');
                else router.push('/transactions');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Security Panel */}
            <div className="hidden md:flex flex-col justify-center px-8 lg:px-8 py-6 space-y-6">
                <h2 className="text-4xl font-bold text-white">Secure Access</h2>
                <p className="text-lg text-[var(--text-color)]/80">
                    Your data is protected with bank-grade encryption and multi-factor authentication.
                </p>
                <ul className="space-y-4 text-[var(--text-color)]/80">
                    <li className="flex items-center">
                        <FiShield className="text-blue-500 mr-3" size={24} /> Two-factor authentication
                    </li>
                    <li className="flex items-center">
                        <FiMail className="text-blue-500 mr-3" size={24} /> Email login and recovery
                    </li>
                    <li className="flex items-center">
                        <FiLock className="text-blue-500 mr-3" size={24} /> Encrypted sessions
                    </li>
                </ul>
            </div>

            {/* Login Form */}
            <div className="flex items-center justify-center px-6 py-8 bg-[var(--bg-color)]">
                <div className="w-full max-w-md bg-[var(--card-color)] rounded-2xl p-8 shadow-[8px_8px_16px_var(--shadow-dark),-8px_-8px_16px_var(--shadow-light)]">
                    <h1 className="text-3xl font-bold text-white mb-4 flex items-center">
                        <FiLogIn className="mr-2 text-blue-500" size={24} /> Sign In
                    </h1>
                    <p className="text-[var(--text-color)]/70 mb-6">Enter your credentials to continue</p>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-[var(--text-color)] text-sm">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full p-3 bg-[var(--bg-color)] rounded-lg shadow-[inset_4px_4px_8px_var(--shadow-dark),inset_-4px_-4px_8px_var(--shadow-light)] text-[var(--text-color)]"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block mb-1 text-[var(--text-color)] text-sm">
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="password123"
                                className="w-full p-3 bg-[var(--bg-color)] rounded-lg shadow-[inset_4px_4px_8px_var(--shadow-dark),inset_-4px_-4px_8px_var(--shadow-light)] text-[var(--text-color)]"
                            />
                            <div
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-3 top-9 p-1 bg-transparent text-[var(--text-color)] hover:text-[var(--highlight)] transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-[var(--highlight)] text-black rounded-lg font-semibold shadow-[4px_4px_8px_var(--shadow-dark)] hover:shadow-[4px_4px_16px_var(--shadow-dark)] transition-all"
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>
                    <p className="text-[var(--text-color)]/70 text-sm mt-6 text-center">
                        Don’t have an account?{' '}
                        <Link href="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
