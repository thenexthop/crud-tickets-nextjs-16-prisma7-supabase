import { Ticket, TicketFormInputs } from "@/lib/schemas/ticket.schema"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getTickets({ page, limit, status }: {
    page: number,
    limit: number,
    status?: string
}): Promise<{ tickets: Ticket[], totalPages: number }> {

    let url = `${BASE_URL}/tickets?page=${page}&limit=${limit}`

    if (status) {
        url += `&status=${status}`
    }

    const tickets = await fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Ocurrió un error al obtener los tickets.")
            }

            return res.json() as Promise<{ tickets: Ticket[], totalPages: number }>

        }).catch((error) => {
            console.error("Error al obtener los tickets:", error)
            return { tickets: [], totalPages: 0 }
        })

    return tickets
}

export async function createTicket(ticket: TicketFormInputs): Promise<{ message: string, ticketId: string } | undefined> {
    try {
        const response = await fetch(`${BASE_URL}/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })

        if (!response.ok) {
            throw new Error("Ocurrió un error al intentar crear el ticket.")
        }
        const ticketCreated = await response.json() as { message: string, ticketId: string }

        //console.log("Nuevo ticket creado: ", ticketCreated)

        return ticketCreated

    } catch (error) {
        console.error("Error al crear el ticket:", error)
        return { message: "Ocurrió un error al intentar crear el ticket.", ticketId: "" }
    }
}

export async function getTicketById(id: string): Promise<{ ticket: Ticket } | undefined> {
    try {
        const response = await fetch(`${BASE_URL}/tickets/${id}`)

        if (!response.ok) {
            if (response.status === 404) {
                response.json().then((data: { error: string }) => {
                    console.error("(getTicketById): ", data.error)
                })
                return undefined
            }

            throw new Error("Ocurrió un error al intentar obtener el ticket.")
        }
        const ticket = await response.json()

        console.log("Ticket obtenido: ", ticket)

        return { ticket }

    } catch (error) {
        const message = error instanceof Error ? error.message : "Ocurrió un error al intentar obtener el ticket."
        console.error(`(getTicketById): ${message}`)
        return undefined
    }
}

export async function updateTicket(id: string, ticket: TicketFormInputs): Promise<{ message: string }> {
    try {

        const response = await fetch(`${BASE_URL}/tickets/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })


        const data = await response.json()
        console.log("(updateTicket) data tiene: ", data)

        if (!response.ok) {
            console.error("(updateTicket): ", response.status, data.error)
            throw new Error(data.error, { cause: response.status })
        }

        console.log("Ticket actualizado: ", data.message)

        return data
    } catch (error) {
        console.error("Error al actualizar el ticket:", error)
        const message = error as string
        return { message }
    }
}

export async function deleteTicket(id: string): Promise<{ message: string }> {
    try {
        const response = await fetch(`${BASE_URL}/tickets/${id}`, {
            method: "DELETE"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error)
        }

        console.log("Ticket eliminado: ", data.message)

        return data

    } catch (error) {
        console.error("Error al eliminar el ticket:", error)
        const message = error as string
        return { message }
    }
}