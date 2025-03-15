import React from "react";

interface MachineProps {
  selected: { [key: string]: string };
  categories: { id: string; label: string }[];
}

const levelDescriptions: {
  [key: number]: {
    title: string;
    description: string;
    recommendations: string[];
  };
} = {
  1: {
    title: "F: Fuga Mental",
    description:
      "Me lleno de ocupaciones y distracciones para evitar sentir mi malestar, ignorando señales de agotamiento y estrés.",
    recommendations: [
      "Llama a un amigo esta semana y hablen sobre las 'Conductas más influyentes del día', reflexionando en cómo te afectan, cómo impactan a los demás y qué beneficio te brindan.",
      "Haz una oración corta en la que le pidas a Dios: Señor, ayúdame a recordar lo que realmente importa hoy.",
      "Toma 5 minutos para contestar en un papel: ¿De qué estoy escapando? Escribe tres cosas.",
      "Haz journaling en qué ha consistido la desconexión de las prioridades.",
      "Pon el teléfono en modo de avión por 30 minutos.",
    ],
  },
  2: {
    title: "A: Ansiedad",
    description:
      "Me lleno de ocupaciones y actividades, evitando el descanso y el silencio para no enfrentar mi malestar interno.",
    recommendations: [
      "Llama a un amigo esta semana y hablen sobre las 'Conductas más influyentes del día', reflexionando en cómo te afectan, cómo impactan a los demás y qué beneficio te brindan.",
      "Detente y nómbrale a Dios lo que más te preocupa en este momento.",
      "Practica la respiración profunda, sincronizándola con una oración corta como: ‘Jehová es mi pastor, nada me faltará’.",
      "Escribe tus pensamientos y luego cuestiónalos: ¿son ciertos o solo posibilidades?",
      "Recuerda que Dios está contigo en el presente; el futuro no tiene poder sobre hoy.",
      "Establece metas realistas y alcanzables.",
      "Evita suposiciones y comunícate abiertamente con los demás.",
    ],
  },
  3: {
    title: "T: Tensión",
    description:
      "Me frustro fácilmente, reacciono con impaciencia y mi irritabilidad empieza a afectar mis relaciones y decisiones.",
    recommendations: [
      "Llama a un amigo y hablen sobre las 'Conductas más influyentes de el día', reflexionando en cómo te afectan, cómo impactan a los demás y qué beneficio te brindan.",
      "Tómate cinco minutos para descansar sin sentir culpa: tu valor no depende de tu productividad.",
      "Haz una pausa y pregúntate: ¿qué me está impulsando a mantenerme tan ocupado?",
      "Establece un momento en el día donde conscientemente sueltes el control y confíes en Dios.",
      "Date el permiso de disfrutar una actividad sin un propósito productivo.",
    ],
  },
  4: {
    title: "I: Irritación",
    description:
      "Me siento emocionalmente agotado, evito responsabilidades y busco escapes poco saludables para adormecer mi malestar.",
    recommendations: [
      "Llama a un amigo esta semana y hablen sobre las 'Conductas más influyentes del día', reflexionando en cómo te afectan, cómo impactan a los demás y qué beneficio te brindan.",
      "Antes de reaccionar, respira y pregúntate: ¿de dónde viene esta emoción realmente?",
      "Tómate un momento para salir del ambiente que te genera irritación y cambiar de perspectiva.",
      "Ora con sinceridad: ‘Señor, dame paciencia y muéstrame lo que realmente está ocurriendo en mi corazón’.",
      "Enfoca tu energía en algo constructivo: ejercicio, arte o una caminata al aire libre.",
    ],
  },
  5: {
    title: "G: Golpe Emocional",
    description:
      "Me alejo de los demás, escondo lo que siento y caigo en vergüenza, creyendo que nadie puede entenderme o ayudarme.",
    recommendations: [
      "Llama a un amigo y hablen sobre las 'Conductas más influyentes del día', reflexionando en cómo te afectan, cómo impactan a los demás y qué beneficio te brindan.",
      "Reconoce honestamente tus límites y expresa verbalmente o por escrito que estás llegando al agotamiento emocional.",
      "Sentirte avergonzado no significa que seas indigno. La vergüenza es pasajera si decides exponerte a la verdad y la comunidad.",
      "Asegúrate de reducir responsabilidades inmediatas, enfocándote en lo estrictamente necesario hasta recuperar energía.",
      "Permite tiempo para el descanso y la recuperación.",
      "Evita el aislamiento y mantente conectado con los demás.",
    ],
  },
  6: {
    title: "A: Abandono",
    description:
      "Este es el nivel más grave de la escala, donde me siento completamente desconectado y puedo recaer en patrones destructivos.",
    recommendations: [
      "Busca inmediatamente contacto con alguien para romper el aislamiento emocional y espiritual.",
      "Realiza una oración sincera a Dios, diciendo explícitamente: 'Soy impotente ante esto y necesito tu ayuda ahora mismo.'",
      "Recuerda que 'solo por hoy' puedes elegir diferente, enfocándote únicamente en las próximas horas o minutos.",
      "Evita tomar decisiones impulsivas en este estado.",
    ],
  },
};

