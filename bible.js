
/* =========================
   📖 BIBLIA BOOK - ESTRUCTURA EN ESPAÑOL
========================= */

export const biblia = {
  antiguoTestamento: [
    { nombre: "Génesis", api: "genesis" },
    { nombre: "Éxodo", api: "exodus" },
    { nombre: "Levítico", api: "leviticus" },
    { nombre: "Números", api: "numbers" },
    { nombre: "Deuteronomio", api: "deuteronomy" }
  ],

  nuevoTestamento: [
    { nombre: "Mateo", api: "matthew" },
    { nombre: "Marcos", api: "mark" },
    { nombre: "Lucas", api: "luke" },
    { nombre: "Juan", api: "john" },
    { nombre: "Hechos", api: "acts" },
    { nombre: "Romanos", api: "romans" },
    { nombre: "Apocalipsis", api: "revelation" }
  ]
};

/* =========================
   📚 CARGAR CAPÍTULO REAL
========================= */
export async function obtenerCapitulo(libro, capitulo = 1) {
  try {
    const res = await fetch(`https://bible-api.com/${libro}+${capitulo}`);
    const data = await res.json();

    return {
      texto: data.text,
      referencia: data.reference
    };

  } catch (error) {
    return {
      texto: "Error al cargar la Biblia",
      referencia: ""
    };
  }
}