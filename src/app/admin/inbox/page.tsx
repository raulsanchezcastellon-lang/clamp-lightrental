import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getAdminFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

const LIMIT = 200;

type OrderItem = {
  id?: string;
  name?: string;
  brand?: string;
  category?: string;
  price?: number;
  quantity?: number;
  listingType?: string;
};

const dateTime = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Madrid",
});

function formatIsoDate(value?: string | null) {
  if (!value) return "—";
  const [y, m, d] = value.split("-");
  return y && m && d ? `${d}/${m}/${y}` : value;
}

function waLink(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
  const withPrefix = digits.length === 9 ? `34${digits}` : digits;
  return `https://wa.me/${withPrefix}`;
}

function EmailBadge({ sent }: { sent: boolean | null | undefined }) {
  // Solo avisamos cuando consta que el email falló. Los mensajes antiguos (sin dato) no llevan aviso.
  if (sent !== false) return null;
  return (
    <span
      className="rounded-full border border-red-400/40 bg-red-500/15 px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em] text-red-200"
      title="El email de aviso no llegó a enviarse: este registro solo está aquí."
    >
      Email no enviado
    </span>
  );
}

function ContactLinks({ email, phone }: { email: string; phone?: string | null }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <a href={`mailto:${email}`} className="text-[#FFED00] underline-offset-4 hover:underline">
        {email}
      </a>
      {phone && (
        <a
          href={waLink(phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 underline-offset-4 hover:text-white hover:underline"
        >
          {phone}
        </a>
      )}
    </div>
  );
}

export default async function AdminInbox({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!(await getAdminFromToken())) {
    redirect("/admin");
  }

  const tab = (await searchParams).tab === "mensajes" ? "mensajes" : "pedidos";

  const [orders, messages, orderCount, messageCount] = await Promise.all([
    tab === "pedidos"
      ? prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: LIMIT })
      : Promise.resolve([]),
    tab === "mensajes"
      ? prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: LIMIT })
      : Promise.resolve([]),
    prisma.order.count(),
    prisma.contactMessage.count(),
  ]);

  const tabClass = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.1em] transition ${
      active
        ? "bg-[#FFED00] text-black"
        : "border border-white/15 text-white hover:border-white hover:bg-white hover:text-black"
    }`;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-5">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#FFED00]">
              CLAMP
            </p>
            <h1 className="mt-1 text-2xl font-black uppercase tracking-[0.02em]">
              Pedidos y mensajes
            </h1>
            <p className="mt-1 text-xs font-medium text-white/45">
              Todo lo que llega desde la web, aunque el email de aviso haya fallado.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-[#FFED00] hover:bg-[#FFED00] hover:text-black"
          >
            ← Productos
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-5 sm:px-5">
        <nav className="mb-6 flex flex-wrap gap-2" aria-label="Secciones">
          <Link href="/admin/inbox" className={tabClass(tab === "pedidos")}>
            Pedidos <span className="opacity-60">{orderCount}</span>
          </Link>
          <Link href="/admin/inbox?tab=mensajes" className={tabClass(tab === "mensajes")}>
            Mensajes <span className="opacity-60">{messageCount}</span>
          </Link>
        </nav>

        {tab === "pedidos" &&
          (orders.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-[#080808] p-8 text-center text-white/50">
              Todavía no ha llegado ningún pedido.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const items = (Array.isArray(order.items) ? order.items : []) as OrderItem[];
                return (
                  <article
                    key={order.id}
                    className="rounded-xl border border-white/10 bg-[#080808] p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white/40">
                          {dateTime.format(order.createdAt)}
                        </p>
                        <h2 className="mt-1 text-lg font-black">{order.customerName}</h2>
                        <ContactLinks email={order.customerEmail} phone={order.customerPhone} />
                      </div>
                      <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:flex-col sm:items-end">
                        <EmailBadge sent={order.emailSent} />
                        <p className="text-xl font-black">
                          {order.estimatedTotal}€{" "}
                          <span className="text-[0.62rem] font-black uppercase tracking-[0.1em] text-white/35">
                            ex. IVA
                          </span>
                        </p>
                      </div>
                    </div>

                    <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-white/40">
                          Recogida
                        </dt>
                        <dd>{formatIsoDate(order.pickupDate)}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-white/40">
                          Devolución
                        </dt>
                        <dd>{formatIsoDate(order.returnDate)}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-white/40">
                          Delivery
                        </dt>
                        <dd>{order.delivery ? "Sí" : "No"}</dd>
                      </div>
                    </dl>

                    <ul className="mt-4 divide-y divide-white/10 rounded-lg border border-white/10">
                      {items.map((item, index) => (
                        <li
                          key={`${item.id ?? index}`}
                          className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                        >
                          <span className="min-w-0">
                            <span className="font-black">{item.quantity ?? 1}×</span>{" "}
                            {[item.brand, item.name].filter(Boolean).join(" ")}
                            {item.listingType === "sale" && (
                              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.1em] text-white/60">
                                Venta
                              </span>
                            )}
                          </span>
                          <span className="whitespace-nowrap text-white/60">
                            {item.price ?? "—"}€{item.listingType === "sale" ? "" : " /día"}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {order.comments && (
                      <p className="mt-4 whitespace-pre-wrap rounded-lg bg-white/5 p-3 text-sm text-white/80">
                        {order.comments}
                      </p>
                    )}

                    <a
                      href={`mailto:${order.customerEmail}?subject=${encodeURIComponent("Tu pedido en CLAMP Lighting Rental")}`}
                      className="mt-4 inline-flex rounded-full bg-[#FFED00] px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-black transition hover:bg-white"
                    >
                      Responder
                    </a>
                  </article>
                );
              })}
            </div>
          ))}

        {tab === "mensajes" &&
          (messages.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-[#080808] p-8 text-center text-white/50">
              Todavía no ha llegado ningún mensaje.
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <article
                  key={message.id}
                  className="rounded-xl border border-white/10 bg-[#080808] p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white/40">
                        {dateTime.format(message.createdAt)}
                      </p>
                      <h2 className="mt-1 text-lg font-black">{message.name}</h2>
                      <ContactLinks email={message.email} phone={message.phone} />
                    </div>
                    <EmailBadge sent={message.emailSent} />
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                    {message.message}
                  </p>
                  <a
                    href={`mailto:${message.email}?subject=${encodeURIComponent("Re: tu consulta a CLAMP Lighting Rental")}`}
                    className="mt-4 inline-flex rounded-full bg-[#FFED00] px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-black transition hover:bg-white"
                  >
                    Responder
                  </a>
                </article>
              ))}
            </div>
          ))}

        {(tab === "pedidos" ? orderCount : messageCount) > LIMIT && (
          <p className="mt-6 text-center text-xs text-white/40">
            Se muestran los {LIMIT} más recientes.
          </p>
        )}
      </main>
    </div>
  );
}
