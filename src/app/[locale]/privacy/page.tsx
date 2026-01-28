import { Link } from '@/navigation'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-sky-600 hover:text-sky-700"
        >
          &larr; Volver al inicio
        </Link>
      </div>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Política de Privacidad
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Última actualización: enero 2026
      </p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-800 [&_li]:mb-1 [&_p]:mb-3 [&_p]:text-sm [&_p]:leading-relaxed [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-sm">
        {/* 1. Alcance */}
        <section>
          <h2>1. Alcance de esta Política</h2>
          <p>
            La presente Política de Privacidad tiene por finalidad informar la
            manera en que <strong>Denorly</strong> (en adelante, &quot;la
            Plataforma&quot;) realiza el tratamiento de los datos personales de
            sus usuarios, en cumplimiento de la Ley N° 29733 — Ley de
            Protección de Datos Personales del Perú — y su Reglamento aprobado
            mediante Decreto Supremo N° 016-2024-JUS.
          </p>
          <p>
            Esta política aplica a todos los clientes, usuarios potenciales,
            representantes legales y visitantes que accedan a nuestro sitio web,
            aplicación y/o servicios. Al registrarse o utilizar los servicios de
            Denorly, usted acepta las prácticas descritas en este documento.
          </p>
          <p>
            Denorly se reserva el derecho de actualizar esta política en
            cualquier momento. Las modificaciones serán notificadas a través de
            la plataforma o por correo electrónico.
          </p>
        </section>

        {/* 2. Responsable del tratamiento */}
        <section>
          <h2>2. Responsable del Tratamiento de Datos</h2>
          <p>
            El responsable del tratamiento de sus datos personales es
            <strong> Denorly</strong>, con domicilio en Lima, Perú. Para
            cualquier consulta relacionada con el tratamiento de sus datos
            personales, puede contactarnos a:
          </p>
          <ul>
            <li>
              Correo electrónico:{' '}
              <a
                href="mailto:privacidad@denorly.com"
                className="text-sky-600 hover:text-sky-700"
              >
                privacidad@denorly.com
              </a>
            </li>
          </ul>
        </section>

        {/* 3. Datos que recopilamos */}
        <section>
          <h2>3. Datos Personales que Recopilamos</h2>

          <h3>3.1. Datos proporcionados directamente por el usuario</h3>
          <ul>
            <li>
              Nombres y apellidos completos, documento de identidad y datos de
              contacto (correo electrónico, teléfono).
            </li>
            <li>Nombre de la empresa u organización.</li>
            <li>
              Información de facturación y métodos de pago (procesados por
              pasarelas de pago seguras de terceros).
            </li>
            <li>
              Contenido de los formularios creados en la plataforma y sus
              configuraciones.
            </li>
            <li>
              Comunicaciones con nuestro equipo de soporte.
            </li>
          </ul>

          <h3>3.2. Datos recopilados automáticamente</h3>
          <ul>
            <li>
              Dirección IP, tipo de navegador, sistema operativo y dispositivo
              utilizado.
            </li>
            <li>
              Registros de actividad dentro de la plataforma (accesos,
              formularios creados, envíos recibidos).
            </li>
            <li>
              Datos de navegación y uso del servicio mediante cookies y
              tecnologías similares.
            </li>
          </ul>

          <h3>
            3.3. Datos de terceros recopilados a través de los formularios
          </h3>
          <p>
            Los usuarios de Denorly pueden crear formularios que recopilan datos
            personales de terceros (los &quot;respondentes&quot;). En este caso,
            el usuario de Denorly actúa como responsable del tratamiento de
            dichos datos y es responsable de obtener el consentimiento necesario
            de los respondentes y cumplir con la legislación aplicable. Denorly
            actúa únicamente como encargado del tratamiento de los datos
            recopilados a través de los formularios creados por sus usuarios.
          </p>
        </section>

        {/* 4. Finalidad del tratamiento */}
        <section>
          <h2>4. Finalidad del Tratamiento</h2>

          <h3>4.1. Prestación del servicio</h3>
          <ul>
            <li>Crear y gestionar su cuenta de usuario.</li>
            <li>
              Proveer los servicios contratados: creación de formularios,
              recepción de envíos, gestión de plantillas de correo, webhooks e
              integraciones.
            </li>
            <li>Procesar pagos y gestionar la facturación.</li>
            <li>Brindar soporte técnico y atención al cliente.</li>
            <li>
              Enviar notificaciones relacionadas con el servicio (alertas de
              nuevos envíos, cambios de plan, etc.).
            </li>
          </ul>

          <h3>4.2. Mejora del servicio</h3>
          <ul>
            <li>
              Realizar análisis estadísticos y de uso de la plataforma para
              mejorar la experiencia del usuario.
            </li>
            <li>Desarrollar nuevas funcionalidades y características.</li>
            <li>
              Personalizar la experiencia dentro de la plataforma.
            </li>
          </ul>

          <h3>4.3. Cumplimiento legal</h3>
          <ul>
            <li>Cumplir con obligaciones tributarias y regulatorias.</li>
            <li>
              Atender requerimientos de autoridades competentes.
            </li>
            <li>
              Prevenir actividades fraudulentas o uso indebido del servicio.
            </li>
          </ul>

          <h3>4.4. Comunicaciones comerciales</h3>
          <ul>
            <li>
              Enviar comunicaciones promocionales, novedades y actualizaciones de
              producto, siempre que el usuario haya otorgado su consentimiento.
              El usuario podrá revocar dicho consentimiento en cualquier momento.
            </li>
          </ul>
        </section>

        {/* 5. Compartición de datos */}
        <section>
          <h2>5. Compartición de Datos con Terceros</h2>
          <p>
            Denorly no vende datos personales de sus usuarios a terceros. Solo
            compartimos información en los siguientes supuestos:
          </p>

          <h3>5.1. Proveedores de servicios</h3>
          <p>
            Compartimos datos con proveedores que nos asisten en la prestación
            del servicio, tales como:
          </p>
          <ul>
            <li>
              Servicios de infraestructura en la nube y almacenamiento de datos.
            </li>
            <li>Pasarelas de pago y procesadores de transacciones.</li>
            <li>Servicios de envío de correo electrónico transaccional.</li>
            <li>Herramientas de análisis y monitoreo.</li>
          </ul>
          <p>
            Estos proveedores están sujetos a acuerdos de confidencialidad y
            solo procesan datos según nuestras instrucciones.
          </p>

          <h3>5.2. Integraciones activadas por el usuario</h3>
          <p>
            Cuando el usuario activa integraciones con servicios de terceros
            (como Kommo CRM u otros), los datos de envíos podrán ser
            transmitidos a dichos servicios conforme a la configuración
            establecida por el usuario. El usuario es responsable de revisar las
            políticas de privacidad de dichos terceros.
          </p>

          <h3>5.3. Autoridades competentes</h3>
          <p>
            Podremos revelar datos personales cuando sea requerido por ley,
            orden judicial o solicitud de autoridades administrativas
            competentes.
          </p>
        </section>

        {/* 6. Transferencia internacional */}
        <section>
          <h2>6. Transferencia Internacional de Datos</h2>
          <p>
            Los datos personales podrán ser almacenados y procesados en
            servidores ubicados fuera de la República del Perú, en países que
            cuenten con un nivel adecuado de protección de datos personales o
            mediante la adopción de cláusulas contractuales y medidas de
            seguridad apropiadas, conforme a lo establecido en la Ley N° 29733 y
            su Reglamento.
          </p>
        </section>

        {/* 7. Plazo de conservación */}
        <section>
          <h2>7. Plazo de Conservación de Datos</h2>
          <p>
            Los datos personales serán conservados mientras dure la relación
            contractual con el usuario y, posterior a esta, por un plazo de
            hasta cinco (5) años, salvo que una norma legal exija un plazo
            diferente. Transcurrido dicho plazo, los datos serán eliminados o
            anonimizados de conformidad con la normativa vigente.
          </p>
          <p>
            Los datos de envíos recopilados a través de los formularios creados
            por los usuarios serán conservados mientras la cuenta esté activa.
            Tras la cancelación de la cuenta, los datos serán eliminados dentro
            de un plazo razonable, salvo obligación legal de conservación.
          </p>
        </section>

        {/* 8. Medidas de seguridad */}
        <section>
          <h2>8. Medidas de Seguridad</h2>
          <p>
            Denorly implementa medidas técnicas, legales y organizativas
            adecuadas para proteger los datos personales contra el acceso no
            autorizado, la pérdida, alteración o destrucción, incluyendo:
          </p>
          <ul>
            <li>Cifrado de datos en tránsito y en reposo.</li>
            <li>
              Control de accesos basado en roles y autenticación segura.
            </li>
            <li>
              Monitoreo continuo de la infraestructura y registro de actividad.
            </li>
            <li>Copias de seguridad periódicas.</li>
            <li>
              Capacitación del personal en materia de protección de datos.
            </li>
          </ul>
          <p>
            No obstante, ningún sistema de transmisión o almacenamiento
            electrónico es completamente seguro, por lo que no podemos garantizar
            su seguridad absoluta.
          </p>
        </section>

        {/* 9. Cookies */}
        <section>
          <h2>9. Cookies y Tecnologías de Rastreo</h2>
          <p>
            Denorly utiliza cookies y tecnologías similares para mejorar la
            experiencia del usuario. Estas tecnologías nos permiten:
          </p>
          <ul>
            <li>Mantener su sesión iniciada de forma segura.</li>
            <li>Recordar sus preferencias y configuraciones.</li>
            <li>
              Analizar el uso de la plataforma para mejorar nuestros servicios.
            </li>
          </ul>
          <p>
            Puede configurar su navegador para rechazar cookies, aunque esto
            podría afectar el funcionamiento de la plataforma.
          </p>
        </section>

        {/* 10. Derechos ARCO */}
        <section>
          <h2>10. Derechos del Titular de Datos Personales</h2>
          <p>
            De acuerdo con la Ley N° 29733, usted tiene derecho a:
          </p>
          <ul>
            <li>
              <strong>Acceso:</strong> Conocer qué datos personales suyos están
              siendo tratados y las características de dicho tratamiento.
            </li>
            <li>
              <strong>Rectificación:</strong> Solicitar la corrección de datos
              inexactos o incompletos.
            </li>
            <li>
              <strong>Cancelación:</strong> Solicitar la eliminación de sus datos
              cuando haya finalizado la finalidad para la cual fueron
              recopilados, o cuando haya revocado su consentimiento.
            </li>
            <li>
              <strong>Oposición:</strong> Oponerse al tratamiento de sus datos
              para finalidades específicas.
            </li>
            <li>
              <strong>Portabilidad:</strong> Solicitar la entrega de sus datos
              en un formato estructurado, de uso común y lectura mecánica.
            </li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, envíe un correo
            electrónico a{' '}
            <a
              href="mailto:privacidad@denorly.com"
              className="text-sky-600 hover:text-sky-700"
            >
              privacidad@denorly.com
            </a>{' '}
            indicando:
          </p>
          <ul>
            <li>Nombre completo del titular.</li>
            <li>Correo electrónico asociado a su cuenta.</li>
            <li>
              Descripción clara del derecho que desea ejercer y los datos
              involucrados.
            </li>
            <li>Copia de su documento de identidad.</li>
          </ul>
          <p>
            La solicitud será atendida en un plazo máximo de diez (10) días
            hábiles conforme a la normativa vigente.
          </p>
        </section>

        {/* 11. Servicios para menores */}
        <section>
          <h2>11. Uso del Servicio por Menores de Edad</h2>
          <p>
            Los servicios de Denorly están dirigidos a personas mayores de 18
            años. No recopilamos deliberadamente datos personales de menores de
            edad. Si detectamos que se han recopilado datos de un menor sin el
            consentimiento de su representante legal, procederemos a eliminarlos
            de inmediato.
          </p>
        </section>

        {/* 12. Notificación de incidentes */}
        <section>
          <h2>12. Notificación de Incidentes de Seguridad</h2>
          <p>
            En caso de ocurrir un incidente de seguridad que pueda afectar sus
            datos personales, Denorly notificará al titular afectado y a la
            Autoridad Nacional de Protección de Datos Personales dentro de las
            cuarenta y ocho (48) horas siguientes al conocimiento del incidente,
            conforme a lo establecido en el Reglamento de la Ley N° 29733.
          </p>
        </section>

        {/* 13. Reclamaciones */}
        <section>
          <h2>13. Reclamaciones</h2>
          <p>
            Si considera que sus derechos no han sido debidamente atendidos,
            puede presentar una reclamación ante la Autoridad Nacional de
            Protección de Datos Personales del Ministerio de Justicia y Derechos
            Humanos del Perú:
          </p>
          <ul>
            <li>
              Dirección: Calle Scipión Llona 350, Miraflores, Lima, Perú.
            </li>
            <li>
              Sitio web:{' '}
              <a
                href="https://www.gob.pe/anpd"
                className="text-sky-600 hover:text-sky-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.gob.pe/anpd
              </a>
            </li>
          </ul>
        </section>

        {/* 14. Contacto */}
        <section>
          <h2>14. Contacto</h2>
          <p>
            Para cualquier consulta sobre esta Política de Privacidad o sobre el
            tratamiento de sus datos personales, puede comunicarse con nosotros
            a:
          </p>
          <ul>
            <li>
              Correo electrónico:{' '}
              <a
                href="mailto:privacidad@denorly.com"
                className="text-sky-600 hover:text-sky-700"
              >
                privacidad@denorly.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
