import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getTickets } from "./tickets/_actions/tickets.actions";

export default async function Home() {
  const { tickets } = await getTickets({ page: 1, limit: 3 })

  return (
    <>
      <h1 className="text-3xl font-bold">Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center gap-2">
        <Button variant="default" asChild>
          <Link href="/tickets">Ver tickets</Link>
        </Button>
        <Button variant="outline">botón outline</Button>
        <Button variant="secondary">botón secondary</Button>
        <Button variant="ghost">botón ghost</Button>
        <Button variant="muted">botón muted</Button>
        <Button variant="custom">botón custom</Button>
      </div>
    </>
  );
}
