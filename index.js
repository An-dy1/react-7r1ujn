import React, { useState } from 'react';
import { render } from 'react-dom';

/*
"Converting Liquid State" Exercise 

Objectives
1) We need 3 input fields. When finished you should have 3 fields with the "Liter", "Pint", and "Gallon" labels (one each).

2) Currently you cannot enter amounts in the inputs fields. Fix that.

3) Ensure that changing one input updates the others with the correct conversion amount.

4) Abbreviate the decimals down to 2.
*/

function literToGallon(liter) {
  return liter * 0.264172;
}

function literToPint(liter) {
  return liter * 2.113376;
}

function gallonToLiter(gallon) {
  return gallon / 0.264172;
}

function gallonToPint(gallon) {
  return gallon * 8;
}

function pintToLiter(pint) {
  return pint / 2.113376;
}
function pintToGallon(pint) {
  return pint / 8;
}

function LiquidInput(props) {
  // more efficient than calling toFixed on every setX function:
  // value={Number(props.amount).toFixed(2)}
  return (
    <fieldset>
      <label>{props.unit}</label>
      <br />

      <input value={props.amount} onChange={props.onChange} />
    </fieldset>
  );
}

function App() {
  var [liquidAmount, setLiquidAmount] = useState(0);

  var [pintAmount, setPintAmount] = useState(0);
  var [literAmount, setLiterAmount] = useState(0);
  var [gallonAmount, setGallonAmount] = useState(0);

  function handleInputChange(e) {
    setLiquidAmount(e.target.value);
  }

  function handlePintChange(e) {
    let pintSetAmount = e.target.value;

    setPintAmount(pintSetAmount);
    setLiterAmount(pintToLiter(pintSetAmount).toFixed(2));
    setGallonAmount(pintToGallon(pintSetAmount).toFixed(2));
  }

  function handleLiterChange(e) {
    let literSetAmount = e.target.value;

    setLiterAmount(literSetAmount);
    setPintAmount(literToPint(literSetAmount).toFixed(2));
    setGallonAmount(literToGallon(literSetAmount).toFixed(2));
  }

  function handleGallonChange(e) {
    let gallonSetAmount = e.target.value;

    setGallonAmount(gallonSetAmount);
    setLiterAmount(gallonToLiter(gallonSetAmount).toFixed(2));
    setPintAmount(gallonToPint(gallonSetAmount).toFixed(2));
  }

  return (
    <>
      <LiquidInput
        unit="Liter"
        onChange={handleLiterChange}
        amount={literAmount}
      />
      <LiquidInput
        unit="Pint"
        onChange={handlePintChange}
        amount={pintAmount}
      />
      <LiquidInput
        unit="Gallon"
        onChange={handleGallonChange}
        amount={gallonAmount}
      />
    </>
  );
}

render(<App />, document.getElementById('root'));

// Overall Notes ****************

// STARTING STATE - 0
function LiquidInput0(props) {
  function handleInputChange(e) {}

  return (
    <fieldset>
      <label>{props.unit}</label>
      <br />
      <input value={0} onChange={handleInputChange} />
    </fieldset>
  );
}

function App0() {
  // TODO: show that it only renders once
  // vs every time...
  // have to change order... (leave that in hints...)

  return (
    <>
      <LiquidInput unit="Liter" />
    </>
  );
}

// FINAL SOLUTION
function LiquidInput2(props) {
  return (
    <fieldset>
      <label>{unitTable[props.unit]}</label>
      <br />
      <input value={props.liquid} onChange={props.onChange} />
    </fieldset>
  );
}

function App2() {
  var [gallon, setGallon] = useState(1);
  var [liter, setLiter] = useState(() => gallonToLiter(gallon));
  var [pint, setPint] = useState(() => gallonToPint(gallon));

  function handleLiterChange(e) {
    var newLiter = e.target.value;

    setLiter(Math.round(newLiter * 100) / 100);
    setGallon(Math.round(literToGallon(newLiter) * 100) / 100);
    setPint(Math.round(literToPint(newLiter) * 100) / 100);
  }

  function handleGallonChange(e) {
    var newGallon = e.target.value;

    setLiter(gallonToLiter(newGallon));
    setGallon(newGallon);
    setPint(gallonToPint(newGallon));
  }

  function handlePintChange(e) {
    var newPint = e.target.value;

    setLiter(pintToLiter(newPint));
    setGallon(pintToGallon(newPint));
    setPint(newPint);
  }

  return (
    <>
      <LiquidInput liquid={liter} unit="l" onChange={handleLiterChange} />
      <LiquidInput liquid={pint} unit="p" onChange={handlePintChange} />
      <LiquidInput liquid={gallon} unit="g" onChange={handleGallonChange} />
    </>
  );
}

/*
Objectives
1) We need 3 input fields. When finished you should have 3 fields with the "Liter", "Pint", and "Gallon" labels (one each).
Hints:
- Duplicate <LiquidInput /> in <App /> until you have 3
- Change the titles for 2nd and third for Pint and Gallon.

2) Currently you cannot enter amounts in the inputs fields. Fix that.
Hints:
- Add state for the input number to <LiquidInput/>
- Update the state in the handleInputChange() event handler.
  - You can access the new value with "e.target.value"
- Ensure the value on the input field comes from state.


3) Ensure that changing one input updates the others with the correct conversion amount.
Hints:
- Lift state up from <LiquidInput/> to <App/>
- Create state variables for each field in <App/>
- Pass the amount from state down to each input
- Move event handlers up to App, and ensure each field has an event handler
- Pass the event handlers down to each input for the onChange event


4) Abbreviate the decimals down to 2.
HINT: 
- google "mdn toFixed"
*/
