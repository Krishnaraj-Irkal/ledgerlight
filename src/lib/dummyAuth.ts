// Temporary dummy auth & data for development

export interface DummyUser {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  export interface DummyTransaction {
    id: string;
    userId: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    date: string; // ISO string
  }
  
  // Sample users
  export const dummyUsers: DummyUser[] = [
    { id: '1', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'user' },
    { id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  ];
  
  // Simple in-memory current user
  let currentUser: DummyUser | null = dummyUsers[0]; // default to Jane Doe (user) for now
  
  // Transactions for both users
  export const dummyTransactions: DummyTransaction[] = [
    { id: 't1', userId: '1', type: 'income', amount: 5000, category: 'Salary', date: new Date('2025-04-01').toISOString() },
    { id: 't2', userId: '1', type: 'expense', amount: 1500, category: 'Groceries', date: new Date('2025-04-03').toISOString() },
    { id: 't3', userId: '2', type: 'income', amount: 10000, category: 'Consulting', date: new Date('2025-04-02').toISOString() },
    { id: 't4', userId: '2', type: 'expense', amount: 2000, category: 'Office Supplies', date: new Date('2025-04-04').toISOString() },
  ];
  
  // Get the current logged-in user
  export function getCurrentUser(): DummyUser | null {
    return currentUser;
  }
  
  // Simulated login: set currentUser if email matches and redirect to home
  export function login(email: string): boolean {
    const found = dummyUsers.find((u) => u.email === email);
    if (found) {
      currentUser = found;
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      return true;
    }
    return false;
  }
  
  // Simulated sign out: clear currentUser and redirect to login
  export function signOut(): void {
    currentUser = null;
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
  