const levelMapping: { [key: string]: number } = {
  AREA_DE_RESTAURACIÓN: 0,
  FUGA_MENTAL: 1,
  ANSIEDAD: 2,
  TENSION: 3,
  IRRITACION: 4,
  GOLPE_EMOCIONAL: 5,
  ABANDONO: 6,
};

const Machine: React.FC<MachineProps> = ({ selected, categories }) => {
  const levels = Object.keys(selected)
    .map((category) => levelMapping[category])
    .filter((level) => level !== undefined);

  if (levels.length === 0) {
    return null;
  }

  const lowestLevel = Math.max(...levels);

  return (
    <div className="machine-container">
      {/* ✅ Nueva sección: Hoy mi día estuvo así ✅ */}
      <div className="mt-6 p-4 bg-blue-100 rounded shadow-md">
        <h2 className="text-lg font-bold text-blue-900">
          📋 Conductas más influyentes del día:
        </h2>
        {Object.entries(selected).map(([categoryId, question], index) => {
          return (
            <p key={index} className="text-blue-800 text-md mt-1">
              {question} (
              <strong>
                {categoryId
                  .replace("AREA_DE_RESTAURACIÓN", "ÁREA DE RESTAURACIÓN")
                  .replace("FUGA_MENTAL", "FUGA MENTAL")
                  .replace("ANSIEDAD", "ANSIEDAD")
                  .replace("TENSION", "TENSIÓN")
                  .replace("IRRITACION", "IRRITACIÓN")
                  .replace("GOLPE_EMOCIONAL", "GOLPE EMOCIONAL")
                  .replace("ABANDONO", "ABANDONO")}
              </strong>
              )
            </p>
          );
        })}
      </div>

      <h4></h4>
      {lowestLevel === 0 ? (
        <div className="restoration-container">
          <h1>🌿 Área de Restauración</h1>
          <p>
            Este es el nivel óptimo de bienestar emocional y espiritual. Hay un
            sentido de propósito, conexión y gratitud. Experimento estabilidad
            en la vida cotidiana, con un enfoque en el crecimiento personal y en
            el mantenimiento de hábitos saludables.
            <br />
            <br />
            Cada día es una oportunidad para seguir construyendo una vida en
            integridad y descanso en Dios.
          </p>

          {/* ✅ Oración de la Serenidad agregada en itálico y con saltos de línea ✅ */}
          <blockquote className="italic text-gray-700 mt-4">
            <p>
              <em>Dios, concédeme la serenidad</em>
            </p>
            <p>
              <em>para aceptar las cosas que no puedo cambiar;</em>
            </p>
            <p>
              <em>valor para cambiar aquellas que puedo,</em>
            </p>
            <p>
              <em>y sabiduría para reconocer la diferencia.</em>
            </p>
            <br />
            <p>
              <em>Viviendo un día a la vez,</em>
            </p>
            <p>
              <em>disfrutando un momento a la vez,</em>
            </p>
            <p>
              <em>aceptando las dificultades como un camino hacia la paz;</em>
            </p>
            <p>
              <em>tomando, como lo hizo Jesús,</em>
            </p>
            <p>
              <em>este mundo pecador tal y como es,</em>
            </p>
            <p>
              <em>no como lo habría querido.</em>
            </p>
            <br />
            <p>
              <em>Confiando en que Tú harás bien todas las cosas</em>
            </p>
            <p>
              <em>si yo me entrego a Tu voluntad;</em>
            </p>
            <p>
              <em>para que sea razonablemente feliz en esta vida</em>
            </p>
            <p>
              <em>y plenamente feliz contigo en la eternidad.</em>
            </p>
            <br />
            <p>
              <strong>
                <em>Amén.</em>
              </strong>
            </p>
          </blockquote>
        </div>
      ) : (
        levelDescriptions[lowestLevel] && (
          <div className="level-description-container">
            <h4>📌 Acciones recomendadas:</h4>
            <ul>
              {levelDescriptions[lowestLevel].recommendations.map(
                (recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                )
              )}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default Machine;
