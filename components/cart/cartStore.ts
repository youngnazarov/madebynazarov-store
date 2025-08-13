
'use client';
import { create } from 'zustand';
type Item = { id: string; title: string; price: number; currency: string; qty: number };
type CartState = { items: Item[]; add: (i: Omit<Item,'qty'>) => void; remove: (id: string) => void; setQty: (id: string, qty: number) => void; clear: () => void; };
export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (i) => { const e = get().items.find(x=>x.id===i.id); e? set({items:get().items.map(x=>x.id===i.id?{...x,qty:x.qty+1}:x)}) : set({items:[...get().items,{...i,qty:1}]}); },
  remove: (id) => set({ items: get().items.filter(x => x.id !== id) }),
  setQty: (id, qty) => set({ items: get().items.map(x => x.id === id ? { ...x, qty } : x) }),
  clear: () => set({ items: [] }),
}));
