import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'vinil' | 'banner' | 'adesivo';
    description: string;
    image: string;
    unit: 'metro' | 'unidade';
    dimensions?: string; // Para banners pré-definidos
}

interface CartItem extends Product {
    quantity: number; // Metros ou Unidades
}

interface StoreState {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    total: () => number;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product, quantity) => {
                set((state) => {
                    const existing = state.cart.find((item) => item.id === product.id);
                    if (existing) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }
                    return { cart: [...state.cart, { ...product, quantity }] };
                });
            },
            removeFromCart: (productId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== productId),
                }));
            },
            clearCart: () => set({ cart: [] }),
            total: () => {
                return get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'multicor-cart',
        }
    )
);
