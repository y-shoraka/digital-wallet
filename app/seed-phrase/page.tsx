"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWalletStore } from "@/store/useWalletStore";

export default function SeedPhrasePage() {
  const { hasWallet, seedPhrase, confirmSeedPhrase } = useWalletStore();
  const router = useRouter();

  const handleConfirm = () => {
    confirmSeedPhrase();
    router.push("/wallet");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">عبارت بازیابی</h1>
        <p className="mb-6 text-center">
          این ۱۲ کلمه را در جایی امن یادداشت کنید. با استفاده از این کلمات
          می‌توانید کیف پول خود را بازیابی کنید.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {seedPhrase.map((word, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded text-center">
              <span className="font-bold">{index + 1}. </span>
              <span className="uppercase">{word}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={handleConfirm}>
            تایید و ادامه
          </button>
        </div>
      </div>
    </div>
  );
}
