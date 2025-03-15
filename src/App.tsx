import React, { useState, useEffect } from "react";
import Machine from "./Machine"; // ✅ Importa el componente Machine
import GasMeter from "./GasMeter"; // ✅ Importa el medidor de gasolina
import "./styles.css"; // ✅ Importa los estilos CSS

const levelMapping: { [key: string]: number } = {
  AREA_DE_RESTAURACIÓN: 0, // Más alto (tanque lleno)
  FUGA_MENTAL: 1,
  ANSIEDAD: 2,
  TENSION: 3,
  IRRITACION: 4,
  GOLPE_EMOCIONAL: 5,
  ABANDONO: 6, // Más bajo (tanque vacío)
};

const categories = [
  {
    id: "AREA_DE_RESTAURACIÓN",
    label:
      "ÁREA DE RESTAURACIÓN (Aceptar la vida en los términos de Dios, con confianza, vulnerabilidad y gratitud.)",
    color: "bg-green-500",
    description:
      "Aceptar la vida en los términos de Dios, con confianza, vulnerabilidad y gratitud.",
    questions: [
      "No tengo secretos.",
      "Trabajo para resolver problemas e identificar miedos y sentimientos.",
      "Cumplo compromisos con reuniones, oración, familia, iglesia, personas, metas y conmigo mismo.",
      "Soy abierto y honesto, hago contacto visual.",
      "Busco apoyo en otros.",
      "Fortalezco mis relaciones con Dios y los demás.",
      "Rindo cuentas con sinceridad.",
    ],
  },
  {
    id: "FUGA_MENTAL",
    label:
      "FUGA MENTAL(Comenzar a creer en las circunstancias presentes y empezar a alejarte de confiar en Dios. Negación, huida, un cambio en lo que es importante, en cómo pasas tu tiempo y en lo que piensas.)",
    color: "bg-orange-300",
    description:
      "Este es el nivel óptimo de bienestar emocional y espiritual. Hay un sentido de propósito, conexión y gratitud. Experimento estabilidad en la vida cotidiana, con un enfoque en el crecimiento personal y en el mantenimiento de hábitos saludables.",
    questions: [
      "Tengo secretos.",
      "Dedico menos tiempo y energía a Dios, reuniones e iglesia.",
      "Evito el apoyo y a las personas a quienes debo rendir cuentas.",
      "Mantengo conversaciones superficiales.",
      "Uso el sarcasmo con frecuencia.",
      "Me aíslo.",
      "Cambio constantemente mis metas.",
      "Estoy obsesionado con relaciones.",
      "Rompo promesas y compromisos.",
      "Descuido a mi familia.",
      "Estoy demasiado enfocado en cosas materiales como TV, computadoras y entretenimiento.",
      "Procrastino.",
      "Miento.",
      "Tengo exceso de confianza.",
      "Me aburro con facilidad.",
      "Escondo dinero.",
    ],
  },
  {
    id: "ANSIEDAD",
    label:
      "ANSIEDAD (Un ruido de fondo creciente de miedo indefinido; obteniendo energía de las emociones.)",
    color: "bg-orange-400",
    description:
      "Me lleno de ocupaciones y actividades, evitando el descanso y el silencio para no enfrentar mi malestar interno.",
    questions: [
      "Me preocupo, maldigo y tengo miedo.",
      "Guardo resentimientos.",
      "Reproduzco pensamientos negativos del pasado.",
      "Soy perfeccionista.",
      "Juzgo las intenciones de los demás.",
      "Me pongo metas y listas de tareas poco realistas.",
      "Intento leer la mente de los demás.",
      "Me refugio en fantasías y trato de rescatar a otros.",
      "Tengo problemas de sueño, dificultad para concentrarme y busco drama.",
      "Participo en chismes.",
      "Uso medicamentos de venta libre para el dolor, el sueño o el control de peso.",
      "Flirteo.",
    ],
  },
  {
    id: "TENSION",
    label:
      "TENSION (Intentas correr más rápido que la ansiedad, que suele ser el primer signo de depresión.",
    color: "bg-orange-500",
    description:
      "Me frustro fácilmente, reacciono con impaciencia y mi irritabilidad empieza a afectar mis relaciones y decisiones.",
    questions: [
      "Estoy siempre ocupado y con prisa, justificando mi ritmo acelerado.",
      "Soy adicto al trabajo y me cuesta relajarme.",
      "Evito desacelerar.",
      "Me siento impulsado a seguir haciendo cosas.",
      "No puedo apagar mis pensamientos.",
      "Me salto comidas.",
      "Como en exceso, generalmente por la noche.",
      "Gasto dinero sin control.",
      "No logro identificar mis propios sentimientos o necesidades.",
      "Tengo pensamientos negativos repetitivos.",
      "Me irrito con facilidad.",
      "Tengo cambios de humor dramáticos.",
      "Consumo demasiada cafeína.",
      "Hago ejercicio en exceso.",
      "Estoy nervioso.",
      "Me cuesta estar solo o con otras personas.",
      "Tengo dificultad para escuchar a los demás.",
      "Justifico la necesidad de hacerlo todo yo mismo.",
    ],
  },
  {
    id: "IRRITACION",
    label:
      "IRRITACIÓN (Obtienes una subida de adrenalina por alguna ofensa.",
    color: "bg-red-600",
    description:
      "Me siento emocionalmente agotado, evito responsabilidades y busco escapes poco saludables para adormecer mi malestar.",
    questions: [
      "Mi procrastinar me hace perder dinero, tiempo de trabajo y relaciones.",
      "Uso cada vez más el sarcasmo.",
      "Pienso en términos de todo o nada.",
      "Me siento solo.",
      "Siento que nadie me entiende.",
      "Reacciono de forma exagerada, incluso con ira en la carretera.",
      "Mantengo resentimientos constantes.",
      "Alejo a los demás.",
      "Me aíslo cada vez más.",
      "Culpo a otros.",
      "Discuto con frecuencia.",
      "Tengo pensamientos irracionales.",
      "No tolero las críticas.",
      "Me pongo a la defensiva.",
      "Las personas empiezan a evitarme.",
      "Necesito tener la razón.",
      "Tengo problemas digestivos.",
      "Sufro de dolores de cabeza.",
      "Tengo pensamientos obsesivos de los que no me puedo desprender.",
      "No puedo perdonar.",
      "Me siento superior a los demás.",
      "Uso la intimidación para controlar situaciones.",
    ],
  },
  {
    id: "GOLPE_EMOCIONAL",
    label:
      "GOLPE EMOCIONAL (Pérdida de energía física y emocional; bajando del subidón de adrenalina, inicio de la depresión.)",
    color: "bg-red-700",
    description:
      "Me alejo de los demás, escondo lo que siento y caigo en vergüenza, creyendo que nadie puede entenderme o ayudarme.",
    questions: [
      "Me siento deprimido.",
      "Entro en pánico.",
      "Estoy confundido.",
      "Tengo desesperanza.",
      "Duermo demasiado o muy poco.",
      "No puedo afrontar la vida.",
      "Me siento abrumado.",
      "Lloro sin una razón aparente.",
      "No puedo pensar con claridad.",
      "Olvido cosas con frecuencia.",
      "Soy pesimista.",
      "Me siento indefenso.",
      "Estoy constantemente cansado.",
      "Me siento entumecido.",
      "Quiero huir.",
      "Tengo deseos constantes de volver a conductas de afrontamiento antiguas.",
      "Pienso en usar sexo, drogas o alcohol.",
      "Busco volver a personas y lugares poco saludables.",
      "Me aíslo completamente.",
      "Las personas a mi alrededor están enojadas conmigo.",
      "Me hago daño a mí mismo.",
      "Tengo pensamientos suicidas.",
      "Lloro de forma espontánea.",
      "No tengo metas.",
      "Estoy en modo de supervivencia.",
      "No devuelvo llamadas.",
      "Falto al trabajo.",
      "Estoy irritable.",
      "No tengo apetito.",
    ],
  },
  {
    id: "ABANDONO",
    label: "ABANDONO (Regresas al lugar que juraste que nunca volverías.)",
    color: "bg-red-900",
    description:
      "Este es el nivel más bajo, donde regreso a viejos patrones destructivos, sintiéndome atrapado y desconectado de mis valores, mis relaciones y mi propósito.",
    questions: [
      "Me rindo y cedo ante la situación.",
      "Estoy fuera de control.",
      "Estoy perdido en mi adicción.",
      "Me miento a mí mismo y a los demás.",
      "Siento que no puedo manejar la vida sin mis conductas de afrontamiento, al menos por ahora.",
      "Refuerzo sentimientos de vergüenza, culpa y condenación.",
      "Me siento abandonado y completamente solo.",
    ],
  },
];

