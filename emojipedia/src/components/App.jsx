import React from "react";
import emojipedia from "../emojipedia";
import Entry from "./Entry";

function getEmoji(emojy) {
return (
  <Entry 
  id={emojy.id}
  key={emojy.id}
  emoji={emojy.emoji}
  name={emojy.name}
  meaning={emojy.meaning}
  />
);
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">
        {emojipedia.map(getEmoji)}
      </dl>
    </div>
  );
}

export default App;
