export type MetaCategoryId =
  | "computer-science"
  | "javascript"
  | "markup"
  | "frameworks"
  | "typescript"
  | "architecture"
  | "security"
  | "tools"
  | "network"
  | "optimization";

export interface MetaCategory {
  id: MetaCategoryId;
  title: string;
  icon: string;
  description: string;
}

export const META_CATEGORIES: MetaCategory[] = [
  {
    id: "computer-science",
    title: "Информатика",
    icon: "fa-solid fa-microchip",
    description: "Основы вычислений, алгоритмы, архитектура",
  },
  {
    id: "network",
    title: "Сеть",
    icon: "fa-solid fa-network-wired",
    description: "HTTP, WebSocket, REST, GraphQL",
  },
  {
    id: "tools",
    title: "Инструменты",
    icon: "fa-solid fa-wrench",
    description: "Git, тестирование, AI",
  },
  {
    id: "markup",
    title: "Верстка",
    icon: "fa-solid fa-code",
    description: "HTML, CSS, анимации",
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "fa-brands fa-js",
    description: "Основы и продвинутые возможности JavaScript",
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "fa-brands fa-js-square",
    description: "Типизация, дженерики, утилиты",
  },
  {
    id: "architecture",
    title: "Архитектура",
    icon: "fa-solid fa-sitemap",
    description: "Паттерны проектирования, структура приложений",
  },
  {
    id: "frameworks",
    title: "Фреймворки",
    icon: "fa-solid fa-layer-group",
    description: "React.js, Vue.js, Svelte, реактивные фреймворки",
  },
  {
    id: "optimization",
    title: "Оптимизация",
    icon: "fa-solid fa-gauge-high",
    description: "Производительность, оптимизация кода, метрики",
  },
  {
    id: "security",
    title: "Безопасность",
    icon: "fa-solid fa-shield-halved",
    description: "XSS, CSRF, CORS, защита данных",
  },
];

export const DEFAULT_META_CATEGORY: MetaCategoryId = "javascript";
