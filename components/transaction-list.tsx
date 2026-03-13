'use client';

import { Transaction } from '@/lib/api';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export default function TransactionList({ transactions, isLoading }: TransactionListProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex-1">
            <p className="font-medium text-gray-800">{tx.description}</p>
            <p className="text-sm text-gray-600">{tx.date}</p>
          </div>
          <div className="text-right">
            <p
              className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
            >
              {tx.type === 'income' ? '+' : '-'}
              {formatAmount(Math.abs(tx.amount))}
            </p>
            <p className="text-xs text-gray-600 mt-1">{tx.account}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
