/* =========================================================
   첫 화면을 그리는 코드예요.
   게시물을 추가할 때는 posts.js만 고치면 되고, 이 파일은 그대로 둬요.
   ========================================================= */

// 게시물 그림 만들기: 사진(photo)이 있으면 사진, 없으면 그림(art)
function picture(p){
  if (p.photo) return '<img src="' + p.photo + '" alt="" style="width:100%;height:100%;object-fit:cover;display:block">';
  return '<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
       + '<rect width="200" height="200" fill="' + p.bg + '"/>' + (ART[p.art] || '') + '</svg>';
}
function meta(p){
  return '<div class="meta"><span>' + p.date + '</span><span class="tag">#' + p.tag + '</span>'
       + (p.url ? '<span>' + p.minutes + '분</span>' : '') + '</div>';
}

const feed = document.getElementById('feed');
const about = document.getElementById('about');
const highlights = document.getElementById('highlights');
const overlay = document.getElementById('overlay');
const sheet = document.getElementById('sheet');
let view = 'grid';     // 'grid' 피드 / 'list' 제작 기록 / 'about' 소개
let topic = '전체';
let shown = [];
let openIndex = -1;

// 숫자 채우기
document.getElementById('countAll').textContent = POSTS.length;
document.getElementById('countLong').textContent = POSTS.filter(p => p.url).length;

// 하이라이트 동그라미
['전체', ...new Set(POSTS.map(p => p.tag))].forEach(t => {
  const b = document.createElement('button');
  b.className = 'hl';
  b.setAttribute('aria-pressed', t === topic);
  b.innerHTML = '<i>' + (t === '전체' ? 'ALL' : '#') + '</i>' + t;
  b.onclick = () => {
    topic = t;
    highlights.querySelectorAll('.hl').forEach(x => x.setAttribute('aria-pressed', x === b));
    if (view === 'about') setView('grid'); else render();
  };
  highlights.appendChild(b);
});

function render(){
  const byTopic = POSTS.filter(p => topic === '전체' || p.tag === topic);
  if (view === 'grid'){
    shown = byTopic;
    feed.innerHTML = '<div class="grid">' + shown.map((p, i) =>
      '<button class="tile" data-i="' + i + '" aria-label="' + p.title + '">' + picture(p)
      + (p.url ? '<span class="badge">글</span>' : '') + '</button>').join('') + '</div>';
    feed.querySelectorAll('[data-i]').forEach(el => el.onclick = () => openPost(+el.dataset.i));
  } else if (view === 'list'){
    shown = byTopic.filter(p => p.url);
    feed.innerHTML = shown.length
      ? '<ol class="list">' + shown.map(p =>
          '<li><a href="' + p.url + '"><span class="mini">' + picture(p) + '</span><span style="display:grid;gap:4px;min-width:0">'
          + meta(p) + '<h3>' + p.title + '</h3><p>' + p.caption + '</p></span></a></li>').join('') + '</ol>'
      : '<p class="empty">이 주제에는 아직 제작 기록이 없어요.</p>';
  }
}

// 게시물 열기 (긴 글은 요약과 "전체 글 읽기" 버튼)
function openPost(i){
  openIndex = i;
  const p = shown[i];
  sheet.innerHTML =
    '<div class="photo">' + picture(p) + '</div>'
  + '<div class="text">' + meta(p) + '<h2 id="sheetTitle">' + p.title + '</h2><p>' + p.caption + '</p>'
  + (p.url ? '<a class="read" href="' + p.url + '">전체 글 읽기 →</a>' : '')
  + '<div class="bar"><button id="newerBtn"' + (i === 0 ? ' disabled' : '') + '>← 최근</button>'
  + '<span class="meta">' + (i + 1) + ' / ' + shown.length + '</span>'
  + '<button id="olderBtn"' + (i === shown.length - 1 ? ' disabled' : '') + '>지난 →</button></div></div>';
  document.getElementById('newerBtn').onclick = () => openPost(i - 1);
  document.getElementById('olderBtn').onclick = () => openPost(i + 1);
  overlay.hidden = false;
  document.getElementById('closeBtn').focus();
}
function closePost(){
  overlay.hidden = true;
  const tile = feed.querySelector('[data-i="' + openIndex + '"]');
  if (tile) tile.focus();
}
document.getElementById('closeBtn').onclick = closePost;
overlay.addEventListener('click', e => { if (e.target === overlay) closePost(); });
document.addEventListener('keydown', e => {
  if (overlay.hidden) return;
  if (e.key === 'Escape') closePost();
  if (e.key === 'ArrowRight' && openIndex < shown.length - 1) openPost(openIndex + 1);
  if (e.key === 'ArrowLeft' && openIndex > 0) openPost(openIndex - 1);
});

// 탭 바꾸기
const tabs = { grid: 'tabGrid', list: 'tabList', about: 'tabAbout' };
function setView(v){
  view = v;
  Object.entries(tabs).forEach(([k, id]) => document.getElementById(id).setAttribute('aria-selected', k === v));
  feed.hidden = (v === 'about');
  about.hidden = (v !== 'about');
  render();
}
Object.entries(tabs).forEach(([k, id]) => document.getElementById(id).onclick = () => setView(k));

// 주소 끝이 #about 이면 소개 탭으로 시작
setView(location.hash === '#about' ? 'about' : location.hash === '#list' ? 'list' : 'grid');
