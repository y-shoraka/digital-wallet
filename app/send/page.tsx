"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useWalletStore } from "@/store/useWalletStore";

interface SendFormData {
  address: string;
  amount: number;
}

export default function SendPage() {
  const { hasWallet, balance, sendFunds } = useWalletStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SendFormData>();

  useEffect(() => {
    if (!hasWallet) {
      router.push("/login");
    }
  }, [hasWallet, router]);

  const onSubmit = (data: SendFormData) => {
    const amountValue = Number(data.amount);
    if (amountValue > balance) {
      setError("amount", { type: "manual", message: "موجودی کافی نیست" });
      return;
    }

    const success = sendFunds(data.address, amountValue);
    if (success) {
      router.push("/wallet");
    } else {
      setError("address", { type: "manual", message: "خطا در ارسال تراکنش" });
    }
  };

  if (!hasWallet) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">ارسال</h1>

      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">آدرس کیف مقصد</label>
            <input
              type="text"
              className="input"
              {...register("address", {
                required: "لطفا آدرس کیف پول مقصد را وارد کنید",
              })}
              placeholder="آدرس کیف پول مقصد را وارد کنید"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">مبلغ</label>
            <input
              type="number"
              className="input"
              {...register("amount", {
                required: "لطفا مبلغ معتبر وارد کنید",
                min: { value: 1, message: "مبلغ باید بیشتر از ۰ باشد" },
              })}
              placeholder="مبلغ را وارد کنید"
            />
            <p className="text-sm text-gray-500 mt-1">
              موجودی: {balance.toLocaleString()} ریال
            </p>
            {errors.amount && (
              <p className="text-red-600 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-success">
              ارسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
