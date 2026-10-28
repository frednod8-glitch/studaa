const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.getElementById('year').textContent = new Date().getFullYear();

const cards = [...document.querySelectorAll('.post-card')];
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const loadMoreButton = document.getElementById('loadMore');
let activeCategory = 'All';
let query = '';
let expanded = false;

function updatePosts() {
  let shown = 0;
  cards.forEach((card, index) => {
    const categoryMatches = activeCategory === 'All' || card.dataset.category === activeCategory;
    const searchMatches = !query || card.textContent.toLowerCase().includes(query);
    const withinLimit = expanded || index < 4;
    const visible = categoryMatches && searchMatches && withinLimit;
    card.hidden = !visible;
    if (visible) shown++;
  });
  emptyState.hidden = shown !== 0;
  loadMoreButton.hidden = expanded || (activeCategory !== 'All') || Boolean(query) || cards.length <= 4;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('selected', item === button));
  updatePosts();
}));
document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  query = searchInput.value.trim().toLowerCase();
  updatePosts();
});
searchInput.addEventListener('input', () => {
  query = searchInput.value.trim().toLowerCase();
  updatePosts();
});
document.querySelectorAll('[data-topic]').forEach(link => link.addEventListener('click', () => {
  activeCategory = link.dataset.topic;
  filterButtons.forEach(item => item.classList.toggle('selected', item.dataset.filter === activeCategory));
  updatePosts();
}));
document.querySelectorAll('[data-show-category]').forEach(link => link.addEventListener('click', () => {
  activeCategory = link.dataset.showCategory;
  filterButtons.forEach(item => item.classList.toggle('selected', item.dataset.filter === activeCategory));
  updatePosts();
}));
loadMoreButton.addEventListener('click', () => { expanded = true; updatePosts(); });

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const message = document.getElementById('newsletterMessage');
  message.textContent = 'Thanks! This demo form is not connected yet. Add an email service to collect subscribers.';
});

updatePosts();
