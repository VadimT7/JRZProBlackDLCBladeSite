import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  variantType: string;
  variantSize: string;
  quantity: number;
  price: number;
  sku: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// Helper function to fix old translation keys in cart items
const migrateCartItem = (item: CartItem): CartItem => {
  let variantType = item.variantType;
  
  // Fix old translation keys
  if (variantType === 'shop.product.goalie' || variantType === 'goalie') {
    variantType = 'Goalie (30\')'; // Default to English, will be handled by display logic
  } else if (variantType === 'shop.product.player' || variantType === 'player') {
    variantType = 'Player (10\')'; // Default to English, will be handled by display logic
  }
  
  return { ...item, variantType };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        
        return { items: [...state.items, item] };
      }),
      
      removeItem: (variantId) => set((state) => ({
        items: state.items.filter(i => i.variantId !== variantId),
      })),
      
      updateQuantity: (variantId, quantity) => set((state) => ({
        items: quantity <= 0
          ? state.items.filter(i => i.variantId !== variantId)
          : state.items.map(i =>
              i.variantId === variantId ? { ...i, quantity } : i
            ),
      })),
      
      clearCart: () => set({ items: [] }),
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getTotalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getTotalItems: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'jrz-cart',
      migrate: (persistedState: any, version: number) => {
        // Migrate old cart items with incorrect translation keys
        if (persistedState?.items) {
          persistedState.items = persistedState.items.map(migrateCartItem);
        }
        return persistedState;
      },
      version: 1,
    }
  )
);
