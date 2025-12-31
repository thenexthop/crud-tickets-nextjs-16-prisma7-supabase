"use client"

import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"

interface BotonEliminarProps {
    className?: string
    ticketId: string
    handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function BotonEliminar({ ticketId, handleDelete, className }: BotonEliminarProps) {
    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()

                console.log("Borrando ticket: " + ticketId)
                setOpen(true)
            }} asChild>
                <Button variant="ghost"
                    className={`${className} hover:cursor-pointer`}
                    size="sm"
                >
                    <Trash2Icon className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Esta seguro que desea eliminar el ticket?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede revertir. El ticket con ID: {ticketId} será eliminado permanentemente del sistema.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            setOpen(false)
                        }}
                    >Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-600"
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()

                            handleDelete(event)
                            setOpen(false)
                        }}
                    >
                        Si, eliminar definitivamente
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}