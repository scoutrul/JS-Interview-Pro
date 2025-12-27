import { Topic } from '../../../types';

export const JS_FUNCTIONS_ADVANCED_TOPICS: Topic[] = [
{
    id: 'currying',
    title: 'Currying и Partial Application',
    difficulty: 'advanced',
    description: 'Currying — преобразование функции с несколькими аргументами в цепочку функций с одним аргументом. Partial Application — фиксация части аргументов функции.',
    keyPoints: [
      'Currying: f(a, b, c) → f(a)(b)(c).',
      'Partial Application: фиксация части аргументов.',
      'Создает специализированные функции из общих.',
      'Улучшает переиспользование и композицию.',
      'Основа функционального программирования.'
    ],
    funFact: 'Currying назван в честь математика Хаскелла Карри (Haskell Curry), хотя концепция была впервые описана Мозесом Шёнфинкелем (Moses Schönfinkel) в 1920-х годах.',
    tags: ['currying', 'functional', 'partial-application', 'patterns', 'higher-order-functions', 'closures-basic'],
    examples: [
      {
        title: "Currying вручную",
        code: `function add(a) {\n  return function(b) {\n    return function(c) {\n      return a + b + c;\n    };\n  };\n}\n\nadd(1)(2)(3); // 6\n\n// Arrow functions\nconst add = a => b => c => a + b + c;`
      },
      {
        title: "Универсальный curry",
        code: `function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...nextArgs) {\n      return curried.apply(this, args.concat(nextArgs));\n    };\n  };\n}\n\nconst multiply = (a, b, c) => a * b * c;\nconst curriedMultiply = curry(multiply);\n\ncurriedMultiply(2)(3)(4); // 24\ncurriedMultiply(2, 3)(4); // 24`
      },
      {
        title: "Partial Application",
        code: `function partial(fn, ...fixedArgs) {\n  return function(...remainingArgs) {\n    return fn(...fixedArgs, ...remainingArgs);\n  };\n}\n\nfunction greet(greeting, name) {\n  return \`\${greeting}, \${name}!\`;\n}\n\nconst sayHello = partial(greet, "Hello");\nsayHello("Alice"); // "Hello, Alice!"\n\nconst sayHi = partial(greet, "Hi");\nsayHi("Bob"); // "Hi, Bob!"`
      }
    ],
    relatedTopics: ['higher-order-functions', 'closures-basic', 'functions-types']
  },
{
    id: 'memoization',
    title: 'Мемоизация',
    difficulty: 'advanced',
    description: 'Мемоизация — кэширование результатов функции для одинаковых аргументов. При повторном вызове с теми же аргументами возвращается кэшированное значение.',
    keyPoints: [
      'Кэширование результатов функции.',
      'Проверка: были ли такие аргументы ранее.',
      'Возврат кэша или вычисление и сохранение.',
      'Ускоряет повторные вычисления.',
      'Используется в React.memo, useMemo.'
    ],
    funFact: 'Мемоизация — это техника оптимизации, которая пришла из функционального программирования. В JavaScript она особенно полезна для дорогих вычислений и рекурсивных функций, таких как вычисление чисел Фибоначчи.',
    tags: ['memoization', 'performance', 'optimization', 'caching', 'recursion', 'higher-order-functions'],
    examples: [
      {
        title: "Простая мемоизация",
        code: `function memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache[key]) {\n      return cache[key];\n    }\n    const result = fn.apply(this, args);\n    cache[key] = result;\n    return result;\n  };\n}\n\nconst expensive = (n) => {\n  console.log("Computing...");\n  return n * 2;\n};\n\nconst memoized = memoize(expensive);\nmemoized(5); // Computing... 10\nmemoized(5); // 10 (из кэша)`
      },
      {
        title: "Мемоизация факториала",
        code: `const memoFactorial = memoize(function(n) {\n  if (n <= 1) return 1;\n  return n * memoFactorial(n - 1);\n});\n\nmemoFactorial(5); // Вычисляет 5, 4, 3, 2, 1\nmemoFactorial(6); // Использует кэш для 5, вычисляет только 6`
      },
      {
        title: "Мемоизация с Map",
        code: `function memoizeMap(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = args.join(',');\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}`
      }
    ],
    relatedTopics: ['recursion', 'higher-order-functions', 'performance']
  }
];
