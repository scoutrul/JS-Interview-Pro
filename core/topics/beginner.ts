import { Topic } from '../types';

export const BEGINNER_TOPICS: Topic[] = [
  {
    id: 'data-types',
    title: 'Типы данных',
    difficulty: 'beginner',
    description: 'JavaScript имеет 8 типов: 7 примитивов (number, string, boolean, null, undefined, symbol, bigint) и объекты. typeof возвращает строку с типом. null имеет тип "object" (баг языка). Примитивы передаются по значению (копируется само значение), объекты по ссылке (копируется ссылка на объект в памяти). При изменении объекта по ссылке меняется оригинал.',
    keyPoints: [
      'Примитивы: number, string, boolean, null, undefined, symbol, bigint.',
      'Объекты: все остальное (массивы, функции, даты — это объекты).',
      'typeof null возвращает "object" (исторический баг).',
      'Примитивы иммутабельны, объекты мутабельны.',
      'Передача по значению: примитивы копируются, изменения не влияют на оригинал.',
      'Передача по ссылке: объекты копируется ссылка, изменения влияют на оригинал.'
    ],
    tags: ['types', 'primitives', 'objects', 'basics', 'references'],
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
  },
  {
    id: 'json-methods',
    title: 'JSON методы',
    difficulty: 'beginner',
    description: 'JSON.parse() преобразует JSON строку в объект, JSON.stringify() — объект в JSON строку. При ошибке parse выбрасывает SyntaxError. stringify может принимать replacer и space для форматирования. Ограничения: undefined, функции, Symbol пропускаются при сериализации. Date преобразуется в строку. Циклические ссылки вызывают ошибку. BigInt не поддерживается.',
    keyPoints: [
      'JSON.parse(str): преобразует JSON строку в объект.',
      'JSON.stringify(obj): преобразует объект в JSON строку.',
      'Ошибки: parse выбрасывает SyntaxError при невалидном JSON.',
      'replacer: функция или массив для фильтрации свойств.',
      'space: форматирование (отступы) в результирующей строке.',
      'Пропускаются: undefined, функции, Symbol.',
      'Date преобразуется в строку ISO, при parse остается строкой.',
      'Циклические ссылки вызывают TypeError в stringify.',
      'BigInt вызывает TypeError в stringify.'
    ],
    tags: ['json', 'serialization', 'parsing', 'data', 'objects-advanced'],
    examples: [
      {
        title: "Базовое использование",
        code: `const obj = { name: "Alice", age: 30 };\nconst json = JSON.stringify(obj);\n// '{"name":"Alice","age":30}'\n\nconst parsed = JSON.parse(json);\n// { name: "Alice", age: 30 }`
      },
      {
        title: "Обработка ошибок",
        code: `try {\n  const obj = JSON.parse('invalid json');\n} catch (e) {\n  console.error("Parse error:", e.message);\n}\n\n// Безопасный парсинг\nfunction safeParse(str) {\n  try {\n    return JSON.parse(str);\n  } catch {\n    return null;\n  }\n}`
      },
      {
        title: "replacer и space",
        code: `const obj = { name: "Alice", age: 30, password: "secret" };\n\n// replacer: исключить password\nJSON.stringify(obj, ["name", "age"]);\n// '{"name":"Alice","age":30}'\n\n// space: форматирование\nJSON.stringify(obj, null, 2);\n// {\n//   "name": "Alice",\n//   "age": 30\n// }`
      },
      {
        title: "Пропускаемые значения",
        code: `const obj = {\n  name: "Alice",\n  age: undefined, // пропускается\n  fn: function() {}, // пропускается\n  sym: Symbol("id"), // пропускается\n  date: new Date() // преобразуется в строку\n};\n\nJSON.stringify(obj);\n// '{"name":"Alice","date":"2023-12-25T10:00:00.000Z"}'\n\n// При parse Date остается строкой\nconst parsed = JSON.parse(JSON.stringify(obj));\nconsole.log(typeof parsed.date); // "string"`
      },
      {
        title: "Циклические ссылки - ошибка",
        code: `const obj = { name: "Alice" };\nobj.self = obj; // циклическая ссылка\n\n// TypeError: Converting circular structure to JSON\n// JSON.stringify(obj);\n\n// Решение: использовать replacer\nfunction removeCircular(obj, seen = new WeakSet()) {\n  return JSON.stringify(obj, (key, value) => {\n    if (typeof value === 'object' && value !== null) {\n      if (seen.has(value)) return '[Circular]';\n      seen.add(value);\n    }\n    return value;\n  });\n}`
      },
      {
        title: "BigInt не поддерживается",
        code: `const obj = { id: BigInt(123) };\n\n// TypeError: Do not know how to serialize a BigInt\n// JSON.stringify(obj);\n\n// Решение: преобразовать в строку\nconst obj2 = { id: String(BigInt(123)) };\nJSON.stringify(obj2); // '{"id":"123"}'`
      }
    ],
    relatedTopics: ['objects-basic', 'strings-methods', 'object-copying']
  },
  {
    id: 'object-methods',
    title: 'Методы Object',
    difficulty: 'beginner',
    description: 'Object.keys() возвращает массив ключей, Object.values() — значений, Object.entries() — пар [ключ, значение]. Object.assign() копирует свойства, Object.freeze() делает объект неизменяемым (нельзя добавлять/удалять/изменять свойства). Object.seal() запрещает добавлять/удалять, но позволяет изменять. Object.preventExtensions() запрещает только добавление новых свойств.',
    keyPoints: [
      'Object.keys(obj): массив ключей объекта.',
      'Object.values(obj): массив значений объекта.',
      'Object.entries(obj): массив пар [ключ, значение].',
      'Object.assign(target, ...sources): копирует свойства в target.',
      'Object.freeze(obj): полная блокировка (нельзя добавлять/удалять/изменять).',
      'Object.seal(obj): нельзя добавлять/удалять, можно изменять существующие.',
      'Object.preventExtensions(obj): нельзя добавлять новые свойства.',
      'Проверка: isFrozen(), isSealed(), isExtensible().'
    ],
    tags: ['objects', 'methods', 'iteration', 'immutability', 'objects-advanced'],
    examples: [
      {
        title: "keys, values, entries",
        code: `const obj = { a: 1, b: 2, c: 3 };\n\nObject.keys(obj); // ["a", "b", "c"]\nObject.values(obj); // [1, 2, 3]\nObject.entries(obj); // [["a", 1], ["b", 2], ["c", 3]]\n\n// Итерация через entries\nfor (const [key, value] of Object.entries(obj)) {\n  console.log(key, value);\n}`
      },
      {
        title: "Object.assign",
        code: `const target = { a: 1 };\nconst source1 = { b: 2 };\nconst source2 = { c: 3 };\n\nObject.assign(target, source1, source2);\n// target = { a: 1, b: 2, c: 3 }\n\n// Поверхностное копирование\nconst copy = Object.assign({}, target);`
      },
      {
        title: "Object.freeze - полная блокировка",
        code: `const obj = { name: "Alice" };\nObject.freeze(obj);\n\nobj.name = "Bob"; // Игнорируется в strict mode (TypeError)\nobj.age = 30; // Игнорируется\ndelete obj.name; // Игнорируется\n\nObject.isFrozen(obj); // true\n\n// Вложенные объекты не замораживаются\nconst nested = { user: { name: "Alice" } };\nObject.freeze(nested);\nnested.user.name = "Bob"; // Работает! (поверхностное)`
      },
      {
        title: "Object.seal - можно изменять, нельзя добавлять/удалять",
        code: `const obj = { name: "Alice" };\nObject.seal(obj);\n\nobj.name = "Bob"; // OK (можно изменять)\nobj.age = 30; // Игнорируется (нельзя добавлять)\ndelete obj.name; // Игнорируется (нельзя удалять)\n\nObject.isSealed(obj); // true`
      },
      {
        title: "Object.preventExtensions - только запрет добавления",
        code: `const obj = { name: "Alice" };\nObject.preventExtensions(obj);\n\nobj.name = "Bob"; // OK (можно изменять)\ndelete obj.name; // OK (можно удалять)\nobj.age = 30; // Игнорируется (нельзя добавлять)\n\nObject.isExtensible(obj); // false`
      }
    ],
    relatedTopics: ['objects-basic', 'destructuring-basic', 'arrays-basic', 'object-copying']
  },
  {
    id: 'date-api',
    title: 'Date API',
    difficulty: 'beginner',
    description: 'Date создает объект даты. new Date() — текущая дата, new Date(timestamp) — из timestamp, new Date(year, month, day) — из компонентов. Методы: getFullYear(), getMonth(), getDate(), getTime(). Месяцы начинаются с 0. Форматирование через toLocaleString(), toISOString().',
    keyPoints: [
      'new Date(): текущая дата и время.',
      'new Date(timestamp): из миллисекунд с 1970-01-01.',
      'new Date(year, month, day): из компонентов (месяц 0-11).',
      'getTime(): timestamp в миллисекундах.',
      'toISOString(): строка в формате ISO 8601.'
    ],
    tags: ['date', 'time', 'formatting', 'api'],
    examples: [
      {
        title: "Создание дат",
        code: `const now = new Date();\nconst timestamp = new Date(1609459200000); // 2021-01-01\nconst specific = new Date(2023, 11, 25); // 25 декабря 2023 (месяц 0-11)\n\nconsole.log(now); // текущая дата`
      },
      {
        title: "Методы получения",
        code: `const date = new Date(2023, 11, 25, 14, 30, 0);\n\ndate.getFullYear(); // 2023\ndate.getMonth(); // 11 (декабрь, 0-11)\ndate.getDate(); // 25\ndate.getDay(); // 1 (понедельник, 0-6)\ndate.getHours(); // 14\ndate.getMinutes(); // 30`
      },
      {
        title: "Форматирование",
        code: `const date = new Date();\n\ndate.toISOString(); // "2023-12-25T14:30:00.000Z"\ndate.toLocaleString('ru-RU'); // "25.12.2023, 14:30:00"\ndate.toLocaleDateString('ru-RU'); // "25.12.2023"\ndate.getTime(); // timestamp в миллисекундах`
      }
    ],
    relatedTopics: ['objects-basic', 'strings-methods']
  },
  {
    id: 'web-storage',
    title: 'Web Storage API',
    difficulty: 'beginner',
    description: 'localStorage и sessionStorage хранят данные в браузере. localStorage сохраняется между сессиями, sessionStorage — только в текущей вкладке. Оба хранят только строки. Методы: setItem(), getItem(), removeItem(), clear(). Ограничение ~5-10MB.',
    keyPoints: [
      'localStorage: сохраняется между сессиями браузера.',
      'sessionStorage: только в текущей вкладке.',
      'Только строки: объекты через JSON.stringify/parse.',
      'setItem(key, value), getItem(key), removeItem(key), clear().',
      'Ограничение: ~5-10MB на домен.'
    ],
    tags: ['storage', 'localStorage', 'sessionStorage', 'browser', 'api'],
    examples: [
      {
        title: "Базовое использование",
        code: `// Сохранение\nlocalStorage.setItem('name', 'Alice');\nlocalStorage.setItem('age', '30');\n\n// Получение\nconst name = localStorage.getItem('name'); // "Alice"\nconst age = localStorage.getItem('age'); // "30"\n\n// Удаление\nlocalStorage.removeItem('age');\n\n// Очистка всего\nlocalStorage.clear();`
      },
      {
        title: "Работа с объектами",
        code: `const user = { name: "Alice", age: 30 };\n\n// Сохранение объекта\nlocalStorage.setItem('user', JSON.stringify(user));\n\n// Получение объекта\nconst saved = localStorage.getItem('user');\nconst userObj = JSON.parse(saved);\n// { name: "Alice", age: 30 }`
      },
      {
        title: "localStorage vs sessionStorage",
        code: `// localStorage - сохраняется после закрытия браузера\nlocalStorage.setItem('persistent', 'data');\n\n// sessionStorage - удаляется при закрытии вкладки\nsessionStorage.setItem('temporary', 'data');\n\n// Оба имеют одинаковый API\nsessionStorage.getItem('temporary');\nsessionStorage.removeItem('temporary');`
      }
    ],
    relatedTopics: ['json-methods', 'objects-basic']
  },
  {
    id: 'dom-api',
    title: 'DOM API',
    difficulty: 'beginner',
    description: 'DOM API позволяет манипулировать HTML элементами. querySelector/querySelectorAll находит элементы по селектору. createElement создает элементы, appendChild/removeChild добавляет/удаляет. innerHTML вставляет HTML (опасно XSS), textContent безопасно вставляет текст. classList управляет классами.',
    keyPoints: [
      'querySelector: первый элемент по селектору, querySelectorAll: все элементы.',
      'createElement: создает элемент, appendChild: добавляет в DOM.',
      'innerHTML: вставляет HTML (риск XSS), textContent: безопасный текст.',
      'classList: add/remove/toggle/contains для управления классами.',
      'getAttribute/setAttribute: работа с атрибутами.'
    ],
    tags: ['dom', 'html', 'elements', 'browser', 'api'],
    examples: [
      {
        title: "Поиск элементов",
        code: `// По ID\nconst element = document.getElementById('myId');\n\n// По селектору\nconst first = document.querySelector('.class');\nconst all = document.querySelectorAll('.class');\n\n// По тегу\nconst divs = document.getElementsByTagName('div');`
      },
      {
        title: "Создание и добавление",
        code: `// Создание элемента\nconst div = document.createElement('div');\ndiv.textContent = 'Hello';\n\n// Добавление в DOM\nconst container = document.querySelector('#container');\ncontainer.appendChild(div);\n\n// Удаление\ncontainer.removeChild(div);\n// или\ndiv.remove();`
      },
      {
        title: "innerHTML vs textContent",
        code: `const div = document.createElement('div');\n\n// innerHTML - вставляет HTML (опасно!)\ndiv.innerHTML = '<script>alert("XSS")</script>';\n\n// textContent - безопасно, только текст\ndiv.textContent = '<script>alert("XSS")</script>';\n// Выведет как текст, не выполнит скрипт`
      },
      {
        title: "classList и атрибуты",
        code: `const element = document.querySelector('.item');\n\n// Управление классами\nelement.classList.add('active');\nelement.classList.remove('hidden');\nelement.classList.toggle('selected');\nelement.classList.contains('active'); // true\n\n// Атрибуты\nelement.setAttribute('data-id', '123');\nelement.getAttribute('data-id'); // "123"`
      }
    ],
    relatedTopics: ['objects-basic', 'strings-methods']
  },
  {
    id: 'fetch-api',
    title: 'Fetch API',
    difficulty: 'beginner',
    description: 'Fetch API для HTTP запросов. fetch(url, options) возвращает Promise с Response. Методы: json(), text(), blob(). Обработка ошибок: проверка response.ok или try/catch. Заголовки через headers, методы GET/POST/PUT/DELETE через method. CORS (Cross-Origin Resource Sharing) ограничивает запросы к другим доменам. Same-origin policy разрешает запросы только к тому же домену, протоколу и порту.',
    keyPoints: [
      'fetch(url, options): возвращает Promise<Response>.',
      'response.json(): парсит JSON, response.text(): текст, response.blob(): бинарные данные.',
      'Ошибки: проверять response.ok или использовать try/catch.',
      'Заголовки: headers: { "Content-Type": "application/json" }.',
      'CORS: браузер блокирует запросы к другим доменам без разрешения сервера.',
      'Same-origin: протокол + домен + порт должны совпадать.',
      'CORS заголовки: Access-Control-Allow-Origin на сервере разрешает запросы.',
      'Preflight: OPTIONS запрос для сложных запросов (не GET/POST).'
    ],
    tags: ['fetch', 'http', 'async', 'api', 'browser', 'security'],
    examples: [
      {
        title: "Базовый GET запрос",
        code: `fetch('https://api.example.com/users')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));\n\n// С async/await\nasync function getUsers() {\n  try {\n    const response = await fetch('https://api.example.com/users');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}`
      },
      {
        title: "POST запрос с данными",
        code: `fetch('https://api.example.com/users', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify({\n    name: 'Alice',\n    age: 30\n  })\n})\n  .then(response => response.json())\n  .then(data => console.log(data));`
      },
      {
        title: "Обработка ошибок",
        code: `async function fetchData() {\n  const response = await fetch('/api/data');\n  \n  // Проверка статуса\n  if (!response.ok) {\n    throw new Error(\`HTTP error! status: \${response.status}\`);\n  }\n  \n  const data = await response.json();\n  return data;\n}\n\n// Или через try/catch\ntry {\n  const data = await fetchData();\n} catch (error) {\n  console.error('Failed:', error);\n}`
      },
      {
        title: "CORS - запрос к другому домену",
        code: `// Запрос к другому домену\nfetch('https://api.other-domain.com/data')\n  .then(response => response.json())\n  .catch(error => {\n    // CORS error: блокируется браузером\n    // если сервер не вернул Access-Control-Allow-Origin\n    console.error('CORS error:', error);\n  });\n\n// Сервер должен вернуть:\n// Access-Control-Allow-Origin: *\n// или\n// Access-Control-Allow-Origin: https://yourdomain.com`
      },
      {
        title: "CORS с credentials",
        code: `// Отправка cookies с запросом\nfetch('https://api.example.com/data', {\n  credentials: 'include', // отправляет cookies\n  headers: {\n    'Authorization': 'Bearer token'\n  }\n});\n\n// Сервер должен вернуть:\n// Access-Control-Allow-Credentials: true\n// Access-Control-Allow-Origin: https://yourdomain.com (не *)`
      },
      {
        title: "Preflight запрос",
        code: `// Сложные запросы (не GET/POST) требуют preflight\nfetch('https://api.example.com/data', {\n  method: 'PUT',\n  headers: {\n    'Content-Type': 'application/json',\n    'X-Custom-Header': 'value'\n  },\n  body: JSON.stringify({ data: 'test' })\n});\n\n// Браузер сначала отправляет OPTIONS запрос\n// Сервер должен ответить разрешающими заголовками:\n// Access-Control-Allow-Methods: PUT\n// Access-Control-Allow-Headers: X-Custom-Header`
      }
    ],
    relatedTopics: ['promises', 'async-await', 'json-methods', 'cors', 'same-origin-policy']
  },
  {
    id: 'event-api',
    title: 'Event API',
    difficulty: 'beginner',
    description: 'addEventListener подписывается на события, removeEventListener отписывается. Event объект содержит информацию о событии (target, type, preventDefault, stopPropagation). Делегирование событий: слушатель на родителе, проверка target. CustomEvent для кастомных событий.',
    keyPoints: [
      'addEventListener(type, handler, options): подписка на событие.',
      'removeEventListener: отписка (нужна та же функция-ссылка).',
      'Event: target (элемент), type (тип), preventDefault() (отмена действия), stopPropagation() (остановка всплытия).',
      'Делегирование: слушатель на родителе, проверка event.target.',
      'CustomEvent: создание и диспатч кастомных событий.'
    ],
    tags: ['events', 'dom', 'listeners', 'browser', 'api'],
    examples: [
      {
        title: "Базовые события",
        code: `const button = document.querySelector('button');\n\n// Подписка\nfunction handleClick(event) {\n  console.log('Clicked!', event.target);\n}\nbutton.addEventListener('click', handleClick);\n\n// Отписка (нужна та же функция)\nbutton.removeEventListener('click', handleClick);\n\n// Анонимная функция - нельзя отписаться\nbutton.addEventListener('click', () => console.log('click'));`
      },
      {
        title: "Event объект",
        code: `button.addEventListener('click', (event) => {\n  console.log(event.type); // "click"\n  console.log(event.target); // элемент, на который кликнули\n  console.log(event.currentTarget); // элемент с обработчиком\n  \n  event.preventDefault(); // отменить действие по умолчанию\n  event.stopPropagation(); // остановить всплытие\n});`
      },
      {
        title: "Делегирование событий",
        code: `// Вместо слушателя на каждом элементе\nconst list = document.querySelector('ul');\n\nlist.addEventListener('click', (event) => {\n  // Проверяем, что кликнули по элементу списка\n  if (event.target.tagName === 'LI') {\n    console.log('Clicked on:', event.target.textContent);\n  }\n});\n\n// Работает для динамически добавленных элементов!`
      },
      {
        title: "CustomEvent",
        code: `// Создание кастомного события\nconst customEvent = new CustomEvent('myEvent', {\n  detail: { message: 'Hello' }\n});\n\n// Подписка\nbutton.addEventListener('myEvent', (event) => {\n  console.log(event.detail.message); // "Hello"\n});\n\n// Диспатч\nbutton.dispatchEvent(customEvent);`
      }
    ],
    relatedTopics: ['dom-api', 'callbacks', 'functions-types']
  },
  {
    id: 'history-api',
    title: 'History API',
    difficulty: 'beginner',
    description: 'History API управляет историей браузера без перезагрузки страницы. pushState добавляет запись, replaceState заменяет текущую. popstate срабатывает при навигации назад/вперед. Используется в SPA для роутинга. window.location для работы с URL.',
    keyPoints: [
      'pushState(state, title, url): добавляет запись в историю, меняет URL без перезагрузки.',
      'replaceState: заменяет текущую запись, не добавляет новую.',
      'popstate: событие при навигации назад/вперед, event.state содержит данные.',
      'Используется в SPA для роутинга без перезагрузки страницы.',
      'window.location: текущий URL, можно читать и изменять.'
    ],
    tags: ['history', 'routing', 'spa', 'browser', 'api'],
    examples: [
      {
        title: "pushState и replaceState",
        code: `// Добавить запись в историю\nhistory.pushState({ page: 1 }, 'Page 1', '/page1');\n// URL изменится на /page1, страница не перезагрузится\n\n// Заменить текущую запись\nhistory.replaceState({ page: 2 }, 'Page 2', '/page2');\n// URL изменится, но кнопка "Назад" не вернет на предыдущий URL\n\n// Получить текущее состояние\nconst state = history.state; // { page: 2 }`
      },
      {
        title: "popstate событие",
        code: `// Слушаем навигацию назад/вперед\nwindow.addEventListener('popstate', (event) => {\n  console.log('State:', event.state);\n  // Обновляем контент на основе state\n  if (event.state) {\n    loadPage(event.state.page);\n  }\n});\n\n// При клике на "Назад" сработает popstate`
      },
      {
        title: "Простой роутер",
        code: `function navigate(path) {\n  history.pushState({ path }, '', path);\n  renderPage(path);\n}\n\nwindow.addEventListener('popstate', (event) => {\n  renderPage(event.state?.path || '/');\n});\n\n// Навигация\nnavigate('/about');\n// URL: /about, страница не перезагрузилась`
      }
    ],
    relatedTopics: ['event-api', 'dom-api']
  },
  {
    id: 'file-api',
    title: 'File API',
    difficulty: 'beginner',
    description: 'File API для работы с файлами. FileReader читает файлы асинхронно. Методы: readAsText (текст), readAsDataURL (base64), readAsArrayBuffer (бинарные). События: load (успех), error (ошибка). File объект из input[type="file"], Blob для бинарных данных.',
    keyPoints: [
      'FileReader: асинхронное чтение файлов.',
      'readAsText: текст, readAsDataURL: base64, readAsArrayBuffer: бинарные данные.',
      'События: load (успех), error (ошибка), progress (прогресс).',
      'File: из input[type="file"], содержит name, size, type.',
      'Blob: бинарные данные, можно создать через new Blob([data], {type}).'
    ],
    tags: ['file', 'filereader', 'blob', 'browser', 'api'],
    examples: [
      {
        title: "Чтение текстового файла",
        code: `const input = document.querySelector('input[type="file"]');\n\ninput.addEventListener('change', (event) => {\n  const file = event.target.files[0];\n  \n  const reader = new FileReader();\n  \n  reader.onload = (e) => {\n    console.log(e.target.result); // содержимое файла\n  };\n  \n  reader.onerror = () => {\n    console.error('Error reading file');\n  };\n  \n  reader.readAsText(file);\n});`
      },
      {
        title: "Чтение изображения как base64",
        code: `function readImage(file) {\n  return new Promise((resolve, reject) => {\n    const reader = new FileReader();\n    \n    reader.onload = (e) => resolve(e.target.result);\n    reader.onerror = reject;\n    \n    reader.readAsDataURL(file);\n  });\n}\n\nconst file = input.files[0];\nconst base64 = await readImage(file);\n// "data:image/png;base64,iVBORw0KGgo..."\nimg.src = base64;`
      },
      {
        title: "Информация о файле",
        code: `const file = input.files[0];\n\nconsole.log(file.name); // "document.txt"\nconsole.log(file.size); // размер в байтах\nconsole.log(file.type); // "text/plain"\nconsole.log(file.lastModified); // timestamp\n\n// Проверка типа\nif (file.type.startsWith('image/')) {\n  console.log('Это изображение');\n}`
      }
    ],
    relatedTopics: ['promises', 'async-await', 'dom-api']
  },
  {
    id: 'clipboard-api',
    title: 'Clipboard API',
    difficulty: 'beginner',
    description: 'Clipboard API для работы с буфером обмена. navigator.clipboard.writeText() копирует текст, readText() читает. Требует HTTPS и разрешения пользователя. write() для произвольных данных, read() для чтения. Используется для копирования/вставки в веб-приложениях.',
    keyPoints: [
      'navigator.clipboard.writeText(text): копирует текст в буфер.',
      'navigator.clipboard.readText(): читает текст из буфера.',
      'Требует HTTPS (кроме localhost) и разрешения пользователя.',
      'write()/read() для произвольных данных (текст, изображения).',
      'Асинхронные методы, возвращают Promise.'
    ],
    tags: ['clipboard', 'copy', 'paste', 'browser', 'api'],
    examples: [
      {
        title: "Копирование текста",
        code: `async function copyText(text) {\n  try {\n    await navigator.clipboard.writeText(text);\n    console.log('Text copied!');\n  } catch (error) {\n    console.error('Failed to copy:', error);\n  }\n}\n\n// Использование\ncopyText('Hello, World!');\n\n// Или через then\nnavigator.clipboard.writeText('Text')\n  .then(() => console.log('Copied'))\n  .catch(err => console.error(err));`
      },
      {
        title: "Чтение из буфера",
        code: `async function pasteText() {\n  try {\n    const text = await navigator.clipboard.readText();\n    console.log('Pasted:', text);\n    return text;\n  } catch (error) {\n    console.error('Failed to read:', error);\n  }\n}\n\n// Требует разрешения пользователя\npasteText();`
      },
      {
        title: "Копирование в кнопке",
        code: `const button = document.querySelector('#copyBtn');\nconst textToCopy = 'Скопируй меня!';\n\nbutton.addEventListener('click', async () => {\n  try {\n    await navigator.clipboard.writeText(textToCopy);\n    button.textContent = 'Скопировано!';\n    setTimeout(() => {\n      button.textContent = 'Копировать';\n    }, 2000);\n  } catch (error) {\n    alert('Не удалось скопировать');\n  }\n});`
      }
    ],
    relatedTopics: ['async-await', 'promises', 'dom-api']
  },
  {
    id: 'strict-mode',
    title: 'Strict mode',
    difficulty: 'beginner',
    description: "'use strict' включает строгий режим. Запрещает неявное создание глобальных переменных, дублирование параметров, использование зарезервированных слов. this в функциях undefined вместо window. Помогает избежать ошибок и улучшает производительность.",
    keyPoints: [
      "'use strict': включается в начале файла или функции.",
      'Запрещает неявные глобальные переменные (без var/let/const).',
      'Запрещает дублирование параметров функции.',
      'this в функциях = undefined (не window).',
      'Улучшает производительность и помогает находить ошибки.'
    ],
    tags: ['strict-mode', 'best-practices', 'errors', 'performance'],
    examples: [
      {
        title: "Включение strict mode",
        code: `"use strict";\n\n// Файл целиком в strict mode\nfunction test() {\n  "use strict";\n  // Только функция в strict mode\n}`
      },
      {
        title: "Запрет неявных глобальных",
        code: `"use strict";\n\n// Ошибка: переменная не объявлена\nx = 10; // ReferenceError\n\n// В обычном режиме создалась бы глобальная переменная\n// В strict mode - ошибка`
      },
      {
        title: "this в strict mode",
        code: `"use strict";\n\nfunction test() {\n  console.log(this); // undefined\n}\n\ntest();\n\n// В обычном режиме this = window (в браузере)\n// В strict mode this = undefined`
      }
    ],
    relatedTopics: ['var-let-const', 'this-basics', 'functions-types']
  },
  // Git темы
  {
    id: 'git-init-clone',
    title: 'Git: Инициализация и клонирование',
    difficulty: 'beginner',
    description: 'git init создает новый репозиторий в текущей директории. git clone <url> клонирует удаленный репозиторий. .git директория содержит всю историю и метаданные. После клонирования создается рабочая копия с полной историей.',
    keyPoints: [
      'git init: создает новый репозиторий в текущей директории.',
      'git clone <url>: клонирует удаленный репозиторий локально.',
      '.git директория: содержит всю историю, конфигурацию, ветки.',
      'После клонирования получаешь полную копию с историей коммитов.'
    ],
    tags: ['git', 'version-control', 'basics', 'init', 'clone', 'tools', 'productivity'],
    examples: [
      {
        title: "Создание нового репозитория",
        code: `# Создать новый репозиторий
git init

# Создать репозиторий с именем
git init my-project

# Проверить статус
git status`
      },
      {
        title: "Клонирование репозитория",
        code: `# Клонировать публичный репозиторий
git clone https://github.com/user/repo.git

# Клонировать в конкретную папку
git clone https://github.com/user/repo.git my-folder

# Клонировать только определенную ветку
git clone -b main https://github.com/user/repo.git`
      },
      {
        title: "Проверка репозитория",
        code: `# Проверить, что это Git репозиторий
ls -la .git

# Посмотреть удаленные репозитории
git remote -v

# Посмотреть текущую ветку
git branch`
      }
    ],
    relatedTopics: ['git-add-commit', 'git-status-log'],
    nextTopicId: 'git-add-commit'
  },
  {
    id: 'git-add-commit',
    title: 'Git: Добавление и коммиты',
    difficulty: 'beginner',
    description: 'git add добавляет файлы в staging area (индекс). git commit создает снимок изменений с сообщением. Рабочая директория → staging area → репозиторий. Коммит сохраняет состояние файлов на момент времени. Каждый коммит имеет уникальный хеш (SHA-1).',
    keyPoints: [
      'git add: добавляет файлы в staging area (индекс).',
      'git commit: создает снимок изменений с сообщением.',
      'Три области: рабочая директория → staging → репозиторий.',
      'Коммит имеет уникальный хеш SHA-1 (40 символов).',
      'Хорошие сообщения коммитов: краткие, описательные, в повелительном наклонении.'
    ],
    tags: ['git', 'version-control', 'basics', 'add', 'commit', 'staging', 'tools', 'productivity'],
    examples: [
      {
        title: "Базовый workflow",
        code: `# Проверить статус
git status

# Добавить все изменения
git add .

# Добавить конкретный файл
git add index.js

# Добавить несколько файлов
git add file1.js file2.js

# Создать коммит
git commit -m "Добавить функцию авторизации"

# Добавить и закоммитить одной командой (только для измененных файлов)
git commit -am "Исправить баг"`
      },
      {
        title: "Интерактивное добавление",
        code: `# Интерактивный режим (выбрать части файлов)
git add -p

# Добавить только часть изменений в файле
# Git покажет каждое изменение и спросит, добавить ли его`
      },
      {
        title: "Хорошие сообщения коммитов",
        code: `# Плохо
git commit -m "fix"
git commit -m "изменения"
git commit -m "WIP"

# Хорошо
git commit -m "Исправить ошибку валидации email"
git commit -m "Добавить компонент Button"
git commit -m "Обновить зависимости до версии 2.0"`
      }
    ],
    relatedTopics: ['git-init-clone', 'git-status-log'],
    nextTopicId: 'git-status-log'
  },
  {
    id: 'git-status-log',
    title: 'Git: Статус и история',
    difficulty: 'beginner',
    description: 'git status показывает состояние рабочей директории и staging area. git log показывает историю коммитов. git diff показывает различия между версиями. Важно понимать статусы файлов: untracked, modified, staged.',
    keyPoints: [
      'git status: показывает измененные, добавленные, неотслеживаемые файлы.',
      'git log: показывает историю коммитов с авторами, датами, сообщениями.',
      'git diff: показывает различия между версиями файлов.',
      'Статусы файлов: untracked (новый), modified (изменен), staged (в индексе).'
    ],
    tags: ['git', 'version-control', 'basics', 'status', 'log', 'diff', 'history', 'tools', 'productivity'],
    examples: [
      {
        title: "Проверка статуса",
        code: `# Полный статус
git status

# Короткий статус
git status -s

# Статус с игнорированием подмодулей
git status --ignore-submodules

# Вывод:
# ??  новый файл (untracked)
# M   измененный файл (modified)
# A   добавленный в индекс (staged)
# MM  изменен и в рабочей директории, и в индексе`
      },
      {
        title: "Просмотр истории",
        code: `# Полная история
git log

# Компактный вид
git log --oneline

# Граф веток
git log --oneline --graph --all

# Последние 5 коммитов
git log -5

# История конкретного файла
git log -- index.js`
      },
      {
        title: "Просмотр различий",
        code: `# Различия в рабочей директории
git diff

# Различия в staging area
git diff --staged
# или
git diff --cached

# Различия между коммитами
git diff HEAD~1 HEAD

# Различия конкретного файла
git diff file.js`
      }
    ],
    relatedTopics: ['git-add-commit', 'git-branches'],
    nextTopicId: 'git-branches'
  },
  {
    id: 'git-branches',
    title: 'Git: Ветки',
    difficulty: 'beginner',
    description: 'Ветки позволяют работать над разными версиями кода параллельно. git branch создает/показывает ветки. git checkout переключается между ветками. main/master — основная ветка. Ветки — это указатели на коммиты. Создание ветки не копирует файлы, только создает новый указатель.',
    keyPoints: [
      'git branch: создает новую ветку или показывает список веток.',
      'git checkout: переключается на другую ветку.',
      'main/master: основная ветка проекта.',
      'Ветка — это указатель на коммит, не копия файлов.',
      'HEAD указывает на текущую ветку/коммит.'
    ],
    tags: ['git', 'version-control', 'basics', 'branches', 'checkout', 'tools', 'productivity'],
    examples: [
      {
        title: "Работа с ветками",
        code: `# Показать все ветки
git branch

# Показать все ветки (включая удаленные)
git branch -a

# Создать новую ветку
git branch feature-login

# Переключиться на ветку
git checkout feature-login

# Создать и переключиться одной командой
git checkout -b feature-login

# Удалить ветку (после merge)
git branch -d feature-login

# Принудительно удалить ветку
git branch -D feature-login`
      },
      {
        title: "Переименование ветки",
        code: `# Переименовать текущую ветку
git branch -m new-name

# Переименовать другую ветку
git branch -m old-name new-name`
      },
      {
        title: "Проверка веток",
        code: `# На какой ветке я нахожусь
git branch --show-current

# Последний коммит в каждой ветке
git branch -v

# Ветки, слитые в текущую
git branch --merged

# Ветки, не слитые в текущую
git branch --no-merged`
      }
    ],
    relatedTopics: ['git-status-log', 'git-merge'],
    nextTopicId: 'git-merge'
  },
  {
    id: 'git-merge',
    title: 'Git: Слияние веток',
    difficulty: 'beginner',
    description: 'git merge объединяет изменения из одной ветки в другую. Fast-forward merge происходит, когда нет новых коммитов в целевой ветке. Merge commit создается, когда нужно объединить две истории. После merge можно удалить слитую ветку.',
    keyPoints: [
      'git merge: объединяет изменения из ветки в текущую.',
      'Fast-forward: когда целевая ветка не имеет новых коммитов.',
      'Merge commit: создается при объединении двух историй.',
      'После merge можно безопасно удалить слитую ветку.',
      'Всегда мержить в основную ветку (main/master).'
    ],
    tags: ['git', 'version-control', 'basics', 'merge', 'branches', 'tools', 'productivity'],
    examples: [
      {
        title: "Базовое слияние",
        code: `# Переключиться на основную ветку
git checkout main

# Слить feature ветку в main
git merge feature-login

# После успешного merge удалить ветку
git branch -d feature-login

# Если merge не удался, отменить
git merge --abort`
      },
      {
        title: "Fast-forward merge",
        code: `# Быстрое слияние (без merge commit)
git checkout main
git merge feature-login

# Если нужен merge commit даже при fast-forward
git merge --no-ff feature-login`
      },
      {
        title: "Слияние с конфликтами",
        code: `# При конфликтах Git остановит merge
git merge feature-login
# CONFLICT (content): Merge conflict in file.js

# Открыть файл и разрешить конфликты вручную
# После разрешения:
git add file.js
git commit

# Или использовать инструмент для разрешения
git mergetool`
      }
    ],
    relatedTopics: ['git-branches', 'git-remote'],
    nextTopicId: 'git-remote'
  },
  {
    id: 'git-remote',
    title: 'Git: Удаленные репозитории',
    difficulty: 'beginner',
    description: 'Удаленный репозиторий — копия проекта на сервере (GitHub, GitLab). git remote показывает удаленные репозитории. origin — стандартное имя для основного удаленного репозитория. git push отправляет коммиты на сервер. git pull получает изменения с сервера.',
    keyPoints: [
      'git remote: показывает список удаленных репозиториев.',
      'origin: стандартное имя для основного удаленного репозитория.',
      'git push: отправляет коммиты на удаленный репозиторий.',
      'git pull: получает и сливает изменения с удаленного репозитория.',
      'git fetch: получает изменения без слияния.'
    ],
    tags: ['git', 'version-control', 'basics', 'remote', 'push', 'pull', 'github', 'tools', 'productivity'],
    examples: [
      {
        title: "Работа с удаленными репозиториями",
        code: `# Показать удаленные репозитории
git remote -v

# Добавить удаленный репозиторий
git remote add origin https://github.com/user/repo.git

# Изменить URL удаленного репозитория
git remote set-url origin https://github.com/user/new-repo.git

# Удалить удаленный репозиторий
git remote remove origin`
      },
      {
        title: "Отправка изменений",
        code: `# Отправить текущую ветку на origin
git push origin main

# Отправить и установить upstream
git push -u origin main

# После установки upstream можно просто
git push

# Отправить все ветки
git push --all origin`
      },
      {
        title: "Получение изменений",
        code: `# Получить изменения без слияния
git fetch origin

# Получить и слить изменения
git pull origin main

# Или просто (если upstream установлен)
git pull

# Получить все ветки
git fetch --all`
      }
    ],
    relatedTopics: ['git-merge', 'git-init-clone']
  }
];

