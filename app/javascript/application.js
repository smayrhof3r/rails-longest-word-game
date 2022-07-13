// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

console.log("hello from js")
const wordInput = document.getElementById("word");
const letterChoices = document.querySelectorAll(".letter");
const button = document.getElementById("submit");
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const removeCharFromInput = (char) => {
  const word = wordInput.value.split('');
  word.splice(word.lastIndexOf(char), 1);
  wordInput.value = word.join('');
};

const addCharToInput = (char) => {
  wordInput.value += char;
};

const markUsed = (char) => {
  let oneLetter = [];
  letterChoices.forEach((letter) => {
    if ((!letter.classList.contains("used")) && (letter.innerHTML === char)) {
      oneLetter.push(letter);
    }
  })

  if (oneLetter.length > 0) {
    oneLetter[0].classList.add("used");
  }
}

const markUnused = () => {
  letterChoicesToMarkUnused().forEach(letter => letter.classList.remove("used"))
}

const letterChoicesToMarkUnused = () => {
  const unUsedletterChoices = [];
  const word = wordInput.value.split('');
  document.querySelectorAll(".used").forEach((letter) => {
    if ( word.includes(letter.innerHTML) ) {
      word.splice(word.lastIndexOf(letter.innerHTML),1);
    } else { unUsedletterChoices.push(letter); }
  });
  return unUsedletterChoices;
}

const letterArray = () => {
  const letterArr = [];
  letterChoices.forEach(letter => letterArr.push(letter.innerHTML));
  return letterArr;
}

const checkValid = () => {
  validWord();
  if (!button.disabled) {
    validSelection();
  }
}

const markValidity = (valid) => {
  console.log(valid);
  if (valid) {
    wordInput.classList.remove('is-invalid');
    button.disabled = false;
  } else {
    wordInput.classList.add('is-invalid');
    button.disabled = true;
  }
}

const validSelection = () => {
  const availableletterChoices = letterArray();
  let valid = true;
  wordInput.value.split('').forEach((letter) => {
    if (availableletterChoices.includes(letter)) {
      availableletterChoices.splice(availableletterChoices.lastIndexOf(letter), 1);
      } else { valid = false; }
  })
  markValidity(valid);
}

const validWord = () => {
  console.log("checking..");
  fetch(`https://wagon-dictionary.herokuapp.com/${wordInput.value}`)
    .then(response => response.json())
    .then(result => markValidity(result.found));
}

document.querySelectorAll(".letter").forEach((element) => {
  element.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("used")) {
      removeCharFromInput(event.currentTarget.innerHTML);
    } else {
      addCharToInput(event.currentTarget.innerHTML);
    }
    event.currentTarget.classList.toggle("used");
    if (wordInput.value.length > 1) { validWord(); }
  })
});

wordInput.addEventListener("keyup", (event) => {
  if (alphabet.includes(event.key.toUpperCase())) {
    markUsed(event.key);
  } else { markUnused(); }

  checkValid();
})
