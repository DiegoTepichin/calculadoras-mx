import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: "Aviso de privacidad de Calculadoras MX: qué datos se recaban, cookies publicitarias y tus derechos ARCO.",
  alternates: { canonical: "/aviso-de-privacidad" },
};

export default function AvisoPrivacidadPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Aviso de Privacidad</h1>
      <p className="text-sm text-slate-500 mb-6">Última actualización: septiembre de 2026.</p>

      <p>
        Calculadoras MX (el sitio) es un proyecto informativo de calculadoras fiscales y
        laborales para México, Colombia y otros países de Latinoamérica. Este aviso describe
        cómo se maneja la información de quienes visitan el sitio, sin importar desde qué país
        lo hagan.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">¿Qué datos recabamos?</h2>
      <p>
        Las calculadoras (ISR, RESICO, retención en la fuente, aguinaldo/prima, finiquito, UMA/UVT,
        etc.) procesan los números que ingresas únicamente en tu navegador (localmente, en tu
        dispositivo). Esos datos no se envían a ningún servidor ni se almacenan por nosotros.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Cookies y publicidad</h2>
      <p>
        Este sitio puede mostrar anuncios de terceros (por ejemplo, Google AdSense). Google y
        sus socios publicitarios pueden usar cookies para mostrar anuncios basados en tus
        visitas a este y otros sitios. Puedes inhabilitar la publicidad personalizada
        visitando{" "}
        <a
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 underline"
        >
          Configuración de anuncios de Google
        </a>
        .
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Analítica</h2>
      <p>
        Podemos usar herramientas de analítica web para entender el tráfico agregado del sitio
        (por ejemplo, cuántas personas visitan cada calculadora), sin identificar a personas
        específicas.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Tus derechos sobre tus datos</h2>
      <p>
        Como no recabamos datos personales identificables directamente en el sitio (ni en México,
        bajo la LFPDPPP, ni en Colombia, bajo la Ley 1581 de 2012, ni bajo leyes similares de otros
        países), no mantenemos una base de datos de usuarios sobre la cual ejercer derechos de
        acceso, rectificación o cancelación. Si tienes dudas sobre este aviso, puedes contactarnos
        a través de los medios indicados en el sitio.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Cambios a este aviso</h2>
      <p>
        Este aviso puede actualizarse periódicamente. La fecha de última actualización aparece
        al inicio de esta página.
      </p>
    </article>
  );
}
