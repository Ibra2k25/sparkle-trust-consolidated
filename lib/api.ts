const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

export interface LoginResponse {
  ok: boolean;
  token?: string;
  error?: string;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  account: string;
  type: 'income' | 'expense';
}

export interface BalanceResponse {
  ok: boolean;
  balances?: Record<string, number>;
  error?: string;
}

export interface TransactionsResponse {
  ok: boolean;
  transactions?: Transaction[];
  error?: string;
}

// Get token from localStorage
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

// Set token in localStorage
export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

// Clear token from localStorage
export function clearToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}

// Login user
export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.ok && data.token) {
      setToken(data.token);
      return { ok: true, token: data.token };
    }

    return { ok: false, error: data.error || 'Login failed' };
  } catch (error) {
    return { ok: false, error: 'Network error' };
  }
}

// Get balances
export async function getBalances(): Promise<BalanceResponse> {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/api/balances`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Failed to fetch balances' };
  }
}

// Get transactions
export async function getTransactions(): Promise<TransactionsResponse> {
  try {
    const token = getToken();
    if (!token) {
      return { ok: false, error: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE}/api/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Failed to fetch transactions' };
  }
}

// Add transaction
export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<TransactionsResponse> {
  try {
    const token = getToken();
    if (!token) {
      return { ok: false, error: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE}/api/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    });

    return await response.json();
  } catch (error) {
    return { ok: false, error: 'Failed to add transaction' };
  }
}

// Logout
export async function logout(): Promise<void> {
  clearToken();
}
