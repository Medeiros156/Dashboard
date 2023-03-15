import React, { useState } from "react";
import "./Calculator.css";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";

export default function Calculator() {
  const [num, setNum] = useState(0);
  const [oldnum, setOldNum] = useState(0);
  const [operator, setOperator] = useState();

  function inputNum(e) {
    var input = e.target.value;
    if (num === 0) {
      setNum(input);
    } else {
      setNum(num + input);
    }
  }
  function calculate() {
    let result;
    if (operator === "+") {
      result = parseFloat(oldnum) + parseFloat(num);
    } else if (operator === "-") {
      result = parseFloat(oldnum) - parseFloat(num);
    } else if (operator === "X") {
      result = parseFloat(oldnum) * parseFloat(num);
    } else if (operator === "/") {
      result = parseFloat(oldnum) / parseFloat(num);
    }
    setNum(result.toFixed(3));
  }
  
  // function calculate() {
  //   if (operator === "+") {
  //     setNum((parseFloat(oldnum) + parseFloat(num)).toFixed(6));
  //   } else if (operator === "-") {
  //     setNum((parseFloat(oldnum) - parseFloat(num)).toFixed(6));
  //   } else if (operator === "X") {
  //     setNum((parseFloat(oldnum) * parseFloat(num)).toFixed(6));
  //   } else if (operator === "/") {
  //     setNum((parseFloat(oldnum) / parseFloat(num)).toFixed(6));
  //   }
  // }
  function clear() {
    setNum(0);
  }

  function changeSign() {
    if (num > 0) {
      setNum(-num);
    } else {
      setNum(Math.abs(num));
    }
  }

  function porcentage() {
    setNum(num / 100);
  }

  function operatorHandler(e) {
    var operatorInput = e.target.value;
    setOperator(operatorInput);
    setOldNum(num);
    setNum(0);
  }



  return (
    <div>
      <Box m={5} />
      <Container maxWidth="xs">
        <div className="wrapper">
          <Box m={6} />
          <h1 className="result">{num}</h1>
          <button className="white" onClick={clear}>AC</button>
          <button className="white" onClick={changeSign}>+/-</button>
          <button className="white" onClick={porcentage}>%</button>
          <button className="orange" onClick={operatorHandler} value="/">
            /
          </button>
          <button onClick={inputNum} value={7}>
            7
          </button>
          <button onClick={inputNum} value={8}>
            8
          </button>
          <button onClick={inputNum} value={9}>
            9
          </button>
          <button className="orange" onClick={operatorHandler} value="X">
            X
          </button>
          <button onClick={inputNum} value={4}>
            4
          </button>
          <button onClick={inputNum} value={5}>
            5
          </button>
          <button onClick={inputNum} value={6}>
            6
          </button>
          <button className="orange" onClick={operatorHandler} value="-">
            -
          </button>
          <button onClick={inputNum} value={1}>
            1
          </button>
          <button onClick={inputNum} value={2}>
            2
          </button>
          <button onClick={inputNum} value={3}>
            3
          </button>
          <button className="orange" onClick={operatorHandler} value="+">
            +
          </button>
          <button onClick={inputNum} value={0}>
            0
          </button>
          <button onClick={inputNum} value={"."}>
            ,
          </button>
          <button style={{ visibility: "hidden" }}>
            ,
          </button>
          <button className="orange" onClick={calculate}>
            =
          </button>
        </div>
      </Container>
    </div>
  );
}
