"use client";

import { useEffect, useState } from "react";
import { useWalletStore } from "@/store/useWalletStore";
import type { CombinedTransaction } from "@/types/transaction";
import LocalTransaction from "./components/LocalTransaction";
import DataTransaction from "./components/DataTransaction";
import transactions from "@/data/transactions.json";

export default function TransactionList() {
  const { transactions: localTransactions } = useWalletStore();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for a better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Combine and sort all transactions by date
  const allTransactions: CombinedTransaction[] = [
    ...localTransactions,
    ...transactions.map((t) => ({ ...t, isApi: true })),
  ].sort((a, b) => {
    const dateA = new Date("isApi" in a ? a.transaction_date : a.date);
    const dateB = new Date("isApi" in b ? b.transaction_date : b.date);
    return dateB.getTime() - dateA.getTime();
  });

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
        <p className="mt-2">در حال بارگذاری تراکنش‌ها...</p>
      </div>
    );
  }

  if (allTransactions.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        هیچ تراکنشی وجود ندارد
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allTransactions.map((transaction) => {
        // Check if it's an API transaction
        if ("isApi" in transaction) {
          return <DataTransaction transaction={transaction} />;
        } else {
          // Local transaction
          return <LocalTransaction transaction={transaction} />;
        }
      })}
    </div>
  );
}
