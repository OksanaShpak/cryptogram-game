const SENTENCE = "To be or not to be, that is the question.";

const QWERTY = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const sentenceModel = generateSentenceModel(SENTENCE);
const keyboard = buildKeyboard();
const sentence = buildSentence();

document.body.append(sentence, keyboard);

document.addEventListener('click', handleClick);

function generateSentenceModel(sentence) {
  const codeMap = {};

  return sentence.split(' ').map(word => {
    return {
      word,
      letters: word.split('').map((letter, index) => {
        let code;

        if (codeMap[letter]) {
          code = codeMap[letter];
        } else {
          code = Object.keys(codeMap).length + 1;
          codeMap[letter] = code;
        }

        return {
          letter,
          code,
          isOpen: Math.random() > 0.9
        }
      })
    };
  });
}

function buildSentence() {
  const letterLists = sentenceModel.map(wordObj => {
    const letters = wordObj.letters.map(letterObj => {
      const letter = document.createElement('li');
      letter.textContent = letterObj.letter;
      letter.dataset.code = letterObj.code;
      if (letterObj.isOpen) {
        letter.classList.add('is-open');
      }
      letter.onanimationend = () => letter.classList.remove('is-mistake');
      return letter;
    })
    const letterList = document.createElement('ul');
    const wordWrapper = document.createElement('li');
    wordWrapper.append(letterList);
    letterList.append(...letters);
    return wordWrapper;
  });
  const wordList = document.createElement('ul');
  wordList.id = 'sentence';
  wordList.append(...letterLists);

  return wordList;
}

function buildKeyboard() {
  const keyboard = document.createElement('ul');
  keyboard.id = 'keyboard';
  keyboard.append(...QWERTY.map(row => {
    const rowWrapper = document.createElement('li');
    const rowEl = document.createElement('ul');
    rowWrapper.appendChild(rowEl).append(...row.map(letter => {
      const letterEl = document.createElement('li');
      letterEl.textContent = letter;
      return letterEl;
    }));
    return rowWrapper;
  }));
  return keyboard;
}

function handleClick(e) {
  const li = e.target.closest('li');
  if (li?.matches('#sentence li li')) {
    setTarget(li);
  } else if (li?.matches('#keyboard li li')) {
    insertLetter(li.innerText);
  }
}

function setTarget(li) {
  document.querySelector('.is-target')?.classList.remove('is-target');
  li.classList.add('is-target');
}

function insertLetter(letter) {
  const target = document.querySelector('.is-target');
  if (target.innerText === letter) {
    target?.classList.add('is-open')
  } else {
    target?.classList.add('is-mistake')
  }
}