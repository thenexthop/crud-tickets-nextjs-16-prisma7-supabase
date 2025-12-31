'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

// interface TicketsFiltersProps {
//     searchParams?: Promise<{ page: string, limit: string, status: string }>
// }

export default function TicketsFilters({ status }: { status?: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handleStatusChange = async (status: string = "ALL") => {
        const newSearchParams = new URLSearchParams(searchParams)

        console.log("Status seleccionado:", status)
        if (status === "ALL") {
            newSearchParams.delete("status")
        } else {
            newSearchParams.set("status", status.toString())
        }

        newSearchParams.set("page", "1")

        router.replace(`${pathname}?${newSearchParams.toString()}`)
    }

    return (
        <>
            <Tabs defaultValue={status || "ALL"} onValueChange={handleStatusChange} className="w-full">
                <TabsList>
                    <TabsTrigger value="ALL">All</TabsTrigger>
                    <TabsTrigger value="TODO">To do</TabsTrigger>
                    <TabsTrigger value="IN_PROGRESS">In progress</TabsTrigger>
                    <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
                    <TabsTrigger value="DONE">Done</TabsTrigger>
                </TabsList>
            </Tabs>
        </>
    )
}