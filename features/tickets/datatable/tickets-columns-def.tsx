"use strict"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react" // Iconos sugeridos
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog"

// Asumiendo que este es tu tipo de dato
export type User = {
    id: string
    name: string
    email: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log("Editar usuario:", user.id)}
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                    </Button>
                    {/* Ejemplo simple de cómo se vería la estructura de confirmación */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Trash2 className="h-4 w-4 mr-2" />
                            <Button variant="destructive" size="sm">Eliminar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            {/* Contenido del modal de confirmación */}
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    },
]