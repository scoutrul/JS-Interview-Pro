import { Topic } from '../../../types';

export const JS_BASICS_BEGINNER_TOPICS: Topic[] = [
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
    relatedTopics: ['type-coercion', 'functions-types']
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
    relatedTopics: ['data-types', 'comparison']
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
    relatedTopics: ['type-coercion', 'operators']
  },
  {
    id: 'operators',
    title: 'Операторы',
    difficulty: 'beginner',
    description: 'Оператор — синтаксическая конструкция, выполняющая действие над операндами и возвращающая результат. JavaScript поддерживает арифметические, логические, операторы сравнения, присваивания и специальные операторы для работы с данными.',
    keyPoints: [
      'Три типа: выражения (возвращают значение), операторы-объявления (var/let/const), операторы управления (if/for/return).',
      'Арифметические: +, -, *, /, %, ** (возведение в степень).',
      'Сравнения: == (нестрогое), === (строгое), !=, !==, <, >, <=, >=.',
      'Логические: && и || возвращают последнее вычисленное значение, не boolean; ! — инверсия.',
      'Присваивания: =, +=, -=, *=, /=, %=, **=.',
      'Унарные: ++/-- (инкремент/декремент), typeof, delete, унарные +/-.',
      'Побитовые: &, |, ^, ~, <<, >>, >>> (работа с битами).',
      'Специальные: ?? (nullish coalescing), ?. (optional chaining), ... (spread/rest), ?: (тернарный).'
    ],
    tags: ['operators', 'spread', 'optional-chaining', 'nullish-coalescing'],
    examples: [
      {
        title: "Разграничение типов операторов",
        code: `// Выражения (возвращают значение)\na + b; // арифметическое выражение\nx = 1; // выражение присваивания\nfoo(); // выражение вызова функции\n\n// Операторы-объявления\nvar x = 1;\nlet y = 2;\nconst z = 3;\nfunction fn() {}\n\n// Операторы управления\nif (condition) { }\nfor (let i = 0; i < 10; i++) { }\nreturn value;\nbreak; continue;`
      },
      {
        title: "Арифметические операторы",
        code: `10 + 5; // 15 (сложение)\n10 - 5; // 5 (вычитание)\n10 * 5; // 50 (умножение)\n10 / 5; // 2 (деление)\n10 % 3; // 1 (остаток от деления)\n2 ** 3; // 8 (возведение в степень)`
      },
      {
        title: "Операторы сравнения",
        code: `5 == "5"; // true (нестрогое)\n5 === "5"; // false (строгое)\n5 != "5"; // false\n5 !== "5"; // true\n10 > 5; // true\n10 <= 10; // true`
      },
      {
        title: "Логические операторы",
        code: `true && "text"; // "text"\nfalse || "default"; // "default"\n!0; // true\n\nconst result = user && user.name; // старый способ\nconst name = user?.name; // новый способ`
      },
      {
        title: "Унарные операторы",
        code: `let x = 5;\n+x; // 5 (унарный плюс)\n-x; // -5 (унарный минус)\n++x; // 6 (префиксный инкремент)\nx--; // 6, затем x = 5 (постфиксный декремент)\ntypeof x; // "number"\ndelete obj.prop; // удаляет свойство`
      },
      {
        title: "Побитовые операторы",
        code: `5 & 3; // 1 (AND: 101 & 011 = 001)\n5 | 3; // 7 (OR: 101 | 011 = 111)\n5 ^ 3; // 6 (XOR: 101 ^ 011 = 110)\n~5; // -6 (NOT: ~101 = ...11111010)\n5 << 1; // 10 (сдвиг влево: 101 << 1 = 1010)\n5 >> 1; // 2 (сдвиг вправо: 101 >> 1 = 10)`
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
  }
];
