
const infinteObserver = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      loadNewCards(nextPage++);
    }
  },
  { threshold: 1 }
);

let nextPage = 2;

const loadNewCards = async (page = 1) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
    const cards = await res.json();
    const cardsFragment = document.createDocumentFragment();

    cards.forEach((card) => {
      const post = document.createElement("div");
      post.innerHTML = `
        <h3>${card.id} ${card.title}</h3>
        <p>${card.body}</p>
      `;
      post.className = "card";
      cardsFragment.appendChild(post);
    });

    document.body.appendChild(cardsFragment); 

    const lastCard = document.querySelector(".card:last-child");
    if (lastCard) {
      infinteObserver.observe(lastCard);
    }
  } catch (error) {
    console.error(error);
  }
};


const init = async () => {
  await loadNewCards();
};

document.addEventListener("DOMContentLoaded", init);
