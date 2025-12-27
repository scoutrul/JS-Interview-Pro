import { Topic } from '../../../types';

export const JS_INTRODUCTION_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'algorithm-complexity',
    title: 'Big O и оптимизация',
    difficulty: 'advanced',
    description: 'Big O нотация описывает сложность алгоритмов по времени и памяти в худшем случае. O(1) — константная, O(n) — линейная, O(n²) — квадратичная, O(log n) — логарифмическая. Важно выбирать правильные структуры данных и алгоритмы для масштабируемости. Циклы, методы массивов и коллекций имеют разную сложность. Производительность зависит от количества операций и размера данных.',
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
    tags: ['complexity', 'big-o', 'performance', 'optimization', 'algorithms', 'scalability', 'data-structures'],
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
    relatedTopics: ['arrays-basic', 'map-set', 'performance-optimization', 'collections']
  }
];

