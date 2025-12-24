
import { Category, Topic } from './types';

const VARIABLES_TOPICS: Topic[] = [
  {
    id: 'var-let-const',
    title: 'var, let, const',
    difficulty: 'beginner',
    description: 'Основы объявления переменных, различия в области видимости и поведении.',
    keyPoints: [
      'var: функциональная область видимости, допускает повторное объявление, всплывает (hoisting).',
      'let/const: блочная область видимости, не допускают повторного объявления.',
      'const требует инициализации и запрещает переопределение ссылки.'
    ],
    tags: ['variables', 'scope', 'let', 'const', 'hoisting'],
    codeExample: `if (true) {
  var x = 5;
  let y = 10;
}
console.log(x); // 5
// console.log(y); // ReferenceError`,
    relatedTopics: ['hoisting', 'tdz'],
    nextTopicId: 'hoisting'
  },
  {
    id: 'hoisting',
    title: 'Hoisting (Всплытие)',
    difficulty: 'intermediate',
    description: 'Механизм поднятия объявлений в начало области видимости.',
    keyPoints: [
      'Function Declaration всплывает полностью.',
      'var всплывает с инициализацией undefined.',
      'let/const всплывают, но находятся в TDZ.'
    ],
    tags: ['hoisting', 'scope', 'variables'],
    codeExample: `console.log(a); // undefined
var a = 10;

sayHi(); // "Hi"
function sayHi() { console.log("Hi"); }`,
    relatedTopics: ['var-let-const', 'tdz'],
    nextTopicId: 'tdz'
  },
  {
    id: 'tdz',
    title: 'Temporal Dead Zone (TDZ)',
    difficulty: 'intermediate',
    description: 'Мертвая зона для let и const до момента их объявления.',
    keyPoints: [
      'Доступ к переменной в TDZ вызывает ReferenceError.',
      'TDZ начинается при входе в блок и заканчивается на строке объявления.'
    ],
    tags: ['tdz', 'variables', 'let', 'const', 'scope'],
    codeExample: `{
  // TDZ начинается здесь
  // console.log(x); // ReferenceError
  let x = 5; 
}`,
    relatedTopics: ['var-let-const', 'scope-chain'],
    nextTopicId: 'scope-chain'
  },
  {
    id: 'scope-chain',
    title: 'Scope Chain',
    difficulty: 'beginner',
    description: 'Цепочка областей видимости и поиск переменных.',
    keyPoints: [
      'Поиск переменной идет от локального окружения к внешнему.',
      'Глобальная область видимости — конец цепочки.',
      'Функции создают свою область видимости.'
    ],
    tags: ['scope', 'closure'],
    codeExample: `const globalVar = "global";

function outer() {
  const outerVar = "outer";
  function inner() {
    const innerVar = "inner";
    console.log(innerVar, outerVar, globalVar);
  }
  inner();
}
outer();`,
    relatedTopics: ['lexical-env', 'closures-basic'],
    nextTopicId: 'lexical-env'
  }
];

const CLOSURES_TOPICS: Topic[] = [
  {
    id: 'lexical-env',
    title: 'Лексическое окружение',
    difficulty: 'advanced',
    description: 'Внутренний механизм хранения переменных и ссылок на внешние области.',
    keyPoints: [
      'Environment Record: хранилище переменных.',
      'Outer Reference: ссылка на внешнее лексическое окружение.',
      'Создается при каждом вызове функции.'
    ],
    tags: ['scope', 'lexical environment', 'closure'],
    codeExample: `let phrase = "Hello";

function say(name) {
  // LexicalEnvironment = { name: "John", outer: <global> }
  console.log(phrase + ", " + name);
}

say("John"); // Hello, John`,
    relatedTopics: ['scope-chain', 'closures-basic'],
    nextTopicId: 'closures-basic'
  },
  {
    id: 'closures-basic',
    title: 'Замыкания (Closures)',
    difficulty: 'intermediate',
    description: 'Способность функции помнить свое окружение даже после завершения внешней функции.',
    keyPoints: [
      'Замыкание — это функция + лексическое окружение.',
      'Используется для инкапсуляции данных.',
      'Переменные не удаляются из памяти, пока на них есть ссылка из функции.'
    ],
    tags: ['closure', 'scope', 'functional'],
    codeExample: `function counter() {
  let count = 0;
  return () => ++count;
}
const inc = counter();
console.log(inc()); // 1
console.log(inc()); // 2`,
    relatedTopics: ['lexical-env', 'private-state'],
    nextTopicId: 'private-state'
  },
  {
    id: 'private-state',
    title: 'Приватное состояние',
    difficulty: 'intermediate',
    description: 'Эмуляция приватных свойств через замыкания.',
    keyPoints: [
      'Прямой доступ к переменной извне невозможен.',
      'Доступ только через геттеры и сеттеры.',
      'Основа паттерна "Модуль".'
    ],
    tags: ['closure', 'encapsulation', 'privacy'],
    codeExample: `function User(name) {
  let _name = name; // Приватная переменная
  return {
    getName: () => _name,
    setName: (val) => { _name = val; }
  };
}

const me = User("Alex");
console.log(me._name); // undefined
console.log(me.getName()); // "Alex"`,
    relatedTopics: ['closures-basic'],
    nextTopicId: 'this-basics'
  }
];

