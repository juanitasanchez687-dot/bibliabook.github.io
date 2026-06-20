//////////////////////////////////////////////////////
// 📖🌸 BIBLIA BOOK - UI DE BIBLIA
//////////////////////////////////////////////////////

let bibleData = null;

//////////////////////////////////////////////////////
// 📥 CARGAR BIBLIA (JSON)
//////////////////////////////////////////////////////

async function loadBible() {
  const res = await fetch("data/bible.json");
  bibleData = await res.json();

  console.log("📖 Biblia cargada correctamente");
}

//////////////////////////////////////////////////////
// 🏠 MOSTRAR MENÚ PRINCIPAL BIBLIA
//////////////////////////////////////////////////////

function showBibleHome() {
  const app = document.getElementById("bibleView");

  app.innerHTML = `
    <div class="card">
      <h2>📖 Biblia Book</h2>
      <p>Selecciona un testamento:</p>

      <button onclick="showTestament('old_testament')">
        📜 Antiguo Testamento
      </button>

      <button onclick="showTestament('new_testament')">
        ✝️ Nuevo Testamento
      </button>
    </div>
  `;
}

//////////////////////////////////////////////////////
// 📜 MOSTRAR TESTAMENTO
//////////////////////////////////////////////////////

function showTestament(type) {
  const test = bibleData[type];

  let html = `
    <div class="card">
      <h2>${test.name}</h2>
      <p>Selecciona un libro:</p>
      <div class="row">
  `;

  test.books.forEach(book => {
    html += `
      <div class="mini-card" onclick="showBook('${book.id}', '${type}')">
        📖 ${book.name}
        <br>
        <small>${book.chapters} capítulos</small>
      </div>
    `;
  });

  html += `</div></div>`;

  document.getElementById("bibleView").innerHTML = html;
}

//////////////////////////////////////////////////////
// 📚 MOSTRAR LIBRO
//////////////////////////////////////////////////////

function showBook(bookId, type) {
  const book = bibleData[type].books.find(b => b.id === bookId);

  let html = `
    <div class="card">
      <h2>📖 ${book.name}</h2>
      <p>${book.description}</p>
      <p>Selecciona un capítulo:</p>

      <div class="row">
  `;

  for (let i = 1; i <= book.chapters; i++) {
    html += `
      <div class="mini-card" onclick="showChapter('${bookId}', ${i}, '${type}')">
        Cap ${i}
      </div>
    `;
  }

  html += `</div></div>`;

  document.getElementById("bibleView").innerHTML = html;
}

//////////////////////////////////////////////////////
// 📖 MOSTRAR CAPÍTULO (BASE)
//////////////////////////////////////////////////////

function showChapter(bookId, chapter, type) {
  const book = bibleData[type].books.find(b => b.id === bookId);

  let html = `
    <div class="card">
      <h2>📖 ${book.name} ${chapter}</h2>
      <p>Versículos cargando...</p>

      <button onclick="showBook('${bookId}', '${type}')">
        ⬅ Volver
      </button>
    </div>
  `;

  document.getElementById("bibleView").innerHTML = html;

  // Aquí luego conectamos versículos reales
  loadChapterVerses(bookId, chapter);
}

//////////////////////////////////////////////////////
// 📖 CARGAR VERSÍCULOS (SIMULADO)
//////////////////////////////////////////////////////

function loadChapterVerses(bookId, chapter) {
  const container = document.getElementById("bibleView");

  setTimeout(() => {
    container.innerHTML += `
      <div class="card">
        <p>📖 [Versículos del capítulo ${chapter} aparecerán aquí]</p>
        <small>Conexión lista para base de datos real</small>
      </div>
    `;
  }, 800);
}

//////////////////////////////////////////////////////
// 🚀 INICIALIZAR BIBLIA UI
//////////////////////////////////////////////////////

loadBible();