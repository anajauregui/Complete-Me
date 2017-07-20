import Node from './Node';
import words from './words.json'

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(word) {
    const node = new Node()

    if (!this.root) {
      this.root = node;
    }

    let currentNode = this.root;
    let letters = [...word.toLowerCase()];

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })

    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
    }
  }

  count() {
    return this.wordCount
  }

  suggest(prefix) {
    let currentNode = this.root;
    let prefixArray = [...prefix];
    let suggestionsArray = [];

    for (let i = 0; i < prefixArray.length; i++) {
      currentNode = currentNode.children[prefixArray[i]]
    }//currentNode now refers to the last leter in our word

    const traverseTheTrie = (prefix, currentNode) => {
      let childLetters = Object.keys(currentNode.children);

      childLetters.forEach( letter => {
        const child = currentNode.children[letter];
        let newString = prefix + letter;

        if (child.isWord) {
          suggestionsArray.push({word: newString, frequency: child.frequency, lastTouched: child.lastTouched})
        }
        traverseTheTrie(newString, child)
      })
    };

    if (currentNode && currentNode.isWord) {
      suggestionsArray.push({word: prefix, frequency: currentNode.frequency, lastTouched: currentNode.lastTouched})
    }

    if (currentNode) {
      traverseTheTrie(prefix, currentNode);
    }

    suggestionsArray.sort((a, b) => {
      return b.frequency - a.frequency || b.lastTouched - a.lastTouched;
    })

    return suggestionsArray.map(obj => {
      return obj.word
    })
  }

  select(word) {
    let wordsArray = [...word];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }
    currentNode.frequency++
    currentNode.lastTouched = Date.now();
  }

  populate() {
    words.forEach(word => {
      this.insert(word);
    })
  }

}