const THIS_TOPICS: Topic[] = [
  {
    id: 'this-basics',
    title: 'Контекст this',
    difficulty: 'beginner',
    description: 'Определение контекста в зависимости от способа вызова.',
    keyPoints: [
      'this определяется в момент вызова.',
      'В методе объекта — сам объект.',
      'В обычной функции в строгом режиме — undefined.',
      'В стрелочных функциях this берется из окружения.'
    ],
    tags: ['this', 'context'],
    codeExample: `const obj = {
  name: "JS Pro",
  show() { console.log(this.name); }
};

obj.show(); // "JS Pro"

const fn = obj.show;
fn(); // undefined (или ошибка в strict mode)`,
    relatedTopics: ['arrow-functions', 'context-loss'],
    nextTopicId: 'arrow-functions'
  },
  {
    id: 'arrow-functions',
    title: 'this в стрелочных функциях',
    difficulty: 'intermediate',
    description: 'Особенности лексического контекста стрелок.',
    keyPoints: [
      'Стрелки не имеют своего this.',
      'this фиксируется в момент создания функции.',
      'Нельзя использовать с оператором new.'
    ],
    tags: ['this', 'arrow functions', 'context'],
    codeExample: `const group = {
  title: "Students",
  items: ["Ann", "Pete"],
  showList() {
    this.items.forEach(
      item => console.log(this.title + ": " + item)
    );
  }
};
group.showList();`,
    relatedTopics: ['this-basics'],
    nextTopicId: 'context-loss'
  },
  {
    id: 'context-loss',
    title: 'Потеря контекста',
    difficulty: 'intermediate',
    description: 'Почему this пропадает при передаче метода в колбэк.',
    keyPoints: [
      'Проблема в setTimeout, обработчиках событий.',
      'Функция вызывается как обычная, без объекта.',
      'Решения: стрелочные функции или bind.'
    ],
    tags: ['this', 'context', 'callbacks'],
    codeExample: `const user = {
  name: "John",
  sayHi() { console.log(this.name); }
};

setTimeout(user.sayHi, 100); // undefined
setTimeout(() => user.sayHi(), 100); // "John"`,
    relatedTopics: ['this-basics', 'bind-call-apply'],
    nextTopicId: 'bind-call-apply'
  },
  {
    id: 'bind-call-apply',
    title: 'Методы функций (bind/call/apply)',
    difficulty: 'intermediate',
    description: 'Явное управление контекстом функции.',
    keyPoints: [
      'call: немедленный вызов с перечислением аргументов.',
      'apply: немедленный вызов с массивом аргументов.',
      'bind: создание новой функции с жесткой привязкой контекста.'
    ],
    tags: ['this', 'context', 'bind', 'call', 'apply'],
    codeExample: `function greet(phrase) {
  console.log(phrase + ", " + this.name);
}

const user = { name: "Alice" };

greet.call(user, "Hello"); // "Hello, Alice"
const bound = greet.bind(user);
bound("Hi"); // "Hi, Alice"`,
    relatedTopics: ['this-basics', 'context-loss'],
    nextTopicId: 'prototype-chain'
  }
];

const PROTOTYPE_TOPICS: Topic[] = [
  {
    id: 'prototype-chain',
    title: 'Прототипы',
    difficulty: 'intermediate',
    description: 'Механизм наследования свойств и методов.',
    keyPoints: [
      'У каждого объекта есть скрытая ссылка [[Prototype]].',
      'Наследование идет по цепочке до Object.prototype или null.',
      'Свойства прототипа доступны для чтения, но не для записи напрямую.'
    ],
    tags: ['prototype', 'inheritance', 'oop'],
    codeExample: `const animal = { eats: true };
const rabbit = { jumps: true };

Object.setPrototypeOf(rabbit, animal);
// rabbit.__proto__ = animal; // устаревший способ

console.log(rabbit.eats); // true
console.log(rabbit.jumps); // true`,
    relatedTopics: ['this-basics'],
    nextTopicId: 'event-loop'
  }
];

