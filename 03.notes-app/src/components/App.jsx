import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const initialNotes = [
  {
    title: "Sample Note Title - 1",
    content: "Sample Notes content - 1",
  },
  {
    title: "Sample Note Title - 2",
    content: "Sample Notes content - 2",
  },
  {
    title: "Sample Note Title - 3",
    content: "Sample Notes content - 3",
  },
];
function App() {
  const [notes, setNotes] = useState(initialNotes);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [newNote, ...prevNotes];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
