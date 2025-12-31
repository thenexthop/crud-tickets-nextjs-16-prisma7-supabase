import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import TicketCard from "@/features/tickets/components/ticket-card"
import { getTickets } from "@/app/tickets/_actions/tickets.actions";
import TicketsPagination from "@/components/tickets-pagination";
import TicketsFilters from "@/features/tickets/components/tickets-filters";

interface TicketsPageProps {
    searchParams?: Promise<{
        page: string,
        limit: string,
        status: string
    }>
}

const DEFAULT_LIMIT = 4

export default async function TicketsPage({
    searchParams
}: TicketsPageProps) {

    const page = Number((await searchParams)?.page || 1)
    const limit = Number((await searchParams)?.limit || DEFAULT_LIMIT)
    const status = (await searchParams)?.status

    const { tickets, totalPages } = await getTickets({ page, limit, status })

    return (
        <div className="max-w-5xl mx-auto p-8">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Tickets</h1>
                <Button variant="default" asChild>
                    <Link href="/tickets/new">
                        <CirclePlusIcon className="w-4 h-4" />
                        Nuevo ticket
                    </Link>
                </Button>
            </header>

            <TicketsFilters status={status} />

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tickets.length > 0 ? tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                )) : (
                    <p>No hay tickets</p>
                )}
            </div>
            <div>
                <TicketsPagination
                    currentPage={page}
                    totalPages={totalPages}
                    limit={limit}
                />
            </div>
        </div>
    )
}