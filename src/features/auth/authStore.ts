import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockUser, DEMO_CREDENTIALS } from '@/data/mockData';

// User interfeysi
interface User {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
}

// Store interfeysi
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isChecking: boolean;

    // Actions
    login: (email: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isChecking: true,

            // Login - DEMO versiya (hardcoded credentials)
            login: (email: string, password: string) => {
                // Check hardcoded demo credentials
                if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
                    const demoToken = 'demo-token-' + Date.now();
                    localStorage.setItem('token', demoToken);
                    set({
                        user: mockUser,
                        token: demoToken,
                        isAuthenticated: true
                    });
                    return { success: true };
                }

                return {
                    success: false,
                    error: "Email yoki parol noto'g'ri"
                };
            },

            // Logout
            logout: () => {
                localStorage.removeItem('token');
                set({ user: null, token: null, isAuthenticated: false });
            },

            // Auth check - DEMO versiya
            checkAuth: async () => {
                set({ isChecking: true });

                const token = get().token || localStorage.getItem('token');

                if (!token || token === 'undefined') {
                    get().logout();
                    set({ isChecking: false });
                    return;
                }

                // Demo mode: token mavjud bo'lsa, mockUser ni restore qilish
                if (token.startsWith('demo-token-')) {
                    set({
                        user: mockUser,
                        token,
                        isAuthenticated: true,
                        isChecking: false
                    });
                    return;
                }

                // Token demo emas bo'lsa, logout
                get().logout();
                set({ isChecking: false });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);