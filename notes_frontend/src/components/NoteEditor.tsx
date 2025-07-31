import React, { useState } from "react";
import type { Note } from "./NotesApp";

type NoteEditorProps = {
  note: Note;
  onSave: (id: string, title: string, content: string) => void;
  onCancel: () => void;
};

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(note.id, title, content);
  }

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
          maxLength={80}
          className="note-title"
          autoFocus
        />
      </label>
      <label>
        Content
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="note-content"
          placeholder="Write your note here"
        />
      </label>
      <div className="editor-actions">
        <button type="submit" className="save-btn">
          Save
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
