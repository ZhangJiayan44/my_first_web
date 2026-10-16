// ============================================================
// app.js —— 页面里所有"会动"的部分
// 现在只有两件事：1) 一个按钮  2) 一个能勾选的学习清单
// ============================================================

// ---------- 1. 按钮 ----------
const btn = document.getElementById('btn');
const out = document.getElementById('out');

const messages = [
  '页面加载成功，说明 HTML / CSS / JS 都没写错 👍',
  '按 F12 → Console，能看到我打印的日志。',
  '改动这个文件 → git add → git commit → git push，网站就会变。',
  'GitHub Pages 会自动把仓库里的 index.html 发布成网站。',
];

let i = 0;
btn.addEventListener('click', () => {
  out.textContent = messages[i];
  i = (i + 1) % messages.length;
  console.log('[按钮]', out.textContent);
});

// ---------- 2. 学习清单（勾选状态存在浏览器本地） ----------
const KEY = 'my-first-web-checklist';

const defaultItems = [
  { text: 'git init —— 把文件夹变成仓库', done: false },
  { text: 'git add —— 把改动放进暂存区', done: false },
  { text: 'git commit —— 存成一个版本快照', done: false },
  { text: 'git push —— 推到 GitHub', done: false },
  { text: '开启 GitHub Pages —— 公网能打开', done: false },
];

const checklist = document.getElementById('checklist');
const progress = document.getElementById('progress');

let items = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('本地数据读不出来，用默认清单', e);
  }
  return defaultItems;
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(items));
}

function render() {
  checklist.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.done) li.classList.add('done');

    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = item.done;

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = item.text;

    // 点整行也能勾选
    li.addEventListener('click', (e) => {
      if (e.target !== box) box.checked = !box.checked;
      items[index].done = box.checked;
      save();
      render();
    });

    li.append(box, span);
    checklist.appendChild(li);
  });

  const done = items.filter(x => x.done).length;
  progress.textContent = `进度 ${done} / ${items.length}` + (done === items.length ? ' —— 全部走完了，你已经会了 🎉' : '');
}

// ---------- 3. 页脚年份 ----------
document.getElementById('year').textContent = new Date().getFullYear();

render();
console.log('%cmy_first_web 已加载 ✓', 'color:#2563eb;font-size:14px');
