
import { Category, Topic } from './types';

const VARIABLES_TOPICS: Topic[] = [
  {
    id: 'var-let-const',
    title: 'var, let, const',
    difficulty: 'beginner',
    description: 'Основополагающая тема JavaScript, касающаяся управления памятью и жизненного цикла данных. До появления стандарта ES6 в 2015 году, JavaScript полагался исключительно на var, что приводило к проблемам с "загрязнением" глобальной области видимости и трудноуловимым багам из-за отсутствия блочной видимости. Современный стандарт диктует использование let для изменяемых данных и const для неизменяемых ссылок, что делает код более предсказуемым и безопасным. Понимание разницы между ними — первый критический шаг на любом техническом интервью.',
    keyPoints: [
      'var: функциональная область видимости, допускает повторное объявление, всплывает (hoisting).',
      'let/const: блочная область видимости, не допускают повторного объявления.',
      'const требует инициализации и запрещает переопределение ссылки.'
    ],
    tags: ['variables', 'scope', 'let', 'const', 'hoisting', 'ES6', 'declarations'],
    examples: [
      {
        title: "Разница областей видимости (Scope)",
        code: `if (true) {
  var x = 5;
  let y = 10;
  const z = 15;
}
console.log(x); // 5 (var виден вне блока)
// console.log(y); // ReferenceError
// console.log(z); // ReferenceError`
      },
      {
        title: "Повторное объявление",
        code: `var a = 1;
var a = 2; // Ок

let b = 1;
// let b = 2; // SyntaxError: Identifier 'b' has already been declared`
      }
    ],
    relatedTopics: ['hoisting', 'tdz'],
    nextTopicId: 'hoisting'
  },
  {
    id: 'hoisting',
    title: 'Hoisting (Всплытие)',
    difficulty: 'intermediate',
    description: 'Механизм, при котором интерпретатор JavaScript визуально "поднимает" объявления переменных и функций в начало их области видимости перед выполнением кода. Важно понимать, что физически код остается на месте — это поведение движка на стадии компиляции (creation phase). Hoisting часто становится причиной недоразумений, особенно при использовании var, где переменная инициализируется значением undefined до фактической строки кода, в то время как функции (Function Declarations) всплывают целиком, позволяя вызывать их раньше объявления.',
    keyPoints: [
      'Function Declaration всплывает полностью.',
      'var всплывает с инициализацией undefined.',
      'let/const всплывают, но находятся в TDZ.'
    ],
    tags: ['hoisting', 'scope', 'variables', 'functions', 'internals'],
    examples: [
      {
        title: "Всплытие функций vs Переменных",
        code: `sayHi(); // "Hi" (FD всплывает полностью)
function sayHi() { console.log("Hi"); }

console.log(nickname); // undefined (var всплывает без значения)
var nickname = "Junior";

// sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye"); };`
      }
    ],
    relatedTopics: ['var-let-const', 'tdz'],
    nextTopicId: 'tdz'
  },
  {
    id: 'tdz',
    title: 'Temporal Dead Zone (TDZ)',
    difficulty: 'intermediate',
    description: 'Временная мертвая зона — это специфическое поведение let и const, предназначенное для предотвращения использования переменных до их фактической инициализации. В отличие от var, который возвращает undefined, попытка обращения к переменной в TDZ приведет к фатальной ошибке ReferenceError. Это дисциплинирует разработчика и помогает ловить логические ошибки на ранних этапах. Зона начинается с момента входа в блок кода и длится до строки, где переменная объявляется.',
    keyPoints: [
      'Доступ к переменной в TDZ вызывает ReferenceError.',
      'TDZ начинается при входе в блок и заканчивается на строке объявления.'
    ],
    tags: ['tdz', 'variables', 'let', 'const', 'scope', 'ES6', 'errors'],
    examples: [
      {
        title: "Проявление TDZ",
        code: `{
  // console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 5; 
  console.log(x); // 5
}`
      }
    ],
    relatedTopics: ['var-let-const', 'scope-chain'],
    nextTopicId: 'scope-chain'
  },
  {
    id: 'scope-chain',
    title: 'Scope Chain',
    difficulty: 'beginner',
    description: 'Цепочка областей видимости определяет, как JavaScript ищет переменные в коде. Когда вы обращаетесь к переменной, движок сначала ищет её в текущей (локальной) области видимости. Если не находит — переходит к "родительской" области, и так далее до глобальной области. Это однонаправленный процесс: функция может видеть переменные своих родителей, но родители не имеют доступа к локальным переменным дочерних функций. Понимание этой иерархии критически важно для работы с замыканиями и отладки сложных приложений.',
    keyPoints: [
      'Поиск переменной идет от локального окружения к внешнему.',
      'Глобальная область видимости — конец цепочки.',
      'Функции создают свою область видимости.'
    ],
    tags: ['scope', 'closure', 'chain', 'execution context', 'lexical environment'],
    examples: [
      {
        title: "Поиск по цепочке",
        code: `const name = "Global";

function outer() {
  const name = "Outer";
  function inner() {
    console.log(name); // "Outer" (берется из ближайшего предка)
  }
  inner();
}
outer();`
      }
    ],
    relatedTopics: ['lexical-env', 'closures-basic'],
    nextTopicId: 'lexical-env'
  }
];

