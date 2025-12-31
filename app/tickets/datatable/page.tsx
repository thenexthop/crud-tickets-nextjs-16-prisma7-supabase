"use client"
import { columns } from "@/features/tickets/datatable/tickets-columns-def"
import { DataTable } from "@/features/tickets/datatable/data-table"

export default function TicketsDataTablePage() {
    const data = [
        { id: "1", name: "Juan Perez", email: "juan@example.com" },
        // ... más datos
    ]

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}