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
        code: {
          desc: "Код был отправлен в Telegram, от контакта Verification Codes",
        },
        name: {
          desc: "Всем новым участникам нужно обязательно придумать имя, его можно будет помеменять потом в любой момент, минимум 2 символа",
        },
        button: "Подтвердить",
      },
    },

    sources: {
      header: {
        logout: "Выйти",
      },

      user: {
        desc: "это ты ✌️",
      },

      sources: {
        title: "Твои контакты",
      },

      contacts: {
        title: "Ты можешь их знать",
        button: "Добавить",
        get: {
          desc: "Можно дать приложению доступ к контактам на телефоне, ты увидишь только тех, у кого ты есть в контактах.",
          button: "Разрешить доступ",
        },
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
