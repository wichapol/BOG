import "./App.css";
import { useState } from "react";

function App() {
  const [validateMsg, setValidatMsg] = useState("minimum length 1 character");
  const [stringInput, setStringInput] = useState("");
  const [arrInput, setArrInput] = useState("");
  const [checkMsg, setCheckMsg] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  function handleChange(event) {
    const value = event.target.value;
    const valueTrim = value.trim();
    const valueLength = valueTrim.length;
    const arr = valueTrim.split("");
    const valueOnlyPatenth = arr.every((val) => val === "(" || val === ")");
    setValidatMsg("");
    if (valueLength === 0) {
      setValidatMsg(`minimum length 1 character`);
      setIsCheck(false);
    }
    if (!valueOnlyPatenth) {
      setValidatMsg(`Please Insert Only ( or )`);
      return;
    }
    if (valueLength >= 30) {
      setValidatMsg(`maximum length 30 character`);
    }
    setStringInput(valueTrim);
    setArrInput(arr);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setIsCheck(true);
    let result;
    const length = arrInput.length;

    if (length === 0) {
      setValidatMsg(` Please Insert (  or  ) `);
      stringInput("");
      return;
    }

    let missingLeftParenthesis = 0,
      missingRightParenthesis = 0,
      indexLeftInsert = [],
      indexRightInsert = [];

    if (arrInput[0] !== "(") {
      missingLeftParenthesis += 1;
      indexLeftInsert.push(1);
    }

    for (let i = 1; i < length; i += 1) {
      if (arrInput[i] === ")" && arrInput[i - 1] === "(") {
        continue;
      }

      if (arrInput[i] === "(" && arrInput[i - 1] === ")") {
        continue;
      }
      if (arrInput[i] === ")" && arrInput[i - 1] === ")") {
        missingLeftParenthesis += 1;
        indexLeftInsert.push(i + 1);
        continue;
      }
      if (arrInput[i] === "(" && arrInput[i - 1] === "(") {
        missingRightParenthesis += 1;
        indexRightInsert.push(i + 1);
        continue;
      }
    }
    if (arrInput[length - 1] !== ")") {
      missingRightParenthesis += 1;
      indexRightInsert.push(length + 1);
    }

    const srtMissIndex = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (i == arr.length - 2) {
          arr[i] += " and";
        } else {
          arr[i] += " ,";
        }
      }
      return arr.join(" ");
    };

    const textIndexLeft = srtMissIndex(indexLeftInsert);
    const textIndexRight = srtMissIndex(indexRightInsert);

    result = (
      <div className="check-msg">
        {missingLeftParenthesis === 0 ? null : (
          <p>
            - Please insert <strong style={{ color: "red" }}>(</strong>{" "}
            {missingLeftParenthesis} character
            <br />
            At position {textIndexLeft}
            <br />
          </p>
        )}

        {missingRightParenthesis === 0 ? null : (
          <p>
            - Please insert <strong style={{ color: "red" }}>)</strong>{" "}
            {missingRightParenthesis} character
            <br /> At position {textIndexRight}
          </p>
        )}
      </div>
    );

    const isComplete =
      missingLeftParenthesis === 0 && missingRightParenthesis === 0;

    setCheckMsg(
      !isComplete ? result : <p style={{ color: "green" }}>complete</p>
    );
  }

  return (
    <div className="App">
      <h1>Parentheses Check</h1>
      <form className="content" onSubmit={handleSubmit}>
        <label name="insert-text">Please Insert ( or ) </label>
        <input
          required
          type="text"
          maxLength="30"
          style={stringInput === "" ? { border: "2px solid red" } : null}
          onChange={handleChange}
          value={stringInput}
        />
        <p hidden={isCheck} style={{ color: "red" }}>
          {isCheck ? null : validateMsg}
        </p>
        {isCheck ? checkMsg : null}
        <button type="submit"> Check</button>
      </form>
    </div>
  );
}

export default App;