const CLOSURES_TOPICS: Topic[] = [
  {
    id: 'lexical-env',
    title: 'Лексическое окружение',
    difficulty: 'advanced',
    description: 'Это внутренняя структура движка, которая "живет" в памяти при выполнении функций. Она состоит из двух частей: записи окружения (Environment Record), где хранятся локальные переменные, и ссылки на внешнее окружение (Outer Reference). Каждый раз, когда функция создается, она "захватывает" ссылку на то место, где была определена. Именно благодаря этой невидимой связи в JavaScript работают замыкания. Лексическое окружение — это теоретический фундамент, на котором строится вся магия управления состоянием.',
    keyPoints: [
      'Environment Record: хранилище переменных.',
      'Outer Reference: ссылка на внешнее лексическое окружение.',
      'Создается при каждом вызове функции.'
    ],
    tags: ['scope', 'lexical environment', 'closure', 'internals', 'memory'],
    examples: [
      {
        title: "Механизм работы",
        code: `let x = 1;
function func() {
  // При вызове создается EnvironmentRecord: { x: (извне) }
  console.log(x);
}
x = 2;
func(); // 2 (функция берет текущее значение из окружения)`
      }
    ],
    relatedTopics: ['scope-chain', 'closures-basic'],
    nextTopicId: 'closures-basic'
  },
  {
    id: 'closures-basic',
    title: 'Замыкания (Closures)',
    difficulty: 'intermediate',
    description: 'Замыкание — это комбинация функции и её лексического окружения, в котором она была создана. Говоря проще: это функция, которая "помнит" свои внешние переменные даже после того, как внешняя функция завершила работу. Это одна из самых мощных концепций JavaScript, позволяющая создавать инкапсулированные данные, приватные методы и сохранять состояние без использования глобальных переменных. На интервью это "золотой стандарт" вопроса, который проверяет глубину понимания языка.',
    keyPoints: [
      'Замыкание — это функция + лексическое окружение.',
      'Используется для инкапсуляции данных.',
      'Переменные не удаляются из памяти, пока на них есть ссылка.'
    ],
    tags: ['closure', 'scope', 'functional', 'memory', 'encapsulation'],
    examples: [
      {
        title: "Классический счетчик",
        code: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`
      }
    ],
    relatedTopics: ['lexical-env', 'private-state'],
    nextTopicId: 'private-state'
  },
  {
    id: 'private-state',
    title: 'Приватное состояние',
    difficulty: 'intermediate',
    description: 'В JavaScript до недавнего времени не было встроенных средств для создания по-настоящему приватных свойств объектов. Замыкания стали классическим решением этой задачи (паттерн Модуль). Вы определяете переменные внутри функции и возвращаете объект с методами, которые имеют доступ к этим переменным. Снаружи напрямую изменить эти данные невозможно — только через предоставленный интерфейс. Это основа модульной архитектуры и многих современных библиотек.',
    keyPoints: [
      'Доступ к переменной только через специальные методы.',
      'Основа надежных библиотек и модулей.'
    ],
    tags: ['closure', 'encapsulation', 'privacy', 'module pattern', 'iife'],
    examples: [
      {
        title: "Паттерн 'Модуль'",
        code: `const bankAccount = (function(initialBalance) {
  let balance = initialBalance;
  return {
    deposit: (amount) => balance += amount,
    getBalance: () => balance
  };
})(1000);`
      }
    ],
    relatedTopics: ['closures-basic'],
    nextTopicId: 'this-basics'
  }
];

const THIS_TOPICS: Topic[] = [
  {
    id: 'this-basics',
    title: 'Контекст this',
    difficulty: 'beginner',
    description: 'Ключевое слово this в JavaScript ведет себя иначе, чем во многих других языках. Его значение не фиксируется при определении функции, а вычисляется в момент её вызова. Это делает язык гибким, но часто запутывает новичков. Существует 4 основных правила определения this: вызов как метода объекта, обычный вызов функции (в строгом режиме this будет undefined), явная привязка через call/apply/bind и вызов через оператор new. Мастерство управления контекстом — признак опытного разработчика.',
    keyPoints: [
      'this определяется в момент вызова.',
      'В методе объекта — сам объект.',
      'В обычной функции в строгом режиме — undefined.'
    ],
    tags: ['this', 'context', 'objects', 'functions'],
    examples: [
      {
        title: "Явный и неявный вызов",
        code: `const user = {
  name: "Alice",
  sayHi() { console.log(this.name); }
};
user.sayHi(); // "Alice"`
      }
    ],
    relatedTopics: ['arrow-functions', 'context-loss'],
    nextTopicId: 'arrow-functions'
  },
  {
    id: 'arrow-functions',
    title: 'this в стрелочных функциях',
    difficulty: 'intermediate',
    description: 'Стрелочные функции (ES6) кардинально изменили подход к работе с контекстом. У них нет своего собственного this — они "заимствуют" его из окружающего лексического контекста в момент создания. Это свойство делает их незаменимыми для колбэков, обработчиков событий и методов setTimeout, где обычные функции часто теряют контекст. Однако это же свойство делает их непригодными для использования в качестве методов объекта, если вы хотите иметь доступ к свойствам этого объекта через this.',
    keyPoints: [
      'Стрелки не имеют своего this.',
      'this фиксируется в момент создания функции.',
      'Идеально для колбэков.'
    ],
    tags: ['this', 'arrow functions', 'context', 'ES6', 'lexical this'],
    examples: [
      {
        title: "Стрелка в методе объекта",
        code: `const obj = {
  name: "MyObj",
  arrow: () => { console.log(this.name); }
};
obj.arrow(); // undefined (берет this снаружи)`
      }
    ],
    relatedTopics: ['this-basics'],
    nextTopicId: 'context-loss'
  },
  {
    id: 'context-loss',
    title: 'Потеря контекста',
    difficulty: 'intermediate',
    description: 'Один из самых распространенных багов в JavaScript — когда метод объекта передается куда-то как обычная функция (например, в setTimeout или как обработчик клика). В этом случае связь с объектом разрывается, и this перестает указывать на него. Разработчики используют несколько стратегий для борьбы с этим: создание "обертки" в виде стрелочной функции или использование метода bind для жесткой фиксации контекста. Понимание причин потери контекста экономит часы отладки.',
    keyPoints: [
      'Решения: стрелочные функции или bind.'
    ],
    tags: ['this', 'context', 'callbacks', 'timeouts', 'events'],
    examples: [
      {
        title: "Фиксация контекста через bind",
        code: `const button = {
  text: "Click me",
  click() { console.log(this.text); }
};
setTimeout(button.click.bind(button), 100);`
      }
    ],
    relatedTopics: ['this-basics', 'bind-call-apply'],
    nextTopicId: 'bind-call-apply'
  },
  {
    id: 'bind-call-apply',
    title: 'Методы функций (bind/call/apply)',
    difficulty: 'intermediate',
    description: 'Это инструменты для явного управления контекстом (explicit binding). Методы call и apply вызывают функцию немедленно с указанным this, разница лишь в способе передачи аргументов (call — через запятую, apply — массивом). Метод bind работает иначе: он не вызывает функцию сразу, а создает и возвращает её новую копию, "намертво" привязанную к определенному объекту. Это позволяет гарантировать корректность контекста в будущем.',
    keyPoints: [
      'call/apply: немедленный вызов.',
      'bind: создание новой функции.'
    ],
    tags: ['this', 'context', 'bind', 'call', 'apply', 'functions', 'methods'],
    examples: [
      {
        title: "Использование call",
        code: `const person = { name: "Bob" };
function greet(age) { console.log(this.name, age); }
greet.call(person, 25);`
      }
    ],
    relatedTopics: ['this-basics', 'context-loss'],
    nextTopicId: 'prototype-chain'
  }
];

