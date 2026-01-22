import r2wc from "@r2wc/react-to-web-component";
import Home from "./app/page";
// @ts-ignore
import styles from "./app/wc-styles.css";

// Inject styles and fonts dynamically
if (typeof window !== 'undefined') {
    // Inject Google Fonts
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
        const fontLink = document.createElement('link');
        fontLink.setAttribute('rel', 'stylesheet');
        const fontUrl = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Outfit:wght@100..900&display=swap';
        fontLink.setAttribute('href', fontUrl);
        document.head.appendChild(fontLink);
    }

    // Inject Tailwind Styles
    const styleId = 'language-kids-styles';
    if (!document.getElementById(styleId)) {
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }
}

const LanguageKidsWC = r2wc(Home, {
    props: {
        // You can extend this to accept initial language or other settings
    },
});

if (typeof window !== 'undefined' && !customElements.get('language-kids')) {
    customElements.define("language-kids", LanguageKidsWC);
}

export default LanguageKidsWC;
