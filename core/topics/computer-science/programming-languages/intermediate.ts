import { Topic } from '../../../types';

export const CS_PROGRAMMING_LANGUAGES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: "programming-languages-execution",
    title: "Выполнение и среда языков",
    difficulty: "intermediate",
    description: "Языки программирования выполняются разными способами: компиляция в машинный код, интерпретация построчно, JIT-компиляция (компиляция во время выполнения). Среда выполнения определяет, где выполняется код: встраиваемые среды (браузер для JavaScript) или standalone (Node.js для серверного JavaScript).\n\nМодель выполнения определяет, как обрабатываются задачи: однопоточные языки выполняют одну задачу за раз, событийно-ориентированные используют event loop для асинхронности. JavaScript использует JIT-компиляцию в V8, event loop для асинхронности и может работать как в браузере, так и в Node.js.",
    keyPoints: [
      "Компиляция: перевод в машинный код до выполнения (C, C++, Rust, Go)",
      "Интерпретация: построчное выполнение без компиляции (Python, Ruby, ранний JavaScript)",
      "JIT-компиляция: компиляция во время выполнения для оптимизации (современный JavaScript в V8, Java)",
      "Встраиваемые среды: язык выполняется внутри другого приложения (JavaScript в браузере, Lua в играх)",
      "Standalone среды: язык выполняется независимо (Node.js для JavaScript, Python интерпретатор)",
      "Однопоточные: один поток выполнения (JavaScript, Python)",
      "Событийно-ориентированные: event loop для асинхронности (JavaScript, Node.js)",
      "JavaScript: JIT в V8, event loop, браузер или Node.js как хост"
    ],
    tags: ["programming-languages", "execution", "compilation", "interpretation", "jit", "runtime", "event-loop", "computer-science", "intermediate"],
    examples: [
      {
        title: "Компиляция vs интерпретация",
        code: "// Компиляция (C)\n// source.c → компилятор → executable\n// Быстрое выполнение, но нужна компиляция\n\n// Интерпретация (Python)\n// source.py → интерпретатор → выполнение\n// Медленнее, но сразу можно запустить\n\n// JIT (JavaScript в V8)\n// source.js → парсинг → байт-код → JIT → машинный код\n// Оптимизация во время выполнения"
      },
      {
        title: "Встраиваемые vs standalone среды",
        code: "// Встраиваемые: JavaScript в браузере\n// <script src='app.js'></script>\n// Браузер предоставляет DOM, API, event loop\n\n// Standalone: Node.js\n// node app.js\n// Node.js предоставляет fs, process, модули\n\n// Один язык — разные среды выполнения"
      },
      {
        title: "Event loop для асинхронности",
        code: "// Однопоточный JavaScript использует event loop\nconsole.log('Start');\n\nsetTimeout(() => {\n  console.log('Async');\n}, 0);\n\nconsole.log('End');\n\n// Вывод: Start, End, Async\n// Event loop обрабатывает асинхронные задачи\n// без блокировки основного потока"
      },
      {
        title: "JIT-компиляция в V8",
        code: "// V8 компилирует JavaScript в машинный код\n// 1. Парсинг → AST\n// 2. Байт-код (Ignition)\n// 3. JIT-компиляция (TurboFan) для горячих функций\n// 4. Оптимизированный машинный код\n\n// Горячие функции (вызываются часто)\n// компилируются в быстрый машинный код\n// Холодные функции остаются в байт-коде"
      }
    ],
    relatedTopics: ["programming-languages-high-level", "event-loop", "execution-threading", "runtime-environments"],
    isFrontendEssential: true
  },
  {
    id: "programming-languages-abstractions-memory",
    title: "Цепочка абстракций и память",
    difficulty: "intermediate",
    description: "Выполнение кода происходит через цепочку абстракций: язык программирования → движок/рантайм → хост-среда → платформа (ОС). Каждый уровень скрывает детали нижнего уровня, предоставляя более удобный интерфейс.\n\nУправление памятью определяет, как язык работает с памятью: автоматическое через сборщик мусора (GC) или ручное управление. JavaScript использует автоматическое управление памятью через GC, что упрощает разработку, но ограничивает контроль над производительностью. Для фронтендера важно понимать эту цепочку абстракций, чтобы эффективно работать с производительностью и отладкой.",
    keyPoints: [
      "Цепочка абстракций: язык → движок/рантайм → хост → платформа (ОС)",
      "JavaScript: язык → V8/SpiderMonkey (движок) → браузер/Node.js (хост) → ОС (платформа)",
      "Движок: парсинг, компиляция, выполнение кода (V8, SpiderMonkey, Chakra)",
      "Хост: предоставляет API и окружение (браузер: DOM, Node.js: fs, process)",
      "Платформа: операционная система, железо",
      "Автоматическое управление памятью: GC освобождает неиспользуемую память (JavaScript, Python, Java)",
      "Ручное управление: разработчик сам выделяет и освобождает память (C, C++, Rust)",
      "Компромиссы: GC — удобство и безопасность, ручное — контроль и производительность"
    ],
    tags: ["programming-languages", "abstraction", "memory", "garbage-collection", "runtime", "computer-science", "intermediate"],
    examples: [
      {
        title: "Цепочка абстракций JavaScript",
        code: "// Уровень 1: Язык\nconst data = fetch('/api/data');\n\n// Уровень 2: Движок (V8)\n// Парсинг, компиляция, выполнение\n\n// Уровень 3: Хост (браузер)\n// fetch API, DOM, event loop\n\n// Уровень 4: Платформа (ОС)\n// Сетевые вызовы, файловая система\n\n// Каждый уровень скрывает детали нижнего"
      },
      {
        title: "Автоматическое управление памятью (GC)",
        code: "// JavaScript: GC автоматически освобождает память\nfunction createData() {\n  const arr = new Array(1000000).fill(0);\n  return arr;\n}\n\nconst data = createData();\n// После удаления ссылки GC освободит память\ndata = null;\n// GC пометит память как неиспользуемую\n// и освободит её в следующий цикл сборки"
      },
      {
        title: "Ручное управление памятью (C)",
        code: "// C: разработчик сам управляет памятью\nint* arr = malloc(1000000 * sizeof(int));\n// Использование памяти\nfree(arr);  // Явное освобождение\n\n// Ошибка: забыли free() → утечка памяти\n// Ошибка: free() дважды → краш программы"
      },
      {
        title: "Понимание абстракций для отладки",
        code: "// Проблема: медленный код\n// Нужно понять, на каком уровне проблема:\n\n// 1. Язык: неоптимальный алгоритм?\n// 2. Движок: JIT не оптимизировал?\n// 3. Хост: браузер блокирует?\n// 4. Платформа: ОС ограничивает?\n\n// DevTools помогает понять уровень проблемы\n// Performance tab показывает цепочку абстракций"
      }
    ],
    relatedTopics: ["programming-languages-high-level", "programming-languages-execution", "memory-management"],
    isFrontendEssential: true
  },
  {
    id: "programming-languages-modern",
    title: "Современные языки программирования",
    difficulty: "intermediate",
    description: "Современный ландшафт языков программирования включает десятки активно используемых языков, каждый со своей специализацией. JavaScript, Python, Java, C#, Go, Rust, TypeScript, PHP, Ruby, Swift, Kotlin — основные языки, применяемые в разных сферах: веб-разработка, мобильная разработка, системное программирование, enterprise-приложения.\n\nТренды развития: конвергенция парадигм (языки заимствуют лучшие идеи друг у друга), безопасность памяти (Rust), производительность (Go, Rust), улучшение инструментов разработки. Будущее: WebAssembly для производительности в вебе, низкоуровневые языки для веба, ИИ-ассистенты для генерации кода. Для фронтендера важно понимать эволюцию JavaScript экосистемы и появление новых инструментов.",
    funFact: [
      "TypeScript, созданный Microsoft в 2012 году, стал де-факто стандартом для больших JavaScript-проектов, хотя компилируется в обычный JavaScript и не добавляет новых возможностей во время выполнения.",
      "Rust, созданный Mozilla, стал первым языком системного программирования с гарантиями безопасности памяти без сборщика мусора, что сделало его популярным для критических систем."
    ],
    keyPoints: [
      "Веб-разработка: JavaScript (фронтенд), TypeScript (типизированный JS), PHP (бэкенд), Python (бэкенд, фреймворки)",
      "Мобильная разработка: Swift (iOS), Kotlin (Android), React Native (JavaScript), Flutter (Dart)",
      "Системное программирование: Go (микросервисы, облако), Rust (безопасность памяти), C++ (производительность)",
      "Enterprise: Java (большие системы), C# (.NET экосистема), Scala (большие данные)",
      "Тренды: конвергенция парадигм, безопасность памяти, производительность, улучшение инструментов",
      "WebAssembly: низкоуровневый язык для веба, компиляция из других языков (Rust, C++)",
      "ИИ-ассистенты: генерация кода, автодополнение, рефакторинг",
      "Эволюция JavaScript: ES6+, модули, async/await, TypeScript как стандарт"
    ],
    tags: ["programming-languages", "modern", "trends", "web-development", "future", "computer-science", "intermediate"],
    examples: [
      {
        title: "Языки по сферам применения",
        code: "// Веб-фронтенд\nJavaScript, TypeScript, WebAssembly\n\n// Веб-бэкенд\nNode.js (JavaScript), Python (Django, Flask), PHP, Java (Spring)\n\n// Мобильная разработка\niOS: Swift, Android: Kotlin\nКроссплатформенные: React Native (JS), Flutter (Dart)\n\n// Системное программирование\nGo (микросервисы), Rust (безопасность), C++ (производительность)"
      },
      {
        title: "Тренды развития",
        code: "// Конвергенция парадигм\n// JavaScript: классы (ООП) + функции (функциональный)\n// Python: ООП + функциональный\n\n// Безопасность памяти\n// Rust: гарантии без GC\n// Go: GC + безопасность\n\n// Производительность\n// WebAssembly: близко к нативному коду\n// JIT-оптимизации в V8"
      },
      {
        title: "WebAssembly для веба",
        code: "// Компиляция Rust в WebAssembly\n// rust → wasm → браузер\n\n// Производительность близка к нативному коду\n// Можно использовать Rust/C++ в браузере\n\n// Примеры: игры, обработка видео, криптография\n// Дополняет JavaScript, не заменяет"
      },
      {
        title: "Эволюция JavaScript экосистемы",
        code: "// ES5 (2009): базовый JavaScript\n// ES6+ (2015+): классы, модули, стрелочные функции\n// TypeScript: статическая типизация\n// WebAssembly: производительность\n\n// Инструменты:\n// - Babel: транспиляция\n// - Webpack/Vite: сборка\n// - ESLint: линтинг\n// - Jest: тестирование\n\n// Экосистема развивается для больших проектов"
      }
    ],
    relatedTopics: ["programming-languages-high-level", "programming-languages-purpose", "programming-languages-execution", "future-programming-evolution"],
    isFrontendEssential: true
  }
];
