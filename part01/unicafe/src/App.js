import React, { useState } from 'react';

import Header from './components/Header.js';
import Button from './components/Button.js';
import Statistics from './components/Statistics.js';

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const total = good + neutral + bad;

  return (
    <div>

      <Header />

      <Button title='good' handleClick={() => setGood(good + 1)} />
      <Button title='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button title='bad' handleClick={() => setBad(bad + 1)} />

      {total === 0 && (
        <>
          <p>No feedback given</p>
        </>
      )}

      {total !== 0 && (
        <>
          <Statistics answers={{ good, neutral, bad, total }} />          
        </>
      )}

    </div>
  );
}

export default App;
