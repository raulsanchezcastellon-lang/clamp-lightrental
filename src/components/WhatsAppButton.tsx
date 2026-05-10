const WHATSAPP_NUMBER = "34681878782";
const WHATSAPP_MESSAGE = "Hola, me gustaria recibir informacion de CLAMP Light Rental.";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Open WhatsApp conversation"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:scale-105 hover:bg-[#1fb85a] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8"
        fill="currentColor"
      >
        <path d="M16.03 4C9.4 4 4 9.32 4 15.87c0 2.1.57 4.16 1.64 5.96L4 28l6.33-1.61a12.2 12.2 0 0 0 5.7 1.43C22.66 27.82 28 22.5 28 15.95 28 9.39 22.66 4 16.03 4Zm0 21.8c-1.86 0-3.68-.5-5.28-1.45l-.38-.23-3.75.95.98-3.6-.25-.39a9.77 9.77 0 0 1-1.5-5.21c0-5.43 4.57-9.85 10.18-9.85 5.6 0 10.15 4.48 10.15 9.93 0 5.43-4.55 9.85-10.15 9.85Zm5.58-7.36c-.3-.15-1.8-.88-2.08-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.17.2-.35.23-.65.08-.3-.15-1.27-.46-2.42-1.48-.9-.79-1.5-1.76-1.68-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.62-.93-2.21-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48 0 1.45 1.08 2.86 1.23 3.06.15.2 2.13 3.2 5.15 4.49.72.3 1.28.48 1.72.61.72.23 1.38.2 1.9.12.58-.08 1.8-.72 2.05-1.41.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  );
}
