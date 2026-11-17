// ===== Hemicycle 웹 — 바꿀 수 있는 주소 =====
// steamUrl이 비어 있으면 Steam 버튼은 "상점 페이지 준비 중"으로 보이고 누를 수 없다.
// 상점 페이지가 열리면 주소만 채우면 된다 (예: 'https://store.steampowered.com/app/0000000/Hemicycle/')
window.HEMI_SITE = {
    steamUrl: '',
    youtubeChannel: 'https://www.youtube.com/@Hemicycles',
    trailerKo: 'aKRCh-_S4WU', // 한국어 트레일러 (YouTube 영상 ID)
    trailerEn: 'HPzNE1gdbyE', // 영어 트레일러
};

// ===== 글자 (한국어 · English) — 메인 화면만. 로드맵 · 예전 화면은 한국어 그대로 =====
// HTML의 data-t="키"(글자) · data-t-alt / data-t-aria-label(속성)이 이 표에서 글자를 찾는다
const HEMI_SITE_TEXT = {
    ko: {
        pageTitle: 'Hemicycle',
        description: 'Hemicycle — 정당 · 연정 · 의석 · 입법 · 선거를 직접 운영하는 의회 시뮬레이터. Steam 출시 예정.',
        subtitle: '과반이 없으면 타협도 없다.',
        lead: '정당 · 연정 · 의석을 꾸리고, 법안을 표결에 부치고, 선거를 치르는 의회 시뮬레이터',
        steamTitle: 'Steam 출시 예정',
        steamText: '찜하기를 해 두면 출시 소식을 가장 먼저 받아 볼 수 있어요. 창작마당에서 맵 · 시나리오 · 언어 팩을 나누고, Steam 멀티플레이도 준비하고 있습니다.',
        steamSoon: '상점 페이지 준비 중',
        steamWishlist: 'Steam에서 찜하기',
        trailer: '트레일러',
        trailerThumb: 'Hemicycle 트레일러 미리보기',
        trailerPlay: '트레일러 재생',
        trailerFrame: 'Hemicycle 트레일러',
        trailerAlt: 'English trailer',
        youtubeShort: '공식 유튜브 @Hemicycles ↗',
        links: '바로 가기',
        roadmap: '로드맵 · 업데이트',
        roadmapDesc: '앞으로의 계획과 바뀐 점',
        youtube: '공식 유튜브',
        youtubeDesc: '@Hemicycles · 업데이트 소식과 공지',
        playWeb: '웹에서 플레이',
        classic: '일반 테마',
        classicDesc: '구버전 플레이',
        neon: '네온 테마',
        neonDesc: '데모 플레이',
        theme: '테마',
        light: '라이트',
        dark: '다크',
        neonMode: '네온',
    },
    en: {
        pageTitle: 'Hemicycle',
        description: 'Hemicycle — a parliament simulator where you run parties, coalitions, seats, legislation and elections. Coming to Steam.',
        subtitle: 'No majority, No compromise.',
        lead: 'A parliament simulator: build parties, coalitions and seats, put bills to the vote, and fight elections',
        steamTitle: 'Coming to Steam',
        steamText: 'Wishlist it to be the first to hear about the launch. Share maps, scenarios and language packs on the Workshop — Steam multiplayer is on the way too.',
        steamSoon: 'Store page coming soon',
        steamWishlist: 'Wishlist on Steam',
        trailer: 'Trailer',
        trailerThumb: 'Hemicycle trailer preview',
        trailerPlay: 'Play trailer',
        trailerFrame: 'Hemicycle trailer',
        trailerAlt: 'Korean trailer',
        youtubeShort: 'YouTube @Hemicycles ↗',
        links: 'Links',
        roadmap: 'Roadmap & updates',
        roadmapDesc: 'Plans and what changed (in Korean)',
        youtube: 'YouTube',
        youtubeDesc: '@Hemicycles · updates and announcements',
        playWeb: 'Play on the web',
        classic: 'Classic theme',
        classicDesc: 'Play the old version (Korean)',
        neon: 'Neon theme',
        neonDesc: 'Play the demo (Korean)',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        neonMode: 'Neon',
    },
};

