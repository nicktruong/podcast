import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const i18n = i18next
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language, namespace, callback) => {
      import(`../pages/${namespace}/translations/${language}/translation.json`)
        .then(({ default: resources }) => {
          callback(null, resources);
        })
        .catch(() => {
          import(
            `../layouts/${namespace}/translations/${language}/translation.json`
          )
            .then(({ default: resources }) => {
              callback(null, resources);
            })
            .catch((error) => {
              callback(error, null);
            });
        });
    })
  )
  .use(initReactI18next)
  .init({
    debug: true, // TODO: change based on env: prod, dev, test
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
