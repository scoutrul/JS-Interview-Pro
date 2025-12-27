import { Topic } from '../../../types';

export const JS_COLLECTIONS_BEGINNER_TOPICS: Topic[] = [
{
    id: 'arrays-basic',
    title: 'Массивы (методы)',
    difficulty: 'beginner',
    description: 'Массивы — упорядоченные коллекции. Основные методы: map, filter, forEach, find, includes. Большинство методов не изменяют исходный массив.',
    keyPoints: [
      'map: создает новый массив с преобразованными элементами.',
      'filter: создает новый массив с элементами, прошедшими проверку.',
      'forEach: выполняет функцию для каждого элемента, возвращает undefined.',
      'find: возвращает первый элемент, удовлетворяющий условию.',
      'includes: проверяет наличие элемента, возвращает boolean.'
    ],
    funFact: 'Методы массивов map, filter, reduce были вдохновлены функциональными языками программирования. Они позволяют писать декларативный код вместо императивных циклов.',
    tags: ['arrays', 'methods', 'map', 'filter', 'forEach', 'higher-order-functions', 'data-types'],
    examples: [
      {
        title: "map и filter",
        code: `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]\nconst evens = numbers.filter(x => x % 2 === 0); // [2, 4]`
      },
      {
        title: "find и includes",
        code: `const users = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];\nconst user = users.find(u => u.id === 2); // {id: 2, name: "Bob"}\nconst hasBob = users.some(u => u.name === "Bob"); // true\nconst numbers = [1, 2, 3];\nnumbers.includes(2); // true`
      },
      {
        title: "forEach vs map",
        code: `const arr = [1, 2, 3];\n\n// forEach: только для побочных эффектов\narr.forEach(x => console.log(x)); // 1, 2, 3\n\n// map: создает новый массив\nconst doubled = arr.map(x => x * 2); // [2, 4, 6]`
      }
    ],
    relatedTopics: ['data-types', 'operators'],
  },
{
    id: 'objects-basic',
    title: 'Объекты (работа)',
    difficulty: 'beginner',
    description: 'Объекты — коллекции пар ключ-значение. Создание: {}, new Object(), Object.create(). Доступ: точка или квадратные скобки.',
    keyPoints: [
      'Доступ: obj.prop или obj["prop"].',
      'Object.keys(obj): массив всех ключей.',
      'Object.values(obj): массив всех значений.',
      'Object.entries(obj): массив [ключ, значение].'
    ],
    funFact: 'В JavaScript объекты могут иметь ключи только в виде строк или Symbol. Числа и другие типы автоматически преобразуются в строки при использовании в качестве ключей.',
    tags: ['objects', 'keys', 'values', 'entries', 'object-methods', 'data-types'],
    examples: [
      {
        title: "Создание и доступ",
        code: `const obj = { name: "Alice", age: 30 };\nconsole.log(obj.name); // "Alice"\nconsole.log(obj["age"]); // 30\n\nobj.city = "Moscow"; // добавление свойства\nobj["country"] = "Russia";`
      },
      {
        title: "Object.keys, values, entries",
        code: `const obj = { a: 1, b: 2, c: 3 };\nObject.keys(obj); // ["a", "b", "c"]\nObject.values(obj); // [1, 2, 3]\nObject.entries(obj); // [["a", 1], ["b", 2], ["c", 3]]`
      },
      {
        title: "Итерация по объекту",
        code: `const obj = { x: 10, y: 20 };\n\nfor (const key in obj) {\n  console.log(key, obj[key]);\n}\n\n// или через entries\nfor (const [key, value] of Object.entries(obj)) {\n  console.log(key, value);\n}`
      }
    ],
    relatedTopics: ['data-types', 'arrays-basic'],
  },
{
    id: 'destructuring-basic',
    title: 'Деструктуризация',
    difficulty: 'beginner',
    description: 'Деструктуризация извлекает значения из массивов и объектов в переменные. Для массивов порядок важен, для объектов имена должны совпадать с ключами.',
    keyPoints: [
      'Массивы: порядок элементов важен.',
      'Объекты: имена переменных должны совпадать с ключами.',
      'Можно переименовывать: {oldName: newName}.',
      'Значения по умолчанию: {name = "Default"}.'
    ],
    funFact: 'Деструктуризация была добавлена в ES6 и стала одним из самых популярных синтаксических улучшений. Она позволяет писать более чистый и читаемый код, особенно при работе с параметрами функций.',
    tags: ['destructuring', 'arrays', 'objects', 'ES6', 'arrays-basic', 'objects-basic'],
    examples: [
      {
        title: "Деструктуризация массива",
        code: `const arr = [1, 2, 3];\nconst [a, b, c] = arr;\nconsole.log(a, b, c); // 1, 2, 3\n\nconst [first, ...rest] = arr;\nconsole.log(first); // 1\nconsole.log(rest); // [2, 3]`
      },
      {
        title: "Деструктуризация объекта",
        code: `const user = { name: "Alice", age: 30 };\nconst { name, age } = user;\nconsole.log(name, age); // "Alice", 30\n\n// Переименование\nconst { name: userName, age: userAge } = user;`
      },
      {
        title: "Значения по умолчанию",
        code: `const arr = [1];\nconst [a, b = 10] = arr;\nconsole.log(a, b); // 1, 10\n\nconst obj = { x: 1 };\nconst { x, y = 2 } = obj;\nconsole.log(x, y); // 1, 2`
      }
    ],
    relatedTopics: ['arrays-basic', 'objects-basic'],
  }
];
