export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
}

export interface AuthStatus {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
}