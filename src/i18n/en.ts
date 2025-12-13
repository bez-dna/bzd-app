/* Заглушка на 1-2 строки
 */
export const dict = {
  translation: {
    auth: {
      join: {
        title: "Join",
        desc: "TBD: DESC",
        button: "Join",
      },
      complete: {
        code: {
          desc: "TBD: DESC",
        },
        name: {
          desc: "TBD: DESC",
        },
        button: "Confirm",
      },
    },

    users: {
      list: {
        title: "Contacts",
      },

      header: {
        logout: "Logout",
      },

      user: {
        desc: "it's you",
      },

      get: {
        desc: "TBD: Allow contacts access",
        button: "TBD: Allow",
      },
    },

    user: {
      topics: {
        // немного лень разбираться с lower case в TS, поэтому пока так, но нужно привести к одному виду словарь
        timing: {
          TIMING_INSTANT: "TIMING_INSTANT",
          TIMING_WEEKDAYS: "TIMING_WEEKDAYS",
          TIMING_WEEKENDS: "TIMING_WEEKENDS",
        },
        rate: {
          RATE_Q: "RATE_Q",
          RATE_QD: "RATE_QD",
          RATE_QW: "RATE_QW",
        },
      },
    },

    messages: {
      header: {
        new_message: "New message",
        users: "Sources",
      },

      no_auth: {
        desc: "TDB: auth please",
        button: "Join",
      },
    },

    new_message: {
      button: "Post",

      topics: {
        edit: "Edit",
      },
    },

    warn: {
      text: "TBD: Something went wrong",
    },
  },
};
