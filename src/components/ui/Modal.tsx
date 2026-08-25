'use client'

import { X } from 'lucide-react'

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-fox-gray-dark">{title}</h2>
          <button onClick={onClose} aria-label="Fechar" className="text-fox-gray-dark opacity-60 hover:opacity-100">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
