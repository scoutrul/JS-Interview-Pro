import { Topic } from '../../../types';

export const JS_FUNCTIONS_BEGINNER_TOPICS: Topic[] = [
{
    id: 'functions-types',
    title: 'Типы функций',
    difficulty: 'beginner',
    description: 'Function Declaration всплывает, Function Expression не всплывает. Arrow Function не имеет this, arguments, нельзя использовать как конструктор. IIFE — самовызывающаяся функция.',
    keyPoints: [
      'Function Declaration всплывает, можно вызывать до объявления.',
      'Function Expression не всплывает, присваивается переменной.',
      'Arrow Function: нет this, arguments, super, нельзя new.',
      'IIFE изолирует область видимости, используется для модулей.'
    ],
    funFact: 'Arrow functions были добавлены в ES6 и изначально назывались "fat arrow functions" из-за синтаксиса =>. Они были вдохновлены языками CoffeeScript и Haskell.',
    tags: ['functions', 'arrow-functions', 'declaration', 'expression', 'ES6', 'iife'],
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
  },
{
    id: 'this-basics',
    title: 'Контекст this',
    difficulty: 'beginner',
    description: 'this определяется в момент вызова, не при создании функции. В методе объекта — сам объект. В обычной функции (strict mode) — undefined. Стрелочные функции не имеют своего this.',
    keyPoints: [
      'В методе — ссылается на объект.',
      'В обычной функции (strict mode) — undefined.',
      'В глобальном контексте — window/global.'
    ],
    funFact: 'this в JavaScript — один из самых запутанных концептов для новичков. В отличие от других языков, где this всегда ссылается на текущий объект, в JS this зависит от способа вызова функции.',
    tags: ['this', 'context', 'objects', 'arrow-functions', 'this-context'],
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
  }
];
