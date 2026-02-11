import type { Metadata } from 'next';
import { PageSEO } from '@/components/seo';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Política de Privacidad de MokaDev',
  description:
    'Política de privacidad aplicable a los servicios de MokaDev, incluyendo las aplicaciones Bapjeongne, Fortune Cookie y Lunch Picker.',
  keywords: 'política de privacidad de MokaDev, protección de datos personales, términos',
  openGraph: {
    title: 'Política de Privacidad de MokaDev',
    description:
      'Política de privacidad aplicable a los servicios de MokaDev, incluyendo las aplicaciones Bapjeongne, Fortune Cookie y Lunch Picker.',
    url: `${seoConfig.siteUrl}/privacy/es`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: 'Política de Privacidad de MokaDev',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Política de Privacidad de MokaDev',
    description:
      'Política de privacidad aplicable a los servicios de MokaDev, incluyendo las aplicaciones Bapjeongne, Fortune Cookie y Lunch Picker.',
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/privacy/es`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPageES() {
  return (
    <>
      <PageSEO
        title="Política de Privacidad de MokaDev"
        description="Política de privacidad aplicable a los servicios de MokaDev, incluyendo las aplicaciones Bapjeongne, Fortune Cookie y Lunch Picker."
        keywords="política de privacidad de MokaDev, protección de datos personales, términos"
        canonical="/privacy/es"
      />
      <div className="bg-white">
        <section className="border-b border-black/5 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <p className="text-sm font-semibold text-gray-500">Privacy Policy</p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">Política de Privacidad</h1>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 text-sm text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 1 (Propósito)</h2>
            <p className="mt-4 leading-relaxed">
              MokaDev (en adelante, la &lsquo;Empresa&rsquo;) establece esta Política de Privacidad
              (en adelante, la &lsquo;Política&rsquo;) para proteger la información personal (en
              adelante, &lsquo;Información Personal&rsquo;) de los individuos (en adelante,
              &lsquo;Usuarios&rsquo; o &lsquo;Individuos&rsquo;) que utilizan los servicios
              proporcionados por la Empresa (en adelante, &lsquo;Servicios de la Empresa&rsquo;), en
              cumplimiento de las leyes y regulaciones relevantes como la Ley de Protección de
              Información Personal y la Ley de Promoción de la Utilización de Redes de Información y
              Comunicaciones y Protección de la Información (en adelante, la &lsquo;Ley de Redes de
              Información y Comunicaciones&rsquo;), y para manejar de manera rápida y fluida las
              quejas relacionadas con la protección de información personal de los usuarios del
              servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 2 (Principios del Procesamiento de Información Personal)</h2>
            <p className="mt-4 leading-relaxed">
              De acuerdo con las leyes y regulaciones relevantes sobre información personal y esta
              Política, la Empresa puede recopilar información personal de los usuarios, y la
              información personal recopilada puede ser proporcionada a terceros solo con el
              consentimiento del individuo. Sin embargo, la Empresa puede proporcionar información
              personal de usuarios recopilada a terceros sin el consentimiento previo del individuo si
              es legalmente requerido por leyes y regulaciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 3 (Divulgación de esta Política)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                La Empresa divulga esta Política en la primera pantalla de la página de inicio de la
                Empresa o en una pantalla conectada a la primera pantalla para que los usuarios puedan
                verificar fácilmente esta Política en cualquier momento.
              </li>
              <li>
                Cuando la Empresa divulga esta Política de acuerdo con el Párrafo 1, utiliza tamaño
                de fuente, color, etc. para ayudar a los usuarios a verificar fácilmente esta Política.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 4 (Cambios a esta Política)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Esta Política puede ser enmendada de acuerdo con cambios en leyes, directrices,
                avisos o políticas o contenidos del gobierno o de los Servicios de la Empresa
                relacionados con información personal.
              </li>
              <li>
                Cuando la Empresa enmienda esta Política de acuerdo con el Párrafo 1, notifica a los
                usuarios mediante uno o más de los siguientes métodos:
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>
                    Notificación a través de la sección de avisos en la primera pantalla de la página
                    de inicio de Internet operada por la Empresa o una ventana separada
                  </li>
                  <li>
                    Notificación a los usuarios mediante aviso escrito, transmisión por fax, correo
                    electrónico o métodos similares
                  </li>
                </ol>
              </li>
              <li>
                La Empresa proporciona aviso bajo el Párrafo 2 al menos 7 días antes de la fecha
                efectiva de la enmienda a esta Política. Sin embargo, si hay cambios importantes en los
                derechos del usuario, se proporciona aviso con al menos 30 días de anticipación.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 5 (Métodos de Recopilación de Información Personal)</h2>
            <p className="mt-4 leading-relaxed">
              La Empresa recopila información personal de los usuarios mediante los siguientes métodos:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Método en el que los usuarios ingresan su información personal en la página de inicio
                de la Empresa
              </li>
              <li>
                Método en el que los usuarios ingresan su información personal a través de servicios
                distintos a la página de inicio proporcionados por la Empresa, como aplicaciones
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 6 (Uso de Información Personal)</h2>
            <p className="mt-4 leading-relaxed">
              La Empresa utiliza información personal en los siguientes casos:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>Cuando es necesario para las operaciones de la Empresa, como la entrega de avisos</li>
              <li>
                Cuando es necesario para la mejora del servicio para los usuarios, como responder a
                consultas y manejar quejas
              </li>
              <li>Cuando es necesario para proporcionar los servicios de la Empresa</li>
              <li>
                Cuando es necesario prevenir y sancionar actos que interfieren con el funcionamiento
                fluido de los servicios, incluyendo medidas para restringir el uso de miembros que
                violan las leyes y los términos de la Empresa, y uso fraudulento
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 7 (Período de Retención y Uso de Información Personal)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                La Empresa retiene y utiliza información personal de los usuarios durante el período
                necesario para lograr el propósito de recopilar y utilizar información personal.
              </li>
              <li>
                No obstante lo anterior, la Empresa retiene registros de uso fraudulento de servicios
                por hasta 1 año desde el momento de la retirada de membresía de acuerdo con las
                políticas internas para prevenir el registro y uso fraudulento.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Artículo 8 (Período de Retención y Uso de Información Personal bajo las Leyes)
            </h2>
            <p className="mt-4 leading-relaxed">
              La Empresa retiene y utiliza información personal de acuerdo con las leyes relevantes
              de la siguiente manera:
            </p>
            <ol className="mt-4 list-decimal space-y-4 pl-5 leading-relaxed">
              <li>
                Información y período de retención bajo la Ley de Protección al Consumidor en
                Comercio Electrónico
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>Registros sobre contratos o retiro de ofertas: 5 años</li>
                  <li>Registros sobre pago y suministro de bienes: 5 años</li>
                  <li>Registros sobre quejas del consumidor o resolución de disputas: 3 años</li>
                  <li>Registros sobre etiquetado y publicidad: 6 meses</li>
                </ol>
              </li>
              <li>
                Información y período de retención bajo la Ley de Protección de Secretos de
                Comunicación
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>Registros de log del sitio web: 3 meses</li>
                </ol>
              </li>
              <li>
                Información y período de retención bajo la Ley de Transacciones Financieras
                Electrónicas
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>Registros sobre transacciones financieras electrónicas: 5 años</li>
                </ol>
              </li>
              <li>
                Ley de Protección y Uso de Información de Ubicación
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>Registros sobre información de ubicación personal: 6 meses</li>
                </ol>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 9 (Principio de Destrucción de Información Personal)</h2>
            <p className="mt-4 leading-relaxed">
              En principio, la Empresa destruye información personal sin demora cuando ya no es
              necesaria, como cuando se logra el propósito del procesamiento de información personal
              o ha transcurrido el período de retención y uso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 10 (Procedimiento para la Destrucción de Información Personal)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                La información ingresada por los usuarios para el registro de membresía, etc., se
                transfiere a una base de datos separada (o una caja de documentos separada en caso de
                papel) después de que se logra el propósito del procesamiento de información personal,
                se almacena por un cierto período de acuerdo con las políticas internas y otras leyes
                relevantes sobre protección de información (consulte el período de retención y uso), y
                luego se destruye.
              </li>
              <li>
                La Empresa destruye información personal para la cual ha ocurrido la razón de
                destrucción después de obtener la aprobación de la persona a cargo de la protección de
                información personal.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 11 (Método de Destrucción de Información Personal)</h2>
            <p className="mt-4 leading-relaxed">
              La Empresa elimina información personal almacenada en formato de archivo electrónico
              utilizando métodos técnicos que no pueden reproducir registros, y destruye información
              personal impresa en papel mediante trituración o incineración.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Artículo 12 (Instalación, Operación y Rechazo de Recopilación Automática de Información Personal)
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                La Empresa utiliza cookies, que son dispositivos de recopilación automática de
                información personal (en adelante, &lsquo;Cookies&rsquo;) que almacenan y recuperan
                información de uso de vez en cuando para proporcionar a los usuarios servicios
                individualizados. Las cookies son pequeñas cantidades de información enviadas por el
                servidor (http) utilizado para operar el sitio web al navegador web del usuario
                (incluyendo PC y móvil), y pueden almacenarse en el espacio de almacenamiento del
                usuario.
              </li>
              <li>
                Los usuarios tienen el derecho de elegir si instalar cookies. Por lo tanto, los
                usuarios pueden permitir todas las cookies, verificar cada vez que se almacenan
                cookies, o rechazar almacenar todas las cookies configurando opciones en su navegador
                web.
              </li>
              <li>
                Sin embargo, si rechaza almacenar cookies, puede tener dificultades para usar algunos
                de los servicios de la Empresa que requieren inicio de sesión.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Artículo 13 (Método de Especificación del Permiso de Instalación de Cookies)</h2>
            <p className="mt-4 leading-relaxed">
              Puede configurar permisos de cookies, bloqueo de cookies, etc. a través de la
              configuración de opciones del navegador web.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Edge: Menú de configuración en la esquina superior derecha del navegador web &gt;
                Cookies y permisos del sitio &gt; Administrar y eliminar cookies y datos del sitio
              </li>
              <li>
                Chrome: Menú de configuración en la esquina superior derecha del navegador web &gt;
                Privacidad y seguridad &gt; Cookies y otros datos del sitio
              </li>
              <li>
                Whale: Menú de configuración en la esquina superior derecha del navegador web &gt;
                Privacidad &gt; Cookies y otros datos del sitio
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Artículo 14 (Designación del Oficial de Protección de Información Personal de la Empresa)
            </h2>
            <p className="mt-4 leading-relaxed">
              La Empresa designa el departamento relevante y el oficial de protección de información
              personal de la siguiente manera para proteger la información personal de los usuarios y
              manejar quejas relacionadas con información personal.
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-gray-900">A. Oficial de Protección de Información Personal</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Nombre: Mincheol Jeon</li>
                <li>Cargo: CEO</li>
                <li>Correo electrónico: mocadev.tony@gmail.com</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Disposiciones Complementarias</h2>
            <p className="mt-4 leading-relaxed">Artículo 1 Esta Política entra en vigor a partir del 10 de noviembre de 2025.</p>
          </section>
        </div>
      </div>
    </>
  );
}
