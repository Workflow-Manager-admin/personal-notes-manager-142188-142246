import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";

export type Note = {
  id: string;
  title: string;
  content: string;
  updated: string;
};

const LOCAL_MOCK_MODE = true;

const MOCK_NOTES: Note[] = [
  {
    id: "1",
    title: "Sample Note",
    content: "Welcome to your Notes App 🎉",
    updated: new Date().toISOString(),
  },
];

// PUBLIC_INTERFACE
function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (LOCAL_MOCK_MODE) {
      setNotes(MOCK_NOTES);
    } else {
      // TODO: replace with backend call
    }
  }, []);

  function addNote() {
    const newNote: Note = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2),
      title: "Untitled Note",
      content: "",
      updated: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    setEditMode(true);
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
      setEditMode(false);
    }
  }

  function selectNote(id: string) {
    setSelectedNoteId(id);
    setEditMode(false);
  }

  function startEditNote(id: string) {
    setSelectedNoteId(id);
    setEditMode(true);
  }

  function updateNote(id: string, title: string, content: string) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, title, content, updated: new Date().toISOString() } : n,
      ),
    );
    setEditMode(false);
  }

  const selectedNote: Note | null =
    notes.find((n) => n.id === selectedNoteId) || null;

  return {
    notes,
    selectedNote,
    selectedNoteId,
    editMode,
    addNote,
    deleteNote,
    selectNote,
    startEditNote,
    updateNote,
  };
}

// PUBLIC_INTERFACE
export default function NotesApp() {
  const {
    notes,
    selectedNote,
    selectedNoteId,
    editMode,
    addNote,
    deleteNote,
    selectNote,
    startEditNote,
    updateNote,
  } = useNotes();

  return (
    <div className="notes-app-root">
      <header>
        <span className="app-title">📝 My Notes</span>
        <button className="new-note-btn" onClick={addNote} title="Create a new note">
          + New Note
        </button>
      </header>
      <div className="notes-app-main">
        <nav>
          <Sidebar
            notes={notes}
            selectedNoteId={selectedNoteId}
            onNoteSelect={selectNote}
            onNoteDelete={deleteNote}
            onNoteEdit={startEditNote}
          />
        </nav>
        <main>
          {selectedNote ? (
            editMode ? (
              <NoteEditor
                note={selectedNote}
                onSave={updateNote}
                onCancel={() => selectNote(selectedNote.id)}
              />
            ) : (
              <NoteViewer
                note={selectedNote}
                onEdit={() => startEditNote(selectedNote.id)}
              />
            )
          ) : (
            <div className="empty-msg">Select a note or create a new note.</div>
          )}
        </main>
      </div>
    </div>
  );
}
