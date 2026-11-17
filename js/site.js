// ===== Hemicycle 웹 — 바꿀 수 있는 주소 =====
// steamUrl이 비어 있으면 Steam 버튼은 "상점 페이지 준비 중"으로 보이고 누를 수 없다.
// 상점 페이지가 열리면 주소만 채우면 된다 (예: 'https://store.steampowered.com/app/0000000/Hemicycle/')
window.HEMI_SITE = {
    steamUrl: '',
    youtubeChannel: 'https://www.youtube.com/@Hemicycles',
    trailerKo: 'aKRCh-_S4WU', // 한국어 트레일러 (YouTube 영상 ID)
    trailerEn: 'HPzNE1gdbyE', // 영어 트레일러
};

(function () {
    'use strict';
    const cfg = window.HEMI_SITE;
    document.addEventListener('DOMContentLoaded', () => {
        // Steam 찜하기
        const steam = document.getElementById('steamBtn');
        if (steam) {
            if (cfg.steamUrl) {
                steam.href = cfg.steamUrl;
                steam.removeAttribute('aria-disabled');
                steam.querySelector('.site-btn-label').textContent = 'Steam에서 찜하기';
            } else {
                steam.removeAttribute('href');
                steam.setAttribute('aria-disabled', 'true');
            }
        }
        // 트레일러: 누르기 전에는 썸네일만 — 영상 플레이어는 누를 때 불러온다
        const box = document.getElementById('trailer');
        if (box) {
            const play = id => {
                box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Hemicycle 트레일러" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
            };
            box.querySelector('.site-trailer-play').addEventListener('click', () => play(cfg.trailerKo));
            const en = document.getElementById('trailerEn');
            if (en) en.addEventListener('click', e => { e.preventDefault(); play(cfg.trailerEn); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
            const img = box.querySelector('img');
            img.onerror = () => img.remove(); // 썸네일을 못 불러오면 검은 바탕 + 재생 버튼만
            img.src = `https://i.ytimg.com/vi/${cfg.trailerKo}/hqdefault.jpg`;
        }
        document.querySelectorAll('[data-site-link]').forEach(a => { const v = cfg[a.dataset.siteLink]; if (v) a.href = v; });
        // 테마 바꾸기 (라이트 · 다크 · 네온 — js/thememode.js)
        const mark = () => document.querySelectorAll('[data-theme-pick]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themePick === getThemeMode())));
        document.querySelectorAll('[data-theme-pick]').forEach(b => b.addEventListener('click', () => { setThemeMode(b.dataset.themePick); mark(); }));
        mark();
    });
})();
