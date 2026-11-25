const tarotDrawButton = document.querySelector('#tarot-draw-button');
const tarotResults = document.querySelector('#tarot-results');
const tarotStatus = document.querySelector('#tarot-status');
const tarotTimes = ['오전', '오후', '저녁'];

function drawTarotCards() {
  const shuffledDeck = [...tarotDeck];

  for (let index = shuffledDeck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledDeck[index], shuffledDeck[swapIndex]] = [shuffledDeck[swapIndex], shuffledDeck[index]];
  }

  const readings = shuffledDeck.slice(0, tarotTimes.length).map((card, index) => ({
    card,
    reversed: Math.random() < 0.5,
    time: tarotTimes[index]
  }));

  tarotResults.replaceChildren();

  readings.forEach(({ card, reversed, time }) => {
    const article = document.createElement('article');
    article.className = 'tarot-reading-card';

    const timeHeading = document.createElement('h3');
    timeHeading.textContent = time;

    const image = document.createElement('img');
    image.src = card.image;
    image.alt = `${card.name} 카드${reversed ? ' 역방향' : ''}`;
    image.loading = 'lazy';
    if (reversed) {
      image.classList.add('is-reversed');
    }

    const cardHeading = document.createElement('h4');
    cardHeading.textContent = card.name;

    const orientation = document.createElement('p');
    orientation.className = 'tarot-orientation';
    orientation.textContent = reversed ? '역방향' : '정방향';

    const meaning = document.createElement('p');
    meaning.className = 'tarot-meaning';
    meaning.textContent = reversed ? card.reversed : card.upright;

    article.append(timeHeading, image, cardHeading, orientation, meaning);
    tarotResults.append(article);
  });

  tarotStatus.textContent = '오전·오후·저녁의 카드 세 장을 뽑았습니다.';
}

tarotDrawButton.addEventListener('click', drawTarotCards);
