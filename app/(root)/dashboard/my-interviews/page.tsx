import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInternalUser } from "@/lib/auth/getInternalUser";
import { getInterviews } from "@/lib/actions/interviews/get-interviews.actions";

export const metadata: Metadata = {
  title: "AscendIA | Mis Entrevistas",
  description: "Panel de control de Mis Entrevistas en AscendIA",
};

export default function MyInterviewsPage() {
  return (
    <Wrapper />
  );
}

async function Wrapper() {
  
  const user = await getInternalUser();

  if (!user) {
    return (
      <p className="p-8 text-red-500">
        Debes iniciar sesión para ver tus entrevistas.
      </p>
    );
  }

  const {internalId} = user
  const result = await getInterviews(internalId);

  if (!result.success) {
    return <p className="p-8">Error: {result.message}</p>;
  }

  const data = result.data.interviews;

  return (
    <section className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mis entrevistas</h1>

      {data.length === 0 && (
        <p className="text-foreground-muted">
          Todavía no creaste ninguna entrevista.
        </p>
      )}

      <div className="space-y-4">
        {data.map((item) => (
          <article
            key={item.id}
            className="border border-base-border bg-background-light p-4 rounded-xl flex justify-between"
          >
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">{item.position}</h2>

              <div className="flex gap-2 items-center text-sm">
                <Badge variant="outline">{item.area}</Badge>
                <Badge variant="secondary">{item.interviewer}</Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                Creada el: {item.createdAt.toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col gap-2 items-end justify-center">
              {item.score === null ? (
                <Link href={`/dashboard/my-interviews/${item.id}/simulate`}>
                  <Button size="sm" className="gradient-hover">
                    Simular
                  </Button>
                </Link>
              ) : (
                <Link href={`/dashboard/my-interviews/${item.id}`}>
                  <Button size="sm" variant="outline">
                    Ver resultado
                  </Button>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
