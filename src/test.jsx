import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function test() {
  const { message, toggle } = useContext(AppContext);

  return (
    <div>
      <p>{message}</p>

      <button onClick={() => toggle("Adithya")}>
        Toggle for Adithya
      </button>
    </div>
  );
}

export default test;