const ADVANCED_TOPICS: Topic[] = [
  {
    id: 'event-loop',
    title: 'Event Loop',
    difficulty: 'advanced',
    description: 'Как JS выполняет асинхронный код в однопоточном режиме.',
    keyPoints: [
      'Call Stack: выполнение синхронного кода.',
      'Task Queue (Макрозадачи): setTimeout, события, I/O.',
      'Microtask Queue: Promises, queueMicrotask.',
      'Приоритет микрозадач: выполняются все перед следующей макрозадачей.'
    ],
    tags: ['event loop', 'async', 'performance', 'microtasks'],
    codeExample: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Вывод: 1, 4, 3, 2`,
    relatedTopics: ['promises', 'async-await'],
    nextTopicId: 'promises'
  },
  {
    id: 'promises',
    title: 'Promises (Промисы)',
    difficulty: 'intermediate',
    description: 'Объект, представляющий результат асинхронной операции.',
    keyPoints: [
      'Состояния: pending, fulfilled, rejected.',
      'Методы: .then(), .catch(), .finally().',
      'Static methods: Promise.all, Promise.race, Promise.allSettled.'
    ],
    tags: ['promise', 'async', 'callbacks'],
    codeExample: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});

promise
  .then(res => console.log(res))
  .catch(err => console.error(err));`,
    relatedTopics: ['event-loop', 'async-await'],
    nextTopicId: 'async-await'
  },
  {
    id: 'async-await',
    title: 'Async / Await',
    difficulty: 'intermediate',
    description: 'Синтаксический сахар над промисами для более читаемого кода.',
    keyPoints: [
      'async функция всегда возвращает Promise.',
      'await приостанавливает выполнение до резолва промиса.',
      'Обработка ошибок через try...catch.'
    ],
    tags: ['promise', 'async', 'await'],
    codeExample: `async function getUserData(id) {
  try {
    const response = await fetch(\`https://api.example.com/user/\${id}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.log("Fetch failed", error);
  }
}

getUserData(1).then(console.log);`,
    relatedTopics: ['event-loop', 'promises'],
    nextTopicId: 'generators'
  },
  {
    id: 'generators',
    title: 'Generators (Генераторы)',
    difficulty: 'advanced',
    description: 'Функции, которые могут приостанавливать свое выполнение.',
    keyPoints: [
      'Объявляются через function*.',
      'Используют оператор yield для возврата значения и паузы.',
      'Возвращают объект итератор с методом next().'
    ],
    tags: ['generators', 'iterators', 'advanced'],
    codeExample: `function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2`,
    relatedTopics: ['async-await'],
    nextTopicId: 'immutability'
  }
];

export const KNOWLEDGE_BASE: Category[] = [
  { id: 'variables', title: 'Переменные и Область видимости', topics: VARIABLES_TOPICS },
  { id: 'closures', title: 'Замыкания и Окружение', topics: CLOSURES_TOPICS },
  { id: 'this-context', title: 'Контекст this', topics: THIS_TOPICS },
  { id: 'prototypes', title: 'Прототипы и ООП', topics: PROTOTYPE_TOPICS },
  { id: 'advanced-js', title: 'Продвинутый JavaScript', topics: ADVANCED_TOPICS },
  { id: 'functional', title: 'Функциональные концепции', topics: [
    {
      id: 'immutability',
      title: 'Иммутабельность',
      difficulty: 'intermediate',
      description: 'Принцип неизменяемости данных для чистого кода.',
      keyPoints: [
        'Предотвращает побочные эффекты.',
        'Важно для оптимизаций в React/Vue.',
        'Использование спрэд-оператора и методов map/filter.'
      ],
      tags: ['immutability', 'functional'],
      codeExample: `const original = { x: 1, y: 2 };
const updated = { ...original, x: 10 };

console.log(original.x); // 1
console.log(updated.x); // 10

const list = [1, 2, 3];
const newList = [...list, 4]; // [1, 2, 3, 4]`,
      relatedTopics: ['closures-basic']
    }
  ]}
];
