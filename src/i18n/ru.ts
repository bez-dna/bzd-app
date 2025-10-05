import type { Dict } from "./I18nStore";

export const dict: Dict = {
  translation: {
    auth: {
      join: {
        title: "Присоединиться",
        desc: "Номер телефона нужен чтобы быстрее найти свои контакты, а другие — тебя",
        button: "Войти",
      },
      complete: {
        desc: "Код был отправлен в Telegram, от контакта Verification Codes",
        button: "Подтвердить",
      },
    },

    messages: {
      header: {
        new_message: "Запостить",
        sources: "Источники",
      },
    },
  },
};
