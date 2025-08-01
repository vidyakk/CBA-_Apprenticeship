import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
      console.log("Print",count);
    }, 1000);
  },[]);

  return <h1>I've rendered {count} times!</h1>;
}

export default Timer;