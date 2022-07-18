import React from 'react';
import useStore from './store';

function App() {
  const { bears, increasePopulation, removeEventListener } = useStore(state => state);
  
  return (
    <>
      <h1>{bears}</h1>
      
      <button onClick={increasePopulation}>OneUp</button>
      <button onClick={removeEventListener}>remove all</button>
      
    </>
  );
}

export default App;
