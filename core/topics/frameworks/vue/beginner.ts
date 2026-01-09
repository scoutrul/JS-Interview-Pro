import { Topic } from '../../../types';

export const VUE_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'vue-options-vs-composition',
    title: 'Options API vs Composition API',
    difficulty: 'beginner',
    description: 'Vue предлагает два способа написания компонентов: Options API и Composition API. Options API — это классический подход Vue 2, где компонент это объект с опциями (data, methods, computed, watch). Composition API — это новый подход Vue 3, где компонент это функция, которая возвращает объект с реактивными значениями и методами.\n\nOptions API подходит для: маленьких компонентов, простой логики, команды знакомой с Vue 2. Composition API подходит для: больших компонентов, сложной логики, команды знакомой с React. Выбор зависит от предпочтений команды и сложности компонента.\n\nПреимущества Composition API: лучшее переиспользование логики (composables), лучшая организация кода (логика группируется по функциям), лучшая поддержка TypeScript. Но Options API проще для новичков и остаётся поддерживаемым в Vue 3.\n\nВ 2026 Composition API стал стандартом для новых проектов, но Options API остаётся поддерживаемым. Понимание обоих подходов критично для работы с Vue, особенно при работе с legacy кодом или командой, знакомой с Vue 2.',
    keyPoints: [
      'Два подхода: Options API (объект с опциями) и Composition API (функция)',
      'Options API: проще для новичков, знакомый подход Vue 2',
      'Composition API: лучшее переиспользование логики, лучшая организация кода',
      'Выбор зависит от предпочтений команды и сложности компонента',
      'Composition API стал стандартом для новых проектов в 2026',
      'Понимание обоих подходов критично для работы с Vue'
    ],
    funFact: 'Composition API был добавлен в Vue 3 в 2020 году как опциональная функция. Изначально планировалось, что он будет использоваться только для сложных компонентов, но за годы он стал стандартом для новых проектов благодаря лучшему переиспользованию логики.',
    tags: ['vue', 'options-api', 'composition-api', 'basics', 'fundamentals', 'core'],
    examples: [
      {
        title: 'Options API',
        code: `// Options API: объект с опциями
export default {
  data() {
    return {
      count: 0,
      name: 'Иван'
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  computed: {
    doubled() {
      return this.count * 2;
    }
  },
  watch: {
    count(newValue) {
      console.log('Count changed:', newValue);
    }
  }
};

// Преимущество: проще для новичков
// Всё в одном объекте
// Знакомый подход Vue 2`
      },
      {
        title: 'Composition API',
        code: `// Composition API: функция
import { ref, computed, watch } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const name = ref('Иван');
    
    const increment = () => {
      count.value++;
    };
    
    const doubled = computed(() => count.value * 2);
    
    watch(count, (newValue) => {
      console.log('Count changed:', newValue);
    });
    
    return {
      count,
      name,
      increment,
      doubled
    };
  }
};

// Преимущество: лучшее переиспользование логики
// Логика группируется по функциям
// Лучшая поддержка TypeScript`
      },
      {
        title: '<script setup> синтаксис',
        code: `// <script setup>: упрощённый синтаксис Composition API
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const name = ref('Иван');

const increment = () => {
  count.value++;
};

const doubled = computed(() => count.value * 2);
</script>

<template>
  <div>
    <p>{{ count }} (удвоено: {{ doubled }})</p>
    <button @click="increment">+</button>
  </div>
</template>

// Преимущество: ещё проще
// Не нужно setup() и return
// Автоматическая экспозиция
// Стандарт для новых проектов`
      }
    ],
    relatedTopics: ['vue-reactivity', 'vue-composition-patterns'],
    isFrontendEssential: true
  },
  {
    id: 'vue-reactivity',
    title: 'Реактивность',
    difficulty: 'beginner',
    description: 'Реактивность Vue 3 основана на Proxy API для отслеживания зависимостей. ref для примитивных значений, reactive для объектов, computed для вычисляемых значений, watch для отслеживания изменений. Система автоматически отслеживает зависимости и обновляет интерфейс при изменении данных.\n\nref vs reactive: ref используется для примитивных значений (строки, числа, булевы), reactive для объектов и массивов. ref возвращает объект с .value свойством, reactive возвращает проксированный объект. Выбор зависит от типа данных: примитивы → ref, объекты → reactive.\n\ncomputed и watch: computed для вычисляемых значений (мемоизируются автоматически), watch для побочных эффектов при изменении данных. computed пересчитывается только при изменении зависимостей, watch выполняется при изменении отслеживаемых значений.\n\nВ 2026 реактивность Vue 3 остаётся одной из сильных сторон фреймворка. Proxy API даёт автоматическое отслеживание зависимостей, что упрощает разработку. Понимание реактивности критично для эффективной работы с Vue.',
    keyPoints: [
      'Реактивность Vue 3: основана на Proxy API',
      'ref: для примитивных значений, reactive: для объектов',
      'computed: вычисляемые значения (мемоизируются), watch: побочные эффекты',
      'Автоматическое отслеживание зависимостей',
      'Сильная сторона Vue 3 в 2026',
      'Критично для эффективной работы'
    ],
    funFact: 'Реактивность Vue 3 была полностью переписана с использованием Proxy API вместо Object.defineProperty, который использовался в Vue 2. Это дало возможность отслеживать изменения в объектах и массивах без необходимости оборачивать каждое свойство, что значительно упростило API.',
    tags: ['vue', 'reactivity', 'ref', 'reactive', 'computed', 'basics', 'fundamentals', 'core'],
    examples: [
      {
        title: 'ref и reactive',
        code: `// ref: для примитивных значений
import { ref } from 'vue';

const count = ref(0);
const name = ref('Иван');

// Доступ через .value
count.value++; // 1
name.value = 'Мария';

// reactive: для объектов
import { reactive } from 'vue';

const user = reactive({
  name: 'Иван',
  age: 25
});

// Прямой доступ (без .value)
user.name = 'Мария';
user.age = 30;

// Преимущество: автоматическое отслеживание
// Изменения автоматически обновляют интерфейс`
      },
      {
        title: 'computed',
        code: `// computed: вычисляемые значения
import { ref, computed } from 'vue';

const count = ref(0);

// Мемоизируется автоматически
const doubled = computed(() => count.value * 2);
const isEven = computed(() => count.value % 2 === 0);

// Использование:
console.log(doubled.value); // 0 (если count = 0)
count.value = 5;
console.log(doubled.value); // 10
console.log(isEven.value); // false

// Преимущество: пересчёт только при изменении зависимостей
// Не пересчитывается при каждом обращении`
      },
      {
        title: 'watch',
        code: `// watch: отслеживание изменений
import { ref, watch } from 'vue';

const count = ref(0);
const name = ref('Иван');

// Отслеживание одного значения
watch(count, (newValue, oldValue) => {
  console.log('Count changed:', newValue);
});

// Отслеживание нескольких значений
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('Count or name changed');
});

// Немедленное выполнение
watch(count, (newValue) => {
  console.log('Count:', newValue);
}, { immediate: true });

// Преимущество: побочные эффекты при изменении
// Гибкость в отслеживании`
      }
    ],
    relatedTopics: ['vue-options-vs-composition', 'vue-vue2-vs-vue3'],
    isFrontendEssential: true
  }
];
