"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import * as randomWords from "random-words";

type Transaction = {
  id: string;
  type: "deposit" | "send" | "receive";
  amount: number;
  address?: string;
  date: string;
};

interface WalletState {
  hasWallet: boolean;
  seedPhrase: string[];
  walletAddress: string;
  balance: number;
  transactions: Transaction[];

  // Actions
  createWallet: () => void;
  confirmSeedPhrase: () => void;
  increaseBalance: () => void;
  sendFunds: (address: string, amount: number) => boolean;
  resetWallet: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      hasWallet: false,
      seedPhrase: [],
      walletAddress: "",
      balance: 0,
      transactions: [],

      createWallet: () => {
        // Generate 12 random English words
        const words = randomWords.generate({ exactly: 12 });
        set({ seedPhrase: words as string[] });
      },

      confirmSeedPhrase: () => {
        // Generate a wallet address (UUID)
        const address = uuidv4();
        document.cookie = `hasWallet=${true}; path=/`;
        set({ walletAddress: address, hasWallet: true });
      },

      increaseBalance: () => {
        const amount = 40;
        set((state) => ({
          balance: state.balance + amount,
          transactions: [
            {
              id: uuidv4(),
              type: "deposit",
              amount: amount,
              date: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        }));
      },

      sendFunds: (address: string, amount: number) => {
        const { balance } = get();

        if (amount <= 0 || amount > balance) {
          return false;
        }

        set((state) => ({
          balance: state.balance - amount,
          transactions: [
            {
              id: uuidv4(),
              type: "send",
              amount: amount,
              address: address,
              date: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        }));

        return true;
      },

      resetWallet: () => {
        set({
          hasWallet: false,
          seedPhrase: [],
          walletAddress: "",
          balance: 0,
          transactions: [],
        });
      },
    }),
    {
      name: "wallet-storage", // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
