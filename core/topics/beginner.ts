import { Topic } from '../types';

export const BEGINNER_TOPICS: Topic[] = [
  {
    id: 'data-types',
    title: 'Типы данных',
    difficulty: 'beginner',
    description: 'JavaScript имеет 8 типов: 7 примитивов (number, string, boolean, null, undefined, symbol, bigint) и объекты. typeof возвращает строку с типом. null имеет тип "object" (баг языка). Примитивы передаются по значению, объекты по ссылке.',
    keyPoints: [
      'Примитивы: number, string, boolean, null, undefined, symbol, bigint.',
      'Объекты: все остальное (массивы, функции, даты — это объекты).',
      'typeof null возвращает "object" (исторический баг).',
      'Примитивы иммутабельны, объекты мутабельны.'
    ],
    tags: ['types', 'primitives', 'objects', 'basics'],
    examples: [
      {
        title: "Проверка типов",
        code: `typeof 42; // "number"\ntypeof "text"; // "string"\ntypeof true; // "boolean"\ntypeof null; // "object" (баг!)\ntypeof undefined; // "undefined"\ntypeof []; // "object"\ntypeof {}; // "object"`
      },
      {
        title: "Примитивы vs объекты",
        code: `let a = 5;\nlet b = a;\nb = 10;\nconsole.log(a); // 5 (не изменилось)\n\nlet obj1 = { x: 1 };\nlet obj2 = obj1;\nobj2.x = 2;\nconsole.log(obj1.x); // 2 (изменилось!)`
      },
      {
        title: "Массивы и функции - это объекты",
        code: `const arr = [1, 2];\narr.prop = "test";\nconsole.log(arr.prop); // "test"\n\nfunction fn() {}\nfn.prop = "test";\nconsole.log(fn.prop); // "test"`
      }
    ],
    relatedTopics: ['type-coercion', 'functions-types'],
    nextTopicId: 'type-coercion'
  },
  {
    id: 'type-coercion',
    title: 'Преобразование типов',
    difficulty: 'beginner',
    description: 'JavaScript автоматически преобразует типы при операциях. Явное: Number(), String(), Boolean(). Неявное: при сравнении, арифметике, конкатенации. "5" + 3 = "53", "5" - 3 = 2. Truthy значения: все кроме false, 0, "", null, undefined, NaN.',
    keyPoints: [
      'Явное: Number("5"), String(5), Boolean(1).',
      'Неявное: "5" + 3 = "53", "5" - 3 = 2.',
      'Truthy: все кроме false, 0, "", null, undefined, NaN.',
      'Falsy: false, 0, "", null, undefined, NaN.'
    ],
    tags: ['types', 'coercion', 'conversion'],
    examples: [
      {
        title: "Неявное преобразование",
        code: `"5" + 3; // "53" (конкатенация)\n"5" - 3; // 2 (преобразование в число)\n"5" * "2"; // 10\n!0; // true (преобразование в boolean)`
      },
      {
        title: "Явное преобразование",
        code: `Number("42"); // 42\nString(42); // "42"\nBoolean(1); // true\nBoolean(0); // false`
      },
      {
        title: "Truthy/Falsy",
        code: `if ("text") { } // truthy\nif (0) { } // falsy\nif ([]) { } // truthy (массив)\nif ({}) { } // truthy (объект)`
      }
    ],
    relatedTopics: ['data-types', 'comparison'],
    nextTopicId: 'comparison'
  },
  {
    id: 'comparison',
    title: '== vs ===',
    difficulty: 'beginner',
    description: '== выполняет приведение типов перед сравнением, === сравнивает без приведения (строгое). Всегда используй ===. == может давать неожиданные результаты: null == undefined (true), "5" == 5 (true), [] == false (true).',
    keyPoints: [
      '== (нестрогое): приводит типы, может давать неожиданные результаты.',
      '=== (строгое): сравнивает тип и значение, всегда используй это.',
      'null == undefined (true), но null !== undefined (false).',
      'NaN !== NaN (true), используй isNaN() или Number.isNaN().'
    ],
    tags: ['comparison', 'operators', 'equality'],
    examples: [
      {
        title: "Нестрогое сравнение (==)",
        code: `"5" == 5; // true\nnull == undefined; // true\n0 == false; // true\n[] == false; // true\n"" == 0; // true`
      },
      {
        title: "Строгое сравнение (===)",
        code: `"5" === 5; // false\nnull === undefined; // false\n0 === false; // false\n[] === false; // false\n"" === 0; // false`
      },
      {
        title: "Особые случаи",
        code: `NaN === NaN; // false\nisNaN(NaN); // true\nNumber.isNaN(NaN); // true\n\nObject.is(NaN, NaN); // true`
      }
    ],
    relatedTopics: ['type-coercion', 'operators'],
    nextTopicId: 'operators'
  },
  {
    id: 'operators',
    title: 'Операторы',
    difficulty: 'beginner',
    description: 'Арифметические: +, -, *, /, %, **. Логические: &&, ||, !. Тернарный: условие ? true : false. Spread: ...arr, ...obj. Оператор нулевого слияния: ?? (возвращает правую часть если левая null/undefined). Опциональная цепочка: ?. (безопасный доступ к свойствам).',
    keyPoints: [
      'Логические && и || возвращают последнее вычисленное значение, не boolean.',
      '?? возвращает правую часть только если левая null/undefined.',
      '?. безопасно обращается к свойствам, возвращает undefined при ошибке.',
      'Spread копирует массив/объект поверхностно.'
    ],
    tags: ['operators', 'spread', 'optional-chaining', 'nullish-coalescing'],
    examples: [
      {
        title: "Логические операторы",
        code: `true && "text"; // "text"\nfalse || "default"; // "default"\n!0; // true\n\nconst result = user && user.name; // старый способ\nconst name = user?.name; // новый способ`
      },
      {
        title: "Тернарный оператор",
        code: `const age = 18;\nconst status = age >= 18 ? "adult" : "minor";\n// эквивалентно if/else`
      },
      {
        title: "Nullish coalescing (??)",
        code: `const value = null ?? "default"; // "default"\nconst value2 = 0 ?? "default"; // 0 (не null/undefined)\nconst value3 = "" ?? "default"; // "" (не null/undefined)`
      },
      {
        title: "Опциональная цепочка (?.)",
        code: `user?.address?.city; // undefined если user или address null\nuser?.getName?.(); // вызов метода если существует\narr?.[0]; // доступ к элементу если массив существует`
      },
      {
        title: "Spread оператор",
        code: `const arr1 = [1, 2];\nconst arr2 = [...arr1, 3]; // [1, 2, 3]\n\nconst obj1 = { a: 1 };\nconst obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }`
      }
    ],
    relatedTopics: ['comparison', 'functions-types'],
    nextTopicId: 'functions-types'
  },
  {
    id: 'functions-types',
    title: 'Типы функций',
    difficulty: 'beginner',
    description: 'Function Declaration: function name() {} — всплывает. Function Expression: const fn = function() {} — не всплывает. Arrow Function: const fn = () => {} — нет this, arguments, нельзя использовать как конструктор. IIFE: (function() {})() — самовызывающаяся функция. Методы объекта: obj.method = function() {}.',
    keyPoints: [
      'Function Declaration всплывает, можно вызывать до объявления.',
      'Function Expression не всплывает, присваивается переменной.',
      'Arrow Function: нет this, arguments, super, нельзя new.',
      'IIFE изолирует область видимости, используется для модулей.'
    ],
    tags: ['functions', 'arrow-functions', 'declaration', 'expression'],
    examples: [
      {
        title: "Function Declaration",
        code: `sayHi(); // работает (всплывает)\nfunction sayHi() {\n  console.log("Hi");\n}`
      },
      {
        title: "Function Expression",
        code: `// sayHi(); // ошибка (не всплывает)\nconst sayHi = function() {\n  console.log("Hi");\n};`
      },
      {
        title: "Arrow Function",
        code: `const add = (a, b) => a + b;\nconst greet = name => "Hello " + name;\nconst log = () => console.log("Hi");\n\n// Нет this, arguments\nconst obj = {\n  name: "Test",\n  arrow: () => this.name, // undefined\n  regular: function() { return this.name; } // "Test"\n};`
      },
      {
        title: "IIFE (Immediately Invoked Function Expression)",
        code: `(function() {\n  const private = "secret";\n  // изолированная область видимости\n})();\n\n// Современная альтернатива — блок кода\n{\n  const private = "secret";\n}`
      }
    ],
    relatedTopics: ['data-types', 'hoisting-basic', 'this-basics'],
    nextTopicId: 'var-let-const'
  },
  {
    id: 'var-let-const',
    title: 'var, let, const',
    difficulty: 'beginner',
    description: 'var имеет функциональную область видимости и всплывает с undefined. let и const имеют блочную область видимости и не всплывают. const запрещает переприсваивание ссылки, но не делает объект неизменяемым. Используй const по умолчанию, let когда нужно переприсваивать, var не используй.',
    keyPoints: [
      'var: функциональная область видимости, допускает повторное объявление, всплывает (hoisting).',
      'let/const: блочная область видимости, не допускают повторного объявления.',
      'const требует инициализации и запрещает переопределение ссылки.'
    ],
    tags: ['variables', 'scope', 'let', 'const', 'hoisting', 'ES6'],
    examples: [
      {
        title: "Разница областей видимости",
        code: `if (true) {\n  var x = 5;\n  let y = 10;\n}\nconsole.log(x); // 5\n// console.log(y); // ReferenceError`
      },
      {
        title: "Повторное объявление",
        code: `var a = 1;\nvar a = 2; // OK\n\nlet b = 1;\n// let b = 2; // SyntaxError\n\nconst c = 1;\n// c = 2; // TypeError`
      },
      {
        title: "const и объекты",
        code: `const obj = { x: 1 };\nobj.x = 2; // OK (изменение свойства)\nobj.y = 3; // OK (добавление свойства)\n// obj = {}; // TypeError (переприсваивание)`
      }
    ],
    relatedTopics: ['functions-types', 'hoisting-basic', 'tdz-basic'],
    nextTopicId: 'hoisting-basic'
  },
  {
    id: 'hoisting-basic',
    title: 'Hoisting (Всплытие)',
    difficulty: 'beginner',
    description: 'JavaScript "поднимает" объявления var и function в начало области видимости. var доступна как undefined до присваивания, function доступна полностью. Это значит, что можно вызывать функцию до её объявления. let и const не всплывают так же — они в TDZ.',
    keyPoints: [
      'var всплывает и равна undefined до присваивания.',
      'Function Declaration всплывает полностью — можно вызывать до объявления.',
      'let/const не всплывают — вызов до объявления даст ошибку.'
    ],
    tags: ['hoisting', 'variables', 'functions'],
    examples: [
      {
        title: "Всплытие var и function",
        code: `console.log(x); // undefined (не ошибка!)\nvar x = 5;\n\nsayHi(); // "Hi" (работает!)\nfunction sayHi() { console.log("Hi"); }`
      },
      {
        title: "let/const не всплывают",
        code: `// console.log(y); // ReferenceError\nlet y = 10;`
      },
      {
        title: "Всплытие в функциях",
        code: `function test() {\n  console.log(a); // undefined\n  var a = 5;\n  \n  say(); // "Hi"\n  function say() { console.log("Hi"); }\n}`
      }
    ],
    relatedTopics: ['var-let-const', 'tdz-basic'],
    nextTopicId: 'tdz-basic'
  },
  {
    id: 'tdz-basic',
    title: 'Temporal Dead Zone (TDZ)',
    difficulty: 'beginner',
    description: 'TDZ — период от начала блока до объявления let/const. Обращение к переменной в TDZ вызывает ReferenceError. var такой защиты не имеет — возвращает undefined. TDZ защищает от использования неинициализированных переменных.',
    keyPoints: [
      'TDZ начинается с входа в блок и заканчивается на строке объявления.',
      'let/const в TDZ вызывают ReferenceError, var возвращает undefined.',
      'Защищает от логических ошибок использования переменных до инициализации.'
    ],
    tags: ['tdz', 'variables', 'let', 'const', 'errors'],
    examples: [
      {
        title: "TDZ для let/const",
        code: `{\n  // console.log(x); // ReferenceError (TDZ)\n  let x = 5;\n  console.log(x); // 5 (OK)\n}`
      },
      {
        title: "var не имеет TDZ",
        code: `{\n  console.log(y); // undefined (не ошибка!)\n  var y = 10;\n}`
      },
      {
        title: "TDZ в циклах",
        code: `for (let i = 0; i < 3; i++) {\n  // console.log(i); // OK после инициализации\n  setTimeout(() => console.log(i), 100);\n}`
      }
    ],
    relatedTopics: ['hoisting-basic', 'var-let-const'],
    nextTopicId: 'scope-chain'
  },
  {
    id: 'scope-chain',
    title: 'Scope Chain',
    difficulty: 'beginner',
    description: 'JavaScript ищет переменные от локальной области видимости к глобальной. Функция видит переменные родительских областей, но не наоборот. Поиск идет по цепочке до глобального scope. Это основа работы замыканий.',
    keyPoints: [
      'Поиск идет строго снизу вверх по иерархии.',
      'Функции имеют доступ к переменным родителей, но не наоборот.'
    ],
    tags: ['scope', 'closure', 'chain'],
    examples: [
      {
        title: "Поиск по цепочке",
        code: `const name = "Global";\nfunction outer() {\n  const name = "Outer";\n  function inner() {\n    console.log(name); // "Outer"\n  }\n  inner();\n}\nouter();`
      },
      {
        title: "Доступ к глобальной переменной",
        code: `const global = "global";\nfunction test() {\n  console.log(global); // "global"\n  // локальной переменной нет\n}`
      },
      {
        title: "Вложенные функции",
        code: `function outer() {\n  const x = 1;\n  function middle() {\n    const y = 2;\n    function inner() {\n      console.log(x, y); // 1, 2\n    }\n    inner();\n  }\n  middle();\n}`
      }
    ],
    relatedTopics: ['hoisting-basic', 'lexical-env', 'closures-basic'],
    nextTopicId: 'this-basics'
  },
  {
    id: 'this-basics',
    title: 'Контекст this',
    difficulty: 'beginner',
    description: 'this определяется в момент вызова, не при создании функции. В методе объекта — сам объект. В обычной функции (strict mode) — undefined. Через call/apply/bind — явно заданный объект. Через new — новый экземпляр. Стрелочные функции не имеют своего this.',
    keyPoints: [
      'В методе — ссылается на объект.',
      'В обычной функции (strict mode) — undefined.',
      'В глобальном контексте — window/global.'
    ],
    tags: ['this', 'context', 'objects'],
    examples: [
      {
        title: "Вызов метода",
        code: `const user = {\n  name: "Alice",\n  say() { console.log(this.name); }\n};\nuser.say(); // "Alice"`
      },
      {
        title: "this в обычной функции",
        code: `"use strict";\nfunction test() {\n  console.log(this); // undefined\n}\ntest();`
      },
      {
        title: "this в глобальном контексте",
        code: `console.log(this); // window (в браузере)\n\nfunction test() {\n  console.log(this); // window (не strict mode)\n}\ntest();`
      }
    ],
    relatedTopics: ['arrow-functions', 'context-loss'],
    nextTopicId: 'arrays-basic'
  },
  {
    id: 'arrays-basic',
    title: 'Массивы (методы)',
    difficulty: 'beginner',
    description: 'Массивы — упорядоченные коллекции. Основные методы: map преобразует каждый элемент, filter отфильтровывает, forEach выполняет действие, find ищет первый элемент, includes проверяет наличие. Все методы не изменяют исходный массив (кроме мутирующих).',
    keyPoints: [
      'map: создает новый массив с преобразованными элементами.',
      'filter: создает новый массив с элементами, прошедшими проверку.',
      'forEach: выполняет функцию для каждого элемента, возвращает undefined.',
      'find: возвращает первый элемент, удовлетворяющий условию.',
      'includes: проверяет наличие элемента, возвращает boolean.'
    ],
    tags: ['arrays', 'methods', 'map', 'filter', 'forEach'],
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
    nextTopicId: 'objects-basic'
  },
  {
    id: 'objects-basic',
    title: 'Объекты (работа)',
    difficulty: 'beginner',
    description: 'Объекты — коллекции пар ключ-значение. Создание: {}, new Object(), Object.create(). Доступ: точка или квадратные скобки. Object.keys возвращает массив ключей, Object.values — значений, Object.entries — массив [ключ, значение].',
    keyPoints: [
      'Доступ: obj.prop или obj["prop"].',
      'Object.keys(obj): массив всех ключей.',
      'Object.values(obj): массив всех значений.',
      'Object.entries(obj): массив [ключ, значение].'
    ],
    tags: ['objects', 'keys', 'values', 'entries'],
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
    nextTopicId: 'destructuring-basic'
  },
  {
    id: 'destructuring-basic',
    title: 'Деструктуризация',
    difficulty: 'beginner',
    description: 'Деструктуризация извлекает значения из массивов и объектов в переменные. Для массивов: порядок важен. Для объектов: имена должны совпадать с ключами. Можно переименовывать и задавать значения по умолчанию.',
    keyPoints: [
      'Массивы: порядок элементов важен.',
      'Объекты: имена переменных должны совпадать с ключами.',
      'Можно переименовывать: {oldName: newName}.',
      'Значения по умолчанию: {name = "Default"}.'
    ],
    tags: ['destructuring', 'arrays', 'objects', 'ES6'],
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
    nextTopicId: 'strings-methods'
  },
  {
    id: 'strings-methods',
    title: 'Строки (методы)',
    difficulty: 'beginner',
    description: 'Строки иммутабельны — методы возвращают новую строку. slice/substring извлекают подстроку, includes проверяет наличие, indexOf ищет позицию. Шаблонные строки (backticks) позволяют интерполяцию и многострочность.',
    keyPoints: [
      'slice(start, end): извлекает подстроку, отрицательные индексы с конца.',
      'substring(start, end): как slice, но отрицательные индексы = 0.',
      'includes(str): проверяет наличие подстроки, возвращает boolean.',
      'Шаблонные строки: интерполяция ${} и многострочность.'
    ],
    tags: ['strings', 'methods', 'template-literals'],
    examples: [
      {
        title: "Методы строк",
        code: `const str = "Hello World";\nstr.slice(0, 5); // "Hello"\nstr.slice(-5); // "World"\nstr.substring(0, 5); // "Hello"\nstr.includes("World"); // true\nstr.indexOf("o"); // 4`
      },
      {
        title: "Шаблонные строки",
        code: `const name = "Alice";\nconst age = 30;\nconst msg = "Hello, I'm " + name + " and I'm " + age + " years old";\n// "Hello, I'm Alice and I'm 30 years old"\n\nconst multi = "Line 1\\nLine 2\\nLine 3";`
      },
      {
        title: "Другие методы",
        code: `const str = "  hello world  ";\nstr.trim(); // "hello world"\nstr.toUpperCase(); // "  HELLO WORLD  "\nstr.toLowerCase(); // "  hello world  "\nstr.replace("world", "JS"); // "  hello JS  "`
      }
    ],
    relatedTopics: ['data-types', 'operators'],
    nextTopicId: 'conditions-loops'
  },
  {
    id: 'conditions-loops',
    title: 'Условия и циклы',
    difficulty: 'beginner',
    description: 'Условия: if/else, switch (строгое сравнение), тернарный оператор. Циклы: for (счетчик), while (условие), for...of (значения), for...in (ключи объектов). break прерывает цикл, continue пропускает итерацию.',
    keyPoints: [
      'if/else: базовое условие, можно вкладывать.',
      'switch: строгое сравнение (===), нужен break.',
      'for...of: итерация по значениям (массивы, строки).',
      'for...in: итерация по ключам объектов (включая прототип).'
    ],
    tags: ['conditions', 'loops', 'if', 'for', 'while'],
    examples: [
      {
        title: "if/else и switch",
        code: `const age = 18;\nif (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}\n\nconst day = "Mon";\nswitch(day) {\n  case "Mon": console.log("Monday"); break;\n  case "Tue": console.log("Tuesday"); break;\n  default: console.log("Other");\n}`
      },
      {
        title: "for и while",
        code: `for (let i = 0; i < 3; i++) {\n  console.log(i); // 0, 1, 2\n}\n\nlet j = 0;\nwhile (j < 3) {\n  console.log(j);\n  j++;\n}`
      },
      {
        title: "for...of и for...in",
        code: `const arr = [10, 20, 30];\nfor (const value of arr) {\n  console.log(value); // 10, 20, 30\n}\n\nconst obj = { a: 1, b: 2 };\nfor (const key in obj) {\n  console.log(key, obj[key]); // "a" 1, "b" 2\n}`
      }
    ],
    relatedTopics: ['operators', 'comparison']
  }
];

