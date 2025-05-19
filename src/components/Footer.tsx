import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[var(--surface)] text-[var(--on-surface)] py-4">
            <div className="container mx-auto flex flex-col md:flex-row items-start justify-between px-6 space-y-6 md:space-y-0">
                {/* Left: Brand & Taglines */}
                <div className="flex flex-col space-y-1 text-left">
                    <span className="text-lg font-semibold">LedgerLight</span>
                    <span className="text-sm text-[var(--on-surface)]/80">Simplifying your finances</span>
                    <span className="text-sm text-[var(--on-surface)]/80">Track every expense with precision and ease</span>
                </div>

                {/* Right: Contact & Social (Left-aligned) */}
                <div className="flex flex-col space-y-2 text-left">
                    <span className="text-sm font-semibold">Contact Us</span>
                    <a
                        href="mailto:support@ledgerlight.com"
                        className="flex items-center text-sm text-[var(--on-surface)] hover:text-[var(--highlight)] transition"
                    >
                        <FaEnvelope className="mr-1" />
                        support@ledgerlight.com
                    </a>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" aria-label="Twitter" className="hover:text-[var(--highlight)] transition">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" aria-label="GitHub" className="hover:text-[var(--highlight)] transition">
                            <FaGithub size={20} />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-[var(--highlight)] transition">
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-[var(--on-surface)]/20" />

            {/* Bottom Bar */}
            <div className="mt-4 text-center text-[var(--on-surface)]/60 text-xs">
                © {new Date().getFullYear()} LedgerLight. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
