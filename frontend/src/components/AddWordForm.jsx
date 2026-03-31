import React, { useState } from 'react';

const AddWordForm = ({ addWord }) => {
  const [wordName, setWordName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (wordName) {
      addWord(wordName);
      setWordName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Form for adding word */}
      <input
        type="text"
        value={wordName}
        onChange={(e) => setWordName(e.target.value)}
        placeholder="Enter word name"
      />
      <button type="submit">Add Word</button>
    </form>
  );
};

export default AddWordForm;