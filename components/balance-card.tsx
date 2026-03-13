'use client';

interface BalanceCardProps {
  title: string;
  amount: number;
  accountNumber?: string;
  isLoading?: boolean;
}

export default function BalanceCard({ title, amount, accountNumber, isLoading }: BalanceCardProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      {isLoading ? (
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <p className="text-3xl font-bold text-blue-600">{formattedAmount}</p>
      )}
      {accountNumber && <p className="text-gray-500 text-xs mt-2">Account: {accountNumber}</p>}
    </div>
  );
}
