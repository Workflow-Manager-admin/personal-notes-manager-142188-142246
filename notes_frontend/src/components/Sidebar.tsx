import React from "react";
import type { Note } from "./NotesApp";

type SidebarProps = {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onNoteDelete: (id: string) => void;
  onNoteEdit: (id: string) => void;
};

// PUBLIC_INTERFACE
export default function Sidebar({
  notes,
  selectedNoteId,
  onNoteSelect,
  onNoteDelete,
  onNoteEdit,
}: SidebarProps) {
  return (
    <ul className="sidebar-list">
      {notes.length === 0 ? (
        <li className="sidebar-empty">No notes yet.</li>
      ) : (
        notes.map((note) => (
          <li
            className={`sidebar-note${
              selectedNoteId === note.id ? " selected" : ""
            }`}
            key={note.id}
            tabIndex={0}
            onClick={() => onNoteSelect(note.id)}
          >
            <div className="sidebar-note-inner">
              <span className="title">{note.title || "Untitled"}</span>
              <span className="note-actions">
                <button
                  className="icon-btn"
                  title="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNoteEdit(note.id);
                  }}
                >
                  ✎
                </button>
                <button
                  className="icon-btn"
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNoteDelete(note.id);
                  }}
                >
                  🗑
                </button>
              </span>
            </div>
            <div className="updated">
              {new Date(note.updated).toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
