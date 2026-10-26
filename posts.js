/* =========================================================
   게시물 목록 — 새 게시물은 POSTS 맨 위에 하나 추가하면 끝!

   짧은 게시물 (인스타처럼 그림 + 캡션)
     { date:"2026.11.03", tag:"레고", art:"lego", bg:"#fbf1d3",
       title:"제목", caption:"짧은 설명" },

   긴 게시물 (블로그 글) — url을 적고, posts 폴더에 글 파일을 만들어요
     { ..., url:"posts/robot.html", minutes:4 },

   tag가 새로운 이름이면 하이라이트 동그라미가 자동으로 생겨요.
   ========================================================= */

const POSTS = [
  { date:"2026.10.20", tag:"웹", art:"web", bg:"var(--soft)",
    title:"내 홈페이지가 인터넷에 올라간 날",
    caption:"깃허브 페이지로 처음 올렸는데 10분 동안 404만 봤다. 범인은 파일 이름이었다.",
    url:"posts/github-pages.html", minutes:3 },

  { date:"2026.10.03", tag:"센서", art:"sprout", bg:"#dcefe3",
    title:"새싹 등장",
    caption:"자동 물 주기 화분에서 드디어 새싹이 났다. 이번엔 홍수 없이!" },

  { date:"2026.09.14", tag:"센서", art:"pot", bg:"#f6e3d6",
    title:"화분이 물에 잠긴 날",
    caption:"자동 물 주기 화분이 물을 멈추지 않았다. 센서 값을 직접 재 보고 기준을 바꿨다.",
    url:"posts/plant-pot.html", minutes:4 },

  { date:"2026.08.21", tag:"일상", art:"sunset", bg:"#fbe7c6",
    title:"바다 산책",
    caption:"방학 마지막 주. 해 지는 거 보면서 다음 작품 구상 중." },

  { date:"2026.07.30", tag:"레고", art:"crane", bg:"#e9ecef",
    title:"레고 크레인",
    caption:"테크닉으로 만든 크레인. 실이 감기는 부분만 3D 프린터로 출력해서 붙였다." },

  { date:"2026.06.08", tag:"3D프린팅", art:"stand", bg:"var(--soft)",
    title:"휴대폰 거치대, 네 번 만에 성공",
    caption:"넘어지고, 부러지고, 갈라졌다. 결국 모양이 아니라 출력 방향이 문제였다.",
    url:"posts/phone-stand.html", minutes:5 },

  { date:"2026.05.11", tag:"3D프린팅", art:"spag", bg:"#f3e6e1",
    title:"스파게티 사건",
    caption:"자고 일어났더니 작품 대신 스파게티가… 첫 레이어가 바닥에 안 붙었던 것." },

  { date:"2026.04.02", tag:"레고", art:"lego", bg:"#fbf1d3",
    title:"부품 정리",
    caption:"레고 부품을 색깔별로 정리했다. 3시간 걸림." },

  { date:"2026.03.15", tag:"3D프린팅", art:"key", bg:"#f6e3d6",
    title:"첫 출력",
    caption:"3D 프린터로 처음 뽑은 열쇠고리. 실이 조금 엉켰지만 첫 작품!" }
];

/* =========================================================
   그림 모음 — 사진 대신 쓰는 간단한 그림이에요.
   art:"이름" 으로 골라 써요.
   진짜 사진을 쓰고 싶으면 images 폴더에 사진을 올리고
   art 대신 photo:"images/사진.jpg" 라고 적으면 돼요.
   ========================================================= */
const ART = {
  stand: '<path d="M25 160 H175 L145 85 H100 L75 30 H55 Z" fill="var(--accent)"/>',
  pot:   '<path d="M60 100 H140 L126 170 H74 Z" fill="var(--warn)"/><path d="M100 100 V50 M100 70 Q78 46 66 60 M100 60 Q124 30 138 46" fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="round"/>',
  web:   '<rect x="30" y="40" width="140" height="110" rx="12" fill="none" stroke="var(--accent)" stroke-width="9"/><path d="M78 80 L60 95 L78 110 M122 80 L140 95 L122 110" fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="round"/>',
  key:   '<circle cx="80" cy="80" r="34" fill="none" stroke="var(--warn)" stroke-width="12"/><path d="M104 104 L160 160 M140 140 L155 125 M150 150 L165 135" stroke="var(--warn)" stroke-width="12" stroke-linecap="round"/>',
  crane: '<path d="M60 170 V50 H160 M60 50 L95 85 M140 50 V100" fill="none" stroke="#16201f" stroke-width="9" stroke-linecap="round"/><rect x="125" y="100" width="30" height="24" fill="#f2c14e"/><rect x="40" y="165" width="60" height="12" fill="#c2521f"/>',
  sunset:'<circle cx="100" cy="110" r="38" fill="#f2c14e"/><rect x="0" y="120" width="200" height="80" fill="#0d7f81"/><path d="M20 140 Q40 130 60 140 T100 140 T140 140 T180 140" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>',
  spag:  '<path d="M40 150 Q60 60 80 130 T120 110 T160 140 M50 120 Q90 40 110 140 T150 90" fill="none" stroke="#c2521f" stroke-width="6" stroke-linecap="round"/>',
  sprout:'<path d="M100 170 V100" stroke="#0d7f81" stroke-width="9" stroke-linecap="round"/><path d="M100 110 Q60 100 64 66 Q100 72 100 110 Z M100 100 Q140 86 140 54 Q104 60 100 100 Z" fill="#0d7f81"/><rect x="40" y="165" width="120" height="16" rx="8" fill="#c2521f"/>',
  lego:  '<rect x="40" y="90" width="120" height="70" rx="6" fill="#f2c14e"/><g fill="#f2c14e" stroke="#16201f" stroke-opacity=".25" stroke-width="3"><rect x="52" y="70" width="24" height="20" rx="4"/><rect x="88" y="70" width="24" height="20" rx="4"/><rect x="124" y="70" width="24" height="20" rx="4"/></g>'
};
