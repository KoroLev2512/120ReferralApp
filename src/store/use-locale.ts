import { useStore } from "./store";

const en = {
  onboarding: {
    initial: {
      title: "Hello there!",
      footnote: "We're just about to begin",
      headline: "We love what you do",
      description:
        "Among 120Block community the creativity and self-expression is appreciated",
      button: "Begin",
    },
    step1: {
      title: "120Block",
      footnote: "Is a brand inspired by street culture and creativity",
      description:
        "We strive with love to create a bold style that can turn ambition into reality!",
      button: "Next",
    },
    step2: {
      title: "Invite friends",
      footnote: "To obtain unique rewards",
      messages: [
        "The more you invite, the more $Block will be assigned to your account when the application releases 👥🤑",
        "The ammount of referrals affects the account level when the application releases 🚀🚀🚀",
        "We have prepared secret rewards, you will be able to find out about them only after the end of this referral campaign 🏆",
      ],
    },
  },
  tasks: {
    button: "Tasks",
    locked: {
      title: "Tasks are locked",
      description: "Level up to open them",
    },
  },
  inviteModal: {
    title: "Invite a friend",
    description: "To level up and get access to tasks",
    button: "Share via messages",
  },
  nfts: [
    {
      title: "Follow us",
      footnote: "To level up and get access to tasks",
      button: "Join 120Block community",
      name: "Bronze",
      alt: "Head start!",
      description:
        "This reward grants access to closed beta of 120Block Mini App",
      unlocked: "Tap here to unlock",
    },
    {
      name: "Silver",
      alt: "Referral World Cup winner!",
      description:
        "This reward means you will get lvl. 2 account and 20 extra $BLOCK the day 120Block Mini App releases",
      locked: "Obtain BRONZE first",
      unlocked: "Tap here to unlock",
    },
    {
      name: "Gold",
      alt: "Symbol of power and wealth!",
      description:
        "You will get lvl. 3 account and 120 extra $BLOCK the day 120Block Mini App releases\n You're invited to participate in further extra airdrop as well",
      locked: "Obtain SILVER first",
      unlocked: "Tap here to unlock",
    },
    {
      name: "Platinum",
      alt: "Diversify and conquer!",
      description:
        "You will get lvl. 4 account and 700 extra $BLOCK the day 120Block Mini App releases\n You're invited to participate in further extra airdrop as well",
      locked: "Obtain GOLD first",
      unlocked: "Tap here to unlock",
    },
  ],
  donate: {
    name: "120BLOCK ENJOYER",
    alt: "Sugar-daddy!",
    description: "Wait for news!\n The prizes are: [TOP SECRET]",
  },
  misc: {
    tasks: "Tasks",
    tasksModal: {
      locked: {
        title: "Tasks are locked",
        description: "Level up to open them",
      },
    },
    getReward: "GET REWARD!",
    share: "Share",
    mint: "MINT!",
    received: "RECEIVED",
  },
  clipboard: {
    copied: "Copied to clipboard",
    failed: "Failed to copy to clipboard",
  },
};

const ru = {
  onboarding: {
    initial: {
      title: "Привет!",
      footnote: "Скоро все начнется",
      headline: "Мы любим то, что вы делаете",
      description:
        "Среди сообщества 120 Block ценится креативность и самовыражение",
      button: "Начать",
    },
    step1: {
      title: "120Block",
      footnote: "Это бренд, вдохновленный\n уличной культурой и творчеством",
      description:
        "Мы с любовью стремимся создать смелый стиль, способный воплотить амбиции в реальность!",
      button: "Далее",
    },
    step2: {
      title: "Приглашай друзей",
      footnote: "Чтобы получить уникальные награды",
      messages: [
        "Чем больше ты пригласишь, тем больше $Block будет зачислено на твой аккаунт после выхода приложения 👥🤑",
        "Количество рефералов влияет на уровень аккаунта в основном приложении 120 Block 🚀🚀🚀",
        "Мы подготовили секретные награды, которые ты сможешь получить только после окончания этой реферальной кампании 🏆🥇",
      ],
    },
  },
  tasks: {
    button: "Задачи",
    locked: {
      title: "Задания недоступны",
      description: "Подними свой уровень профиля",
    },
  },
  inviteModal: {
    title: "Пригласи друга",
    description: "Чтобы поднять уровень профиля и получить доступ к задачам",
    button: "Поделиться в сообщении",
  },
  nfts: [
    {
      title: "Подпишись на нас",
      footnote: "Чтобы поднять уровень и получить доступ к заданиям",
      button: "Присоединится к 120Block",
      name: "Бронза",
      alt: "Начало положено!",
      description: "Эта награда дает доступ к бете 120 Block Mini App",
      unlocked: "Нажми для разблокировки",
    },
    {
      name: "Серебро",
      alt: "Победитель Кубка мира по рефералке!",
      description:
        "Эта награда означает, что ты получишь аккаунт 2 уровня и дополнительные 20 $BLOCK в день запуска мини-приложения 120 Block.",
      locked: "Сначала достигни уровня Бронзы",
      unlocked: "Нажми для разблокировки",
    },
    {
      name: "Золото",
      alt: "Символ достатка и силы!",
      description:
        "Ты получишь аккаунт 3 уровня и дополнительные 120 $BLOCK в день выхода мини-приложения 120 Block\n Мы также приглашаем тебя принять участие в дальнейшем AirDrop",
      locked: "Сначала достигни Серебряного уровня",
      unlocked: "Нажми для разблокировки",
    },
    {
      name: "Платина",
      alt: "Расширяйтесь и покоряйте!",
      description:
        "Ты получишь аккаунт 4 уровня и дополнительные 700 $BLOCK в день выхода мини-приложения 120 Block\n Мы также приглашаем тебя принять участие в дальнейшем AirDrop",
      locked: "Сначала достигни Золотого уровня",
      unlocked: "Нажми для разблокировки",
    },
  ],
  donate: {
    name: "Фанат 120BLOCK",
    alt: "Sugar-daddy!",
    description: "Жди новостей !\n Награды: [TOP SECRET]",
  },
  misc: {
    tasks: "Задания",
    tasksModal: {
      locked: {
        title: "Задания заблокированы",
        description: "Подними уровень для разблокировки!",
      },
    },
    getReward: "ПОЛУЧИТЬ НАГРАДУ!",
    share: "Поделиться",
    mint: "Сминтить!",
    received: "Получена",
  },
  clipboard: {
    copied: "Скопировано в буфер обмена",
    failed: "Не удалось скопировать в буфер обмена",
  },
};

type Messages = typeof en;

export const useLocale = () => {
  const locale = useStore((state) => state.locale);
  const setLocale = useStore((state) => state.setLocale);
  const messages: Messages = locale === "ru" ? ru : en;

  return { locale, setLocale, messages };
};
