"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';


const Navbar: React.FC = () => {
    const { user, loading, signout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // fetch current user on mount
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);


    if (loading) {
        // optional: show a spinner or placeholder
        return null;
    }

    return (
        <nav className="neumorphic mx-6 my-4 flex items-center justify-between px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-[var(--on-surface)]">
                LedgerLight
            </Link>

            <div ref={menuRef} className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="hidden md:inline text-[var(--on-surface)] font-medium">
                            Welcome, {user.name}
                        </span>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(o => !o)}
                                className="p-2 rounded-full bg-[var(--surface)] shadow-md hover:shadow-lg transition-shadow"
                                aria-label="User menu"
                            >
                                <FiUser className="text-[var(--text-color)]" size={25} />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-[var(--card-color)] rounded-lg shadow-md py-2">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-[var(--on-surface)] hover:bg-[var(--bg-color)] transition"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Edit Profile
                                    </Link>
                                    <button
                                        onClick={() => { signout(); setDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-[var(--on-surface)] hover:bg-[var(--bg-color)] transition"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-transparent border border-[var(--highlight)] text-[var(--on-surface)] rounded-lg hover:bg-[var(--highlight)] hover:text-white transition"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 bg-[var(--highlight)] text-white rounded-lg hover:bg-opacity-90 transition"
                        >
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
