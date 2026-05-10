export default function PoliticaCookies() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. ¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web. Permiten al sitio recordar información sobre su visita, como el idioma preferido y otras opciones de configuración, lo que facilita la navegación.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Tipos de cookies que utilizamos</h2>

        <h3 className="font-semibold mt-4 mb-2">Cookies técnicas (necesarias)</h3>
        <p>Son imprescindibles para el funcionamiento del sitio web. No requieren consentimiento del usuario. Permiten la navegación y el uso de las funcionalidades básicas del sitio.</p>

        <h3 className="font-semibold mt-4 mb-2">Cookies de preferencias</h3>
        <p>Permiten recordar información como el idioma seleccionado o la región desde la que se accede, para ofrecer contenidos personalizados.</p>

        <h3 className="font-semibold mt-4 mb-2">Cookies analíticas</h3>
        <p>Nos ayudan a entender cómo los usuarios interactúan con el sitio web, recopilando información de forma anónima. Utilizamos esta información para mejorar el contenido y la experiencia de usuario.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Tabla de cookies</h2>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left">Nombre</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Tipo</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Finalidad</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2">session</td>
                <td className="border border-gray-300 px-3 py-2">Técnica</td>
                <td className="border border-gray-300 px-3 py-2">Mantener la sesión del usuario</td>
                <td className="border border-gray-300 px-3 py-2">Sesión</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">lang</td>
                <td className="border border-gray-300 px-3 py-2">Preferencias</td>
                <td className="border border-gray-300 px-3 py-2">Recordar idioma seleccionado</td>
                <td className="border border-gray-300 px-3 py-2">1 año</td>
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

      <p className="text-gray-500 mt-10">Última actualización: mayo de 2025</p>
    </main>
  );
}
