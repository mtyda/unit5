let notes = JSON.parse(localStorage.getItem("notes")) || [];
let activeNoteId = null;

const notesList = document.getElementById("notesList");
const titleInput = document.getElementById("noteTitle");
const bodyInput = document.getElementById("noteBody");
const newNoteBtn = document.getElementById("new-note");

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-item" + (note.id === activeNoteId ? " active" : "");
    div.innerHTML = `<strong>${note.title || "New Note"}</strong><br><small>${note.body.slice(0,40)}</small>`;
    div.onclick = () => selectNote(note.id);
    notesList.appendChild(div);
  });
}

function selectNote(id) {
  activeNoteId = id;
  const note = notes.find(n => n.id === id);
  titleInput.value = note.title;
  bodyInput.value = note.body;
  renderNotes();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

titleInput.addEventListener("input", () => {
  if (!activeNoteId) return;
  const note = notes.find(n => n.id === activeNoteId);
  note.title = titleInput.value;
  note.updated = Date.now();
  saveNotes();
  renderNotes();
});

bodyInput.addEventListener("input", () => {
  if (!activeNoteId) return;
  const note = notes.find(n => n.id === activeNoteId);
  note.body = bodyInput.value;
  note.updated = Date.now();
  saveNotes();
  renderNotes();
});

newNoteBtn.addEventListener("click", () => {
  const id = Date.now();
  const newNote = { id, title: "", body: "", updated: Date.now() };
  notes.unshift(newNote);
  activeNoteId = id;
  saveNotes();
  renderNotes();
  selectNote(id);
});

// Initialize
renderNotes();
if (notes.length) selectNote(notes[0].id);

 