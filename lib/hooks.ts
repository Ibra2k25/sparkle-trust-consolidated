'use client';

import { useEffect, useState, useCallback } from 'react';
import { getBalances, getTransactions, Transaction, BalanceResponse, TransactionsResponse } from './api';

export function useBalances() {
  const [balances, setBalances] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    const result = await getBalances();
    if (result.ok && result.balances) {
      setBalances(result.balances);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch balances');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
    const interval = setInterval(refetch, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [refetch]);

  return { balances, loading, error, refetch };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    const result = await getTransactions();
    if (result.ok && result.transactions) {
      setTransactions(result.transactions);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch transactions');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { transactions, loading, error, refetch };
}
