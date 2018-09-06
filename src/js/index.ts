import '../styles/styles.scss';
import axios from 'axios';

function getQuotes(numQuotes: number) {
  let url = `http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=${numQuotes}`;
  axios({
    method: 'get',
    url: url,
  }).then((res) => {
    main(res.data);
  });
}

function selectQuote(quotes, quoteState: number) {
  // Rather than randomly selecting, give users a couple of quotes and then let them shuffle them.
  let max = quotes.length;
  let quoteIndex = quoteState % (max);
  return quotes[quoteIndex];
}

function displayQuote(displayEl, toDisplay: {content: string, title:string}) {
  displayEl.innerHTML = toDisplay.content;
}

function shuffle(data) {
  // Knuth Shuffle
  let randomNum;
  let currIndex = data.length;

  while(currIndex > 0) {
    randomNum = Math.floor(Math.random() * currIndex);
    --currIndex;

    let temp = data[currIndex];
    data[currIndex] = data[randomNum]
    data[randomNum] = temp;
  }
  return data;
}

function main(data) {
  // TODO: Change function name to something more descriptive
  let nextButton = document.getElementById('next');
  let prevButton = document.getElementById('prev');
  let shuffleButton = document.getElementById('shuffle');
  let displayEl = document.getElementById('display');
  let quoteState: number = 0;
  displayQuote(displayEl, data[0]);
  nextButton.addEventListener('click', () => {
    ++quoteState;
    displayQuote(displayEl, selectQuote(data, quoteState))
  });

  prevButton.addEventListener('click', () => {
    if(quoteState > 0) {
      --quoteState;
      displayQuote(displayEl, selectQuote(data, quoteState))
    }
  });

  shuffleButton.addEventListener('click', () => {
    data = shuffle(data);
    displayQuote(displayEl, selectQuote(data, quoteState));
  })
}

let genButton = document.getElementById('gen');
let displayEl = document.getElementById('display');
genButton.addEventListener('click', () => {
  displayEl.innerHTML = 'Generating Initial Quotes . . .';
  // TODO: Have generation button disappear once quotes are generated.
  getQuotes(10);
});