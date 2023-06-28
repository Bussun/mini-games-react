import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBack from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(initReactI18next)
.use(HttpBack)
.use(LanguageDetector)
.init({
    supportedLngs: ["fr", "en", "bg"],
    fallbackLng: "en",
    nonExplicitSupportedLngs: true,
    interpolation: {
        escapeValue: false,
    },
});

export default i18next;