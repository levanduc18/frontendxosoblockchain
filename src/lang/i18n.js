import { createI18n } from "vue-i18n";
import vnMessage from "./vn.json";
import enMessage from "./en.json";
import frMessage from "./fr.json";

const messages = {
  vn: vnMessage,
  en: enMessage,
  fr: frMessage,
};

const i18n = new createI18n({
  locale: "vn",
  messages,
  fallbackLocale: "vn",
});

export default i18n;
