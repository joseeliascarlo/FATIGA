import React, { useRef } from "react";
import html2canvas from "html2canvas";

const ShareButton: React.FC = () => {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (captureRef.current) {
      // Captura la imagen del div con el contenido del medidor
      html2canvas(captureRef.current).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        // Crea un enlace temporal para descargar la imagen
        const link = document.createElement("a");
        link.href = image;
        link.download = "escala-fatiga.png"; // Nombre del archivo
        link.click();
      });
    }
  };

  return (
    <div className="share-container">
      {/* Botón para compartir */}
      <button
        onClick={handleShare}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        📤 Compartir Resultado
      </button>

      {/* Contenedor oculto para capturar la imagen */}
      <div
        ref={captureRef}
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
      >
        <div
          id="gas-meter-content"
          style={{
            width: "300px",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h3>Escala FATIGA</h3>
          <div className="gas-meter">
            {[...Array(7)].map((_, index) => {
              const fillLevel = 7 - index; // Invertir el orden de los niveles
              return (
                <div
                  key={index}
                  className={`gas-level ${fillLevel === 7 ? "filled" : ""} ${
                    fillLevel === 1 ? "empty" : ""
                  }`}
                  style={{
                    width: "100%",
                    height: "20px",
                    backgroundColor: fillLevel === 7 ? "green" : "gray",
                  }}
                ></div>
              );
            })}
          </div>
          <p>📊 Estado actual: Área de Restauración</p>
        </div>
      </div>
    </div>
  );
};

export default ShareButton;
