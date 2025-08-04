import React, { useMemo, useState } from 'react';

function ExpensiveCalculator() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(1);

 // Expensive computation
  let result = 0;
  const squaredNumber = useMemo(() => {
    console.log('Calculating...');
   
    for (let i = 0; i < 100000000; i++) {
      result = input * input;
    }
    return result;
  }, [input]); // Only re-calculate when input changes


  return (
    <div>
      <h2>Without useMemo Example</h2>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <p>Squared: {result}</p>

      <button onClick={() => setCount(count + 1)}>Re-render</button>
      <p>Render count: {count}</p>
    </div>
  );
}

export default ExpensiveCalculator;
