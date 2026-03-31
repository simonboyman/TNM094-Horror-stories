import React, { useEffect, useState } from 'react';
import api from "../api.js";
import AddWordForm from './AddWordForm.jsx';

const WordList = () => {
  const [words, setWords] = useState([]);

  const fetchWords = async () => { { /* this is a get request*/ }
    try {
      const response = await api.get('/words'); {/* uses api.js axios*/}
      setWords(response.data.words);
    } catch (error) {
      console.error("Error fetching words", error);
    }
  };

  const addWord = async (wordName) => { {/* this is a post request*/ }
    try {
      await api.post('/words', { name: wordName });
      fetchWords();  // Refresh the list after adding a word
    } catch (error) {
      console.error("Error adding word", error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div>
      <h2>Words List</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word.name}</li>
        ))}
      </ul>
      <AddWordForm addWord={addWord} />
    </div>
  );
};

export default WordList;