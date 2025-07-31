import React from "react";
import type { Note } from "./NotesApp";

type NoteViewerProps = {
  note: Note;
  onEdit: () => void;
};

// PUBLIC_INTERFACE
export default function NoteViewer({ note, onEdit }: NoteViewerProps) {
  return (
    <div className="note-viewer">
      <div className="viewer-header">
        <h2 className="note-title">{note.title || "Untitled"}</h2>
        <button className="edit-btn" onClick={onEdit}>
          Edit
        </button>
      </div>
      <article className="note-content">
        {note.content || <span className="empty-note">No content yet.</span>}
      </article>
      <div className="viewer-footer">
        <span className="viewer-date">
          Last updated:{" "}
          {new Date(note.updated).toLocaleString([], {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </span>
      </div>
    </div>
  );
}
