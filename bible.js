
export async function obtenerCapitulo(libro, capitulo = 1) {
  try {
    const res = await fetch(`https://bible-api.com/${libro}+${capitulo}`);
    const data = await res.json();

    // 📖 separar versículos
    const versiculos = data.text
      .split("\n")
      .filter(v => v.trim().length > 0);

    return {
      referencia: data.reference,
      versiculos
    };

  } catch (error) {
    return {
      referencia: "",
      versiculos: ["Error al cargar la Biblia"]
    };
  }
}

/* =========================
   ⭐ FAVORITOS
========================= */
export function guardarFavorito(texto) {
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");

  favs.push({
    texto,
    fecha: new Date().toISOString()
  });

  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}
