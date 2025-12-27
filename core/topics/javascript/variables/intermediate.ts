import { Topic } from '../../../types';

export const JS_VARIABLES_INTERMEDIATE_TOPICS: Topic[] = [
{
    id: 'tdz',
    title: 'Temporal Dead Zone (TDZ)',
    difficulty: 'intermediate',
    description: 'TDZ — период от входа в блок до объявления let/const. Обращение к переменной в TDZ вызывает ReferenceError. var такой защиты не имеет.',
    keyPoints: [
      'Зона от начала блока до строки объявления.',
      'Защищает от логических ошибок использования неинициализированных данных.'
    ],
    funFact: 'TDZ в параметрах функции может привести к интересным ситуациям: function test(x = y, y = 2) вызовет ReferenceError, потому что y еще не инициализирован, когда используется в значении по умолчанию для x.',
    tags: ['tdz', 'variables', 'errors', 'tdz-basic', 'var-let-const'],
    examples: [
      {
        title: "Проявление TDZ",
        code: `{\n  // console.log(x); // ReferenceError\n  let x = 5;\n}`
      },
      {
        title: "TDZ с const",
        code: `{\n  // console.log(PI); // ReferenceError\n  const PI = 3.14;\n  console.log(PI); // 3.14\n}`
      },
      {
        title: "TDZ в параметрах функции",
        code: `function test(x = y, y = 2) {\n  // ReferenceError: y в TDZ\n}\n\nfunction test2(x = 2, y = x) {\n  // OK: x уже инициализирован\n}`
      }
    ],
    relatedTopics: ['var-let-const', 'tdz-basic', 'scope-chain'],
  }
];
