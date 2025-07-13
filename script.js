const SENTENCE = "To be or not to be, that is the question.";

const sentenceModel = generateSentenceModel(SENTENCE);

renderSentence();

document.addEventListener('click', openLetter);

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

function renderSentence() {
  const letterLists = sentenceModel.map(wordObj => {
    const letters = wordObj.letters.map(letterObj => {
      const letter = document.createElement('li');
      letter.textContent = letterObj.letter;
      letter.dataset.code = letterObj.code;
      if (letterObj.isOpen) {
        letter.classList.add('is-open');
      }
      return letter;
    })
    const letterList = document.createElement('ul');
    const wordWrapper = document.createElement('li');
    wordWrapper.append(letterList);
    letterList.append(...letters);
    return wordWrapper;
  });
  const wordList = document.createElement('ul');
  wordList.append(...letterLists);
  document.body.replaceChildren(wordList);
}

function openLetter(e) {
  e.target.classList.add('is-open');
}
