'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) {
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)}>
      {/* Previous button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={cn(
          'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sm font-medium',
          'text-gray-700 hover:bg-gray-100',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only md:not-sr-only md:ml-1">Anterior</span>
      </button>

      {/* Page numbers - hidden on mobile, shown on desktop */}
      <div className="hidden md:flex md:items-center md:gap-1">
        {getPageNumbers().map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium',
                page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Page indicator for mobile */}
      <span className="mx-4 text-sm text-gray-600 md:hidden">
        {currentPage} / {totalPages}
      </span>

      {/* Next button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={cn(
          'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sm font-medium',
          'text-gray-700 hover:bg-gray-100',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        <span className="sr-only md:not-sr-only md:mr-1">Siguiente</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  )
}
