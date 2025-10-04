import type i18n from "i18next";
import { createInstance } from "i18next";
import { findBestLanguageTag } from "react-native-localize";

import { type MainStore, useMainStore } from "../app/main/MainStore";
import { dict as en } from "./en";
import { dict as ru } from "./ru";

export type Dict = typeof en;

export class I18nStore {
  mainStore: MainStore;
  i18n: typeof i18n;

  constructor(mainStore: MainStore) {
    this.mainStore = mainStore;

    const lng = findBestLanguageTag(["ru", "en"])?.languageTag ?? "en";

    this.i18n = createInstance({
      lng,
      resources: {
        en,
        ru,
      },
    });

    this.i18n.init();
  }
}

export const useI18n = () => {
  const mainStore = useMainStore();

  return { t: mainStore.i18n.i18n.t };
};
