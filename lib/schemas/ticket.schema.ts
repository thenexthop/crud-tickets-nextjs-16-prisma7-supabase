import { z } from "zod";

export const ticketSchema = z.object({
    id: z.uuid(),
    title: z.string().min(1, "El título del ticket no debe estar vacío."),
    description: z.string().optional(),
    assignedTo: z.string().min(1, "Debe indicar el usuario responsable de este requerimiento."),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE", "REJECTED"]),
})

// Para los formularios de creación y edición
export const ticketFormSchema = ticketSchema.omit({ id: true })

export type Ticket = z.infer<typeof ticketSchema>;

export type TicketFormInputs = z.infer<typeof ticketFormSchema>
