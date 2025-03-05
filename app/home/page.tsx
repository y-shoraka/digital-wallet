"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/store/useWalletStore"

export default function Home() {
  const { hasWallet } = useWalletStore()
  const router = useRouter()

  useEffect(() => {
    if (hasWallet) {
      router.push("/wallet")
    } else {
      router.push("/login")
    }
  }, [hasWallet, router])

  return null
}

