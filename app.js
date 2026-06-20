//////////////////////////////////////////////////////
// 🌸📖 BIBLIA BOOK - APP CORE
// Archivo: js/app.js
//////////////////////////////////////////////////////

// 🧠 Estado global del usuario
let userData = {
  streak: 0,
  lastVisit: null,
  currentBook: "No iniciado",
  currentVerse: "",
  prayers: [],
  studiesCompleted: 0,
  versesSaved: []
};

//////////////////////////////////////////////////////
// 💾 CARGAR DATOS (LOCAL STORAGE)
//////////////////////////////////////////////////////

function loadData() {
  const data = localStorage.getItem("bibliaBookData");

  if (data) {
    userData = JSON.parse(data);
  } else {
    saveData();
  }
}

//////////////////////////////////////////////////////
// 💾 GUARDAR DATOS
//////////////////////////////////////////////////////

function saveData() {
  localStorage.setItem("bibliaBookData", JSON.stringify(userData));
}

//////////////////////////////////////////////////////
// 🔥 SISTEMA DE RACHA ESPIRITUAL
//////////////////////////////////////////////////////

function updateStreak() {
  const today = new Date().toDateString();

  if (userData.lastVisit !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (userData.lastVisit === yesterday.toDateString()) {
      userData.streak += 1;
    } else {
      userData.streak = 1;
    }

    userData.lastVisit = today;
    saveData();
  }
}

//////////////////////////////////////////////////////
// 📖 CONTINUAR LECTURA
//////////////////////////////////////////////////////

function updateReading(book, verse) {
  userData.currentBook = book;
  userData.currentVerse = verse;
  saveData();
}

function getContinueReading() {
  return `📖 ${userData.currentBook} - ${userData.currentVerse}`;
}

//////////////////////////////////////////////////////
// 🙏 ORACIONES
//////////////////////////////////////////////////////

function addPrayer(text) {
  userData.prayers.push({
    text,
    date: new Date().toLocaleDateString()
  });

  saveData();
}

//////////////////////////////////////////////////////
// 🌸 ESTUDIOS
//////////////////////////////////////////////////////

function completeStudy() {
  userData.studiesCompleted += 1;
  saveData();
}

//////////////////////////////////////////////////////
// 📖 VERSÍCULOS GUARDADOS
//////////////////////////////////////////////////////

function saveVerse(verse) {
  userData.versesSaved.push({
    verse,
    date: new Date().toLocaleDateString()
  });

  saveData();
}

//////////////////////////////////////////////////////
// 🧠 INICIALIZAR APP
//////////////////////////////////////////////////////

function initApp() {
  loadData();
  updateStreak();

  console.log("🌸 Biblia Book cargado correctamente");
  console.log("🔥 Racha actual:", userData.streak);
}

//////////////////////////////////////////////////////
// 🚀 INICIAR AUTOMÁTICAMENTE
//////////////////////////////////////////////////////

initApp();