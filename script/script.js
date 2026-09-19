const numbers = document.querySelectorAll(".number");
const display = document.getElementById("display-screen");
const clear = document.getElementById("clear-button");
const deletee = document.getElementById("delete-button");
const operations = document.querySelectorAll("[data-operators]");
const percent = document.getElementById("percent");
const equal = document.getElementById("equal");

const audioNumberButton = new Audio("sound/sound3.mp3");
const audioDeleteButton = new Audio("sound/sound2.mp3");
const audioClearButton = new Audio("sound/sound1.mp3");

const operatorSymbols = ["+", "-", "x", "÷"]; //main operator

// number
numbers.forEach(function (number) {
  number.addEventListener("click", function () {
    const numberValue = number.textContent;
    audioNumberButton.currentTime = 0;
    audioNumberButton.play();

    //mencegah titik double pada
    if (numberValue === ".") {
      const lastNumber = display.value.split(/([\+\-x÷])/).pop();
      if (lastNumber.includes(".")) return;
      //mencegah titik pada angka awal
      if (display.value == "") {
        display.value += "0.";
        return;
      }
    }

    display.value += numberValue;
  });
});

//operation
operations.forEach(function (operation) {
  operation.addEventListener("click", function () {
    const operationValue = operation.textContent;
    const lastChar = display.value.slice(-1);
    audioNumberButton.currentTime = 0;
    audioNumberButton.play();

    //mengatasi memasukkan operator awal kecuali minus
    if (display.value === "" && operationValue !== "-") return;

    //mengatasi operasi double atau menumpuk
    if (operatorSymbols.includes(lastChar)) {
      display.value = display.value.slice(0, -1) + operationValue;
      return;
    }

    display.value += operationValue;
  });
});

//percent
percent.addEventListener("click", function () {
  const percents = percent.textContent;
  const part = display.value.split(/([\+\-x÷])/);
  const lastNumber = parseFloat(part[part.length - 1]);
  audioNumberButton.currentTime = 0;
  audioNumberButton.play();
  if (percents === "%") {
    if (isNaN(lastNumber)) return;
    part[part.length - 1] = (lastNumber / 100).toString();
    display.value = part.join("");
    return;
  }

  display.value += percents;
});

//equals
equal.addEventListener("click", function () {
  if (display.value === "") return;
  audioNumberButton.currentTime = 0;
  audioNumberButton.play();
  try {
    let replace = display.value.replaceAll("x", "*").replaceAll("÷", "/");
    let result = Function("'Use strict' ; return (" + replace + ")")();

    if (result == Infinity || result == -Infinity) {
      display.value = "Error";
    } else {
      display.value = Math.round(result * 1e10) / 1e10;
    }
  } catch (error) {
    display.value = "Error";
  }
});

//clear button
clear.addEventListener("click", function () {
  audioClearButton.currentTime = 0.35;
  audioClearButton.play();
  display.value = "";
});

//delete button
deletee.addEventListener("click", function () {
  audioDeleteButton.currentTime = 0;
  audioDeleteButton.play();
  display.value = display.value.slice(0, -1);
});
