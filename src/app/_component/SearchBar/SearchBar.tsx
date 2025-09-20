"use client"

import { useEffect, useState } from "react"

type SearchBarProps = {
  onSearch: (value: string) => void
  placeholder?: string
  debounce?: number
}

export default function SearchBar({ onSearch, placeholder = "Search...", debounce = 300 }: SearchBarProps) {
  const [input, setInput] = useState("")

  useEffect(() => {
    const id = setTimeout(() => {
      onSearch(input)
    }, debounce)

    return () => clearTimeout(id)
  }, [input, debounce, onSearch])

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="w-full md:w-1/2 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  )
}
