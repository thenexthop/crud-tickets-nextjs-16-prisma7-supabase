import Link from "next/link"
import { ChevronLeftIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TicketForm from "@/features/tickets/components/ticket-form"
import { Ticket } from "@/lib/schemas/ticket.schema"
import { getTicketById } from "../_actions/tickets.actions"

interface FormTicketProps {
    params?: Promise<{ id: string }>
}

export default async function NewTicketPage({ params }: FormTicketProps) {
    const id = (await params)?.id

    let data: { ticket: Ticket } | undefined = undefined

    if (id) {
        data = await getTicketById(id)
        console.log("ticket que llegó", data)
    }

    return (
        <>
            <section className="max-w-md mx-auto p-8 space-y-6">
                <div className="flex items-center gap-2">
                    <Link href="/tickets" className="flex items-center gap-2">
                        <ChevronLeftIcon className="w-4 h-4" />
                        <span className="text-md text-gray-800 hover:underline hover:text-gray-900">Regresar</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Card className="w-full max-w-md p-4">
                        <CardHeader className="flex items-center justify-center text-center p-4">
                            <CardTitle className="text-2xl">
                                {id ? "Editar ticket" : "Crear un nuevo ticket"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TicketForm ticket={data?.ticket} />
                        </CardContent>
                    </Card>
                </div>
            </section>

        </>
    )
}