const form = document.querySelector('#guestbook-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const notice = document.querySelector('#notice');
const list = document.querySelector('#list');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');
const STORAGE_KEY = 'guestbook-items';
let items = [];

function loadItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    items = Array.isArray(saved) ? saved : [];
  } catch (error) {
    items = [];
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function clearNotice() {
  notice.textContent = '';
}

function showList() {
  list.innerHTML = '';

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const li = document.createElement('li');

    const meta = document.createElement('div');
    meta.textContent = `${item.name}${item.email ? ` (${item.email})` : ''}`;

    const message = document.createElement('div');
    message.textContent = item.message;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = '삭제';
    removeButton.addEventListener('click', function () {
      items.splice(i, 1);
      saveItems();
      showList();
    });

    li.append(meta, message, removeButton);
    list.append(li);
  }

  count.textContent = `${items.length}개`;
  empty.textContent = items.length === 0 ? '아직 남긴 글이 없습니다.' : '';
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (name === '') {
    notice.textContent = '이름을 입력하세요.';
    nameInput.focus();
    return;
  }

  if (message === '') {
    notice.textContent = '메시지를 입력하세요.';
    messageInput.focus();
    return;
  }

  clearNotice();
  items.push({ name, email, message });
  saveItems();
  showList();
  form.reset();
  nameInput.focus();
});

nameInput.addEventListener('input', clearNotice);
emailInput.addEventListener('input', clearNotice);
messageInput.addEventListener('input', clearNotice);
loadItems();
showList();