import React, { useState } from 'react';

const PollContainer = ({ onSubmit }) => {
  const [pollQuestion, setPollQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handlePollSubmit = () => {
    if (pollQuestion.trim() !== '' && options.length > 0) {
      const pollData = { question: pollQuestion, options };
      onSubmit(pollData);
      setPollQuestion('');
      setOptions([]);
      setNewOption('');
    }
  };

  return (
    <div className="poll-container">
      <h3>Poll</h3>
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={pollQuestion}
          onChange={(e) => setPollQuestion(e.target.value)}
        />
      </div>
      <div>
        <label>Options:</label>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              {option}
              <button onClick={() => handleRemoveOption(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Type option..."
          />
          <button onClick={handleAddOption}>Add Option</button>
        </div>
      </div>
      <button onClick={handlePollSubmit}>Submit Poll</button>
    </div>
  );
};

export default PollContainer;