(function () {
    'use strict';
    const cfg = window.HEMI_SITE;
    const LANG_KEY = 'hemiSiteLang';
    const getLang = () => {
        let v = null;
        try { v = localStorage.getItem(LANG_KEY); } catch (e) { /* 저장 불가 */ }
        if (v === 'ko' || v === 'en') return v;
        return /^ko\b/i.test(navigator.language || '') ? 'ko' : 'en'; // 처음엔 브라우저 언어로
    };
    let lang = getLang();
    const t = key => (HEMI_SITE_TEXT[lang] && HEMI_SITE_TEXT[lang][key]) ?? HEMI_SITE_TEXT.ko[key] ?? key;

    function applyLang() {
        document.documentElement.lang = lang;
        document.title = t('pageTitle');
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', t('description'));
        document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
        document.querySelectorAll('[data-t-alt]').forEach(el => el.setAttribute('alt', t(el.dataset.tAlt)));
        document.querySelectorAll('[data-t-aria-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.tAriaLabel)));
        const steam = document.getElementById('steamBtn');
        if (steam) steam.querySelector('.site-btn-label').textContent = t(cfg.steamUrl ? 'steamWishlist' : 'steamSoon');
        const img = document.querySelector('#trailer img');
        if (img) img.src = `https://i.ytimg.com/vi/${mainTrailer()}/hqdefault.jpg`;
        document.querySelectorAll('[data-lang-pick]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.langPick === lang)));
    }
    // 고른 언어의 트레일러가 기본, 아래 링크는 다른 언어 트레일러
    const mainTrailer = () => (lang === 'en' ? cfg.trailerEn : cfg.trailerKo);
    const altTrailer = () => (lang === 'en' ? cfg.trailerKo : cfg.trailerEn);

    document.addEventListener('DOMContentLoaded', () => {
        // Steam 찜하기
        const steam = document.getElementById('steamBtn');
        if (steam) {
            if (cfg.steamUrl) { steam.href = cfg.steamUrl; steam.removeAttribute('aria-disabled'); }
            else { steam.removeAttribute('href'); steam.setAttribute('aria-disabled', 'true'); }
        }
        // 트레일러: 누르기 전에는 썸네일만 — 영상 플레이어는 누를 때 불러온다
        const box = document.getElementById('trailer');
        if (box) {
            const play = id => {
                box.innerHTML = '';
                const f = document.createElement('iframe');
                f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
                f.title = t('trailerFrame');
                f.allow = 'autoplay; encrypted-media; picture-in-picture';
                f.allowFullscreen = true;
                box.appendChild(f);
            };
            box.querySelector('.site-trailer-play').addEventListener('click', () => play(mainTrailer()));
            const alt = document.getElementById('trailerAlt');
            if (alt) alt.addEventListener('click', e => { e.preventDefault(); play(altTrailer()); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
            const img = box.querySelector('img');
            img.onerror = () => img.remove(); // 썸네일을 못 불러오면 검은 바탕 + 재생 버튼만
        }
        document.querySelectorAll('[data-site-link]').forEach(a => { const v = cfg[a.dataset.siteLink]; if (v) a.href = v; });
        // 언어 바꾸기 (한국어 · English) — 고른 언어는 이 브라우저에 기억
        document.querySelectorAll('[data-lang-pick]').forEach(b => b.addEventListener('click', () => {
            lang = b.dataset.langPick;
            try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* 저장 불가 */ }
            applyLang();
        }));
        applyLang();
        // 테마 바꾸기 (라이트 · 다크 · 네온 — js/thememode.js)
        const mark = () => document.querySelectorAll('[data-theme-pick]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themePick === getThemeMode())));
        document.querySelectorAll('[data-theme-pick]').forEach(b => b.addEventListener('click', () => { setThemeMode(b.dataset.themePick); mark(); }));
        mark();
    });
})();
