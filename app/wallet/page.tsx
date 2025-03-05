"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useWalletStore } from "@/store/useWalletStore"
import TransactionList from "@/components/transaction-list/TransactionList"

export default function WalletPage() {
  const { hasWallet, walletAddress, balance, increaseBalance } = useWalletStore()
  const router = useRouter()

  useEffect(() => {
    if (!hasWallet) {
      router.push("/login")
    }
  }, [hasWallet, router])

  if (!hasWallet) {
    return null
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-purple-100 rounded-lg p-6 mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">{balance.toLocaleString()} ریال</h2>
        <button className="btn btn-primary text-sm" onClick={increaseBalance}>
          افزایش موجودی
        </button>
      </div>

      <div className="flex justify-between gap-4 mb-6">
        <Link href="/send" className="flex-1">
          <button className="btn btn-primary w-full">ارسال</button>
        </Link>
        <Link href="/receive" className="flex-1">
          <button className="btn btn-secondary w-full">دریافت</button>
        </Link>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">تراکنش‌ها</h2>
        <TransactionList />
      </div>
    </div>
  )
}

