import React, { useState } from "react";
import { db } from "../config/firebase";

import { collection, addDoc } from "firebase/firestore";

const Formulario = () => {
  // Estados para los datos del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !edad) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Referencia a la colección 'usuarios'
      const usuariosRef = collection(db, "usuarios");

      // Guardar datos en Firestore
      await addDoc(usuariosRef, {
        nombre,
        edad: parseInt(edad), // Convertir edad a número
      });

      alert("Datos guardados exitosamente.");
      setNombre("");
      setEdad("");
    } catch (error) {
      console.error("Error al guardar los datos: ", error);
      alert("Hubo un error al guardar los datos.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 15px", cursor: "pointer" }}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
