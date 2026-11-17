# Hemicycle 웹

Hemicycle의 웹 페이지입니다. 게임 홍보용 페이지입니다. 게임(시뮬레이터 · 메이커)은 데스크톱 앱(`Jedidiah1926/parliament`, Steam으로 출시)으로, 소개 · 로드맵 · 웹 플레이(구버전 · 데모)는 이 저장소(웹)로 나눕니다. 게임 내려받기 링크는 두지 않습니다.

| 파일 | 설명 |
|------|------|
| `index.html` | 메인 — Steam 출시 예정 · 찜하기, 트레일러, 공식 유튜브, 로드맵, 웹에서 플레이(일반 테마 · 네온 테마) |
| `roadmap.html` | 개발 로드맵 · 업데이트 내역 (`js/roadmap.js`, `css/roadmap.css`) — 한국어만 |
| `old.html` | 일반 테마 — 구버전 플레이 |
| `old2.html` | 네온 테마 — 데모 플레이 (UI 개편 전 화면, `old2/`) |

- 주소 바꾸기: `js/site.js`의 `HEMI_SITE` — Steam 상점 주소(`steamUrl`, 비어 있으면 "상점 페이지 준비 중"), 유튜브 채널 · 트레일러 영상 ID
- 테마: 라이트 · 다크 · 네온 (`js/thememode.js`, `css/modern.css`) — 메인 아래의 버튼으로 바꾸고, 로드맵도 같은 테마를 따른다
- 빌드 없이 그대로 올리는 정적 사이트 (GitHub Pages: Settings › Pages › Branch `main` / root). `.nojekyll`은 파일을 그대로 내보내게 한다

`css/modern.css` · `css/scrollbars.css` · `js/thememode.js` · `js/theme.js` · `js/dialogs.js` · `js/cursor.js` · `js/segmented.js` · `js/modern-style-index.js` · `js/hemi-bg.js` · `fonts/`는 게임 저장소에서 복사해 온 것입니다. 게임 쪽에서 바뀌면 같이 맞춰 주세요.
