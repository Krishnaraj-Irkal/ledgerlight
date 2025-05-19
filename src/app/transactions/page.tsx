"use client"

import React, { useState, useEffect } from 'react';
import TransactionForm from '@/components/TransactionForm';
import { useAuth } from '@/context/AuthContext';
import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function TransactionsPage() {
    const { user, loading: authLoading } = useAuth();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    // Fetch transactions on mount
    useEffect(() => {
        async function fetchTx() {
            setLoading(true);
            try {
                const res = await fetch('/api/auth/transactions');
                if (!res.ok) throw new Error('Failed to load transactions');
                const data = await res.json();
                setTransactions(data.transactions);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (!authLoading) fetchTx();
    }, [authLoading]);

    // Compute totals
    useEffect(() => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        setTotalIncome(income);
        setTotalExpense(expense);
    }, [transactions]);

    // Add a new transaction via API
    const handleAdd = async (tx: any) => {
        try {
            const res = await fetch('/api/auth/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tx),
            });
            const data = await res.json();
            if (res.ok) {
                setTransactions(prev => [data.transaction, ...prev]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Delete via API
    const handleDelete = async (id: string) => {
        if (!confirm('Delete this transaction?')) return;
        try {
            const res = await fetch(`/api/auth/transactions/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setTransactions(prev => prev.filter(t => t._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="neumorphic p-6 flex items-center space-x-4 transition-transform hover:scale-105">
                    <FiDollarSign size={32} className="text-[var(--highlight)]" />
                    <div>
                        <h3 className="text-lg font-semibold">Balance</h3>
                        <p className="text-2xl font-bold">
                            ₹{(totalIncome - totalExpense).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="neumorphic p-6 flex items-center space-x-4 transition-transform hover:scale-105">
                    <FiTrendingUp size={32} className="text-green-400" />
                    <div>
                        <h3 className="text-lg font-semibold">Income</h3>
                        <p className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</p>
                    </div>
                </div>
                <div className="neumorphic p-6 flex items-center space-x-4 transition-transform hover:scale-105">
                    <FiTrendingDown size={32} className="text-red-400" />
                    <div>
                        <h3 className="text-lg font-semibold">Expenses</h3>
                        <p className="text-2xl font-bold">₹{totalExpense.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Transaction Form */}
            <div className="mb-8">
                <TransactionForm onAdd={handleAdd} />
            </div>

            {/* Timeline View */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                {loading ? (
                    <div className="text-center py-12 text-[var(--text-color)]/70">Loading…</div>
                ) : (
                    <ul className="relative pl-6">
                        <span className="absolute left-3 top-2 bottom-2 w-[2px] bg-[var(--highlight)]"></span>
                        {transactions.map(tx => (
                            <li key={tx._id} className="mb-6 relative">
                                <div className="absolute left-0 top-1 w-6 h-6 bg-[var(--card-color)] border-2 border-[var(--highlight)] rounded-full flex items-center justify-center">
                                    {tx.type === 'income' ? <FiTrendingUp className="text-green-400" /> : <FiTrendingDown className="text-red-400" />}
                                </div>
                                <div className="ml-10 p-4 bg-[var(--card-color)] rounded-lg shadow-md flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-[var(--text-color)]">{tx.description}</p>
                                        <p className="text-xs text-[var(--text-color)]/70">
                                            {new Date(tx.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className={`font-bold ${tx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                                            {tx.type === 'expense' ? '-' : '+'}₹{tx.amount.toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => handleDelete(tx._id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