const categoryOrder = categories.map((cat) => cat.id);

const textsBetweenButtons = [
  <p className="right-aligned">
    <strong>
      <em>Paso 2:</em>
    </strong>
  </p>,
  <p className="right-aligned">
    <strong>
      <em>Paso 3:</em>
    </strong>
  </p>,
  <p className="right-aligned">
    <strong>
      <em>Paso 4:</em>
    </strong>
  </p>,
  <p className="right-aligned">
    <strong>
      <em>Paso 5:</em>
    </strong>
  </p>,
  <p className="right-aligned">
    <strong>
      <em>Paso 6:</em>
    </strong>
  </p>,
  <p className="right-aligned">
    <strong>
      <em>Paso 7:</em>
    </strong>
  </p>,
];

const App: React.FC = () => {
  const [selected, setSelected] = useState<{ [key: string]: string }>({});
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const totalCategories = categories.length;
  const [ignoredCategories, setIgnoredCategories] = useState<Set<string>>(
    new Set()
  );
  const answeredCategories =
    Object.keys(selected).length + ignoredCategories.size;

  const [darkMode, setDarkMode] = useState(false);
  const [visitedCategories, setVisitedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleCategoryClick = (categoryId: string) => {
    setVisitedCategories((prev) => new Set([...prev, categoryId])); // Marca la categoría como visitada
    setOpenCategory(categoryId);
  };

  // Guarda categorías ignoradas

  const selectQuestion = (category: string, question: string | null) => {
    setSelected((prev) => ({
      ...prev,
      [category]: question !== null ? question : "", // Guarda "" en vez de "❌ NINGUNA DE ESTAS"
    }));
    setOpenCategory(null);
  };

  const App: React.FC = () => {
    const [selected, setSelected] = useState<{ [key: string]: string }>(() => {
      // Cargar respuestas guardadas desde localStorage
      const savedResponses = localStorage.getItem("selectedResponses");
      return savedResponses ? JSON.parse(savedResponses) : {};
    });

    const [openCategory, setOpenCategory] = useState<string | null>(null);

    // Autoguardado: Guardar respuestas en localStorage cada vez que cambien
    useEffect(() => {
      localStorage.setItem("selectedResponses", JSON.stringify(selected));
    }, [selected]); // Se ejecuta cada vez que `selected` cambia

    // ... (resto del código existente) ...
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-container">
          <img
            src="https://i.imgur.com/AcXGu3U.png"
            alt="Escala FATIGA"
            className="app-logo"
          />
          <p>
            Imagina que tu energía emocional es como un tanque de gasolina.{" "}
            <br />
            <br />
            Esta escala te ayuda a identificar si tu tanque está lleno o si
            estás funcionando en reserva.
          </p>
          <p>
            <strong>
              Has respondido {answeredCategories} de los {totalCategories}{" "}
              pasos.
            </strong>{" "}
          </p>

          {/* Barra de progreso */}
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{
                width: `${
                  ((Object.keys(selected).length + ignoredCategories.size) /
                    totalCategories) *
                  100
                }%`,
              }}
            ></div>
          </div>

          {/* ... (código existente) ... */}
        </div>
        <p className="centered-bold-italic">
          <em>
            {" "}
            <strong>Paso 1:</strong>
          </em>
        </p>

        <div className="categories-container">
          {categories.map(({ id, label, color }, index) => {
            // Verificar si el label tiene un paréntesis
            const hasDescription = label.includes("(");
            const [category, description] = hasDescription
              ? [label.split("(")[0], label.split("(")[1].replace(")", "")] // Dividir y eliminar el paréntesis de cierre
              : [label, ""]; // Si no hay descripción, usar el label completo y una cadena vacía

            return (
              <div key={id} className="category-item">
                <button
                  className={`category-button ${
                    visitedCategories.has(id) ? "visited" : ""
                  }`}
                  data-category={id}
                  onClick={() => handleCategoryClick(id)}
                >
                  <strong>{category}</strong>{" "}
                  {hasDescription && (
                    <span className="category-description">
                      ({description})
                    </span>
                  )}
                </button>

                {index < textsBetweenButtons.length && (
                  <p className="button-separator">
                    {textsBetweenButtons[index]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {openCategory && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Escoge la conducta más influyente hoy</h2>
              {categories
                .find((cat) => cat.id === openCategory)
                ?.questions.map((question, index) => (
                  <button
                    key={index}
                    className="modal-button"
                    onClick={() => selectQuestion(openCategory, question)}
                  >
                    {question}
                  </button>
                ))}
              <button
                className="modal-button red"
                onClick={() => {
                  if (openCategory) {
                    setIgnoredCategories(
                      (prev) => new Set([...prev, openCategory])
                    ); // Agrega la categoría a las ignoradas
                  }
                  setOpenCategory(null);
                }}
              >
                ❌ NINGUNA DE ESTAS
              </button>
            </div>
          </div>
        )}

        {Object.values(selected).some((value) => value) && (
          <div className="results-container">
            <h2>Con cúanta energía estoy corriendo hoy:</h2>

            {/* ✅ Gas Meter agregado aquí */}
            <GasMeter selected={selected} />
          </div>
        )}

        <Machine selected={selected} categories={categories} />

        {/* 📤 Sección de compartir */}
        <div className="">
          

{/* Sección de Explicación de FATIGA */}
<div className="container mx-auto p-6 text-lg leading-relaxed">
  <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">

    <hr className="my-6 border-gray-300" />

    <strong>¿Cómo funciona la Escala FATIGA?</strong>
    <p className="mt-4">
      La <strong>Escala FATIGA</strong> es una herramienta de <strong>autoconciencia emocional</strong> diseñada para ayudarte a reconocer cómo ciertos patrones en tu vida pueden llevarte al agotamiento emocional, espiritual y físico. 
    </p>
    <p className="mt-2">
      En lugar de ver el desgaste emocional como algo repentino, esta escala te muestra que ocurre de forma <strong>progresiva</strong>. Comienza con pequeños descuidos en tus prioridades y, si no los atiendes, puede llevarte a niveles más profundos de estrés, desregulación emocional y, finalmente, a mecanismos de escape poco saludables.
    </p>
    <p className="mt-2">
      Al responder preguntas sobre cómo actúas en diferentes áreas de tu vida, la app te ubicará en un nivel específico, desde estabilidad y restauración hasta señales de abandono emocional. 
    </p>

    <hr className="my-6 border-gray-300" />

    <strong>¿Cómo se calculan los resultados?</strong>
    <p className="mt-4">
      FATIGA te presentará una serie de categorías y en cada una podrás elegir una sola respuesta que refleje cómo te sientes o actúas hoy.
    </p>
    <p className="mt-2">
      <strong>Si eliges una respuesta de un nivel más bajo, tu estado general bajará automáticamente a ese nivel.</strong> Esto significa que, aunque hayas tenido momentos de estabilidad, un estado emocional difícil puede ser suficiente para llevarte al agotamiento si no lo gestionas a tiempo.
    </p>
    <p className="mt-2">
    FATIGA no está diseñado para señalar errores, sino para brindarte una visión clara de tu estado emocional y ayudarte a  <strong>actuar con mayor conciencia</strong> antes de llegar al límite.
    </p>

    <hr className="my-6 border-gray-300" />

    <strong>¿Qué significa mi resultado?</strong>
    <p className="mt-4">
      Tu estado en la escala FATIGA refleja tu nivel actual de bienestar:
    </p>
    <ul className="list-disc pl-6 mt-2">
      <li><strong>🔋 Tanque lleno:</strong> Estás en un estado de estabilidad emocional y espiritual, con hábitos que reflejan confianza, gratitud y conexión con Dios y los demás.</li>
      <li><strong>⚠️ Tanque bajando:</strong> Es una señal de advertencia. Puede que estés perdiendo enfoque en tus prioridades o acumulando estrés sin manejarlo adecuadamente.</li>
      <li><strong>🚨 Tanque muy bajo:</strong> Es un llamado a buscar descanso, apoyo y restauración antes de que el agotamiento afecte tu bienestar.</li>
    </ul>
    <p className="mt-2">
      <strong>La fatiga emocional no es un destino, sino una señal para hacer ajustes a tiempo.</strong> Pequeñas decisiones pueden marcar una gran diferencia en tu camino hacia una vida con propósito.
    </p>

    <hr className="my-6 border-gray-300" />

    <strong>¿Cómo funciona el descenso en la Escala FATIGA?</strong>
    <p className="mt-4">
      La escala describe un <strong>descenso progresivo</strong> que ocurre cuando nos alejamos de nuestras prioridades y comenzamos a depender de mecanismos de afrontamiento poco saludables. Este proceso se desarrolla en varias etapas:
    </p>
    <ul className="list-disc pl-6 mt-2">
      <li><strong>🔹 FUGA MENTAL:</strong> Nos distraemos con el día a día y dejamos de lado lo que realmente importa.</li>
      <li><strong>🔹 ANSIEDAD:</strong> Al perder el enfoque, sentimos preocupación constante y una sensación de inseguridad.</li>
      <li><strong>🔹 TENSIÓN:</strong> Intentamos compensar nuestra ansiedad haciendo más cosas, sin detenernos a procesar lo que sentimos.</li>
      <li><strong>🔹 IRRITACIÓN:</strong> Nos volvemos más reactivos, impacientes o agresivos con los demás.</li>
      <li><strong>🔹 GOLPE EMOCIONAL:</strong> El agotamiento físico y emocional nos alcanza, afectando nuestra energía y motivación.</li>
      <li><strong>🔹 ABANDONO:</strong> Nos desconectamos de nuestras relaciones y recurrimos a mecanismos de escape (como distracciones excesivas, adicciones o aislamiento).</li>
    </ul>
    <p className="mt-2">
      La clave es identificar en qué punto te encuentras y tomar acción antes de seguir descendiendo.
    </p>

    <hr className="my-6 border-gray-300" />

    <strong>¿Cómo salir de la Escala FATIGA?</strong>
    <p className="mt-4">
      El concepto del <strong>Doble Vínculo</strong> explica que, cuando estamos en la escala FATIGA, enfrentamos dos opciones:
    </p>
    <ul className="list-disc pl-6 mt-2">
      <li><strong>Opción fácil:</strong> Seguir descendiendo en la escala, recurriendo a mecanismos de escape o patrones de comportamiento poco saludables.</li>
      <li><strong>Opción difícil:</strong> Hacer un alto, enfrentar las emociones subyacentes y tomar pasos concretos para volver a la estabilidad.</li>
    </ul>
    <p className="mt-2">
      Aunque la opción difícil requiere más esfuerzo, es la única que te permitirá salir del ciclo de agotamiento y recuperar tu bienestar.
    </p>

    <hr className="my-6 border-gray-300" />

    <strong>¿Quién creó la Escala FATIGA?</strong>
    <p className="mt-4">
      La Escala FATIGA es una adaptación al español de 
      <a href="https://puredesire.org/wp-content/uploads/2020/04/faster-scale-check-in-2017-1.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500"> FASTER Scale</a>, desarrollada por Michael Dye.  
    </p>
    <p className="mt-2">
      La traducción y diseño de esta app fueron realizados por <strong>José Elías Carlo</strong> (<a href="mailto:joseeliascarlo@gmail.com" className="text-blue-500">joseeliascarlo@gmail.com</a>).
    </p>

  </div>
</div>

     


        </div>
      </div>
    </div>
  );
};

export default App;
