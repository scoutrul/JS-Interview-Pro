import { Topic } from '../types';

export const BEGINNER_TOPICS: Topic[] = [
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
    tags: ['variables', 'scope', 'let', 'const', 'hoisting', 'ES6'],
    examples: [
      {
        title: "Разница областей видимости",
        code: `if (true) {\n  var x = 5;\n  let y = 10;\n}\nconsole.log(x); // 5\n// console.log(y); // ReferenceError`
      }
    ],
    relatedTopics: ['hoisting', 'tdz'],
    nextTopicId: 'hoisting'
  },
  {
    id: 'scope-chain',
    title: 'Scope Chain',
    difficulty: 'beginner',
    description: 'Цепочка областей видимости определяет, как JavaScript ищет переменные в коде. Когда вы обращаетесь к переменной, движок сначала ищет её в текущей (локальной) области видимости. Если не находит — переходит к "родительской" области, и так далее до глобальной области. Это однонаправленный процесс: функция может видеть переменные своих родителей, но родители не имеют доступа к локальным переменным дочерних функций. Понимание этой иерархии критически важно для работы с замыканиями и отладки сложных приложений.',
    keyPoints: [
      'Поиск идет строго снизу вверх по иерархии.',
      'Функции имеют доступ к переменным родителей, но не наоборот.'
    ],
    tags: ['scope', 'closure', 'chain'],
    examples: [
      {
        title: "Поиск по цепочке",
        code: `const name = "Global";\nfunction outer() {\n  const name = "Outer";\n  function inner() {\n    console.log(name); // "Outer"\n  }\n  inner();\n}\nouter();`
      }
    ],
    relatedTopics: ['lexical-env', 'closures-basic'],
    nextTopicId: 'lexical-env'
  },
  {
    id: 'this-basics',
    title: 'Контекст this',
    difficulty: 'beginner',
    description: 'Ключевое слово this в JavaScript ведет себя иначе, чем во многих других языках. Его значение не фиксируется при определении функции, а вычисляется в момент её вызова. Это делает язык гибким, но часто запутывает новичков. Существует 4 основных правила определения this: вызов как метода объекта, обычный вызов функции (в строгом режиме this будет undefined), явная привязка через call/apply/bind и вызов через оператор new. Мастерство управления контекстом — признак опытного разработчика.',
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
      }
    ],
    relatedTopics: ['arrow-functions', 'context-loss'],
    nextTopicId: 'arrow-functions'
  }
];

