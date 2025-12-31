'use client'

import Link from "next/link";

import { Ticket } from "@/lib/schemas/ticket.schema";
import { deleteTicket } from "@/app/tickets/_actions/tickets.actions"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { BotonEliminar } from "@/components/boton-eliminar";
import { revalidate } from "@/lib/server.actions";

const getStatusVariant = (status: Ticket["status"]) => {
    switch (status) {
        case "TODO":
            return "default";
        case "IN_PROGRESS":
            return "outline";
        case "REJECTED":
            return "destructive";
        case "DONE":
            return "success";
        default:
            return "secondary";
    }
}

const getStatusName = (status: Ticket["status"]) => {
    const statusName = {
        TODO: "To do",
        IN_PROGRESS: "In progress",
        REJECTED: "Rejected",
        DONE: "Done"
    }

    return statusName[status] ?? "Unknown"
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        event.preventDefault()

        console.log("Borrando ticket: " + ticket.id)

        const { message } = await deleteTicket(ticket.id)
        if (message) {
            toast.success("Ticket eliminado exitosamente", {
                description: "El ticket se ha eliminado correctamente.",
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            })
            await revalidate("/tickets")
        }
    }

    return (
        <>
            <Link href={`/tickets/edit/${ticket.id}`}>
                <Card className="relative max-w-md w-full p-4">
                    <CardHeader className="flex items-center justify-between p-2">
                        <div>
                            <CardTitle className="text-lg font-semibold mb-1">{ticket.title}</CardTitle>
                            <CardDescription>{ticket.description || "N/A"}</CardDescription>
                        </div>

                        <CardAction>
                            <BotonEliminar
                                ticketId={ticket.id}
                                handleDelete={(event) => {
                                    event.stopPropagation()
                                    event.preventDefault()
                                    handleDelete(event)
                                }}
                            />
                        </CardAction>

                    </CardHeader>
                    <CardContent>
                        <Badge variant={getStatusVariant(ticket.status)}>{getStatusName(ticket.status)}</Badge>
                    </CardContent>
                    <CardFooter>
                        <p className="font-medium text-neutral-700">Asignado a: {ticket.assignedTo}</p>
                    </CardFooter>
                </Card>
            </Link>
        </>
    )
}