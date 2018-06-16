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

function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}

function selectQuote(quotes) {
  let max = quotes.length;
  let randomIndex = getRandom(max);
  return quotes[randomIndex];
}

function handleClick(displayEl, toDisplay: {content: string, title:string}) {
  displayEl.innerHTML = toDisplay.content;
}

function displayReady(displayEl) {
  displayEl.innerHTML = "Ready to Generate!";
}

function main(data) {
  // TODO: Change function name. Maybe 'displayQuote'
  // TODO: Make sure quotes are not selected twice in a row.
  let button = document.getElementById('gen');
  let displayEl = document.getElementById('display');
  displayReady(displayEl);
  button.addEventListener('click', () => handleClick(displayEl, selectQuote(data)));
}

getQuotes(2);