export default function PoliticaCookies() {
  return (
    <main className="w-full max-w-3xl mx-auto flex-1 px-6 pb-16 pt-28 text-sm leading-relaxed sm:pt-32">
      <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. ¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web. Permiten al sitio recordar información sobre su visita, como el idioma preferido y otras opciones de configuración, lo que facilita la navegación.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Qué utiliza este sitio web</h2>
        <p>Este sitio web <strong>solo utiliza cookies y almacenamiento local técnicos</strong>, imprescindibles para su funcionamiento (por ejemplo, recordar el carrito de pedido). Al ser estrictamente necesarios, no requieren consentimiento.</p>
        <p className="mt-3">No utilizamos cookies publicitarias, de seguimiento ni de terceros.</p>

        <h3 className="font-semibold mt-4 mb-2">Medición de visitas sin cookies</h3>
        <p>Para conocer el número de visitas y el rendimiento de la web utilizamos Vercel Web Analytics y Vercel Speed Insights. Estas herramientas no instalan cookies ni almacenan nada en su dispositivo, y solo generan estadísticas agregadas y anónimas (páginas visitadas, país, tipo de dispositivo) que no permiten identificar a ninguna persona.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Tabla de cookies y almacenamiento</h2>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-white/10">
                <th className="border border-gray-300 px-3 py-2 text-left">Nombre</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Tipo</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Finalidad</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2">auth-token</td>
                <td className="border border-gray-300 px-3 py-2">Cookie técnica</td>
                <td className="border border-gray-300 px-3 py-2">Mantener la sesión del panel de administración (solo personal de CLAMP; los visitantes no la reciben)</td>
                <td className="border border-gray-300 px-3 py-2">7 días</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">clamp-cart</td>
                <td className="border border-gray-300 px-3 py-2">Almacenamiento local técnico</td>
                <td className="border border-gray-300 px-3 py-2">Guardar los productos añadidos al carrito de pedido</td>
                <td className="border border-gray-300 px-3 py-2">Hasta que se vacía el carrito o se borran los datos del navegador</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">clamp-lang-suggestion-dismissed</td>
                <td className="border border-gray-300 px-3 py-2">Almacenamiento local técnico</td>
                <td className="border border-gray-300 px-3 py-2">Recordar que se ha cerrado el aviso de versión en otro idioma</td>
                <td className="border border-gray-300 px-3 py-2">Hasta que se borran los datos del navegador</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Cómo gestionar las cookies</h2>
        <p>El usuario puede configurar su navegador para aceptar, rechazar o eliminar las cookies. A continuación se indican los enlaces a las instrucciones de los navegadores más comunes:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline">Microsoft Edge</a></li>
        </ul>
        <p className="mt-3">Tenga en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento del sitio web.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Actualizaciones</h2>
        <p>CLAMP RENTAL SLU puede modificar esta Política de Cookies en función de nuevas exigencias legislativas o cambios en los servicios ofrecidos. Se recomienda revisar esta página periódicamente.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Contacto</h2>
        <p>Para cualquier consulta sobre el uso de cookies, puede contactar con nosotros en <strong>raul@clamp-lightrental.com</strong>.</p>
      </section>

      <p className="text-gray-500 mt-10">Última actualización: octubre de 2026</p>
    </main>
  );
}
