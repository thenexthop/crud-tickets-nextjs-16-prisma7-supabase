'use client'

import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { FieldSet, Field, FieldGroup, FieldLabel, FieldDescription, FieldError, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { createTicket, updateTicket } from "@/app/tickets/_actions/tickets.actions"
import { Ticket, TicketFormInputs } from "@/lib/schemas/ticket.schema"
import Link from "next/link"


export default function TicketForm({ ticket }: { ticket?: Ticket }) {
    const router = useRouter()

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<Ticket>({
        defaultValues: {
            title: ticket?.title,
            assignedTo: ticket?.assignedTo,
            status: ticket?.status,
            description: ticket?.description
        }
    })

    const handleSelectChange = (value: string) => {
        setValue("status", value as Ticket["status"])
    }

    const onSubmit: SubmitHandler<TicketFormInputs> = async (data) => {

        if (ticket?.id) {
            // Actualizar
            const ticketUpdated = await updateTicket(ticket.id, data)

            if (!ticketUpdated) {
                toast.error("Error al actualizar el ticket", {
                    description: "Ocurrió un error al intentar actualizar el ticket.",
                    position: "top-center",
                })

                console.error("Error al actualizar el ticket")

                return
            }

            toast.success("Ticket actualizado exitosamente", {
                description: "El ticket se ha actualizado correctamente.",
                position: "top-center",
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            })

        } else {
            const ticketCreated = await createTicket(data)
            if (!ticketCreated) {
                toast.error("Error al crear el ticket", {
                    description: "Ocurrió un error al intentar crear el ticket.",
                    position: "top-center",
                })

                console.error("Error al crear el ticket")

                return
            }

            toast.success("Ticket creado exitosamente", {
                description: "El ticket se ha creado correctamente.",
                position: "top-center",
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            })

        }

        router.push(`/tickets`)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldSet>
                    <FieldDescription>{ticket ? "Editar " : "Crear "} un  requerimiento y asignarlo a un miembro del equipo.</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="title">Título</FieldLabel>
                            <Input {...register("title", { required: "Debe ingresar un título." })} id="title" autoComplete="off" placeholder="Nombre descriptivo para el ticket del requerimiento" />
                            <FieldError>{errors.title?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="assignedTo">Asignado a</FieldLabel>
                            <Input {...register("assignedTo", { required: "Debe indicar el nombre del miembro del equipo asignado." })} id="assignedTo" autoComplete="off" placeholder="Nombre del miembro del equipo encargado del requerimiento." />
                            <FieldError>{errors.assignedTo?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="status">Status</FieldLabel>
                            <Select defaultValue={ticket?.status} onValueChange={handleSelectChange} name="status" autoComplete="off">
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Status del ticket" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TODO">To do</SelectItem>
                                    <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                    <SelectItem value="DONE">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Descripción</FieldLabel>
                            <Textarea {...register("description", { required: "Debe ingresar al menos 10 caracteres para la descripción." })} id="description" autoComplete="off" placeholder="Descripción del requerimiento." />
                            <FieldError>{errors.description?.message}</FieldError>
                        </Field>
                    </FieldGroup>
                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/tickets">
                                Cancelar
                            </Link>
                        </Button>
                        <Button type="submit">
                            {ticket ? "Actualizar" : "Crear"} ticket
                        </Button>
                    </div>
                </FieldSet>
            </form>
        </>
    )
}