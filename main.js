function guessGame() {
  // list of guess words
  let guessWords = ["configer", "select", "modern"];
  // select random guess word
  let word = guessWords[Math.floor(Math.random() * guessWords.length)];
  // tryCurrent => counter of tries
  let tryCurrent = 0;
  // numberOfTries => number of tries
  let numberOfTries = 5;
  // hints => number of hints
  let hints = 3;
  // empty
  let tries = document.querySelector(".guess-game .game .tries");
  // creat try
  for (let i = 1; i <= numberOfTries; i++) {
    let div = document.createElement("div");
    div.className = `try try-${i}`;
    // only current-try is work
    if (i !== 1) {
      div.classList.add("disabled");
    }
    let tryCount = document.createElement("span");
    tryCount.innerHTML = `try${i}`;
    div.appendChild(tryCount);
    // creat inputs
    for (let j = 1; j <= word.length; j++) {
      let input = document.createElement("input");
      input.id = `try${i}-letter-${j}`;
      input.type = "text";
      input.setAttribute("maxlength", "1");
      div.appendChild(input);
    }
    tries.appendChild(div);
  }
  // focus in first input in current try
  tries.children[tryCurrent].children[1].focus();
  // add disabled class anther current-try
  const disabledTries = document.querySelectorAll(".disabled input");
  disabledTries.forEach((input) => {
    // add disabled attribute of all inputs
    input.disabled = true;
  });
  // actions in inputs
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    //convert input value to upper case and focus next element
    input.addEventListener("input", () => {
      input.value = input.value.toLocaleUpperCase();
      if (input.nextSibling) {
        input.nextSibling.focus();
      }
    });
    //go right using keyboard
    input.addEventListener("keydown", (event) => {
      if (input.nextSibling && event.key == "ArrowRight") {
        input.nextSibling.focus();
      }
    });
    //go left usin keyboard
    input.addEventListener("keydown", (event) => {
      if (input.previousSibling && event.key == "ArrowLeft") {
        input.previousSibling.focus();
      }
    });
  });
  //check win or lose
  let btnCheck = document.querySelector(".btn-one");
  btnCheck.addEventListener("click", () => {
    let guseeWord = word.toUpperCase().split("");
    let testArray = [];
    //add class name of inputs until change backgroud
    Array.from(tries.children[tryCurrent].children).forEach((ele, index) => {
      if (index > 0) {
        // add complet class if correct letter and place
        if (ele.value === guseeWord[index - 1]) {
          ele.classList.add("complet");
          testArray.push(ele.value);
        }
        // add half class if correct letter and worng place
        else if (guseeWord.includes(ele.value)) {
          ele.classList.add("half");
          testArray.push(ele.value);
        }
        // add worng class if worng letter and  place
        else {
          ele.classList.add("worng");
          testArray.push(ele.value);
        }
      }
    });
    //  all inputs are corrected ==> win and end game
    if (testArray.join("") == word.toUpperCase()) {
      let msg = document.querySelector(".msg p");
      msg.innerHTML = "win";
      // hint button stop work
      hint.disabled = true;
    } else {
      // all or some inputs are incorrected
      //go next try
      if (tryCurrent < numberOfTries - 1) {
        tryCurrent++;
        //add disabled class to all tries
        Array.from(tries.children).forEach((ele) => {
          ele.classList.add("disabled");
        });
        // remove disabled class from current try
        tries.children[tryCurrent].classList.remove("disabled");
        Array.from(tries.children[tryCurrent].children).forEach(
          (ele, index) => {
            // squep span represent inside try
            if (index > 0) {
              ele.disabled = false;
            }
          }
        );
      } else {
        // end tries and lose
        let msg = document.querySelector(".msg p");
        //print message
        msg.innerHTML = `lose, gusee word: ${word}`;
        //hint and btncheck are stoping work
        hint.disabled = true;
        btnCheck.disabled = true;
      }
    }
  });
  // hints
  let hint = document.querySelector(".btn-two");
  hint.addEventListener("click", () => {
    if (hints > 0) {
      // change hints value in page
      hints--;
      hint.children[0].innerHTML = ` ${hints}`;
      // choose random index of guess word
      let randomValue = Math.ceil(Math.random() * word.length);
      // put value of random index of guess word in corrected place on inputs
      tries.children[tryCurrent].children[randomValue].value =
        word[randomValue - 1].toUpperCase();
    }
  });
  // new game
  let newGame = document.querySelector(".btn-three");
  newGame.addEventListener("click", () => {
    location.reload();
  });
}

window.onload = guessGame();
