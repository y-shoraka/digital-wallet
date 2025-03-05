"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/store/useWalletStore"

export default function LoginPage() {
  const { hasWallet, createWallet } = useWalletStore()
  const router = useRouter()

  useEffect(() => {
    if (hasWallet) {
      router.push("/wallet")
    }
  }, [hasWallet, router])

  const handleCreateWallet = () => {
    createWallet()
    router.push("/seed-phrase")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">کیف پول دیجیتال</h1>
        <p className="mb-8">به کیف پول دیجیتال خوش آمدید. برای شروع، یک کیف پول جدید ایجاد کنید.</p>
        <div className="flex flex-col gap-4">
          <button className="btn btn-primary" onClick={handleCreateWallet}>
            ایجاد کیف پول
          </button>
          <button className="btn btn-secondary" onClick={handleCreateWallet}>
            ورود
          </button>
        </div>
      </div>
    </div>
  )
}

