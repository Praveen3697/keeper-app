import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";
import { v1 as uuidv1 } from "uuid";

function Create(props) {
  const [isExpanded, changeExpanded] = useState(false);
  const [note, setNote] = useState({
    id: "",
    title: "",
    content: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return { ...prevNote, [name]: value, id: uuidv1() };
    });
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleInputChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={() => {
            changeExpanded(true);
          }}
          onChange={handleInputChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab
            onClick={(event) => {
              props.onCreate(note);
              setNote({
                title: "",
                content: "",
              });
              changeExpanded(false);
              event.preventDefault();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Create;
