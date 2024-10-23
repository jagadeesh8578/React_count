import React, { useState } from 'react';
import './styles.css'; // Import the CSS file

const App = () => {
  const [counters, setCounters] = useState([
    { id: 1, count: 0, increment: 5, visible: true },
    { id: 2, count: 0, increment: 10, visible: true },
    { id: 3, count: 0, increment: 15, visible: true },
    { id: 4, count: 0, increment: 20, visible: true },
  ]);
  const [selectedCounter, setSelectedCounter] = useState('');
  const [newCounterIncrement, setNewCounterIncrement] = useState(0);

  const handleIncrement = (id) => {
    setCounters(counters.map(counter => 
      counter.id === id ? { ...counter, count: counter.count + counter.increment } : counter
    ));
  };

  const handleSelectChange = (e) => {
    setSelectedCounter(e.target.value);
  };

  const handleRemoveCounter = () => {
    setCounters(counters.map(counter => 
      counter.id === parseInt(selectedCounter) ? { ...counter, visible: false } : counter
    ));
  };

  const handleAddCounter = () => {
    if (newCounterIncrement > 0) {
      const newCounter = {
        id: counters.length + 1,
        count: 0,
        increment: newCounterIncrement,
        visible: true,
      };
      setCounters([...counters, newCounter]);
      setNewCounterIncrement(0); // Reset input
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        {counters.map(counter => 
          counter.visible && (
            <div key={counter.id} className="container">
              <h2>Counter {counter.id}</h2>
              <p>Count: {counter.count}</p>
              <button onClick={() => handleIncrement(counter.id)}>Increment by {counter.increment}</button>
            </div>
          )
        )}
      </div>

      <div className="controls-container">
        <div className="remove-container">
          <select value={selectedCounter} onChange={handleSelectChange}>
            <option value="">Select a counter to remove</option>
            {counters.filter(counter => counter.visible).map(counter => (
              <option key={counter.id} value={counter.id}>{`Counter ${counter.id}`}</option>
            ))}
          </select>
          <button onClick={handleRemoveCounter}>Remove Counter</button>
        </div>

        <div className="add-container">
          <input 
            type="number" 
            value={newCounterIncrement} 
            onChange={(e) => setNewCounterIncrement(parseInt(e.target.value) || 0)} 
            placeholder="Increment Value" 
          />
          <button onClick={handleAddCounter}>Add Counter</button>
        </div>
      </div>
    </div>
  );
};

export default App;
