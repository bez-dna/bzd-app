import type { Dict } from "../i18n/I18nStore";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: Dict;
  }
}
