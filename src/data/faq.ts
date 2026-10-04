import type { Lang } from '../i18n/LanguageContext'

export interface FaqItem {
  id: string
  q: Record<Lang, string>
  a: Record<Lang, string>
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'que-es-telepsiquiatria',
    q: {
      es: '¿Qué es la telepsiquiatría?',
      en: 'What is telepsychiatry?',
    },
    a: {
      es: 'La telepsiquiatría es la práctica de la psiquiatría a través de videoconsulta segura. Permite realizar la entrevista clínica y el seguimiento a distancia, con las mismas garantías de confidencialidad que la consulta presencial.',
      en: 'Telepsychiatry is the practice of psychiatry through secure video consultation. It allows the clinical interview and follow-up to take place remotely, with the same confidentiality guarantees as an in-person consultation.',
    },
  },
  {
    id: 'como-se-realiza',
    q: {
      es: '¿Cómo se realiza la consulta?',
      en: 'How does the consultation take place?',
    },
    a: {
      es: 'La consulta se realiza por videollamada en un entorno acordado previamente. Recibirás las instrucciones de conexión junto con la confirmación de tu cita.',
      en: 'The consultation takes place by video call in a previously agreed environment. You will receive the connection instructions together with your appointment confirmation.',
    },
  },
  {
    id: 'duracion-primera-consulta',
    q: {
      es: '¿Cuánto dura la primera consulta?',
      en: 'How long does the initial consultation last?',
    },
    a: {
      es: 'La duración de la primera consulta se facilita antes de confirmar la cita.',
      en: 'The duration of the initial consultation is shared before confirming the appointment.',
    },
  },
  {
    id: 'precio',
    q: {
      es: '¿Cuál es el precio?',
      en: 'What is the fee?',
    },
    a: {
      es: 'El precio de la consulta se facilita antes de confirmar la cita.',
      en: 'The consultation fee is shared before confirming the appointment.',
    },
  },
  {
    id: 'pago',
    q: {
      es: '¿Cómo se realiza el pago?',
      en: 'How is payment made?',
    },
    a: {
      es: 'La forma de pago se indica antes de confirmar la cita.',
      en: 'The payment method is indicated before confirming the appointment.',
    },
  },
  {
    id: 'desde-que-pais',
    q: {
      es: '¿Puedo consultar desde cualquier país?',
      en: 'Can I consult from any country?',
    },
    a: {
      es: 'Las consultas online pueden realizarse desde distintos países. La posibilidad de atender tu caso concreto se confirma de forma individual antes de concertar la cita.',
      en: 'Online consultations can take place from different countries. Whether your specific situation can be seen is confirmed individually before scheduling the appointment.',
    },
  },
  {
    id: 'que-necesito',
    q: {
      es: '¿Qué necesito para la videoconsulta?',
      en: 'What do I need for the video consultation?',
    },
    a: {
      es: 'Solo necesitas un dispositivo con cámara y micrófono (ordenador, tableta o teléfono), una conexión a internet estable y un lugar privado donde puedas hablar con tranquilidad.',
      en: 'You only need a device with a camera and microphone (computer, tablet or phone), a stable internet connection, and a private place where you can speak comfortably.',
    },
  },
  {
    id: 'confidencialidad',
    q: {
      es: '¿La consulta es confidencial?',
      en: 'Is the consultation confidential?',
    },
    a: {
      es: 'Sí. La consulta está sujeta al secreto profesional médico. La información que compartas se trata de forma estrictamente confidencial.',
      en: 'Yes. The consultation is subject to medical professional secrecy. The information you share is treated with strict confidentiality.',
    },
  },
  {
    id: 'informes-medicos',
    q: {
      es: '¿Puedo enviar informes médicos?',
      en: 'Can I send medical reports?',
    },
    a: {
      es: 'Sí, puedes aportar informes médicos previos si lo consideras útil. Se te indicará la forma más adecuada de hacerlos llegar antes de la consulta.',
      en: 'Yes, you may provide previous medical reports if you find them useful. You will be told the most appropriate way to send them before the consultation.',
    },
  },
  {
    id: 'adecuada-para-mi-caso',
    q: {
      es: '¿La teleconsulta sirve para cualquier situación?',
      en: 'Is teleconsultation suitable for every situation?',
    },
    a: {
      es: 'No todas las situaciones clínicas son adecuadas para la teleconsulta. Si nos describes brevemente tu caso, te indicaremos si puede atenderse online.',
      en: 'Not every clinical situation is suitable for teleconsultation. If you briefly describe your situation, we will tell you whether it can be handled online.',
    },
  },
  {
    id: 'atencion-urgente',
    q: {
      es: '¿Qué ocurre si necesito atención urgente?',
      en: 'What if I need urgent care?',
    },
    a: {
      es: 'Esta consulta no es un servicio de urgencias. Si necesitas atención urgente, llama al 112 en España o acude a los servicios de emergencia de tu país.',
      en: 'This practice is not an emergency service. If you need urgent care, call 112 in Spain or contact the emergency services in your country.',
    },
  },
  {
    id: 'cancelar-cita',
    q: {
      es: '¿Cómo cancelo o cambio una cita?',
      en: 'How do I cancel or reschedule an appointment?',
    },
    a: {
      es: 'Para cancelar o cambiar una cita, escríbenos por WhatsApp o a través del formulario de contacto con la mayor antelación posible.',
      en: 'To cancel or reschedule an appointment, message us on WhatsApp or through the contact form as far in advance as possible.',
    },
  },
]
