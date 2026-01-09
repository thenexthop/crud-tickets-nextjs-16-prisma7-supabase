import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

import { ticketSchema } from "@/lib/schemas/ticket.schema"


interface Params {
    params: Promise<{ id: string }>
}

export const GET = async (_: unknown, { params }: Params) => {
    try {
        const { id } = await params
        const ticket = await prisma.ticket.findFirst({
            where: {
                id
            }
        })

        if (!ticket) {
            return NextResponse.json({ error: `No existe ningún ticket con identificador (${id}) registrado en el sistema.` }, { status: 404 })
        }

        return NextResponse.json(ticket)

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Ocurrió un error al intentar obtener la información del ticket." }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params

        const body = await request.json()

        body.id = id

        const { title, description, assignedTo, status } = ticketSchema.parse(body)

        const updatedTicket = await prisma.ticket.update({
            data: {
                title,
                description,
                assignedTo,
                status,
                updatedAt: new Date(),
            },
            where: {
                id
            },
        })

        if (!updatedTicket) {
            throw new Error("Ticket no encontrado")
        }

        return NextResponse.json(updatedTicket)

    } catch (error) {
        console.error("(PUT): ", error)
        return NextResponse.json({ error: "Ocurrió un error al intentar actualizar la información del ticket." }, { status: 500 })
    }
}

export const DELETE = async (_: unknown, { params }: Params) => {
    try {
        const { id } = await params

        // Primero verificamos si el ticket existe
        const ticket = await prisma.ticket.findUnique({
            where: {
                id
            }
        })

        if (!ticket) {
            return NextResponse.json({ error: `No existe ningún ticket con identificador (${id}) registrado en el sistema.` }, { status: 404 })
        }

        // Si el ticket existe, procedemos a eliminarlo 
        const deletedTicket = await prisma.ticket.delete({
            where: {
                id
            }
        })

        // if (!deletedTicket) {
        //     return NextResponse.json({ error: `No existe ningún ticket con identificador (${id}) registrado en el sistema.` }, { status: 404 })
        // }

        return NextResponse.json({ message: `Ticket con identificador (${id}) eliminado correctamente.` }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Ocurrió un error al intentar eliminar el ticket." }, { status: 500 })
    }
}