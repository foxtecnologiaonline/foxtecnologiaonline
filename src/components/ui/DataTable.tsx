'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface Column<T> {
  header: string
  render: (row: T) => React.ReactNode
  key: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  pageSize?: number
  emptyMessage?: string
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  pageSize = 10,
  emptyMessage = 'Nenhum registro encontrado.',
}: DataTableProps<T>) {
  const [pagina, setPagina] = useState(1)
  const totalPaginas = Math.max(1, Math.ceil(rows.length / pageSize))
  const paginaAtual = Math.min(pagina, totalPaginas)
  const linhas = rows.slice((paginaAtual - 1) * pageSize, paginaAtual * pageSize)

  if (rows.length === 0) {
    return <p className="text-fox-gray-dark opacity-70 py-8 text-center">{emptyMessage}</p>
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-fox-accent">
        <table className="w-full text-sm">
          <thead className="bg-fox-gray-light">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left font-semibold text-fox-gray-dark px-4 py-3 whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-fox-accent">
            {linhas.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-fox-gray-light/50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-fox-gray-dark align-middle">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-fox-gray-dark opacity-70">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
              className="p-2 rounded-lg border border-fox-accent disabled:opacity-40 hover:bg-fox-gray-light"
              aria-label="Página anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
              className="p-2 rounded-lg border border-fox-accent disabled:opacity-40 hover:bg-fox-gray-light"
              aria-label="Próxima página"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
