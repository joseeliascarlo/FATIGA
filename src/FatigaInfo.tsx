import React from "react";

export default function FatigaInfo() {
  return (
    <div className="container mx-auto p-6 text-lg leading-relaxed">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4"></h1>

        <hr className="my-6 border-gray-300" />

        <strong>¿Cómo funciona la Escala FATIGA?</strong>
        <p className="mt-4">
          La <strong>Escala FATIGA</strong> es una herramienta de autoconciencia
          emocional diseñada para ayudarte a reconocer cómo ciertos patrones en
          tu vida pueden llevarte a un estado de desgaste mental.
        </p>
        <p className="mt-2">
          En lugar de ver el desgaste como algo repentino, esta escala te
          muestra que ocurre de forma progresiva. Comienza con pequeños
          descuidos en tus prioridades y, si no los atiendes, puede llevarte a
          niveles más profundos de estrés y desregulación emocional.
        </p>
        <p className="mt-2">
          Al responder preguntas sobre cómo actúas en diferentes áreas de tu
          vida, la app te ubicará en un nivel específico, desde estabilidad y
          restauración hasta señales de abandono emocional.
        </p>

        <hr className="my-6 border-gray-300" />

        <strong>¿Cómo se calculan los resultados?</strong>
        <p className="mt-4">
          FATIGA te presentará una serie de categorías y en cada una podrás
          elegir una sola respuesta que refleje cómo te sientes o actúas hoy.
        </p>
        <p className="mt-2">
          <strong>
            Si eliges una respuesta de un nivel más bajo, tu estado general
            bajará automáticamente a ese nivel.
          </strong>{" "}
          Esto significa que, aunque hayas tenido momentos de estabilidad, un
          estado emocional difícil puede ser suficiente para llevarte al
          agotamiento si no lo gestionas a tiempo.
        </p>

        <hr className="my-6 border-gray-300" />

        <strong>¿Qué significa mi resultado?</strong>
        <p className="mt-4">
          Tu estado en la escala FATIGA refleja tu nivel actual de claridad
          mental:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Tanque lleno:</strong> Estás en un estado de estabilidad
            emocional, con hábitos que reflejan confianza, gratitud y conexión
            con Dios y los demás.
          </li>
          <li>
            <strong>Tanque bajando:</strong> Es una señal de advertencia. Puede
            que estés perdiendo enfoque en tus prioridades o acumulando estrés
            sin manejarlo adecuadamente.
          </li>
          <li>
            <strong>Tanque muy bajo:</strong> Es un llamado a buscar descanso,
            apoyo y restauración antes de que el agotamiento afecte tu
            bienestar.
          </li>
        </ul>
        <p className="mt-2">
          La fatiga emocional no es un destino, sino una señal para hacer
          ajustes a tiempo. Pequeñas decisiones pueden marcar una gran
          diferencia en tu camino hacia una vida con propósito.
        </p>

        <hr className="my-6 border-gray-300" />

        <strong>¿Cómo funciona el descenso en la Escala FATIGA?</strong>
        <p className="mt-4">
          La escala describe un <strong>descenso progresivo</strong> que ocurre
          cuando nos alejamos de nuestras prioridades y comenzamos a depender de
          mecanismos de afrontamiento poco saludables. Este proceso se
          desarrolla en varias etapas:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>FUGA MENTAL:</strong> Nos distraemos con el día a día y
            dejamos de lado lo que realmente importa.
          </li>
          <li>
            <strong>ANSIEDAD:</strong> Al perder el enfoque, sentimos
            preocupación constante y una sensación de inseguridad.
          </li>
          <li>
            <strong>TENSIÓN:</strong> Intentamos compensar nuestra ansiedad
            haciendo más cosas, sin detenernos a procesar lo que sentimos.
          </li>
          <li>
            <strong>IRRITACIÓN:</strong> Nos volvemos más reactivos, impacientes
            o agresivos con los demás.
          </li>
          <li>
            <strong>GOLPE EMOCIONAL:</strong> El agotamiento físico y emocional
            nos alcanza, afectando nuestra energía y motivación.
          </li>
          <li>
            <strong>ABANDONO:</strong> Nos desconectamos de nuestras relaciones
            y recurrimos a mecanismos de escape (como distracciones excesivas,
            adicciones o aislamiento).
          </li>
        </ul>
        <p className="mt-2">
          La clave es identificar en qué punto te encuentras y tomar acción
          antes de seguir descendiendo.
        </p>

        <hr className="my-6 border-gray-300" />

        <strong>¿Cómo salir de la Escala FATIGA?</strong>
        <p className="mt-4">
          El concepto del <strong>Doble Vínculo</strong> explica que, cuando
          estamos en la escala FATIGA, enfrentamos dos opciones:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Opción fácil:</strong> Seguir descendiendo en la escala,
            recurriendo a mecanismos de escape o patrones de comportamiento poco
            saludables.
          </li>
          <li>
            <strong>Opción difícil:</strong> Hacer un alto, enfrentar las
            emociones subyacentes y tomar pasos concretos para volver a la
            estabilidad.
          </li>
        </ul>
        <p className="mt-2">
          Aunque la opción difícil requiere más esfuerzo, es la única que te
          permitirá salir del ciclo de agotamiento y recuperar tu bienestar.
        </p>

        <hr className="my-6 border-gray-300" />

        <strong>¿Quién creó la Escala FATIGA?</strong>
        <p className="mt-4">
          La Escala FATIGA es una adaptación al español de la
          <a
            href="https://puredesire.org/wp-content/uploads/2020/04/faster-scale-check-in-2017-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {" "}
            FASTER Scale
          </a>
          , desarrollada por el consejero cristiano Michael Dye.
        </p>
        <p className="mt-2">
          La traducción y diseño de esta app fueron realizados por{" "}
          <strong>José Elías Carlo</strong> (
          <a href="mailto:joseeliascarlo@gmail.com" className="text-blue-500">
            joseeliascarlo@gmail.com
          </a>
          ).
        </p>
      </div>
    </div>
  );
}
