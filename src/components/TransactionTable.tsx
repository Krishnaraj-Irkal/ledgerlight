import React from 'react';

export interface Transaction {
    id: number;
    type: 'income' | 'expense';
    description: string;
    amount: number;
    date: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-[var(--card-color)] rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-[var(--surface)]">
                        <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Description</th>
                        <th className="px-4 py-2 text-right text-sm font-medium">Amount (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr
                            key={tx.id}
                            className={`border-t border-[var(--bg-color)] ${tx.type === 'expense' ? 'bg-[#330000]' : ''}`}
                        >
                            <td className="px-4 py-3 text-sm">{tx.date}</td>
                            <td className="px-4 py-3 text-sm">{tx.description}</td>
                            <td className="px-4 py-3 text-sm text-right font-semibold text-${tx.type === 'expense' ? 'red-400' : 'green-400'}" >
                                {tx.type === 'expense' ? '-' : '+'}₹{tx.amount.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
