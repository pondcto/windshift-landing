"use client"

import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-end ml-[0.1in] select-none gap-3" title="Go to home">
      {/* Light mode logo */}
      <Image
        src="/images/windshift-wordmark-gradient.png"
        alt="WindShift"
        width={220}
        height={40}
        priority
        className="h-[1.9rem] w-auto dark:hidden"
      />
      {/* Dark mode logo */}
      <Image
        src="/images/windshift-wordmark-sky-blue.png"
        alt="WindShift"
        width={220}
        height={40}
        priority
        className="h-[1.9rem] w-auto hidden dark:inline"
      />
    </Link>
  )
}
