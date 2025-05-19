"use client"

import React, { useState } from 'react';

interface Transaction {
    type: 'income' | 'expense';
    description: string;
    amount: number;
    date: string;
}

interface Props {
    onAdd: (tx: Transaction) => void;
}

export default function TransactionForm({ onAdd }: Props) {
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !date) return;
        onAdd({ type, description, amount: parseFloat(amount), date });
        setDescription('');
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit} className="neumorphic p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-1">
                <label className="block mb-1 text-sm">Type</label>
                <select
                    value={type}
                    onChange={e => setType(e.target.value as 'income' | 'expense')}
                    className="w-full p-2 bg-[var(--card-color)] rounded-lg shadow-inner text-[var(--text-color)]"
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className="md:col-span-1">
                <label className="block mb-1 text-sm">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="e.g. Salary"
                    className="w-full p-2 bg-[var(--card-color)] rounded-lg shadow-inner text-[var(--text-color)]"
                />
            </div>
            <div className="md:col-span-1">
                <label className="block mb-1 text-sm">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="₹0.00"
                    className="w-full p-2 bg-[var(--card-color)] rounded-lg shadow-inner text-[var(--text-color)]"
                />
            </div>
            <div className="md:col-span-1">
                <label className="block mb-1 text-sm">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-2 bg-[var(--card-color)] rounded-lg shadow-inner text-[var(--text-color)]"
                />
            </div>
            <button
                type="submit"
                className="md:col-span-4 self-center px-6 py-3 bg-[var(--highlight)] text-black rounded-lg font-semibold shadow-md hover:shadow-lg transition"
            >
                Add Transaction
            </button>
        </form>
    );
}
