import { Topic } from '../../../types';

export const JS_ASYNC_INTERMEDIATE_TOPICS: Topic[] = [
{
    id: 'promises',
    title: 'Promises (Промисы)',
    difficulty: 'intermediate',
    description: 'Промис — объект для асинхронных операций. Состояния: pending, fulfilled, rejected. Методы: then, catch, finally. Решает проблему Callback Hell.',
    keyPoints: [
      'Состояния: pending, fulfilled, rejected.',
      'Методы: then, catch, finally.',
      'Promise.all: все должны успешно выполниться, иначе ошибка.',
      'Promise.allSettled: ждет все промисы, возвращает результаты и ошибки.',
      'Promise.race: возвращает первый завершенный (успех или ошибка).',
      'Promise.any: возвращает первый успешный, ошибка только если все провалились.'
    ],
    funFact: 'Промисы были стандартизированы в ES6 (2015), но концепция пришла из библиотек (Q, Bluebird). Они решают проблему "callback hell" и делают асинхронный код более читаемым.',
    tags: ['promise', 'async', 'flow', 'async-deep', 'callbacks', 'async-await'],
    examples: [
      {
        title: "Цепочка промисов",
        code: `fetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`
      },
      {
        title: "Создание промиса",
        code: `const promise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve("Success!");\n  }, 1000);\n});\n\npromise.then(result => console.log(result));`
      },
      {
        title: "Promise.all - все должны успешно выполниться",
        code: `const p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.reject('Error');\n\nPromise.all([p1, p2, p3])\n  .then(console.log) // не выполнится\n  .catch(console.error); // "Error"\n\n// Если все успешны:\nPromise.all([p1, p2]).then(console.log); // [1, 2]`
      },
      {
        title: "Promise.allSettled - ждет все промисы",
        code: `const p1 = Promise.resolve(1);\nconst p2 = Promise.reject('Error');\nconst p3 = Promise.resolve(3);\n\nPromise.allSettled([p1, p2, p3]).then(results => {\n  console.log(results);\n  // [\n  //   { status: 'fulfilled', value: 1 },\n  //   { status: 'rejected', reason: 'Error' },\n  //   { status: 'fulfilled', value: 3 }\n  // ]\n});`
      },
      {
        title: "Promise.race - первый завершенный",
        code: `const fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 100));\nconst slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 500));\n\nPromise.race([fast, slow]).then(console.log); // "Fast"\n\n// С ошибкой:\nconst error = Promise.reject('Error');\nPromise.race([fast, error])\n  .then(console.log) // не выполнится\n  .catch(console.error); // "Error" (ошибка быстрее)`
      },
      {
        title: "Promise.any - первый успешный",
        code: `const p1 = Promise.reject('Error 1');\nconst p2 = Promise.resolve('Success 2');\nconst p3 = Promise.reject('Error 3');\n\nPromise.any([p1, p2, p3])\n  .then(console.log); // "Success 2"\n\n// Если все провалились:\nPromise.any([p1, p3])\n  .then(console.log) // не выполнится\n  .catch(err => console.error(err.errors)); // ['Error 1', 'Error 3']`
      }
    ],
    relatedTopics: ['event-loop', 'async-await'],
  },
{
    id: 'async-await',
    title: 'Async / Await',
    difficulty: 'intermediate',
    description: 'async/await — синтаксический сахар над промисами. async функция всегда возвращает промис. await приостанавливает выполнение до разрешения промиса, не блокируя основной поток.',
    keyPoints: [
      'async всегда возвращает промис.',
      'await приостанавливает функцию до выполнения промиса.',
      'Обработка ошибок через try/catch.',
      'Необработанные ошибки создают rejected промис.',
      'Потерянные промисы: забытый await или catch.',
      'Всегда обрабатывай ошибки явно.'
    ],
    funFact: 'async/await был добавлен в ES2017 и стал самым популярным способом работы с асинхронностью. Он делает асинхронный код похожим на синхронный, что значительно улучшает читаемость.',
    tags: ['async', 'await', 'ES2017', 'async-deep', 'promises', 'error-handling'],
    examples: [
      {
        title: "Чистая асинхронность",
        code: `async function load() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch(e) { /* ... */ }\n}`
      },
      {
        title: "async всегда возвращает промис",
        code: `async function test() {\n  return 42;\n}\n\nconst result = test();\nconsole.log(result); // Promise { <fulfilled>: 42 }\nresult.then(v => console.log(v)); // 42`
      },
      {
        title: "Параллельное выполнение",
        code: `async function fetchData() {\n  const [users, posts] = await Promise.all([\n    fetch('/users').then(r => r.json()),\n    fetch('/posts').then(r => r.json())\n  ]);\n  return { users, posts };\n}`
      },
      {
        title: "Обработка ошибок",
        code: `async function riskyOperation() {\n  try {\n    const result = await mightFail();\n    return result;\n  } catch (error) {\n    console.error('Error:', error);\n    throw error; // пробрасываем дальше\n  }\n}\n\n// Или через catch промиса\nriskyOperation().catch(err => console.error(err));`
      },
      {
        title: "Потерянные промисы",
        code: `// Плохо: забыли await или catch\nasync function bad() {\n  fetch('/api'); // промис потерян, ошибка не обработана\n}\n\n// Хорошо: явная обработка\nasync function good() {\n  try {\n    await fetch('/api');\n  } catch (err) {\n    console.error(err);\n  }\n}\n\n// Или через catch\nasync function alsoGood() {\n  fetch('/api').catch(err => console.error(err));\n}`
      },
      {
        title: "Ошибки в цепочке",
        code: `async function chain() {\n  try {\n    const a = await step1();\n    const b = await step2(a);\n    return await step3(b);\n  } catch (error) {\n    // Поймает ошибку из любого шага\n    console.error('Chain failed:', error);\n    return null;\n  }\n}`
      }
    ],
    relatedTopics: ['promises', 'error-handling'],
  },
{
    id: 'error-handling',
    title: 'Обработка ошибок',
    difficulty: 'intermediate',
    description: 'try/catch перехватывает ошибки, finally выполняется всегда. throw выбрасывает ошибку. Можно создавать кастомные классы ошибок через extends Error.',
    keyPoints: [
      'try/catch: перехватывает ошибки, выполнение продолжается.',
      'finally: выполняется всегда, даже если была ошибка.',
      'throw: выбрасывает ошибку, можно передать любое значение.',
      'Кастомные ошибки: class extends Error для специфичных ошибок.'
    ],
    funFact: 'В JavaScript можно выбросить любое значение, не только Error. Однако рекомендуется всегда использовать объекты Error или его подклассы для лучшей отладки и обработки ошибок.',
    tags: ['errors', 'try-catch', 'throw', 'exceptions', 'promises', 'async-await'],
    examples: [
      {
        title: "try/catch/finally",
        code: `try {\n  const result = riskyOperation();\n  console.log(result);\n} catch (error) {\n  console.error("Error:", error.message);\n} finally {\n  console.log("Always executed");\n}`
      },
      {
        title: "throw",
        code: `function divide(a, b) {\n  if (b === 0) {\n    throw new Error("Division by zero");\n  }\n  return a / b;\n}\n\ntry {\n  divide(10, 0);\n} catch (e) {\n  console.log(e.message); // "Division by zero"\n}`
      },
      {
        title: "Кастомные ошибки",
        code: `class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "ValidationError";\n  }\n}\n\ntry {\n  throw new ValidationError("Invalid input");\n} catch (e) {\n  if (e instanceof ValidationError) {\n    console.log("Validation error:", e.message);\n  }\n}`
      }
    ],
    relatedTopics: ['promises', 'async-await']
  }
];
