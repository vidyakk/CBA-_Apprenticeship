import React, { useState, useCallback } from 'react';

// 🧒 Child component that only re-renders when props change
const Child = React.memo(({ onClick }) => {
  console.log("👶 Child rendered");
  return (
    <div>
      <h3>Child Component</h3>
      <button onClick={onClick}>Call Parent Function</button>
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);

  // ✅ Memoized callback so Child doesn't re-render unless needed
  const handleChildClick = useCallback(() => {
    setClicks(prev => prev + 1);
  }, []);

  return (
    <div>
      <h2>React.memo + useCallback Example</h2>
      <p>Parent Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Re-render Parent</button>

      <p>Child Clicks: {clicks}</p>

      {/* 🧒 Passing memoized function to memoized child */}
      <Child onClick={handleChildClick} />
    </div>
  );
}

export default Parent;