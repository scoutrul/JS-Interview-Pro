import { Topic } from '../../../types';

export const JS_BROWSER_API_INTERMEDIATE_TOPICS: Topic[] = [
{
    id: 'debounce-throttle',
    title: 'Debounce и Throttle',
    difficulty: 'intermediate',
    description: 'Debounce откладывает выполнение до паузы в вызовах. Throttle ограничивает частоту выполнения (максимум раз в N мс). Debounce для поиска, Throttle для скролла/ресайза. Оба оптимизируют производительность, уменьшая количество вызовов функций.',
    keyPoints: [
      'Debounce: выполнение после паузы в вызовах.',
      'Throttle: выполнение максимум раз в N миллисекунд.',
      'Debounce: поиск, валидация форм.',
      'Throttle: скролл, ресайз, события мыши.',
      'Оба уменьшают нагрузку и улучшают производительность.'
    ],
    tags: ['performance', 'optimization', 'events', 'patterns'],
    examples: [
      {
        title: "Debounce",
        code: `function debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst search = debounce((query) => {\n  console.log("Searching:", query);\n}, 300);\n\n// Вызовется только после 300мс паузы\nsearch("a");\nsearch("ab");\nsearch("abc"); // Только этот вызов`
      },
      {
        title: "Throttle",
        code: `function throttle(fn, delay) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= delay) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\nconst handleScroll = throttle(() => {\n  console.log("Scrolled");\n}, 100);\n\n// Вызовется максимум раз в 100мс`
      },
      {
        title: "Использование",
        code: `// Debounce для поиска\ninput.addEventListener('input', debounce((e) => {\n  searchAPI(e.target.value);\n}, 300));\n\n// Throttle для скролла\nwindow.addEventListener('scroll', throttle(() => {\n  updatePosition();\n}, 100));`
      }
    ],
    relatedTopics: ['callbacks', 'higher-order-functions', 'performance']
  },
{
    id: 'intersection-observer',
    title: 'Intersection Observer',
    difficulty: 'intermediate',
    description: 'Intersection Observer отслеживает видимость элементов в viewport. Создается через new IntersectionObserver(callback, options). Вызывается при пересечении порога (threshold). Используется для ленивой загрузки изображений, infinite scroll, анимаций при появлении, аналитики.',
    keyPoints: [
      'new IntersectionObserver(callback, options): создает наблюдатель.',
      'observe(element): начинает наблюдение, unobserve(element): останавливает.',
      'threshold: порог видимости (0.0 - 1.0), rootMargin: отступы.',
      'callback получает entries с isIntersecting, intersectionRatio.',
      'Использование: ленивая загрузка, infinite scroll, анимации.'
    ],
    tags: ['intersection-observer', 'viewport', 'performance', 'lazy-loading', 'browser', 'api'],
    examples: [
      {
        title: "Базовое использование",
        code: `const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      console.log('Element is visible!');\n      entry.target.classList.add('visible');\n    }\n  });\n}, {\n  threshold: 0.5 // сработает при 50% видимости\n});\n\nconst element = document.querySelector('.item');\nobserver.observe(element);`
      },
      {
        title: "Ленивая загрузка изображений",
        code: `const imageObserver = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      img.src = img.dataset.src; // загружаем реальное изображение\n      img.classList.remove('lazy');\n      imageObserver.unobserve(img);\n    }\n  });\n});\n\n// Наблюдаем все изображения с классом lazy\ndocument.querySelectorAll('img.lazy').forEach(img => {\n  imageObserver.observe(img);\n});`
      },
      {
        title: "Infinite scroll",
        code: `const sentinel = document.querySelector('#sentinel');\n\nconst observer = new IntersectionObserver((entries) => {\n  if (entries[0].isIntersecting) {\n    loadMoreItems(); // загружаем еще элементы\n  }\n}, {\n  rootMargin: '100px' // загружать за 100px до появления\n});\n\nobserver.observe(sentinel);`
      },
      {
        title: "Анимация при появлении",
        code: `const animateObserver = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.style.animation = 'fadeIn 0.5s';\n      animateObserver.unobserve(entry.target);\n    }\n  });\n}, {\n  threshold: 0.1\n});\n\ndocument.querySelectorAll('.animate-on-scroll').forEach(el => {\n  animateObserver.observe(el);\n});`
      }
    ],
    relatedTopics: ['dom-api', 'event-api', 'performance-optimization'],
    isFrontendEssential: true
  },
{
    id: 'web-workers',
    title: 'Web Workers',
    difficulty: 'intermediate',
    description: 'Web Workers выполняют код в отдельном потоке, не блокируя основной. new Worker(script) создает воркер. postMessage отправляет данные, onmessage получает. SharedWorker для нескольких вкладок. Используется для тяжелых вычислений, обработки данных, не имеет доступа к DOM.',
    keyPoints: [
      'new Worker(script): создает воркер в отдельном потоке.',
      'postMessage(data): отправка данных, onmessage: получение.',
      'Не имеет доступа к DOM, window, document.',
      'SharedWorker: общий воркер для нескольких вкладок.',
      'Использование: тяжелые вычисления, обработка данных, не блокирует UI.'
    ],
    tags: ['web-workers', 'multithreading', 'performance', 'async', 'browser', 'api'],
    examples: [
      {
        title: "Базовый воркер",
        code: `// main.js\nconst worker = new Worker('worker.js');\n\nworker.postMessage({ type: 'calculate', data: [1, 2, 3, 4, 5] });\n\nworker.onmessage = (event) => {\n  console.log('Result:', event.data);\n};\n\nworker.onerror = (error) => {\n  console.error('Worker error:', error);\n};\n\n// worker.js\nself.onmessage = (event) => {\n  const { type, data } = event.data;\n  \n  if (type === 'calculate') {\n    const result = data.reduce((sum, n) => sum + n, 0);\n    self.postMessage(result);\n  }\n};`
      },
      {
        title: "Тяжелые вычисления",
        code: `// main.js\nfunction heavyCalculation() {\n  const worker = new Worker('calculator.js');\n  \n  worker.postMessage({ numbers: Array.from({length: 1000000}, (_, i) => i) });\n  \n  worker.onmessage = (e) => {\n    console.log('Sum:', e.data);\n    worker.terminate(); // завершаем воркер\n  };\n}\n\n// calculator.js\nself.onmessage = (e) => {\n  const sum = e.data.numbers.reduce((acc, n) => acc + n, 0);\n  self.postMessage(sum);\n};`
      },
      {
        title: "Inline Worker",
        code: `// Создание воркера из строки\nconst workerCode = \`\n  self.onmessage = (e) => {\n    const result = e.data * 2;\n    self.postMessage(result);\n  };\n\`;\n\nconst blob = new Blob([workerCode], { type: 'application/javascript' });\nconst worker = new Worker(URL.createObjectURL(blob));\n\nworker.postMessage(5);\nworker.onmessage = (e) => console.log(e.data); // 10`
      }
    ],
    relatedTopics: ['async-await', 'promises', 'performance-optimization']
  },
{
    id: 'resize-observer',
    title: 'Resize Observer',
    difficulty: 'intermediate',
    description: 'Resize Observer отслеживает изменение размеров элементов. Создается через new ResizeObserver(callback). Вызывается при изменении размеров. Используется для адаптивных компонентов, виртуализации, динамических макетов. Более эффективен чем window.resize для отдельных элементов.',
    keyPoints: [
      'new ResizeObserver(callback): создает наблюдатель размеров.',
      'observe(element): начинает наблюдение, unobserve(element): останавливает.',
      'callback получает entries с contentRect (размеры элемента).',
      'Более эффективен чем window.resize для отдельных элементов.',
      'Использование: адаптивные компоненты, виртуализация, динамические макеты.'
    ],
    tags: ['resize-observer', 'layout', 'responsive', 'performance', 'browser', 'api'],
    examples: [
      {
        title: "Базовое использование",
        code: `const resizeObserver = new ResizeObserver((entries) => {\n  entries.forEach(entry => {\n    const { width, height } = entry.contentRect;\n    console.log(\`Size: \${width}x\${height}\`);\n    \n    // Обновляем компонент при изменении размера\n    updateLayout(width, height);\n  });\n});\n\nconst element = document.querySelector('.container');\nresizeObserver.observe(element);`
      },
      {
        title: "Адаптивный компонент",
        code: `const cardObserver = new ResizeObserver((entries) => {\n  entries.forEach(entry => {\n    const { width } = entry.contentRect;\n    const card = entry.target;\n    \n    if (width < 400) {\n      card.classList.add('compact');\n      card.classList.remove('wide');\n    } else {\n      card.classList.add('wide');\n      card.classList.remove('compact');\n    }\n  });\n});\n\ndocument.querySelectorAll('.card').forEach(card => {\n  cardObserver.observe(card);\n});`
      },
      {
        title: "Виртуализация списка",
        code: `const listObserver = new ResizeObserver((entries) => {\n  const { width, height } = entries[0].contentRect;\n  \n  // Пересчитываем видимые элементы при изменении размера\n  const itemHeight = 50;\n  const visibleCount = Math.ceil(height / itemHeight);\n  \n  updateVisibleItems(visibleCount);\n});\n\nconst listContainer = document.querySelector('.virtual-list');\nlistObserver.observe(listContainer);`
      }
    ],
    relatedTopics: ['dom-api', 'intersection-observer', 'performance-optimization'],
    isFrontendEssential: true
  },
{
    id: 'mutation-observer',
    title: 'Mutation Observer',
    difficulty: 'intermediate',
    description: 'Mutation Observer отслеживает изменения DOM. Создается через new MutationObserver(callback). Отслеживает добавление/удаление узлов, изменения атрибутов, текста. Используется для отладки, синхронизации, реактивности. Альтернатива устаревшим Mutation Events.',
    keyPoints: [
      'new MutationObserver(callback): создает наблюдатель изменений DOM.',
      'observe(element, options): начинает наблюдение с настройками.',
      'options: childList (дети), attributes (атрибуты), characterData (текст), subtree (все потомки).',
      'callback получает mutations с type, target, addedNodes, removedNodes.',
      'Использование: отладка, синхронизация, реактивность.'
    ],
    tags: ['mutation-observer', 'dom', 'reactivity', 'debugging', 'browser', 'api'],
    examples: [
      {
        title: "Отслеживание добавления элементов",
        code: `const observer = new MutationObserver((mutations) => {\n  mutations.forEach(mutation => {\n    if (mutation.type === 'childList') {\n      mutation.addedNodes.forEach(node => {\n        if (node.nodeType === 1) { // элемент\n          console.log('Added:', node);\n        }\n      });\n      \n      mutation.removedNodes.forEach(node => {\n        console.log('Removed:', node);\n      });\n    }\n  });\n});\n\nobserver.observe(document.body, {\n  childList: true,\n  subtree: true // наблюдать все потомки\n});`
      },
      {
        title: "Отслеживание атрибутов",
        code: `const attrObserver = new MutationObserver((mutations) => {\n  mutations.forEach(mutation => {\n    if (mutation.type === 'attributes') {\n      console.log(\`\${mutation.attributeName} changed on\`, mutation.target);\n      console.log('Old value:', mutation.oldValue);\n      console.log('New value:', mutation.target.getAttribute(mutation.attributeName));\n    }\n  });\n});\n\nconst element = document.querySelector('.item');\nattrObserver.observe(element, {\n  attributes: true,\n  attributeOldValue: true, // сохранять старое значение\n  attributeFilter: ['class', 'data-id'] // только эти атрибуты\n});`
      },
      {
        title: "Синхронизация состояния",
        code: `// Синхронизация с внешним состоянием\nconst syncObserver = new MutationObserver(() => {\n  // При изменении DOM обновляем состояние\n  updateState(getStateFromDOM());\n});\n\nsyncObserver.observe(document.querySelector('#app'), {\n  childList: true,\n  subtree: true,\n  attributes: true\n});\n\n// Остановка наблюдения\nsyncObserver.disconnect();`
      }
    ],
    relatedTopics: ['dom-api', 'event-api']
  },
{
    id: 'indexeddb',
    title: 'IndexedDB',
    difficulty: 'intermediate',
    description: 'IndexedDB — клиентская NoSQL база данных в браузере. Хранит большие объемы структурированных данных. Работает асинхронно через события или Promise API. Объектные хранилища (object stores), индексы для поиска, транзакции для атомарности. Используется для офлайн-приложений, кэширования.',
    keyPoints: [
      'indexedDB.open(name, version): открывает/создает БД.',
      'objectStore: хранилище объектов, как таблица в SQL.',
      'index: для быстрого поиска по полям.',
      'transaction: атомарные операции, режимы readwrite/readonly.',
      'Использование: офлайн-приложения, кэширование больших данных.'
    ],
    tags: ['indexeddb', 'database', 'storage', 'offline', 'browser', 'api'],
    examples: [
      {
        title: "Открытие БД и создание хранилища",
        code: `const request = indexedDB.open('myDB', 1);\n\nrequest.onupgradeneeded = (event) => {\n  const db = event.target.result;\n  \n  // Создаем хранилище\n  if (!db.objectStoreNames.contains('users')) {\n    const store = db.createObjectStore('users', { keyPath: 'id' });\n    \n    // Создаем индекс\n    store.createIndex('name', 'name', { unique: false });\n  }\n};\n\nrequest.onsuccess = (event) => {\n  const db = event.target.result;\n  console.log('DB opened:', db);\n};\n\nrequest.onerror = (event) => {\n  console.error('Error:', event.target.error);\n};`
      },
      {
        title: "Добавление и получение данных",
        code: `// Добавление\nconst transaction = db.transaction(['users'], 'readwrite');\nconst store = transaction.objectStore('users');\n\nconst user = { id: 1, name: 'Alice', age: 30 };\nconst request = store.add(user);\n\nrequest.onsuccess = () => {\n  console.log('User added');\n};\n\n// Получение\nconst getTransaction = db.transaction(['users'], 'readonly');\nconst getStore = getTransaction.objectStore('users');\nconst getRequest = getStore.get(1);\n\ngetRequest.onsuccess = () => {\n  console.log('User:', getRequest.result);\n};`
      },
      {
        title: "Поиск по индексу",
        code: `const transaction = db.transaction(['users'], 'readonly');\nconst store = transaction.objectStore('users');\nconst index = store.index('name');\n\n// Поиск по имени\nconst request = index.getAll('Alice');\n\nrequest.onsuccess = () => {\n  console.log('Users:', request.result);\n};\n\n// Или через курсор\nconst cursorRequest = index.openCursor();\ncursorRequest.onsuccess = (event) => {\n  const cursor = event.target.result;\n  if (cursor) {\n    console.log(cursor.value);\n    cursor.continue();\n  }\n};`
      },
      {
        title: "Promise обертка",
        code: `function openDB(name, version) {\n  return new Promise((resolve, reject) => {\n    const request = indexedDB.open(name, version);\n    request.onsuccess = () => resolve(request.result);\n    request.onerror = () => reject(request.error);\n    request.onupgradeneeded = (event) => {\n      const db = event.target.result;\n      // настройка БД\n    };\n  });\n}\n\n// Использование\nconst db = await openDB('myDB', 1);`
      }
    ],
    relatedTopics: ['web-storage', 'async-await', 'promises'],
    isFrontendEssential: true
  },
{
    id: 'abort-controller',
    title: 'AbortController',
    difficulty: 'intermediate',
    description: 'AbortController позволяет отменять асинхронные операции (fetch, промисы). Создается через new AbortController(), signal передается в fetch или другие API. abort() отменяет операцию. Используется для отмены запросов при размонтировании компонента, таймаутов, пользовательской отмены.',
    keyPoints: [
      'new AbortController(): создает контроллер отмены.',
      'signal: передается в fetch или другие API.',
      'abort(): отменяет операцию, вызывает AbortError.',
      'Использование: отмена fetch запросов, промисов, таймаутов.',
      'Один контроллер может отменить несколько операций.'
    ],
    tags: ['abort-controller', 'async', 'fetch', 'cancellation', 'async-deep'],
    examples: [
      {
        title: "Отмена fetch запроса",
        code: `const controller = new AbortController();\nconst signal = controller.signal;\n\nfetch('/api/data', { signal })\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => {\n    if (error.name === 'AbortError') {\n      console.log('Request aborted');\n    }\n  });\n\n// Отмена запроса\ncontroller.abort();`
      },
      {
        title: "Отмена при размонтировании компонента",
        code: `// React пример\nuseEffect(() => {\n  const controller = new AbortController();\n  \n  fetch('/api/data', { signal: controller.signal })\n    .then(res => res.json())\n    .then(setData);\n  \n  return () => {\n    controller.abort(); // отмена при размонтировании\n  };\n}, []);`
      },
      {
        title: "Отмена промиса",
        code: `function cancellablePromise(promise, signal) {\n  return new Promise((resolve, reject) => {\n    signal.addEventListener('abort', () => {\n      reject(new DOMException('Aborted', 'AbortError'));\n    });\n    \n    promise.then(resolve, reject);\n  });\n}\n\nconst controller = new AbortController();\nconst promise = new Promise(resolve => setTimeout(() => resolve('Done'), 5000));\n\ncancellablePromise(promise, controller.signal)\n  .then(console.log)\n  .catch(err => console.error(err.name)); // "AbortError"\n\ncontroller.abort();`
      },
      {
        title: "Таймаут для запроса",
        code: `function fetchWithTimeout(url, timeout = 5000) {\n  const controller = new AbortController();\n  \n  const timeoutId = setTimeout(() => {\n    controller.abort();\n  }, timeout);\n  \n  return fetch(url, { signal: controller.signal })\n    .finally(() => clearTimeout(timeoutId));\n}\n\nfetchWithTimeout('/api/data', 3000)\n  .then(res => res.json())\n  .catch(err => {\n    if (err.name === 'AbortError') {\n      console.log('Request timeout');\n    }\n  });`
      }
    ],
    relatedTopics: ['fetch-api', 'promises', 'async-await'],
  },
{
    id: 'animation-event-loop',
    title: 'Анимация и Event Loop',
    difficulty: 'intermediate',
    description: 'JavaScript работает однопоточно, но поддерживает асинхронность через Event Loop. Для анимации используются разные методы: setTimeout/setInterval (макротаски, не синхронизированы с рендером), requestAnimationFrame (синхронизирован с частотой кадров), requestIdleCallback (для фоновых задач). Event Loop обрабатывает очереди: macro-task queue (setTimeout, setInterval) и micro-task queue (Promise.then).',
    keyPoints: [
      'Event Loop: macro-task queue (setTimeout, setInterval, сетевые запросы) и micro-task queue (Promise.then/catch/finally, queueMicrotask).',
      'Цикл Event Loop: берём задачу из macro-task → выполняем полностью → выполняем все micro-tasks → рендер (если нужно) → повторяем.',
      'setTimeout/setInterval: работают через макротаски, не синхронизированы с рендером → анимация может "дёргаться".',
      'requestAnimationFrame: синхронизирован с частотой кадров дисплея (обычно 60 FPS), оптимально для плавной анимации.',
      'requestIdleCallback: вызывает функцию, когда браузер свободен, для фоновых задач, не для анимации.',
      'setTimeout/setInterval подходят для периодических задач, не для плавной анимации.'
    ],
    tags: ['animation', 'event-loop', 'requestAnimationFrame', 'setTimeout', 'setInterval', 'requestIdleCallback', 'performance', 'browser-api', 'async'],
    examples: [
      {
        title: "Event Loop и очереди",
        code: `// Macro-task queue: setTimeout, setInterval
setTimeout(() => console.log('Macro-task 1'), 0);
setTimeout(() => console.log('Macro-task 2'), 0);

// Micro-task queue: Promise.then, queueMicrotask
Promise.resolve().then(() => console.log('Micro-task 1'));
Promise.resolve().then(() => console.log('Micro-task 2'));

console.log('Sync');

// Порядок выполнения:
// 1. Sync (стек)
// 2. Micro-task 1, Micro-task 2 (все микрозадачи)
// 3. Macro-task 1, Macro-task 2 (одна макрозадача за раз)`
      },
      {
        title: "setTimeout для анимации (не рекомендуется)",
        code: `const box = document.querySelector('#box');
let x = 0;

function animate() {
  x += 2;
  box.style.transform = \`translateX(\${x}px)\`;
  if (x < 300) {
    setTimeout(animate, 16); // ~60 FPS, но не синхронизировано
  }
}

animate();

// Проблема: не синхронизировано с рендером → может быть "дёргано"`
      },
      {
        title: "requestAnimationFrame для плавной анимации",
        code: `const box = document.querySelector('#box');
let x = 0;

function animate() {
  x += 2;
  box.style.transform = \`translateX(\${x}px)\`;
  if (x < 300) {
    requestAnimationFrame(animate); // следующий кадр
  }
}

requestAnimationFrame(animate);

// Плавная анимация благодаря синхронизации с рендером
// Браузер может оптимизировать вызовы, снижать FPS, если вкладка не активна`
      },
      {
        title: "requestIdleCallback для фоновых задач",
        code: `// Выполняется, когда браузер свободен
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0) {
    // Выполняем фоновую задачу
    processBackgroundData();
  }
}, { timeout: 2000 }); // максимум через 2 секунды

// Не подходит для анимации - момент выполнения не гарантирован`
      },
      {
        title: "Сравнение методов",
        code: `// setTimeout - макротаска, не синхронизировано
setTimeout(() => updateAnimation(), 16); // может быть "дёргано"

// setInterval - макротаска, регулярно
setInterval(() => updateAnimation(), 16); // тоже не синхронизировано

// requestAnimationFrame - синхронизировано с рендером
requestAnimationFrame(() => updateAnimation()); // плавно, оптимально

// requestIdleCallback - когда браузер свободен
requestIdleCallback(() => processData()); // для фоновых задач, не для анимации`
      }
    ],
    relatedTopics: ['event-loop', 'performance-optimization', 'debounce-throttle'],
    funFact: 'requestAnimationFrame синхронизирован с частотой обновления дисплея (обычно 60 FPS), что делает его идеальным для анимации. Браузер может автоматически снижать частоту кадров, если вкладка неактивна, экономя ресурсы.',
    isFrontendEssential: true
  },
{
    id: 'events-advanced',
    title: 'События в JavaScript (расширенно)',
    difficulty: 'intermediate',
    description: 'Событие (event) — сигнал о том, что что-то произошло: клик мыши, ввод текста, загрузка страницы. События в DOM проходят три фазы: Capture (захват/погружение сверху вниз), Target (достижение элемента), Bubbling (всплытие обратно вверх). Делегирование событий — навешивание обработчика на родительский элемент, экономит ресурсы и работает с динамически добавляемыми элементами. Некоторые события не всплывают (focus/blur, mouseenter/mouseleave).',
    keyPoints: [
      'Элемент, на котором навешано событие — цель события (target). Текущая цель (currentTarget) — элемент, на котором именно сейчас выполняется обработчик.',
      'Фазы событий: Capture (захват/погружение сверху вниз) → Target (цель) → Bubbling (всплытие обратно вверх).',
      'Параметр true в addEventListener включает фазу захвата. По умолчанию большинство событий всплывают.',
      'Делегирование событий: навешивание обработчика на родительский элемент, экономит ресурсы и работает с динамически добавляемыми элементами.',
      'event.target — реальный элемент, на котором произошло событие. event.currentTarget — элемент, на котором висит обработчик.',
      'Некоторые события не всплывают: focus/blur, mouseenter/mouseleave. Использовать focusin/focusout вместо focus/blur для делегирования.',
      'Остановить всплытие: event.stopPropagation().'
    ],
    tags: ['events', 'dom', 'bubbling', 'capture', 'event-delegation', 'target', 'currentTarget', 'browser-api', 'performance'],
    examples: [
      {
        title: "Фазы событий",
        code: `// HTML: <div id="parent"><button id="child">Click</button></div>

// Capture фаза (сверху вниз) - третий параметр true
document.getElementById('parent').addEventListener('click', () => {
  console.log('1. Capture: parent');
}, true);

// Target фаза
document.getElementById('child').addEventListener('click', () => {
  console.log('2. Target: child');
});

// Bubbling фаза (снизу вверх) - по умолчанию
document.getElementById('parent').addEventListener('click', () => {
  console.log('3. Bubbling: parent');
});

// При клике на button выведет:
// 1. Capture: parent
// 2. Target: child
// 3. Bubbling: parent`
      },
      {
        title: "target vs currentTarget",
        code: `const list = document.querySelector('#list');

list.addEventListener('click', (event) => {
  console.log('event.target:', event.target); 
  // Реальный элемент, на который кликнули (например, <li>)
  
  console.log('event.currentTarget:', event.currentTarget); 
  // Элемент, на котором висит обработчик (list)
  
  // При клике на <li> внутри list:
  // event.target = <li>
  // event.currentTarget = <ul id="list">`
      },
      {
        title: "Делегирование событий",
        code: `const list = document.querySelector('#list');

// Навешиваем обработчик на родителя, а не на каждый элемент
list.addEventListener('click', (event) => {
  // Проверяем, что кликнули по элементу списка
  if (event.target.tagName === 'LI') {
    console.log('Clicked item:', event.target.textContent);
    event.target.classList.toggle('selected');
  }
});

// Работает для динамически добавляемых элементов!
// Экономит память и CPU при большом количестве элементов`
      },
      {
        title: "События, которые не всплывают",
        code: `// focus и blur НЕ всплывают
const form = document.querySelector('form');

// Это НЕ сработает при фокусе на input внутри form
form.addEventListener('focus', () => {
  console.log('Focus'); // не сработает
});

// Решение: использовать focusin и focusout (они всплывают)
form.addEventListener('focusin', (event) => {
  console.log('Focus on:', event.target); // сработает
});

// mouseenter и mouseleave тоже не всплывают
// Использовать mouseover и mouseout (они всплывают)`
      },
      {
        title: "Остановка всплытия",
        code: `const child = document.querySelector('#child');
const parent = document.querySelector('#parent');

child.addEventListener('click', (event) => {
  console.log('Child clicked');
  event.stopPropagation(); // останавливает всплытие
  // Обработчик на parent не сработает
});

parent.addEventListener('click', () => {
  console.log('Parent clicked'); // не выполнится
});`
      },
      {
        title: "Делегирование с focusin/focusout",
        code: `// Для событий, которые не всплывают, используем альтернативы
const form = document.querySelector('form');

// focusin всплывает, в отличие от focus
form.addEventListener('focusin', (event) => {
  if (event.target.tagName === 'INPUT') {
    event.target.classList.add('focused');
  }
});

form.addEventListener('focusout', (event) => {
  if (event.target.tagName === 'INPUT') {
    event.target.classList.remove('focused');
  }
});

// Или навесить обработчики на каждый элемент напрямую
form.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', () => {
    input.classList.add('focused');
  });
});`
      }
    ],
    relatedTopics: ['event-api', 'dom-api', 'performance-optimization'],
    funFact: 'Делегирование событий экономит память и CPU при большом количестве элементов. Вместо создания обработчика для каждого элемента, создается один обработчик на родителе, который проверяет event.target. Это особенно полезно для динамически добавляемых элементов.',
    isFrontendEssential: true
  },
  {
    id: 'canvas-api',
    title: 'Canvas API',
    difficulty: 'intermediate',
    description: 'Canvas API позволяет рисовать графику через JavaScript. Получаем контекст через getContext("2d") или getContext("webgl"). 2D контекст: прямоугольники (fillRect, strokeRect), пути (beginPath, moveTo, lineTo, arc), текст (fillText, strokeText), изображения (drawImage). Состояние: fillStyle, strokeStyle, lineWidth, font. Используется для графиков, анимаций, игр, обработки изображений.',
    keyPoints: [
      'canvas.getContext("2d"): получение 2D контекста для рисования.',
      'fillRect(x, y, width, height): закрашенный прямоугольник, strokeRect: контур.',
      'beginPath(), moveTo(x, y), lineTo(x, y), arc(x, y, radius, start, end): создание путей.',
      'fill() и stroke(): заливка и обводка пути.',
      'fillStyle, strokeStyle: цвета, lineWidth: толщина линии, font: шрифт для текста.',
      'drawImage(image, x, y): рисование изображений.',
      'toDataURL(): экспорт canvas в base64, toBlob(): в Blob.'
    ],
    tags: ['canvas', 'graphics', '2d', 'drawing', 'animation', 'browser', 'api'],
    examples: [
      {
        title: "Базовое рисование",
        code: `const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Прямоугольники
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 50); // x, y, width, height

ctx.strokeStyle = 'blue';
ctx.lineWidth = 2;
ctx.strokeRect(120, 10, 100, 50);

// Очистка
ctx.clearRect(50, 20, 30, 20); // вырезает прямоугольник

// Круги
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI * 2); // x, y, radius, start, end
ctx.fillStyle = 'green';
ctx.fill();

// Линии
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(100, 100);
ctx.lineTo(200, 50);
ctx.strokeStyle = 'purple';
ctx.lineWidth = 3;
ctx.stroke();`
      },
      {
        title: "Пути и формы",
        code: `const ctx = canvas.getContext('2d');

// Сложный путь
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 150);
ctx.closePath(); // замыкает путь
ctx.fillStyle = 'orange';
ctx.fill();

// Кривые Безье
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.quadraticCurveTo(100, 100, 150, 200); // квадратичная
ctx.bezierCurveTo(200, 150, 250, 250, 300, 200); // кубическая
ctx.stroke();

// Дуги
ctx.beginPath();
ctx.arc(400, 200, 50, 0, Math.PI / 2); // четверть круга
ctx.stroke();`
      },
      {
        title: "Текст и изображения",
        code: `const ctx = canvas.getContext('2d');

// Текст
ctx.font = '30px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Hello Canvas', 10, 50);

ctx.strokeStyle = 'blue';
ctx.strokeText('Outlined Text', 10, 100);

// Изображение
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0); // x, y
  ctx.drawImage(img, 0, 0, 100, 100); // x, y, width, height
  ctx.drawImage(img, 50, 50, 200, 200, 0, 0, 100, 100); // source, dest
};
img.src = 'image.png';`
      },
      {
        title: "Стили и состояния",
        code: `const ctx = canvas.getContext('2d');

// Сохранение и восстановление состояния
ctx.save(); // сохраняет текущее состояние

ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 50, 50);

ctx.translate(100, 100); // смещение координат
ctx.rotate(Math.PI / 4); // поворот
ctx.scale(2, 2); // масштаб

ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 50, 50);

ctx.restore(); // восстанавливает сохраненное состояние

// Градиенты
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 100);

// Тени
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.fillRect(250, 10, 100, 100);`
      },
      {
        title: "Анимация",
        code: `const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let x = 0;

function animate() {
  // Очистка
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Рисование
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(x, canvas.height / 2, 20, 0, Math.PI * 2);
  ctx.fill();
  
  // Обновление позиции
  x += 2;
  if (x > canvas.width) {
    x = 0;
  }
  
  // Следующий кадр
  requestAnimationFrame(animate);
}

animate();`
      },
      {
        title: "Экспорт canvas",
        code: `const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Рисуем что-то
ctx.fillRect(0, 0, 100, 100);

// Экспорт в base64
const dataURL = canvas.toDataURL('image/png');
console.log(dataURL); // "data:image/png;base64,..."

// Использование в img
const img = document.createElement('img');
img.src = dataURL;
document.body.appendChild(img);

// Экспорт в Blob
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'canvas.png';
  a.click();
}, 'image/png');`
      }
    ],
    relatedTopics: ['dom-api', 'animation-event-loop', 'requestAnimationFrame'],
    isFrontendEssential: true
  },
  {
    id: 'svg-api',
    title: 'SVG API',
    difficulty: 'intermediate',
    description: 'SVG API позволяет работать с SVG элементами через JavaScript. SVG — векторная графика, масштабируется без потери качества. Создание элементов через createElementNS, установка атрибутов через setAttribute. Анимация через SMIL или JavaScript. Используется для иконок, графиков, интерактивной графики.',
    keyPoints: [
      'SVG — векторная графика, масштабируется без потери качества.',
      'createElementNS("http://www.w3.org/2000/svg", "circle"): создание SVG элементов.',
      'setAttribute(name, value): установка атрибутов (cx, cy, r для круга, x, y, width, height для rect).',
      'SVG элементы можно стилизовать через CSS или атрибуты.',
      'Анимация: SMIL (animate, animateTransform) или JavaScript.',
      'Использование: иконки, графики, интерактивная графика.'
    ],
    tags: ['svg', 'vector-graphics', 'graphics', 'dom', 'animation', 'browser', 'api'],
    examples: [
      {
        title: "Создание SVG элементов",
        code: `// Создание SVG контейнера
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '200');
svg.setAttribute('height', '200');
svg.setAttribute('viewBox', '0 0 200 200');

// Круг
const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '100');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '50');
circle.setAttribute('fill', 'red');
svg.appendChild(circle);

// Прямоугольник
const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute('x', '10');
rect.setAttribute('y', '10');
rect.setAttribute('width', '80');
rect.setAttribute('height', '80');
rect.setAttribute('fill', 'blue');
svg.appendChild(rect);

// Добавление в DOM
document.body.appendChild(svg);`
      },
      {
        title: "SVG в HTML",
        code: `<!-- SVG можно встраивать прямо в HTML -->
<svg width="200" height="200" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="50" fill="red" />
  <rect x="10" y="10" width="80" height="80" fill="blue" />
  <path d="M 10 150 L 100 50 L 190 150" stroke="green" stroke-width="2" fill="none" />
</svg>

<!-- Или через JavaScript -->
const svg = document.querySelector('svg');
const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '100');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '30');
circle.setAttribute('fill', 'yellow');
svg.appendChild(circle);`
      },
      {
        title: "Стилизация SVG",
        code: `const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '100');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '50');

// Через атрибуты
circle.setAttribute('fill', 'red');
circle.setAttribute('stroke', 'blue');
circle.setAttribute('stroke-width', '3');

// Через CSS класс
circle.setAttribute('class', 'my-circle');
// CSS: .my-circle { fill: red; stroke: blue; }

// Через style
circle.setAttribute('style', 'fill: red; stroke: blue;');

// Через JavaScript свойства
circle.style.fill = 'red';
circle.style.stroke = 'blue';`
      },
      {
        title: "Анимация SVG",
        code: `// SMIL анимация (встроенная)
<svg width="200" height="200">
  <circle cx="100" cy="100" r="30" fill="red">
    <animate attributeName="r" from="30" to="50" dur="1s" repeatCount="indefinite" />
    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="2s" repeatCount="indefinite" />
  </circle>
</svg>

// JavaScript анимация
const circle = document.querySelector('circle');
let scale = 1;
let direction = 1;

function animate() {
  scale += 0.02 * direction;
  if (scale > 1.5 || scale < 0.5) {
    direction *= -1;
  }
  circle.setAttribute('r', 30 * scale);
  requestAnimationFrame(animate);
}
animate();`
      },
      {
        title: "Интерактивность",
        code: `const svg = document.querySelector('svg');
const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '100');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '50');
circle.setAttribute('fill', 'red');
svg.appendChild(circle);

// События
circle.addEventListener('click', () => {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  circle.setAttribute('fill', randomColor);
});

circle.addEventListener('mouseenter', () => {
  circle.setAttribute('r', '60');
});

circle.addEventListener('mouseleave', () => {
  circle.setAttribute('r', '50');
});`
      },
      {
        title: "Сложные формы",
        code: `const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '200');
svg.setAttribute('height', '200');

// Path (путь) - самый гибкий элемент
const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d', 'M 10 10 L 100 10 L 100 100 L 10 100 Z'); // прямоугольник
path.setAttribute('fill', 'blue');
svg.appendChild(path);

// Полигон
const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
polygon.setAttribute('points', '100,10 150,90 50,90'); // треугольник
polygon.setAttribute('fill', 'green');
svg.appendChild(polygon);

// Полилиния
const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
polyline.setAttribute('points', '10,10 50,50 90,10 130,50 170,10');
polyline.setAttribute('fill', 'none');
polyline.setAttribute('stroke', 'red');
polyline.setAttribute('stroke-width', '2');
svg.appendChild(polyline);

document.body.appendChild(svg);`
      }
    ],
    relatedTopics: ['dom-api', 'canvas-api', 'animation-event-loop'],
    isFrontendEssential: true
  }
];
