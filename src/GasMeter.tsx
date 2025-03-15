import React from "react";
import "./GasMeter.css"; // Importa los estilos del medidor
import html2canvas from "html2canvas";
import ShareButton from "./ShareButton";

const handleExport = () => {
  const element = document.getElementById("gas-meter-content"); // ID del contenedor
  if (element) {
    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL("image/png"); // Convierte a imagen PNG
      const link = document.createElement("a"); // Crea un enlace
      link.href = image;
      link.download = "resultados-fatiga.png"; // Nombre del archivo
      link.click(); // Descarga la imagen
    });
  }
};

// Mapeo de niveles para el tanque de gasolina
const levelMapping: { [key: string]: number } = {
  AREA_DE_RESTAURACIÓN: 7, // Tanque lleno (verde)
  FUGA_MENTAL: 6,
  ANSIEDAD: 5,
  TENSION: 4,
  IRRITACION: 3,
  GOLPE_EMOCIONAL: 2,
  ABANDONO: 1, // Tanque vacío (rojo)
};

// Nombres de los niveles
const levelNames: { [key: number]: string } = {
  7: "Área de Restauración",
  6: "Fuga Mental",
  5: "Ansiedad",
  4: "Tensión",
  3: "Irritación",
  2: "Golpe Emocional",
  1: "Abandono",
};

// Descripciones detalladas de los niveles (tomadas de Machine.tsx)
const levelDescriptions: { [key: number]: string } = {
  7: "Este es el nivel óptimo de bienestar emocional y espiritual. Hay un sentido de propósito, conexión y gratitud. Experimento estabilidad en la vida cotidiana, con un enfoque en el crecimiento personal y en el mantenimiento de hábitos saludables.",
  6: "Me lleno de ocupaciones y distracciones para evitar sentir mi malestar, ignorando señales de agotamiento y estrés.",
  5: "Me frustro fácilmente, reacciono con impaciencia y mi irritabilidad empieza a afectar mis relaciones y decisiones.",
  4: "Me lleno de ocupaciones y actividades, evitando el descanso y el silencio para no enfrentar mi malestar interno.",
  3: "Me siento emocionalmente agotado, evito responsabilidades y busco escapes poco saludables para adormecer mi malestar.",
  2: "Me alejo de los demás, escondo lo que siento y caigo en vergüenza, creyendo que nadie puede entenderme o ayudarme.",
  1: "Este es el nivel más bajo, donde regreso a viejos patrones destructivos, sintiéndome atrapado y desconectado de mis valores, mis relaciones y mi propósito.",
};

interface GasMeterProps {
  selected: { [key: string]: string }; // Almacena las respuestas seleccionadas
}

const GasMeter: React.FC<GasMeterProps> = ({ selected }) => {
  // Obtener los niveles seleccionados
  const levels = Object.keys(selected)
    .map((category) => levelMapping[category])
    .filter((level) => level !== undefined);

  // Calcular el nivel más alto (el menor número)
  const highestLevel = levels.length > 0 ? Math.min(...levels) : 7; // Default: lleno (verde)

  // Obtener el nombre y la descripción del nivel alcanzado
  const levelName = levelNames[highestLevel] || "No disponible";
  const levelDescription =
    levelDescriptions[highestLevel] || "Sin descripción disponible.";

  <ShareButton
    levelName={levelName}
    levelDescription={levelDescription}
    highestLevel={highestLevel} // ✅ PASANDO highestLevel COMO PROP
  />;

  // Función para compartir los resultados
  const handleShare = () => {
    // Generar texto con las respuestas seleccionadas
    const selectedResponses = Object.keys(selected)
      .map(
        (category) => `✔️ ${selected[category]} (${category.replace("_", " ")})`
      )
      .join("\n");

    // Generar texto a compartir
    const results = `
📊 Hoy tomé la Escala FATIGA:

🚩 Nivel alcanzado: ${levelName}

📖 ${levelDescription}

Las conductas más influyentes del día fueron estas:

${selectedResponses || "No seleccioné ninguna respuesta."}

La Escala FATIGA es una herramienta para ayudar a personas a identificar señales tempranas de recaída emocional y conductual.

https://kczk5j.csb.app/
    `;

    // Abrir una nueva ventana con los resultados
    const shareWindow = window.open("", "_blank", "width=800,height=700");

    if (shareWindow) {
      shareWindow.document.write(`
        <html>
          <head>
            <title>Compartir Resultados</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              textarea { width: 95%; height: 900px; margin: 10px 0; font-size: 12px; }
              button { padding: 20px 30px; font-size: 56px; cursor: pointer; }
            </style>
          </head>
          <body>
            <h1>Comparte tus resultados con un amigo</h1>
            <textarea id="shareText">${results}</textarea>
            <br />
            <button onclick="copyToClipboard()">📋 Copiar Texto</button>
            <script>
              function copyToClipboard() {
                var textArea = document.getElementById("shareText");
                textArea.select();
                document.execCommand("copy");
                alert("TEXTO COPIADO");
              }
            </script>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="gas-meter-container">
      <h2 className="gas-meter-title"></h2>
      <div id="gas-meter-content" className="gas-meter">
        {[...Array(7)].map((_, index) => {
          const fillLevel = 7 - index; // Invertir el orden de los niveles

          <ShareButton
            levelName={levelName}
            levelDescription={levelDescription}
            highestLevel={highestLevel} // ✅ PASANDO highestLevel COMO PROP
          />;

          return (
            <div
              key={index}
              className={`gas-level ${
                fillLevel <= highestLevel ? "filled" : ""
              } ${fillLevel === 1 ? "empty" : ""}`}
            ></div>
          );
        })}
      </div>
      <h1 className="level-name">{levelName}</h1>{" "}
      {/* Nombre del nivel en grande */}
      <p className="level-description">{levelDescription}</p>{" "}
      {/* Descripción del nivel */}
      <button
        onClick={handleShare}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        COMPARTE TUS RESULTADOS
      </button>
    </div>
  );
};

export default GasMeter;