const PROTOTYPE_TOPICS: Topic[] = [
  {
    id: 'prototype-chain',
    title: 'Прототипы',
    difficulty: 'intermediate',
    description: 'Прототипное наследование — это "сердце" объектно-ориентированной модели JavaScript. В отличие от классических языков (Java, C++), где наследование идет от классов, здесь объекты наследуют напрямую от других объектов. Каждый объект имеет скрытое свойство [[Prototype]] (доступное через __proto__), которое ссылается на другой объект. Если свойство не найдено в самом объекте, поиск продолжается по цепочке прототипов до самого верха (Object.prototype). Это позволяет эффективно переиспользовать методы и экономить память.',
    keyPoints: [
      'У каждого объекта есть скрытая ссылка [[Prototype]].',
      'Наследование идет по цепочке.'
    ],
    tags: ['prototype', 'inheritance', 'oop', 'prototypal inheritance', 'objects'],
    examples: [
      {
        title: "Цепочка прототипов",
        code: `const animal = { eats: true };
const rabbit = { jumps: true };
rabbit.__proto__ = animal;
console.log(rabbit.eats); // true`
      }
    ],
    relatedTopics: ['this-basics'],
    nextTopicId: 'event-loop'
  }
];

const ADVANCED_TOPICS: Topic[] = [
  {
    id: 'event-loop',
    title: 'Event Loop',
    difficulty: 'advanced',
    description: 'Цикл событий — это механизм, который делает возможным асинхронное программирование в однопоточном JavaScript. Движок выполняет код в Call Stack. Когда встречается асинхронная операция (таймер, запрос к API), она делегируется браузеру/среде окружения. По завершении результат попадает в очереди (Microtasks или Macrotasks). Event Loop постоянно следит: если стек пуст, он берет задачи из очередей и переносит их в стек. Понимание приоритета микрозадач (промисы) над макрозадачами (таймеры) — ключ к написанию производительных приложений.',
    keyPoints: [
      'Call Stack -> Microtasks -> Rendering -> Macrotasks.',
      'Микрозадачи: Promises, queueMicrotask.',
      'Макрозадачи: setTimeout, события.'
    ],
    tags: ['event loop', 'async', 'performance', 'microtasks', 'macrotasks', 'v8', 'single thread'],
    examples: [
      {
        title: "Очередность",
        code: `console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');
// Start, End, Promise, Timeout`
      }
    ],
    relatedTopics: ['promises', 'async-await'],
    nextTopicId: 'promises'
  },
  {
    id: 'promises',
    title: 'Promises (Промисы)',
    difficulty: 'intermediate',
    description: 'Промис — это объект, представляющий результат асинхронной операции, который может быть доступен сейчас, позже или никогда. До их появления разработчики страдали от "Callback Hell" (вложенных обратных вызовов), что делало код нечитаемым. Промисы позволяют писать асинхронный код в линейном стиле с использованием методов .then(), .catch() и .finally(). Промис может находиться в одном из трех состояний: ожидание (pending), успешно выполнен (fulfilled) или отклонен (rejected).',
    keyPoints: [
      'Static methods: Promise.all, Promise.race, Promise.allSettled.'
    ],
    tags: ['promise', 'async', 'callbacks', 'async flow', 'error handling'],
    examples: [
      {
        title: "Простой промис",
        code: `const p = new Promise(resolve => setTimeout(() => resolve('Ok'), 1000));
p.then(res => console.log(res));`
      }
    ],
    relatedTopics: ['event-loop', 'async-await'],
    nextTopicId: 'async-await'
  },
  {
    id: 'async-await',
    title: 'Async / Await',
    difficulty: 'intermediate',
    description: 'Async/await — это синтаксический сахар над промисами, введенный в ES2017. Он позволяет писать асинхронный код так, будто он синхронный, что значительно упрощает чтение и поддержку. Ключевое слово async делает функцию асинхронной (она всегда возвращает промис), а await заставляет интерпретатор ждать завершения промиса внутри такой функции, не блокируя при этом основной поток выполнения. Для обработки ошибок используется стандартная конструкция try/catch.',
    keyPoints: [
      'await приостанавливает выполнение только внутри async.'
    ],
    tags: ['promise', 'async', 'await', 'ES2017', 'syntax sugar'],
    examples: [
      {
        title: "Async функция",
        code: `async function getData() {
  try {
    const res = await fetch('/api/user');
    const user = await res.json();
    return user;
  } catch(e) { console.error(e); }
}`
      }
    ],
    relatedTopics: ['event-loop', 'promises'],
    nextTopicId: 'generators'
  },
  {
    id: 'generators',
    title: 'Generators (Генераторы)',
    difficulty: 'advanced',
    description: 'Генераторы — это особый тип функций, которые могут приостанавливать свое выполнение на середине и возвращать промежуточный результат с помощью ключевого слова yield, а затем возобновлять работу с того же места. При вызове генератор возвращает специальный объект-итератор. Это мощный инструмент для работы с бесконечными потоками данных, реализации сложной асинхронной логики (как в библиотеке Redux-Saga) и ленивых вычислений.',
    keyPoints: [
      'yield возвращает значение и ставит на паузу.'
    ],
    tags: ['generators', 'iterators', 'advanced', 'yield', 'async flow'],
    examples: [
      {
        title: "Генератор последовательности",
        code: `function* gen() {
  yield 1; yield 2; return 3;
}
const g = gen();
console.log(g.next().value); // 1`
      }
    ],
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
      description: 'Иммутабельность (неизменяемость) — это концепция программирования, при которой данные никогда не меняются напрямую. Вместо изменения существующего объекта или массива создается его новая копия с обновленными данными. Этот подход критически важен в функциональном программировании и в современных фронтенд-фреймворках (React, Redux), так как он позволяет легко отслеживать изменения данных и реализовывать функции вроде "отмены" (undo/redo) или оптимизации рендеринга.',
      keyPoints: [
        'Предотвращает побочные эффекты.',
        'Использование спрэд-оператора и методов map/filter.'
      ],
      tags: ['immutability', 'functional', 'objects', 'arrays', 'state management'],
      examples: [
        {
          title: "Обновление вложенных структур",
          code: `const state = { user: { id: 1, name: 'Alex' }, version: 1 };
const nextState = {
  ...state,
  user: { ...state.user, name: 'Ivan' },
  version: state.version + 1
};`
        }
      ],
      relatedTopics: ['closures-basic']
    }
  ]}
];
