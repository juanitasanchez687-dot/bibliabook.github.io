//////////////////////////////////////////////////////
// 📖🌸 BIBLIA BOOK - BIBLIA ENGINE
//////////////////////////////////////////////////////

// 📚 Estructura básica de la Biblia (MVP funcional)
const bible = {
  genesis: {
    name: "Génesis",
    chapters: {
      1: {
        verses: {
          1: "En el principio creó Dios los cielos y la tierra.",
          2: "Y la tierra estaba desordenada y vacía..."
        }
      }
    }
  },

  psalms: {
    name: "Salmos",
    chapters: {
      23: {
        verses: {
          1: "El Señor es mi pastor; nada me faltará.",
          2: "En lugares de delicados pastos me hará descansar."
        }
      }
    }
  },

  john: {
    name: "Juan",
    chapters: {
      14: {
        verses: {
          1: "No se turbe vuestro corazón; creéis en Dios, creed también en mí.",
          27: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da."
        }
      }
    }
  }
};

//////////////////////////////////////////////////////
// 🧠 ESTADO DE BIBLIA DEL USUARIO
//////////////////////////////////////////////////////

let bibleState = {
  currentBook: "genesis",
  currentChapter: 1,
  favorites: [],
  notes: {},
  highlights: {}
};

//////////////////////////////////////////////////////
// 📖 LEER VERSÍCULO
//////////////////////////////////////////////////////

function getVerse(book, chapter, verse) {
  try {
    return bible[book].chapters[chapter].verses[verse];
  } catch (e) {
    return "Versículo no encontrado.";
  }
}

//////////////////////////////////////////////////////
// 📚 OBTENER CAPÍTULO COMPLETO
//////////////////////////////////////////////////////

function getChapter(book, chapter) {
  try {
    return bible[book].chapters[chapter].verses;
  } catch (e) {
    return {};
  }
}

//////////////////////////////////////////////////////
// ⭐ GUARDAR FAVORITO
//////////////////////////////////////////////////////

function saveFavorite(book, chapter, verse) {
  const text = getVerse(book, chapter, verse);

  bibleState.favorites.push({
    book,
    chapter,
    verse,
    text,
    date: new Date().toLocaleDateString()
  });

  saveBibleState();
}

//////////////////////////////////////////////////////
// 📝 AGREGAR NOTA
//////////////////////////////////////////////////////

function addNote(book, chapter, verse, note) {
  const key = `${book}-${chapter}-${verse}`;

  bibleState.notes[key] = {
    note,
    date: new Date().toLocaleDateString()
  };

  saveBibleState();
}

//////////////////////////////////////////////////////
// 🎨 RESALTAR VERSÍCULO
//////////////////////////////////////////////////////

function highlightVerse(book, chapter, verse, color = "pink") {
  const key = `${book}-${chapter}-${verse}`;

  bibleState.highlights[key] = color;

  saveBibleState();
}

//////////////////////////////////////////////////////
// 🔄 CAMBIAR POSICIÓN DE LECTURA
//////////////////////////////////////////////////////

function setReadingPosition(book, chapter) {
  bibleState.currentBook = book;
  bibleState.currentChapter = chapter;

  saveBibleState();
}

//////////////////////////////////////////////////////
// 📖 CONTINUAR LECTURA
//////////////////////////////////////////////////////

function getContinueReading() {
  const bookName = bible[bibleState.currentBook].name;
  return `📖 ${bookName} ${bibleState.currentChapter}`;
}

//////////////////////////////////////////////////////
// 💾 GUARDADO LOCAL
//////////////////////////////////////////////////////

function saveBibleState() {
  localStorage.setItem("bibleState", JSON.stringify(bibleState));
}

function loadBibleState() {
  const data = localStorage.getItem("bibleState");

  if (data) {
    bibleState = JSON.parse(data);
  }
}

//////////////////////////////////////////////////////
// 🚀 INICIALIZAR
//////////////////////////////////////////////////////

function initBible() {
  loadBibleState();

  console.log("📖 Biblia cargada correctamente");
  console.log("📍 Continuar leyendo:", getContinueReading());
}

initBible();