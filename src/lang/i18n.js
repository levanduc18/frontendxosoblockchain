import { createI18n } from "vue-i18n";
import vnMessage from "./vn.json";
import enMessage from "./en.json";

const messages = {
  vn: vnMessage,
  en: enMessage,
};

const i18n = new createI18n({
  locale: "en",
  messages,
  fallbackLocale: "en",
});

export default i18n;
