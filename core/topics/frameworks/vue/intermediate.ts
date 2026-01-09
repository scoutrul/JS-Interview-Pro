import { Topic } from '../../../types';

export const VUE_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'vue-vue2-vs-vue3',
    title: 'Vue 2 vs Vue 3',
    difficulty: 'intermediate',
    description: 'Vue 2 vs Vue 3 — это сравнение двух версий Vue с фокусом на различия, особенности и проблемы миграции. Vue 3 был полностью переписан с нуля, что привело к breaking changes, но также к значительным улучшениям: Composition API, новая реактивность на Proxy, множественные корневые элементы, улучшенная TypeScript поддержка.\n\nОсновные различия: Composition API (новый способ написания компонентов), новая реактивность на Proxy (вместо Object.defineProperty), множественные корневые элементы (не нужен один корневой элемент), улучшенная TypeScript поддержка (лучшая типизация). Breaking changes: фильтры удалены, глобальный API изменён, $listeners удалён.\n\nНовые возможности: Teleport (порталы), Suspense (асинхронные компоненты), Fragment (множественные корневые элементы), улучшенная производительность (меньше overhead, лучше tree-shaking). Проблемы миграции: совместимость плагинов, изменения в реактивности, обновление экосистемы (Vuex → Pinia).\n\nВ 2026 понимание различий Vue 2 и Vue 3 критично для работы с Vue проектами. Многие проекты всё ещё на Vue 2, и понимание миграции важно. Понимание различий помогает выбрать правильную версию и спланировать миграцию.',
    keyPoints: [
      'Vue 3: полностью переписан, breaking changes, но значительные улучшения',
      'Основные различия: Composition API, Proxy реактивность, множественные корневые элементы',
      'Breaking changes: фильтры удалены, глобальный API изменён, $listeners удалён',
      'Новые возможности: Teleport, Suspense, Fragment, улучшенная производительность',
      'Проблемы миграции: совместимость плагинов, изменения в реактивности, обновление экосистемы',
      'Критично для работы с Vue проектами в 2026'
    ],
    funFact: 'Vue 3 был в разработке более 2 лет и был выпущен в 2020 году. Это был один из самых амбициозных обновлений фреймворка, полностью переписанный с нуля для лучшей производительности и TypeScript поддержки.',
    tags: ['vue', 'vue2', 'vue3', 'migration', 'breaking-changes', 'intermediate', 'core'],
    examples: [
      {
        title: 'Основные различия',
        code: `// Vue 2: Options API, Object.defineProperty
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};

// Vue 3: Composition API, Proxy
<script setup>
import { ref } from 'vue';

const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

// Различия:
// - Composition API вместо Options API
// - Proxy вместо Object.defineProperty
// - <script setup> синтаксис
// - Множественные корневые элементы`
      },
      {
        title: 'Breaking changes',
        code: `// Breaking changes Vue 3:
// 1. Фильтры удалены
// Vue 2:
{{ message | capitalize }}

// Vue 3: использовать computed или методы
{{ capitalize(message) }}

// 2. Глобальный API изменён
// Vue 2:
Vue.component('MyComponent', {...});
Vue.use(plugin);

// Vue 3:
import { createApp } from 'vue';
const app = createApp({});
app.component('MyComponent', {...});
app.use(plugin);

// 3. $listeners удалён
// Vue 2: $listeners для событий
// Vue 3: события в $attrs`
      },
      {
        title: 'Новые возможности',
        code: `// Vue 3: новые возможности
// 1. Teleport (порталы)
<teleport to="body">
  <Modal />
</teleport>

// 2. Suspense (асинхронные компоненты)
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Загрузка...</div>
  </template>
</Suspense>

// 3. Fragment (множественные корневые элементы)
<template>
  <div>Элемент 1</div>
  <div>Элемент 2</div>
  <!-- Не нужен один корневой элемент -->
</template>

// 4. Улучшенная производительность
// Меньше overhead, лучше tree-shaking
// Быстрее рендеринг`
      }
    ],
    relatedTopics: ['vue-migration-vue2-vue3', 'vue-composition-patterns'],
    isFrontendEssential: true
  },
  {
    id: 'vue-composition-patterns',
    title: 'Composition API паттерны',
    difficulty: 'intermediate',
    description: 'Composition API паттерны — это способы организации логики в Vue 3 компонентах. Composables — это переиспользуемые функции, которые инкапсулируют логику. Они решают проблему переиспользования логики: вместо mixins (Vue 2) используются composables, которые явно возвращают нужные значения и функции.\n\nComposables как единицы логики: каждый composable решает одну задачу (useAuth для авторизации, useFetch для запросов данных, useLocalStorage для работы с localStorage). Это создаёт модульную архитектуру: логика разделена на переиспользуемые части, которые легко тестировать и поддерживать.\n\nПаттерны composables: возврат реактивных значений и функций, использование других composables, обработка lifecycle (onMounted, onUnmounted). Это создаёт систему переиспользуемой логики, которая легко комбинируется в компонентах.\n\nВ 2026 composables стали стандартом для организации логики в Vue 3. Они заменили mixins и создали более явную и переиспользуемую архитектуру. Понимание composables критично для эффективной работы с Vue 3.',
    keyPoints: [
      'Composables: переиспользуемые функции, инкапсулирующие логику',
      'Решают проблему переиспользования: вместо mixins → composables',
      'Каждый composable решает одну задачу',
      'Паттерны: возврат реактивных значений, использование других composables, lifecycle',
      'Стандарт для организации логики в Vue 3 в 2026',
      'Критично для эффективной работы'
    ],
    funFact: 'Composables были вдохновлены React хуками, но адаптированы для Vue реактивности. Идея в том, что логика может быть переиспользуемой функцией, которая возвращает реактивные значения и функции. Это создало более явную и переиспользуемую архитектуру чем mixins.',
    tags: ['vue', 'composition-api', 'composables', 'patterns', 'intermediate', 'core'],
    examples: [
      {
        title: 'Composable: useAuth',
        code: `// Composable: useAuth
// composables/useAuth.ts
import { ref, computed } from 'vue';

export function useAuth() {
  const user = ref(null);
  const loading = ref(false);
  
  const isAuthenticated = computed(() => user.value !== null);
  
  const login = async (email, password) => {
    loading.value = true;
    try {
      user.value = await authService.login(email, password);
    } finally {
      loading.value = false;
    }
  };
  
  const logout = () => {
    user.value = null;
  };
  
  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout
  };
}

// Использование в компоненте:
<script setup>
import { useAuth } from './composables/useAuth';

const { user, login, logout, isAuthenticated } = useAuth();
</script>

// Преимущество: переиспользуемая логика
// Легко тестировать
// Легко поддерживать`
      },
      {
        title: 'Composable: useFetch',
        code: `// Composable: useFetch
// composables/useFetch.ts
import { ref, onMounted } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);
  
  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  
  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Использование:
<script setup>
import { useFetch } from './composables/useFetch';

const { data, loading, error } = useFetch('/api/users');
</script>

// Преимущество: переиспользуемая логика запросов
// Легко комбинировать с другими composables`
      },
      {
        title: 'Композиция composables',
        code: `// Композиция composables
<script setup>
import { useAuth } from './composables/useAuth';
import { useFetch } from './composables/useFetch';

const { user, isAuthenticated } = useAuth();
const { data: posts, loading } = useFetch(
  computed(() => isAuthenticated.value ? '/api/posts' : null)
);

// Composables комбинируются
// Логика модульная
// Легко тестировать каждую часть

// Преимущество: модульная архитектура
// Логика разделена на переиспользуемые части
// Легко комбинировать`
      }
    ],
    relatedTopics: ['vue-router', 'vue-pinia'],
    isFrontendEssential: true
  },
  {
    id: 'vue-router',
    title: 'Router',
    difficulty: 'intermediate',
    description: 'Vue Router — это официальная библиотека роутинга для Vue. Она предоставляет декларативный роутинг через компоненты, поддержку nested routes, guards для защиты маршрутов, lazy loading для оптимизации. В Nuxt используется file-based routing, который автоматизирует роутинг по структуре файлов.\n\nНавигационные хуки: beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave для контроля навигации. Guards: глобальные, per-route, in-component guards для защиты маршрутов. Lazy loading: динамический import для загрузки компонентов маршрутов только при навигации.\n\nFile-based routing в Nuxt: структура файлов определяет маршруты (pages/index.vue → /, pages/about.vue → /about). Это упрощает разработку, но даёт меньше контроля чем Vue Router. Выбор зависит от требований: гибкость vs простота.\n\nВ 2026 Vue Router остаётся стандартом для SPA, а file-based routing популярен через Nuxt. Понимание роутинга критично для создания навигации в Vue приложениях.',
    keyPoints: [
      'Vue Router: официальная библиотека роутинга',
      'Навигационные хуки: beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave',
      'Guards: глобальные, per-route, in-component для защиты маршрутов',
      'File-based routing в Nuxt: структура файлов определяет маршруты',
      'Выбор: гибкость (Vue Router) vs простота (Nuxt)',
      'Критично для создания навигации'
    ],
    funFact: 'Vue Router был создан в 2014 году как часть экосистемы Vue. За годы он стал стандартом для роутинга в Vue приложениях, используемым миллионами разработчиков. Nuxt добавил file-based routing в 2016 году, упростив роутинг для многих проектов.',
    tags: ['vue', 'router', 'nuxt', 'routing', 'intermediate', 'core'],
    examples: [
      {
        title: 'Vue Router',
        code: `// Vue Router: декларативный роутинг
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users/:id', component: UserProfile }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Использование:
<router-link to="/about">О нас</router-link>
<router-view />

// Преимущество: гибкость, контроль
// Guards, lazy loading, nested routes`
      },
      {
        title: 'Навигационные хуки',
        code: `// Навигационные хуки
export default {
  beforeRouteEnter(to, from, next) {
    // Выполняется до входа в маршрут
    // Не имеет доступа к this
    if (!isAuthenticated()) {
      next('/login');
    } else {
      next();
    }
  },
  beforeRouteUpdate(to, from, next) {
    // Выполняется при обновлении маршрута
    // Имеет доступ к this
    if (to.params.id !== from.params.id) {
      this.fetchData(to.params.id);
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    // Выполняется при уходе с маршрута
    if (this.hasUnsavedChanges) {
      if (confirm('Есть несохранённые изменения')) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};

// Преимущество: контроль навигации
// Защита маршрутов
// Валидация перед навигацией`
      },
      {
        title: 'File-based routing в Nuxt',
        code: `// Nuxt: file-based routing
// pages/index.vue → маршрут /
export default {
  // ...
};

// pages/about.vue → маршрут /about
export default {
  // ...
};

// pages/users/[id].vue → маршрут /users/:id
export default {
  async asyncData({ params }) {
    return { userId: params.id };
  }
};

// Преимущество: простота
// Структура файлов определяет маршруты
// Автоматический code splitting`
      }
    ],
    relatedTopics: ['vue-pinia', 'frameworks-meta-frameworks-file-based-routing'],
    isFrontendEssential: true
  },
  {
    id: 'vue-pinia',
    title: 'Pinia',
    difficulty: 'intermediate',
    description: 'Pinia — это официальная библиотека управления состоянием для Vue 3, замена Vuex. Она предоставляет простое API для глобального состояния, лучшую TypeScript поддержку, автоматические code splitting. Pinia решает проблемы Vuex: меньше boilerplate, проще API, лучшая типизация.\n\nАрхитектура stores: каждый store это отдельный модуль состояния с actions, getters, state. Stores могут использоваться друг в друге, создавая модульную архитектуру. DevTools интеграция позволяет отлаживать состояние так же как Vuex.\n\nПреимущества Pinia: простота (меньше boilerplate чем Vuex), TypeScript поддержка (лучшая типизация), автоматический code splitting (каждый store в отдельном бандле), композиция stores (stores могут использоваться друг в друге). Это делает Pinia лучшим выбором для новых проектов.\n\nВ 2026 Pinia стал стандартом для управления состоянием в Vue 3. Vuex остаётся поддерживаемым, но Pinia рекомендуется для новых проектов. Понимание Pinia критично для работы с Vue 3.',
    keyPoints: [
      'Pinia: официальная библиотека управления состоянием, замена Vuex',
      'Преимущества: простота, TypeScript поддержка, автоматический code splitting',
      'Архитектура stores: модульная структура состояния',
      'Решает проблемы Vuex: меньше boilerplate, проще API',
      'Стандарт для Vue 3 в 2026',
      'Критично для работы с Vue 3'
    ],
    funFact: 'Pinia был создан в 2019 году Эдуардо Сан Мартин Моро как замена Vuex. Изначально он назывался Vuex 5, но был переименован в Pinia. В 2022 году Pinia стал официальной библиотекой управления состоянием для Vue 3, заменив Vuex.',
    tags: ['vue', 'pinia', 'state-management', 'vuex', 'intermediate', 'core'],
    examples: [
      {
        title: 'Pinia store',
        code: `// Pinia: простое API
// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null
  },
  actions: {
    async login(email, password) {
      this.loading = true;
      try {
        this.user = await authService.login(email, password);
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
    }
  }
});

// Использование:
<script setup>
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const { user, isAuthenticated } = storeToRefs(userStore);
const { login, logout } = userStore;
</script>

// Преимущество: простота
// Меньше boilerplate чем Vuex
// Лучшая TypeScript поддержка`
      },
      {
        title: 'Сравнение с Vuex',
        code: `// Vuex: больше boilerplate
const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      return authService.login(email, password)
        .then(user => commit('SET_USER', user));
    }
  }
});

// Pinia: проще
const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  actions: {
    async login(email, password) {
      this.user = await authService.login(email, password);
    }
  }
});

// Преимущество Pinia:
// - Меньше boilerplate
// - Прямая мутация в actions
// - Лучшая TypeScript поддержка`
      },
      {
        title: 'Композиция stores',
        code: `// Композиция stores
// stores/cart.ts
export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] }),
  actions: {
    addItem(item) {
      this.items.push(item);
    }
  }
});

// stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  actions: {
    async checkout() {
      const cartStore = useCartStore(); // Используем другой store
      // Логика checkout
    }
  }
});

// Преимущество: модульная архитектура
// Stores могут использоваться друг в друге
// Легко организовать состояние`
      }
    ],
    relatedTopics: ['vue-typescript', 'frameworks-state-management-flux'],
    isFrontendEssential: true
  },
  {
    id: 'vue-render-functions-jsx',
    title: 'Рендеринг-функции и JSX',
    difficulty: 'intermediate',
    description: 'Рендеринг-функции и JSX — это альтернативы шаблонам в Vue. Рендеринг-функции используют JavaScript для создания Virtual DOM, JSX использует синтаксис похожий на HTML. Они полезны когда шаблоны недостаточно гибки: динамическая генерация компонентов, сложная условная логика, программируемый рендеринг.\n\nРендеринг-функции: функция, которая возвращает Virtual DOM через h() функцию. JSX: синтаксис похожий на HTML, который компилируется в рендеринг-функции. Оба подхода дают больше контроля над рендерингом, но требуют больше кода чем шаблоны.\n\nКогда использовать: динамическая генерация компонентов (например, рендеринг списка с разными типами компонентов), сложная условная логика (много вложенных условий), программируемый рендеринг (рендеринг на основе сложных вычислений). Но для большинства случаев шаблоны проще и читабельнее.\n\nВ 2026 рендеринг-функции и JSX остаются нишевыми инструментами. Шаблоны остаются основным способом написания компонентов, но понимание альтернатив критично для сложных случаев.',
    keyPoints: [
      'Рендеринг-функции и JSX: альтернативы шаблонам',
      'Полезны когда шаблоны недостаточно гибки',
      'Рендеринг-функции: функция возвращает Virtual DOM через h()',
      'JSX: синтаксис похожий на HTML, компилируется в рендеринг-функции',
      'Когда использовать: динамическая генерация, сложная логика',
      'Нишевые инструменты, шаблоны остаются основным способом'
    ],
    funFact: 'JSX в Vue был добавлен в 2017 году как опциональная функция. Изначально он был менее популярен чем шаблоны, но за годы стал полезным инструментом для сложных случаев, особенно для разработчиков, знакомых с React.',
    tags: ['vue', 'render-functions', 'jsx', 'templates', 'intermediate'],
    examples: [
      {
        title: 'Рендеринг-функции',
        code: `// Рендеринг-функции: функция возвращает Virtual DOM
import { h } from 'vue';

export default {
  render() {
    return h('div', [
      h('h1', 'Заголовок'),
      h('p', 'Текст'),
      this.items.map(item => 
        h('div', { key: item.id }, item.name)
      )
    ]);
  }
};

// Преимущество: полный контроль над рендерингом
// Можно использовать любую JavaScript логику
// Недостаток: больше кода, сложнее читать`
      },
      {
        title: 'JSX',
        code: `// JSX: синтаксис похожий на HTML
export default {
  render() {
    return (
      <div>
        <h1>Заголовок</h1>
        <p>Текст</p>
        {this.items.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  }
};

// Преимущество: знакомый синтаксис
// Легче читать чем рендеринг-функции
// Недостаток: нужна настройка для компиляции JSX`
      },
      {
        title: 'Когда использовать',
        code: `// ✅ Использовать рендеринг-функции/JSX когда:
// - Динамическая генерация компонентов
function DynamicList({ items, componentType }) {
  return items.map(item => 
    h(componentType, { key: item.id, item })
  );
}

// - Сложная условная логика
function ComplexConditional({ condition1, condition2, condition3 }) {
  if (condition1 && condition2) {
    return h(ComponentA);
  } else if (condition2 && condition3) {
    return h(ComponentB);
  }
  return h(ComponentC);
}

// ❌ Не использовать когда:
// - Простые компоненты
// - Шаблоны достаточно
// - Команда не знакома с JSX`
      }
    ],
    relatedTopics: ['vue-directives', 'vue-teleport-suspense'],
    isFrontendEssential: false
  },
  {
    id: 'vue-directives',
    title: 'Директивы',
    difficulty: 'intermediate',
    description: 'Директивы в Vue — это специальные атрибуты с префиксом v-, которые применяют реактивное поведение к DOM элементам. Встроенные директивы: v-if (условный рендеринг), v-for (итерация), v-bind (привязка атрибутов), v-on (обработка событий), v-model (двустороннее связывание). Кастомные директивы создаются для переиспользуемого поведения DOM.\n\nВстроенные директивы: v-if/v-else/v-else-if для условного рендеринга, v-for для итерации массивов и объектов, v-bind для привязки атрибутов, v-on для обработки событий, v-model для двустороннего связывания форм. Каждая директива решает свою задачу и является частью DSL Vue.\n\nКастомные директивы: создаются для переиспользуемого поведения DOM (например, фокус на элементе, бесконечный скролл, drag and drop). Они имеют lifecycle hooks: mounted, updated, unmounted для управления поведением. Понимание директив критично для работы с Vue.\n\nВ 2026 директивы остаются важной частью Vue. Они создают DSL для UI, упрощая работу с DOM. Понимание директив критично для эффективной работы с Vue.',
    keyPoints: [
      'Директивы: специальные атрибуты с префиксом v-',
      'Встроенные: v-if, v-for, v-bind, v-on, v-model',
      'Кастомные: создаются для переиспользуемого поведения DOM',
      'Lifecycle hooks: mounted, updated, unmounted',
      'Создают DSL для UI, упрощая работу с DOM',
      'Критично для эффективной работы с Vue'
    ],
    funFact: 'Директивы были одной из ключевых инноваций Vue в 2014 году. Идея в том, что специальные атрибуты могут применять реактивное поведение к DOM, создавая декларативный синтаксис. Это стало отличительной особенностью Vue, делая его более доступным для разработчиков, знакомых с HTML.',
    tags: ['vue', 'directives', 'v-if', 'v-for', 'v-model', 'intermediate'],
    examples: [
      {
        title: 'Встроенные директивы',
        code: `// Встроенные директивы Vue
<template>
  <!-- v-if: условный рендеринг -->
  <div v-if="isVisible">Видимый</div>
  <div v-else>Невидимый</div>
  
  <!-- v-for: итерация -->
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
  
  <!-- v-bind: привязка атрибутов -->
  <img :src="imageUrl" :alt="imageAlt" />
  
  <!-- v-on: обработка событий -->
  <button @click="handleClick">Клик</button>
  
  <!-- v-model: двустороннее связывание -->
  <input v-model="name" />
</template>

// Преимущество: декларативный синтаксис
// Упрощает работу с DOM`
      },
      {
        title: 'Кастомные директивы',
        code: `// Кастомная директива: фокус
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

// Использование:
<input v-focus />

// Кастомная директива: бесконечный скролл
app.directive('infinite-scroll', {
  mounted(el, binding) {
    const callback = binding.value;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    observer.observe(el);
  },
  unmounted(el) {
    // Cleanup
  }
});

// Использование:
<div v-infinite-scroll="loadMore">Контент</div>

// Преимущество: переиспользуемое поведение DOM
// Инкапсуляция логики`
      },
      {
        title: 'Lifecycle hooks директив',
        code: `// Lifecycle hooks директив
app.directive('example', {
  // Выполняется при монтировании элемента
  mounted(el, binding) {
    // el: элемент DOM
    // binding: объект с информацией о директиве
    console.log('Mounted');
  },
  
  // Выполняется при обновлении элемента
  updated(el, binding) {
    console.log('Updated');
  },
  
  // Выполняется при размонтировании элемента
  unmounted(el) {
    console.log('Unmounted');
  }
});

// Преимущество: полный контроль над lifecycle
// Можно управлять поведением на всех этапах`
      }
    ],
    relatedTopics: ['vue-teleport-suspense', 'vue-typescript'],
    isFrontendEssential: false
  },
  {
    id: 'vue-teleport-suspense',
    title: 'Teleport и Suspense',
    difficulty: 'intermediate',
    description: 'Teleport и Suspense — это новые возможности Vue 3 для работы с порталами и асинхронными компонентами. Teleport позволяет рендерить содержимое в другом месте DOM (например, модальное окно в body), Suspense позволяет приостанавливать рендеринг до готовности асинхронных компонентов.\n\nTeleport: рендерит содержимое в указанном месте DOM, полезен для модальных окон, тултипов, уведомлений, которые должны быть вне основного дерева компонентов. Suspense: показывает fallback во время загрузки асинхронных компонентов, улучшая воспринимаемую производительность.\n\nИспользование: Teleport для модальных окон и порталов, Suspense для асинхронных компонентов и данных. Это создаёт лучший пользовательский опыт: модальные окна рендерятся правильно, асинхронный контент загружается с индикатором загрузки.\n\nВ 2026 Teleport и Suspense стали стандартом Vue 3. Они улучшают возможности работы с порталами и асинхронным контентом. Понимание Teleport и Suspense критично для создания современных Vue приложений.',
    keyPoints: [
      'Teleport: рендерит содержимое в другом месте DOM',
      'Suspense: приостанавливает рендеринг до готовности асинхронных компонентов',
      'Teleport полезен для модальных окон, тултипов, уведомлений',
      'Suspense улучшает воспринимаемую производительность',
      'Стандарт Vue 3 в 2026',
      'Критично для создания современных приложений'
    ],
    funFact: 'Teleport был вдохновлён React Portal, но адаптирован для Vue. Suspense был добавлен в Vue 3 как способ работы с асинхронными компонентами, улучшая воспринимаемую производительность приложения.',
    tags: ['vue', 'teleport', 'suspense', 'async', 'intermediate'],
    examples: [
      {
        title: 'Teleport',
        code: `// Teleport: рендерит в другом месте DOM
<template>
  <div>
    <button @click="showModal = true">Открыть модальное окно</button>
    
    <!-- Рендерится в body, а не в текущем дереве -->
    <Teleport to="body">
      <Modal v-if="showModal" @close="showModal = false">
        <h1>Модальное окно</h1>
      </Modal>
    </Teleport>
  </div>
</template>

// Преимущество: модальное окно рендерится в body
// Не зависит от z-index родителя
// Правильное позиционирование`
      },
      {
        title: 'Suspense',
        code: `// Suspense: асинхронные компоненты
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Загрузка...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() => 
  import('./AsyncComponent.vue')
);
</script>

// Преимущество: показывает fallback во время загрузки
// Улучшает воспринимаемую производительность
// Не блокирует рендеринг других компонентов`
      },
      {
        title: 'Комбинирование',
        code: `// Комбинирование Teleport и Suspense
<template>
  <Teleport to="body">
    <Suspense>
      <template #default>
        <AsyncModal />
      </template>
      <template #fallback>
        <div class="modal-loading">Загрузка...</div>
      </template>
    </Suspense>
  </Teleport>
</template>

// Преимущество: модальное окно с асинхронной загрузкой
// Рендерится в body
// Показывает индикатор загрузки`
      }
    ],
    relatedTopics: ['vue-typescript', 'vue-ecosystem'],
    isFrontendEssential: false
  },
  {
    id: 'vue-typescript',
    title: 'TypeScript',
    difficulty: 'intermediate',
    description: 'Vue и TypeScript — это типобезопасная разработка на Vue. Типизация в Composition API через <script setup> с TypeScript, типизация пропсов через defineProps, типизация emits через defineEmits. TypeScript улучшает качество кода и developer experience, особенно в больших проектах.\n\n<script setup> с TypeScript: автоматическая типизация, не нужно явно типизировать возвращаемые значения, props и emits типизируются через defineProps и defineEmits. Это создаёт типобезопасный код с минимальным boilerplate.\n\nТипизация composables: типы для параметров и возвращаемых значений, дженерики для переиспользуемых composables. Это создаёт типобезопасные переиспользуемые функции. Понимание TypeScript критично для современной разработки на Vue.\n\nВ 2026 TypeScript стал стандартом для Vue 3 приложений. <script setup> упрощает типизацию, делая TypeScript более доступным. Понимание TypeScript критично для работы с современным Vue.',
    keyPoints: [
      'Vue + TypeScript: типобезопасная разработка',
      '<script setup> с TypeScript: автоматическая типизация',
      'defineProps и defineEmits: типизация пропсов и событий',
      'Типизация composables: типы для параметров и возвращаемых значений',
      'Стандарт для Vue 3 приложений в 2026',
      'Критично для современной разработки'
    ],
    funFact: 'TypeScript поддержка в Vue значительно улучшилась с Vue 3. <script setup> синтаксис, добавленный в 2021 году, упростил типизацию, сделав TypeScript более доступным для Vue разработчиков.',
    tags: ['vue', 'typescript', 'typing', 'script-setup', 'intermediate', 'core'],
    examples: [
      {
        title: '<script setup> с TypeScript',
        code: `// <script setup> с TypeScript
<script setup lang="ts">
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

const user = ref<User | null>(null);
const count = ref<number>(0);

// Автоматическая типизация
// user типизирован как Ref<User | null>
// count типизирован как Ref<number>
</script>

// Преимущество: автоматическая типизация
// Не нужно явно типизировать возвращаемые значения
// TypeScript выводит типы автоматически`
      },
      {
        title: 'Типизация props и emits',
        code: `// Типизация props и emits
<script setup lang="ts">
interface Props {
  user: {
    id: number;
    name: string;
  };
  onEdit?: (id: number) => void;
}

interface Emits {
  (e: 'update', value: string): void;
  (e: 'delete', id: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// props типизирован как Props
// emit типизирован как Emits
// Автодополнение в IDE
// Ошибки на этапе разработки
</script>

// Преимущество: типобезопасность
// Ошибки на этапе разработки
// Автодополнение`
      },
      {
        title: 'Типизация composables',
        code: `// Типизация composables
// composables/useAuth.ts
import { ref, computed, Ref, ComputedRef } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

export function useAuth(): {
  user: Ref<User | null>;
  loading: Ref<boolean>;
  isAuthenticated: ComputedRef<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} {
  const user = ref<User | null>(null);
  const loading = ref(false);
  
  const isAuthenticated = computed(() => user.value !== null);
  
  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
      user.value = await authService.login(email, password);
    } finally {
      loading.value = false;
    }
  };
  
  const logout = () => {
    user.value = null;
  };
  
  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout
  };
}

// Преимущество: типобезопасные composables
// Автодополнение при использовании`
      }
    ],
    relatedTopics: ['vue-ecosystem', 'vue-performance'],
    isFrontendEssential: true
  },
  {
    id: 'vue-ecosystem',
    title: 'Экосистема',
    difficulty: 'intermediate',
    description: 'Экосистема Vue включает: Vite (быстрый сборщик и dev-сервер), Nuxt (мета-фреймворк с SSR), VueUse (коллекция composables), Quasar (UI-фреймворк). Каждый инструмент решает свою задачу и является частью экосистемы Vue.\n\nVite: быстрый сборщик и dev-сервер, использует esbuild для быстрой сборки, HMR для мгновенных обновлений. Nuxt: мета-фреймворк с file-based routing, SSR, автоматическими оптимизациями. VueUse: коллекция переиспользуемых composables для типовых задач. Quasar: UI-фреймворк с готовыми компонентами.\n\nВыбор стека: Vite для сборки, Nuxt для полного стека, VueUse для composables, Quasar для UI компонентов. Выбор зависит от требований: нужен ли SSR, нужны ли готовые UI компоненты, нужны ли composables. Понимание экосистемы критично для выбора правильных инструментов.\n\nВ 2026 экосистема Vue стала зрелой. Vite стал стандартом для сборки, Nuxt стал популярным для полного стека. Понимание экосистемы критично для эффективной разработки на Vue.',
    keyPoints: [
      'Экосистема: Vite, Nuxt, VueUse, Quasar',
      'Vite: быстрый сборщик и dev-сервер',
      'Nuxt: мета-фреймворк с SSR и file-based routing',
      'VueUse: коллекция переиспользуемых composables',
      'Quasar: UI-фреймворк с готовыми компонентами',
      'Критично для выбора правильных инструментов'
    ],
    funFact: 'Vite был создан Эваном Ю (создателем Vue) в 2020 году как быстрый альтернатива Webpack. За годы он стал стандартом не только для Vue, но и для React и других фреймворков, благодаря своей скорости и простоте.',
    tags: ['vue', 'ecosystem', 'vite', 'nuxt', 'vueuse', 'quasar', 'intermediate'],
    examples: [
      {
        title: 'Vite',
        code: `// Vite: быстрый сборщик
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist'
  }
});

// Преимущество: быстрая сборка
// esbuild для быстрой компиляции
// HMR для мгновенных обновлений
// Меньше настройки чем Webpack`
      },
      {
        title: 'Nuxt',
        code: `// Nuxt: мета-фреймворк
// pages/index.vue → маршрут /
export default {
  async asyncData() {
    return { data: await fetchData() };
  }
};

// Автоматически:
// - File-based routing
// - SSR/SSG
// - Code splitting
// - Оптимизации

// Преимущество: полный стек из коробки
// Не нужно настраивать роутинг, SSR`
      },
      {
        title: 'VueUse',
        code: `// VueUse: коллекция composables
import { useLocalStorage, useMouse, useDebounce } from '@vueuse/core';

// useLocalStorage: работа с localStorage
const count = useLocalStorage('count', 0);

// useMouse: отслеживание мыши
const { x, y } = useMouse();

// useDebounce: дебаунсинг значения
const debouncedSearch = useDebounce(search, 500);

// Преимущество: готовые composables
// Не нужно писать с нуля
// Проверенные решения`
      }
    ],
    relatedTopics: ['vue-performance', 'frameworks-meta-frameworks-nextjs-nuxt'],
    isFrontendEssential: false
  }
];
