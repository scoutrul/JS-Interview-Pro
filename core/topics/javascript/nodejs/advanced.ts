import { Topic } from '../../../types';

export const JS_NODEJS_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'nodejs-processes',
    title: 'Процессы и потоки',
    difficulty: 'advanced',
    description: 'Node.js однопоточный, но может создавать дочерние процессы и потоки. child_process: spawn, exec, execFile, fork для запуска внешних команд и процессов. worker_threads: создание потоков для CPU-интенсивных задач, разделение памяти через SharedArrayBuffer. Кластер (cluster): создание нескольких процессов для использования всех ядер CPU.',
    keyPoints: [
      'child_process.spawn(): запуск команды с потоковым выводом, не блокирует.',
      'child_process.exec(): запуск команды, возвращает весь вывод, может быть блокирующим.',
      'child_process.fork(): создание дочернего Node.js процесса, обмен через IPC.',
      'worker_threads: создание потоков для CPU-задач, разделение памяти через SharedArrayBuffer.',
      'cluster: создание нескольких процессов Node.js для использования всех ядер.',
      'IPC (Inter-Process Communication): обмен данными между процессами через сообщения.',
      'Использование: параллельная обработка, запуск внешних команд, использование всех ядер CPU.'
    ],
    tags: ['nodejs', 'processes', 'threads', 'child_process', 'worker_threads', 'cluster', 'parallelism'],
    examples: [
      {
        title: "child_process.spawn",
        code: `const { spawn } = require('child_process');

// Запуск команды
const ls = spawn('ls', ['-la']);

// Потоковый вывод
ls.stdout.on('data', (data) => {
  console.log(\`stdout: \${data}\`);
});

ls.stderr.on('data', (data) => {
  console.error(\`stderr: \${data}\`);
});

ls.on('close', (code) => {
  console.log(\`Process exited with code \${code}\`);
});

// С опциями
const child = spawn('node', ['script.js'], {
  cwd: '/path/to/dir',
  env: { NODE_ENV: 'production' },
  stdio: 'inherit' // наследовать stdio от родителя
});`
      },
      {
        title: "child_process.exec",
        code: `const { exec } = require('child_process');

// Выполнение команды
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(\`Error: \${error.message}\`);
    return;
  }
  if (stderr) {
    console.error(\`stderr: \${stderr}\`);
    return;
  }
  console.log(\`stdout: \${stdout}\`);
});

// С опциями
exec('ls -la', {
  cwd: '/path/to/dir',
  maxBuffer: 1024 * 1024 // максимальный размер буфера
}, (error, stdout, stderr) => {
  // обработка
});

// ⚠️ exec может быть опасен при использовании пользовательского ввода
// Используйте execFile для безопасности`
      },
      {
        title: "child_process.fork",
        code: `// parent.js
const { fork } = require('child_process');

// Создание дочернего процесса
const child = fork('child.js');

// Отправка сообщения
child.send({ message: 'Hello from parent' });

// Получение сообщения
child.on('message', (msg) => {
  console.log('From child:', msg);
});

child.on('exit', (code) => {
  console.log(\`Child exited with code \${code}\`);
});

// child.js
// Получение сообщения
process.on('message', (msg) => {
  console.log('From parent:', msg);
  
  // Отправка ответа
  process.send({ message: 'Hello from child' });
  
  // Завершение
  process.exit(0);
});`
      },
      {
        title: "worker_threads",
        code: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // Главный поток
  const worker = new Worker(__filename, {
    workerData: { start: 0, end: 1000000 }
  });
  
  worker.on('message', (result) => {
    console.log('Result:', result);
  });
  
  worker.on('error', (err) => {
    console.error('Worker error:', err);
  });
  
  worker.on('exit', (code) => {
    console.log(\`Worker exited with code \${code}\`);
  });
} else {
  // Воркер поток
  const { start, end } = workerData;
  
  // CPU-интенсивная задача
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += i;
  }
  
  // Отправка результата
  parentPort.postMessage({ sum });
}`

      },
      {
        title: "SharedArrayBuffer в worker_threads",
        code: `const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Создание разделяемой памяти
  const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 10);
  const sharedArray = new Int32Array(sharedBuffer);
  
  const worker = new Worker(__filename);
  
  worker.postMessage({ sharedBuffer });
  
  setTimeout(() => {
    console.log('Shared array:', sharedArray);
    // Воркер изменил значения
  }, 1000);
} else {
  parentPort.on('message', ({ sharedBuffer }) => {
    const sharedArray = new Int32Array(sharedBuffer);
    
    // Изменение разделяемой памяти
    for (let i = 0; i < sharedArray.length; i++) {
      Atomics.add(sharedArray, i, i);
    }
  });
}`
      },
      {
        title: "Cluster для использования всех ядер",
        code: `const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);
  
  // Создание воркеров для каждого ядра
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    // Перезапуск воркера
    cluster.fork();
  });
} else {
  // Воркер процесс
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(\`Hello from worker \${process.pid}\`);
  }).listen(3000);
  
  console.log(\`Worker \${process.pid} started\`);
}`
      }
    ],
    relatedTopics: ['nodejs-introduction', 'web-workers', 'performance-optimization'],
    isFrontendEssential: false
  },
  {
    id: 'nodejs-event-loop',
    title: 'Event Loop в Node.js',
    difficulty: 'advanced',
    description: 'Event Loop в Node.js управляется libuv и имеет 6 фаз: timers (setTimeout, setInterval), pending callbacks (отложенные I/O колбэки), idle/prepare (внутренние), poll (I/O операции), check (setImmediate), close callbacks (закрытие соединений). process.nextTick и Promise.then имеют приоритет выше всех фаз. Понимание фаз важно для оптимизации и отладки.',
    keyPoints: [
      'Фазы Event Loop: timers → pending callbacks → idle/prepare → poll → check → close callbacks.',
      'timers: выполнение колбэков setTimeout и setInterval.',
      'poll: получение новых I/O событий, выполнение колбэков I/O операций.',
      'check: выполнение setImmediate колбэков.',
      'process.nextTick: выполняется перед следующей фазой (высший приоритет).',
      'Promise.then: выполняется после текущей фазы, но перед следующей (микрозадачи).',
      'setImmediate vs setTimeout(0): setImmediate выполняется в фазе check, setTimeout в timers.',
      'Блокирующие операции останавливают Event Loop, нужно использовать асинхронные методы.'
    ],
    tags: ['nodejs', 'event-loop', 'libuv', 'async', 'performance', 'timers', 'nextTick', 'setImmediate'],
    examples: [
      {
        title: "Фазы Event Loop",
        code: `// Порядок выполнения фаз Event Loop:

// 1. Timers: setTimeout, setInterval
setTimeout(() => console.log('timer'), 0);

// 2. Pending callbacks: отложенные I/O колбэки
// (выполняются системой)

// 3. Idle/Prepare: внутренние операции
// (выполняются системой)

// 4. Poll: получение новых I/O событий
fs.readFile('file.txt', () => {
  console.log('I/O callback');
});

// 5. Check: setImmediate
setImmediate(() => console.log('immediate'));

// 6. Close callbacks: закрытие соединений
server.on('close', () => {
  console.log('close');
});

// После всех фаз цикл повторяется`
      },
      {
        title: "process.nextTick",
        code: `// process.nextTick имеет высший приоритет
// Выполняется перед следующей фазой Event Loop

console.log('Start');

setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

process.nextTick(() => {
  console.log('nextTick 1');
});

process.nextTick(() => {
  console.log('nextTick 2');
});

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('End');

// Порядок вывода:
// Start
// End
// nextTick 1
// nextTick 2
// promise
// timeout
// immediate`
      },
      {
        title: "setImmediate vs setTimeout",
        code: `// setImmediate выполняется в фазе check
// setTimeout выполняется в фазе timers

setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

// Порядок может быть разным в зависимости от контекста
// Но в I/O цикле setImmediate всегда выполнится первым

fs.readFile('file.txt', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  // immediate всегда первым в I/O цикле
});

// Вне I/O цикла порядок не гарантирован`
      },
      {
        title: "Микрозадачи (Promise.then)",
        code: `// Promise.then выполняется после текущей фазы
// но перед следующей фазой Event Loop

console.log('Start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => {
  console.log('promise 1');
});

Promise.resolve().then(() => {
  console.log('promise 2');
});

console.log('End');

// Порядок:
// Start
// End
// promise 1
// promise 2
// timeout

// Все микрозадачи выполняются до следующей фазы`
      },
      {
        title: "Блокирующие операции",
        code: `// ❌ Плохо: блокирующая операция
function blockingOperation() {
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // блокирует Event Loop на 5 секунд
  }
}

// Все остальные операции ждут
setTimeout(() => console.log('timeout'), 0);
blockingOperation(); // блокирует на 5 секунд
console.log('After blocking');

// ✅ Хорошо: асинхронная операция
function asyncOperation() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Done');
    }, 5000);
  });
}

// Event Loop не блокируется
setTimeout(() => console.log('timeout'), 0);
asyncOperation().then(() => console.log('async done'));
console.log('After async'); // выполнится сразу`
      },
      {
        title: "Практический пример",
        code: `// Понимание порядка выполнения

console.log('1. Sync');

setTimeout(() => console.log('2. Timeout'), 0);

Promise.resolve().then(() => {
  console.log('3. Promise');
  setTimeout(() => console.log('4. Timeout in Promise'), 0);
});

process.nextTick(() => {
  console.log('5. NextTick');
  Promise.resolve().then(() => {
    console.log('6. Promise in NextTick');
  });
});

setImmediate(() => {
  console.log('7. Immediate');
});

console.log('8. Sync end');

// Порядок:
// 1. Sync
// 8. Sync end
// 5. NextTick (высший приоритет)
// 3. Promise (микрозадачи)
// 6. Promise in NextTick
// 2. Timeout (фаза timers)
// 7. Immediate (фаза check)
// 4. Timeout in Promise (следующий цикл)`
      }
    ],
    relatedTopics: ['nodejs-introduction', 'event-loop', 'async-await', 'performance-optimization'],
    funFact: 'process.nextTick был добавлен в Node.js раньше, чем Promise, и имеет более высокий приоритет. Это может привести к неожиданному поведению, если злоупотреблять process.nextTick, так как он может "голодать" Event Loop, не давая другим фазам выполняться.',
    isFrontendEssential: false
  },
  {
    id: 'nodejs-system-access',
    title: 'Системный доступ',
    difficulty: 'advanced',
    description: 'Node.js предоставляет доступ к системным ресурсам через process. process.env — переменные окружения, process.argv — аргументы командной строки, process.cwd() — текущая директория. process.memoryUsage() — использование памяти, process.cpuUsage() — использование CPU. process.platform, process.arch — информация о платформе. Можно устанавливать переменные окружения, менять рабочую директорию, получать информацию о системе.',
    keyPoints: [
      'process.env: переменные окружения, доступны как объект, можно читать и устанавливать.',
      'process.argv: аргументы командной строки, массив [node, script, ...args].',
      'process.cwd(): текущая рабочая директория, process.chdir(path): изменение директории.',
      'process.memoryUsage(): использование памяти (heapUsed, heapTotal, rss, external).',
      'process.cpuUsage(): использование CPU (user, system) в микросекундах.',
      'process.platform: платформа (win32, darwin, linux), process.arch: архитектура (x64, arm64).',
      'process.uptime(): время работы процесса в секундах, process.pid: ID процесса.',
      'process.exit(code): завершение процесса, process.kill(pid, signal): отправка сигнала.'
    ],
    tags: ['nodejs', 'process', 'system', 'environment', 'memory', 'cpu', 'platform'],
    examples: [
      {
        title: "Переменные окружения",
        code: `// Чтение переменных окружения
console.log(process.env.NODE_ENV); // development, production
console.log(process.env.PATH);
console.log(process.env.HOME); // Unix
console.log(process.env.USERPROFILE); // Windows

// Установка переменных окружения
process.env.MY_VAR = 'value';
console.log(process.env.MY_VAR); // 'value'

// Использование в коде
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

// Загрузка из .env файла (требует библиотеку dotenv)
// require('dotenv').config();
// console.log(process.env.SECRET_KEY);`

      },
      {
        title: "Аргументы командной строки",
        code: `// process.argv: [node, script, ...args]

// Запуск: node app.js arg1 arg2 --flag value

console.log(process.argv);
// [
//   '/path/to/node',
//   '/path/to/app.js',
//   'arg1',
//   'arg2',
//   '--flag',
//   'value'
// ]

// Парсинг аргументов
const args = process.argv.slice(2); // убираем node и script
console.log(args); // ['arg1', 'arg2', '--flag', 'value']

// Простой парсер
const flags = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    flags[args[i].slice(2)] = args[i + 1] || true;
  }
}
console.log(flags); // { flag: 'value' }

// Или использовать библиотеку: commander, yargs`
      },
      {
        title: "Рабочая директория",
        code: `// Текущая рабочая директория
console.log(process.cwd()); // /path/to/project

// Изменение рабочей директории
process.chdir('/path/to/new/dir');
console.log(process.cwd()); // /path/to/new/dir

// Использование
const fs = require('fs');
const originalCwd = process.cwd();

try {
  process.chdir('/path/to/data');
  const files = fs.readdirSync('.');
  console.log('Files:', files);
} finally {
  process.chdir(originalCwd); // возврат
}`
      },
      {
        title: "Использование памяти",
        code: `// Информация об использовании памяти
const usage = process.memoryUsage();

console.log(usage);
// {
//   rss: 12345678,        // Resident Set Size (общая память)
//   heapTotal: 1234567,   // выделенная heap память
//   heapUsed: 123456,     // используемая heap память
//   external: 12345,      // память C++ объектов
//   arrayBuffers: 1234    // память ArrayBuffer
// }

// Мониторинг памяти
setInterval(() => {
  const usage = process.memoryUsage();
  console.log(\`Heap used: \${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB\`);
  console.log(\`RSS: \${(usage.rss / 1024 / 1024).toFixed(2)} MB\`);
}, 1000);

// Принудительная сборка мусора (только с флагом --expose-gc)
if (global.gc) {
  global.gc();
}`
      },
      {
        title: "Использование CPU",
        code: `// Использование CPU
const startUsage = process.cpuUsage();

// Выполнение задачи
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

const endUsage = process.cpuUsage(startUsage);

console.log(endUsage);
// {
//   user: 12345,    // пользовательское время (микросекунды)
//   system: 1234    // системное время (микросекунды)
// }

// Текущее использование (с начала процесса)
const currentUsage = process.cpuUsage();
console.log(\`User: \${currentUsage.user / 1000}ms\`);
console.log(\`System: \${currentUsage.system / 1000}ms\`);`
      },
      {
        title: "Информация о платформе",
        code: `// Платформа
console.log(process.platform); // 'win32', 'darwin', 'linux'

// Архитектура
console.log(process.arch); // 'x64', 'arm64', 'ia32'

// Версия Node.js
console.log(process.version); // 'v18.0.0'
console.log(process.versions); // { node: '18.0.0', v8: '...', ... }

// ID процесса
console.log(process.pid); // 12345

// ID родительского процесса
console.log(process.ppid); // 12340

// Время работы процесса
console.log(process.uptime()); // секунды с запуска

// Использование для кроссплатформенности
if (process.platform === 'win32') {
  // Windows специфичный код
} else if (process.platform === 'darwin') {
  // macOS специфичный код
} else {
  // Linux/Unix специфичный код
}`
      },
      {
        title: "Завершение процесса",
        code: `// Завершение процесса
process.exit(0); // успешное завершение
process.exit(1); // ошибка

// С кодом выхода
process.exitCode = 1; // установить код выхода
// процесс завершится с кодом 1 при естественном завершении

// Отправка сигнала другому процессу
process.kill(process.pid, 'SIGTERM'); // мягкое завершение
process.kill(process.pid, 'SIGKILL'); // принудительное завершение

// Обработка сигналов
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  // очистка ресурсов
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT (Ctrl+C)');
  process.exit(0);
});

// Необработанные исключения
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

// Необработанные промисы
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});`
      }
    ],
    relatedTopics: ['nodejs-introduction', 'nodejs-globals', 'performance-optimization'],
    isFrontendEssential: false
  }
];
