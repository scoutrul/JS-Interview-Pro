import { Topic } from '../../../types';

export const OPTIMIZATION_TOPICS: Topic[] = [
  {
    id: 'performance-basics',
    title: 'Основы производительности',
    description: 'Метрики производительности: время загрузки, First Contentful Paint (FCP), Time to Interactive (TTI). Профилирование: анализ времени выполнения кода. Бенчмарки: измерение производительности перед и после оптимизации.',
    difficulty: 'beginner',
    tags: ['performance', 'metrics', 'profiling'],
    keyPoints: [
      'FCP измеряет время до первого контента.',
      'TTI измеряет время до интерактивности.',
      'Профилирование показывает узкие места.',
      'Бенчмарки помогают измерить улучшения.',
      'Lighthouse автоматически аудирует производительность.'
    ],
    examples: [
      {
        title: 'Измерение производительности',
        code: `// Performance API
const start = performance.now();
// ... код ...
const end = performance.now();
console.log(\`Время выполнения: \${end - start}ms\`);

// Lighthouse метрики
// FCP, LCP, TTI, TBT, CLS`
      }
    ],
    relatedTopics: ['code-optimization']
  },
  {
    id: 'code-optimization',
    title: 'Оптимизация кода',
    description: 'Алгоритмы: выбор правильной структуры данных и алгоритма. Структуры данных: массивы vs объекты, Set vs Array для уникальности. Оптимизация циклов: избегать вложенных циклов, использовать эффективные методы массивов.',
    difficulty: 'intermediate',
    tags: ['optimization', 'algorithms', 'performance'],
    keyPoints: [
      'Выбор правильного алгоритма критичен для производительности.',
      'Set быстрее Array для проверки наличия элемента.',
      'Map быстрее Object для частых добавлений/удалений.',
      'Избегать вложенных циклов когда возможно.',
      'Использовать эффективные методы массивов (map, filter, reduce).'
    ],
    examples: [
      {
        title: 'Оптимизация структур данных',
        code: `// Медленно
const array = [1, 2, 3, 4, 5];
if (array.includes(3)) { }  // O(n)

// Быстро
const set = new Set([1, 2, 3, 4, 5]);
if (set.has(3)) { }  // O(1)`
      },
      {
        title: 'Оптимизация циклов',
        code: `// Медленно - O(n²)
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // ...
  }
}

// Быстро - O(n)
arr.forEach(item => {
  // ...
});`
      }
    ],
    relatedTopics: ['performance-basics', 'big-o-complexity', 'bundle-optimization']
  },
  {
    id: 'big-o-complexity',
    title: 'Big O и оптимизация',
    description: 'Big O нотация описывает сложность алгоритмов по времени и памяти в худшем случае. O(1) — константная, O(n) — линейная, O(n²) — квадратичная, O(log n) — логарифмическая. Важно выбирать правильные структуры данных и алгоритмы для масштабируемости. Циклы, методы массивов и коллекций имеют разную сложность. Производительность зависит от количества операций и размера данных.',
    difficulty: 'advanced',
    tags: ['complexity', 'big-o', 'performance', 'optimization', 'algorithms', 'scalability', 'data-structures'],
    keyPoints: [
      'Big O: описывает сложность алгоритма по времени и памяти в худшем случае.',
      'O(1): константная сложность (доступ по индексу, добавление в конец массива, Map.get).',
      'O(n): линейная сложность (перебор массива, поиск элемента, includes/indexOf).',
      'O(n²): квадратичная сложность (вложенные циклы, некоторые алгоритмы сортировки).',
      'O(log n): логарифмическая сложность (бинарный поиск, операции в сбалансированных деревьях).',
      'Методы массивов: map/filter/reduce — O(n), includes/indexOf — O(n), push/pop — O(1), shift/unshift — O(n).',
      'Коллекции: Map/Set get/has — O(1), Object.keys — O(n).',
      'Масштабируемость: выбор правильных структур данных критичен для производительности.',
      'Оптимизация: избегать вложенных циклов, использовать Map/Set для быстрого поиска, кэшировать результаты.'
    ],
    examples: [
      {
        title: "O(1) - константная сложность",
        code: `// Доступ по индексу
const arr = [1, 2, 3, 4, 5];
arr[0]; // O(1) - всегда одна операция

// Добавление в конец
arr.push(6); // O(1) - всегда одна операция

// Получение из Map
const map = new Map([['a', 1], ['b', 2]]);
map.get('a'); // O(1) - хеш-таблица

// Получение размера
map.size; // O(1)`
      },
      {
        title: "O(n) - линейная сложность",
        code: `// Перебор массива
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // O(n) - n операций
}

// Методы массивов
arr.map(x => x * 2); // O(n)
arr.filter(x => x > 2); // O(n)
arr.find(x => x === 3); // O(n) в худшем случае
arr.includes(3); // O(n)
arr.indexOf(3); // O(n)

// Object.keys
Object.keys({ a: 1, b: 2 }); // O(n)`
      },
      {
        title: "O(n²) - квадратичная сложность",
        code: `// Вложенные циклы
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    console.log(arr[i], arr[j]); // O(n²) - n * n операций
  }
}

// Некоторые алгоритмы сортировки
arr.sort(); // O(n log n) или O(n²) в зависимости от реализации

// Поиск дубликатов (наивный способ)
function hasDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true; // O(n²)
    }
  }
  return false;
}`
      },
      {
        title: "O(log n) - логарифмическая сложность",
        code: `// Бинарный поиск
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
} // O(log n)`
      },
      {
        title: "Сравнение сложности операций",
        code: `const arr = [1, 2, 3, 4, 5];
const map = new Map([['a', 1], ['b', 2]]);

// O(1)
arr[0]; // доступ по индексу
arr.push(6); // добавление в конец
map.get('a'); // получение из Map

// O(n)
arr.includes(3); // поиск элемента
arr.indexOf(3); // поиск индекса
arr.shift(); // удаление из начала (сдвиг элементов)
Object.keys({ a: 1, b: 2 }); // получение ключей

// O(n²)
// Вложенные циклы для сравнения всех пар элементов`
      },
      {
        title: "Оптимизация - использование правильных структур",
        code: `// Плохо: O(n²)
function findPair(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return [i, j];
    }
  }
}

// Хорошо: O(n)
function findPair(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(arr[i], i);
  }
}`
      }
    ],
    relatedTopics: ['code-optimization', 'performance-basics']
  },
  {
    id: 'bundle-optimization',
    title: 'Оптимизация бандла',
    description: 'Code splitting: разделение кода на чанки, загрузка по требованию. Tree shaking: удаление неиспользуемого кода. Lazy loading: загрузка компонентов и модулей только когда они нужны.',
    difficulty: 'intermediate',
    tags: ['bundling', 'webpack', 'optimization'],
    keyPoints: [
      'Code splitting уменьшает размер начального бандла.',
      'Tree shaking удаляет неиспользуемый код.',
      'Lazy loading загружает код по требованию.',
      'Динамические импорты создают отдельные чанки.',
      'Анализ бандла помогает найти большие зависимости.'
    ],
    examples: [
      {
        title: 'Code splitting',
        code: `// Динамический импорт
const Component = lazy(() => import('./Component'));

// React lazy loading
<Suspense fallback={<div>Loading...</div>}>
  <Component />
</Suspense>`
      },
      {
        title: 'Tree shaking',
        code: `// Импортировать только нужное
import { debounce } from 'lodash-es';  // ✅
import _ from 'lodash';  // ❌ (весь lodash)`
      }
    ],
    relatedTopics: ['code-optimization', 'runtime-optimization']
  },
  {
    id: 'runtime-optimization',
    title: 'Оптимизация рантайма',
    description: 'Мемоизация: кэширование результатов функций. Дебаунс и троттлинг: ограничение частоты вызовов функций. Виртуализация: рендеринг только видимых элементов в больших списках.',
    difficulty: 'advanced',
    tags: ['performance', 'optimization', 'runtime'],
    keyPoints: [
      'Мемоизация кэширует результаты для одинаковых входных данных.',
      'Дебаунс откладывает выполнение до паузы в вызовах.',
      'Троттлинг ограничивает частоту вызовов.',
      'Виртуализация рендерит только видимые элементы.',
      'React.memo предотвращает ненужные ре-рендеры.'
    ],
    examples: [
      {
        title: 'Мемоизация',
        code: `function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    return cache[key] = fn(...args);
  };
}

const expensiveFn = memoize((n) => {
  // дорогие вычисления
  return n * 2;
});`
      },
      {
        title: 'Дебаунс и троттлинг',
        code: `function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`
      }
    ],
    relatedTopics: ['bundle-optimization']
  }
];

