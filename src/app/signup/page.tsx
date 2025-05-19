"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUserPlus, FiBarChart2, FiShield, FiPieChart, FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (!name.trim() || !email.trim() || !password) {
            setError('All fields are required.');
            return false;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return false;
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || 'Signup failed');
            } else {
                router.push('/login?signup=success');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Marketing Panel */}
            <div className="hidden md:flex flex-col justify-center px-8 lg:px-16 py-6 space-y-8">
                <h2 className="text-4xl font-bold text-white leading-snug">Make Every Rupee Count</h2>
                <p className="text-lg text-[var(--text-color)]/80">
                    Automate expense tracking and gain instant clarity over your spending habits.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <FiBarChart2 className="text-blue-500 mr-3" size={24} />
                        Real-time analytics & insights
                    </li>
                    <li className="flex items-center">
                        <FiShield className="text-blue-500 mr-3" size={24} />
                        Bank-grade security & privacy
                    </li>
                    <li className="flex items-center">
                        <FiPieChart className="text-blue-500 mr-3" size={24} />
                        Interactive, visual reports
                    </li>
                </ul>
            </div>

            {/* Signup Form */}
            <div className="flex items-center justify-center px-6 py-8 bg-[var(--bg-color)]">
                <div className="w-full max-w-md bg-[var(--card-color)] rounded-2xl p-8 shadow-[8px_8px_16px_var(--shadow-dark),-8px_-8px_16px_var(--shadow-light)]">
                    <h1 className="text-3xl font-bold text-white mb-4">Create Your Free Account</h1>
                    <p className="text-[var(--text-color)]/70 mb-6">No credit card required. Secure, fast, and free.</p>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-1 text-[var(--text-color)] text-sm">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                placeholder="Jane Doe"
                                className="w-full p-3 bg-[var(--bg-color)] rounded-lg shadow-[inset_4px_4px_8px_var(--shadow-dark),inset_-4px_-4px_8px_var(--shadow-light)] text-[var(--text-color)]"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-[var(--text-color)] text-sm">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="you@domain.com"
                                className="w-full p-3 bg-[var(--bg-color)] rounded-lg shadow-[inset_4px_4px_8px_var(--shadow-dark),inset_-4px_-4px_8px_var(--shadow-light)] text-[var(--text-color)]"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block mb-1 text-[var(--text-color)] text-sm">Password</label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="Minimum 8 characters"
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
                            {loading ? 'Creating account...' : <><FiUserPlus size={20} /> Create Account</>}
                        </button>
                    </form>
                    <p className="text-[var(--text-color)]/70 text-sm mt-6 text-center">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
