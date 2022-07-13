// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

console.log("hello from js")
const wordInput = document.getElementById("word");
const letters = document.querySelectorAll(".letter");
const button = document.getElementById("submit");

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

document.querySelectorAll(".letter").forEach((element) => {
  element.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("used")) {
      removeCharFromInput(event.currentTarget.innerHTML);
    } else {
      addCharToInput(event.currentTarget.innerHTML);
    }
    event.currentTarget.classList.toggle("used");
  })
});

wordInput.addEventListener("keyup", (event) => {
  if (alphabet.includes(event.key.toUpperCase())) {
    console.log(`marking used: ${event.key}`);
    markUsed(event.key);
  } else {
    console.log(`marking unused: ${event.key}`);
    markUnused();
  }
  checkValid();
})

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
  letters.forEach((letter) => {
    if ((!letter.classList.contains("used")) && (letter.innerHTML === char)) {
      oneLetter.push(letter);
    }
  })

  if (oneLetter.length > 0) {
    oneLetter[0].classList.add("used");
  }
}

const markUnused = () => {
  lettersToMarkUnused().forEach(letter => letter.classList.remove("used"))
}

const lettersToMarkUnused = () => {
  const unUsedLetters = [];
  const word = wordInput.value.split('');
  document.querySelectorAll(".used").forEach((letter) => {
    if ( word.includes(letter.innerHTML) ) {
      word.splice(word.lastIndexOf(letter.innerHTML),1);
    } else { unUsedLetters.push(letter); }
  });
  return unUsedLetters;
}

const letterArray = () => {
  const letterArr = [];
  letters.forEach(letter => letterArr.push(letter.innerHTML));
  return letterArr;
}

const checkValid = () => {

console.log(validSelection());
  if (validSelection() && validWord()) {
    console.log('valid');
    wordInput.classList.remove('is-invalid');
    button.disabled = false;
  } else {
    console.log('invalid');
    wordInput.classList.add('is-invalid');
    button.disabled = true;
  }
}

const validSelection = () => {
  const availableLetters = letterArray();
  let valid = true;
  wordInput.value.split('').forEach((letter) => {
    if (availableLetters.includes(letter)) {
      availableLetters.splice(availableLetters.lastIndexOf(letter), 1);
      } else {
      valid = false;
    }
  })
  return valid;
}

const validWord = () => {
  return true;
}
