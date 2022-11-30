import { useState } from "react";
import "./App.css";

const Person = (props) => {
  return (
    <div>
      <h1> Name: {props.name}</h1>
      <p> I am a person</p>
      <p> Age: {props.age}</p>
      <p>
        {" "}
        I have injected another functional component into other component!!
      </p>
    </div>
  );
};

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <button>-</button>
      <h1>{counter}</h1>
      <button>+</button>
    </div>
  );
};

export default App;
