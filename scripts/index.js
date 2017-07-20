import Trie from './Trie.js'

const userInput = document.getElementById('word-input');
const searchTrie = new Trie()

$(document).ready(populateDictionary)
document.getElementById('word-input').focus()
userInput.addEventListener('input', filterList)
$('aside').on('click', '.btn', function(e) {
  selection(e)
})
$('#word-input').on('input', clearInput)

function populateDictionary () {
  searchTrie.populate()
}

function filterList() {
  const string = $(userInput).val();
  const suggestions = searchTrie.suggest(string);

  $('.btn').remove();

  for (let i = 0; i < 10 && suggestions.length; i++) {
    if (suggestions[i] !== undefined) {
      $('aside').append(`<button class="btn" id="Date.now()">${suggestions[i]}</button>`)
    }
  }
}

function selection(e) {
  let selected = e.target.innerHTML

  searchTrie.select(selected);
  filterList();
}

function clearInput() {
  if ($('#word-input').val() === '') {
    $('.btn').remove()
  } else {
    filterList()
  }
}
