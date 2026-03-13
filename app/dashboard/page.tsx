'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/api';
import { useBalances, useTransactions } from '@/lib/hooks';
import TopNav from '@/components/top-nav';
import BalanceCard from '@/components/balance-card';
import TransactionList from '@/components/transaction-list';

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { balances, loading: balancesLoading } = useBalances();
  const { transactions, loading: transactionsLoading } = useTransactions();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/');
  };

  const primaryBalance = balances?.['1'] || 0;
  const investmentBalance = balances?.['2'] || 0;
  const totalBalance = primaryBalance + investmentBalance;

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNav onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here's your financial overview.</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BalanceCard
            title="Total Balance"
            amount={totalBalance}
            isLoading={balancesLoading}
          />
          <BalanceCard
            title="Primary Savings"
            amount={primaryBalance}
            accountNumber="4821"
            isLoading={balancesLoading}
          />
          <BalanceCard
            title="Investment Portfolio"
            amount={investmentBalance}
            accountNumber="9304"
            isLoading={balancesLoading}
          />
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions</h3>
          <TransactionList transactions={transactions} isLoading={transactionsLoading} />
        </div>
      </main>
    </div>
  );
}
