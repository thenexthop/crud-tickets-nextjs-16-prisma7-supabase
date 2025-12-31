'use client'

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    limit: number
}

export default function Pagination({
    currentPage,
    totalPages,
    limit
}: PaginationProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("page", currentPage.toString())
        newSearchParams.set("limit", limit.toString())
        router.replace(`${pathname}/?${newSearchParams.toString()}`)
    }, [])

    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("page", page.toString())
        newSearchParams.set("limit", limit.toString())
        router.replace(`${pathname}/?${newSearchParams.toString()}`)
    }

    return (
        <>
            <nav className="mt-6" aria-label="pagination-component" role="pagination">
                <div className="flex flex-1 min-w-80 ml-auto items-center">
                    <button
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-l-md hover:bg-gray-50 hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:select-none"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <ChevronLeftIcon className="w-5 h-5" /> Anteriores
                    </button>
                    <span className="px-4 py-2 text-gray-800/90 font-semibold">
                        {currentPage} de {totalPages}
                    </span>
                    <button
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-r-md hover:bg-gray-50 hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:select-none"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Siguientes
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </nav>
        </>
    )
}
