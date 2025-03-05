"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import { useWalletStore } from "@/store/useWalletStore"

export default function ReceivePage() {
  const { hasWallet, walletAddress } = useWalletStore()
  const router = useRouter()

  useEffect(() => {
    if (!hasWallet) {
      router.push("/login")
    }
  }, [hasWallet, router])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        alert("آدرس کیف پول کپی شد")
      })
      .catch((err) => {
        console.error("خطا در کپی کردن: ", err)
      })
  }

  if (!hasWallet) {
    return null
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">دریافت</h1>

      <div className="card text-center">
        <h2 className="text-xl font-medium mb-4">آدرس کیف</h2>

        <div className="flex justify-center mb-6">
          <QRCodeSVG value={walletAddress} size={200} />
        </div>

        <div className="bg-gray-100 p-3 rounded mb-4 break-all">{walletAddress}</div>

        <button className="btn btn-primary" onClick={copyToClipboard}>
          کپی آدرس
        </button>
      </div>
    </div>
  )
}

