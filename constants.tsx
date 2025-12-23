
import { Category } from './types';

export const KNOWLEDGE_BASE: Category[] = [
  {
    id: 'variables',
    title: 'Переменные и Область видимости',
    topics: [
      {
        id: 'var-let-const',
        title: 'var, let, const',
        difficulty: 'beginner',
        description: 'Основные способы объявления переменных в JS, их различия в области видимости и поведении.',
        keyPoints: [
          'var: функциональная область видимости, допускает повторное объявление, всплывает (hoisting).',
          'let/const: блочная область видимости, не допускают повторного объявления в том же скоупе.',
          'const требует инициализации и запрещает переопределение ссылки.'
        ],
        codeExample: `// var vs let
if (true) {
  var x = 5;
  let y = 10;
}
console.log(x); // 5 (доступна вне блока)
try {
  console.log(y); // ReferenceError: y is not defined
} catch(e) { console.log("y недоступна") }`,
        relatedTopics: ['hoisting', 'scope-chain', 'tdz']
      },
      {
        id: 'scope-chain',
        title: 'Область видимости и Scope Chain',
        difficulty: 'beginner',
        description: 'Механизм поиска переменных: если переменная не найдена в текущем окружении, поиск продолжается во внешнем.',
        keyPoints: [
          'Global Scope: самый верхний уровень.',
          'Function Scope: создается внутри функций.',
          'Block Scope: создается внутри {}, если используются let/const.',
          'Поиск идет строго вверх, от вложенных областей к глобальной.'
        ],
        codeExample: `const globalVar = "Global";

function outer() {
  const outerVar = "Outer";
  
  function inner() {
    const innerVar = "Inner";
    // Видит всё по цепочке вверх
    console.log(innerVar, outerVar, globalVar);
  }
  
  inner();
}

outer();`,
        relatedTopics: ['lexical-env', 'closures-basic']
      },
      {
        id: 'hoisting',
        title: 'Hoisting (Всплытие)',
        difficulty: 'intermediate',
        description: 'Механизм, при котором объявления функций и переменных "поднимаются" в начало области видимости.',
        keyPoints: [
          'Function Declaration: всплывает полностью (можно вызвать до объявления).',
          'var: всплывает только объявление, значение до инициализации — undefined.',
          'let/const: всплывают, но обращение до строки объявления вызывает ошибку (TDZ).'
        ],
        codeExample: `// Функции всплывают полностью
sayHello(); 

function sayHello() {
  console.log("Hello!");
}

// var всплывает частично
console.log(a); // undefined
var a = 10;`,
        relatedTopics: ['var-let-const', 'tdz']
      },
      {
        id: 'tdz',
        title: 'Temporal Dead Zone (TDZ)',
        difficulty: 'intermediate',
        description: 'Период между входом в область видимости и фактическим объявлением переменной (для let/const).',
        keyPoints: [
          'Обращение к переменной в TDZ вызывает ReferenceError.',
          'Сделано для безопасности кода и предотвращения использования неинициализированных переменных.',
          'TDZ заканчивается в момент выполнения строки с объявлением (инициализацией).'
        ],
        codeExample: `function checkTDZ() {
  // console.log(val); // Ошибка: Cannot access 'val' before initialization
  let val = "I am safe now";
  console.log(val); // Работает
}
checkTDZ();`,
        relatedTopics: ['var-let-const', 'hoisting']
      }
    ]
  },
  {
    id: 'closures',
    title: 'Замыкания и Окружение',
    topics: [
      {
        id: 'closures-basic',
        title: 'Замыкания (Closures)',
        difficulty: 'intermediate',
        description: 'Функция, которая "помнит" своё лексическое окружение даже после выхода из внешней функции.',
        keyPoints: [
          'Замыкание создается каждый раз при создании функции.',
          'Дает доступ к переменным внешней функции.',
          'Используется для инкапсуляции и создания приватных методов.'
        ],
        codeExample: `function makeAdder(x) {
  // x замыкается внутри возвращаемой функции
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(10)); // 15
console.log(add5(2));  // 7`,
        relatedTopics: ['lexical-env', 'private-state']
      },
      {
        id: 'private-state',
        title: 'Приватное состояние (Эмуляция)',
        difficulty: 'intermediate',
        description: 'Использование замыканий для скрытия данных от прямого доступа извне.',
        keyPoints: [
          'Переменные внутри функции недоступны снаружи напрямую.',
          'Доступ осуществляется только через предоставленные методы.',
          'Классический паттерн для создания модулей или счетчиков.'
        ],
        codeExample: `function createSecretStore(secret) {
  let _secret = secret; // "Приватная" переменная

  return {
    getSecret: () => _secret,
    setSecret: (newSecret) => { _secret = newSecret; }
  };
}

const store = createSecretStore("password123");
console.log(store._secret); // undefined (недоступно напрямую)
console.log(store.getSecret()); // "password123"`,
        relatedTopics: ['closures-basic']
      },
      {
        id: 'lexical-env',
        title: 'Лексическое окружение',
        difficulty: 'advanced',
        description: 'Внутренний объект движка, описывающий текущий контекст переменных.',
        keyPoints: [
          'Environment Record: объект с локальными переменными.',
          'Outer reference: ссылка на внешнее окружение.',
          'Окружение создается в момент вызова функции.'
        ],
        codeExample: `let name = "Global";

function say() {
  // Окружение функции say ссылается на Глобальное
  console.log(name); 
}

function work() {
  let name = "Local";
  say(); // Выведет "Global", так как say была создана в глобальном контексте
}

work();`,
        relatedTopics: ['closures-basic', 'scope-chain']
      }
    ]
  },
  {
    id: 'this-context',
    title: 'Контекст this',
    topics: [
      {
        id: 'this-basics',
        title: 'this в JavaScript',
        difficulty: 'beginner',
        description: 'Значение this определяется способом вызова функции, а не местом её создания.',
        keyPoints: [
          'В методе объекта: this — это сам объект.',
          'Вне функций: в браузере — window.',
          'В строгом режиме (strict mode): в обычных функциях — undefined.',
          'this — динамический контекст, в отличие от лексического окружения.'
        ],
        codeExample: `const user = {
  name: "Dmitry",
  greet() {
    console.log("Hello, I am " + this.name);
  }
};

user.greet(); // this === user

const func = user.greet;
// func(); // Ошибка в strict mode или window.name в обычном`,
        relatedTopics: ['arrow-functions', 'context-loss']
      },
      {
        id: 'arrow-functions',
        title: 'Стрелочные функции и this',
        difficulty: 'intermediate',
        description: 'Стрелочные функции не имеют своего this и берут его из внешнего контекста.',
        keyPoints: [
          'this в стрелке определяется в момент создания функции (лексически).',
          'Стрелки нельзя использовать как конструкторы (нет new).',
          'Методы call, apply и bind не могут изменить this стрелочной функции.'
        ],
        codeExample: `const group = {
  title: "Devs",
  students: ["Ivan", "Oleg"],
  showList() {
    // Стрелка берет this из showList (объект group)
    this.students.forEach(s => {
      console.log(this.title + ": " + s);
    });
  }
};

group.showList();`,
        relatedTopics: ['this-basics']
      },
      {
        id: 'context-loss',
        title: 'Потеря контекста this',
        difficulty: 'intermediate',
        description: 'Проблема, возникающая при передаче метода объекта как функции-колбэка.',
        keyPoints: [
          'Часто случается в setTimeout, обработчиках событий.',
          'Функция вызывается без привязки к объекту.',
          'Решается через bind(), анонимные функции или стрелки.'
        ],
        codeExample: `const bot = {
  phrase: "Beep-boop",
  say() { console.log(this.phrase); }
};

// setTimeout(bot.say, 100); // Потеря: выведет undefined

// Решение 1: bind
setTimeout(bot.say.bind(bot), 100);

// Решение 2: обертка
setTimeout(() => bot.say(), 100);`,
        relatedTopics: ['this-basics', 'bind-call-apply']
      },
      {
        id: 'bind-call-apply',
        title: 'bind, call, apply',
        difficulty: 'intermediate',
        description: 'Методы для явного указания контекста выполнения функции.',
        keyPoints: [
          'call(context, arg1, arg2): вызывает немедленно.',
          'apply(context, [args]): вызывает немедленно с массивом аргументов.',
          'bind(context): возвращает новую функцию с "привязанным" контекстом.'
        ],
        codeExample: `function introduce(city, hobby) {
  console.log(\`I'm \${this.name} from \${city}. I like \${hobby}.\`);
}

const me = { name: "Alex" };

introduce.call(me, "Moscow", "JS");
introduce.apply(me, ["Paris", "Art"]);`,
        relatedTopics: ['this-basics', 'context-loss']
      }
    ]
  },
  {
    id: 'prototypes',
    title: 'Прототипы',
    topics: [
      {
        id: 'prototype-chain',
        title: 'Prototype & prototype chain',
        difficulty: 'intermediate',
        description: 'Механизм наследования в JavaScript через скрытую ссылку [[Prototype]].',
        keyPoints: [
          '__proto__ — способ доступа к прототипу (устаревший, но наглядный).',
          'Object.getPrototypeOf() — современный способ.',
          'Цепочка заканчивается на null.',
          'Запись свойства всегда идет в сам объект, а не в прототип.'
        ],
        codeExample: `const animal = { eats: true };
const rabbit = { jumps: true };

// Устанавливаем прототип
Object.setPrototypeOf(rabbit, animal);

console.log(rabbit.eats); // true (из animal)
console.log(rabbit.hasOwnProperty('eats')); // false
console.log(rabbit.hasOwnProperty('jumps')); // true`,
        relatedTopics: ['this-basics', 'lexical-env']
      }
    ]
  },
  {
    id: 'async-js',
    title: 'Асинхронность',
    topics: [
      {
        id: 'event-loop',
        title: 'Event Loop (Microtasks / Macrotasks)',
        difficulty: 'advanced',
        description: 'Цикл обработки событий, управляющий порядком выполнения задач.',
        keyPoints: [
          'Stack: текущее выполнение.',
          'Microtasks: Promise.then, MutationObserver, queueMicrotask.',
          'Macrotasks: setTimeout, setInterval, Event Listeners, I/O.',
          'Очередность: Stack -> Microtasks (все) -> Render -> Macrotask (одна).'
        ],
        codeExample: `console.log("Start");

setTimeout(() => console.log("Timeout (macro)"), 0);

Promise.resolve().then(() => console.log("Promise (micro)"));

console.log("End");

// Вывод: Start, End, Promise, Timeout`,
        relatedTopics: ['promises-async']
      },
      {
        id: 'promises-async',
        title: 'Async / await и Promise',
        difficulty: 'intermediate',
        description: 'Способы работы с асинхронными операциями, делающие код читаемым.',
        keyPoints: [
          'Promise: объект-обещание результата.',
          'async: функция всегда возвращает промис.',
          'await: приостанавливает выполнение async-функции до завершения промиса.',
          'Используйте try/catch для обработки ошибок в async/await.'
        ],
        codeExample: `const wait = (ms) => new Promise(res => setTimeout(res, ms));

async function run() {
  console.log("Ждем...");
  await wait(1000);
  console.log("Прошла 1 секунда");
}

run();`,
        relatedTopics: ['event-loop']
      }
    ]
  },
  {
    id: 'functional-concepts',
    title: 'Концепции состояния',
    topics: [
      {
        id: 'immutability',
        title: 'Иммутабельность и состояние',
        difficulty: 'intermediate',
        description: 'Практика создания новых данных вместо изменения старых.',
        keyPoints: [
          'Позволяет легко сравнивать состояния по ссылке (быстро для React/Vue).',
          'Предотвращает неожиданные побочные эффекты.',
          'Методы массивов (map, filter, concat) способствуют иммутабельности.'
        ],
        codeExample: `const original = [1, 2, 3];

// Мутация (плохо)
// original.push(4); 

// Иммутабельно (хорошо)
const next = [...original, 4];

console.log(original); // [1, 2, 3]
console.log(next); // [1, 2, 3, 4]`,
        relatedTopics: ['closures-basic']
      }
    ]
  }
];
