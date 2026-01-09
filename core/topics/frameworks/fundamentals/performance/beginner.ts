import { Topic } from '../../../../types';

export const PERFORMANCE_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'frameworks-performance-overhead',
    title: 'Overhead фреймворков',
    difficulty: 'beginner',
    description: 'Фреймворки добавляют overhead (накладные расходы) на производительность. Virtual DOM требует сравнения деревьев, реактивность требует отслеживания зависимостей, компонентная модель требует создания и управления компонентами. Это добавляет время выполнения и использование памяти.\n\nOverhead возникает из-за абстракций: фреймворк скрывает сложность, но добавляет свои слои. Virtual DOM добавляет overhead на сравнение, но упрощает обновление DOM. Реактивность добавляет overhead на отслеживание, но упрощает синхронизацию данных и UI.\n\nПонимание overhead критично для оптимизации: нужно знать где фреймворк добавляет overhead, чтобы минимизировать его. Инструменты (React DevTools, Vue Devtools) помогают обнаруживать overhead: показывают время рендеринга, количество ререндеров, использование памяти.\n\nВ 2026 overhead фреймворков снижается через компиляцию: React Forget, Svelte компилируют код в более эффективный, снижая runtime overhead. Но понимание overhead остаётся важным для оптимизации производительности.',
    keyPoints: [
      'Overhead: накладные расходы фреймворков на производительность',
      'Virtual DOM: overhead на сравнение деревьев',
      'Реактивность: overhead на отслеживание зависимостей',
      'Компонентная модель: overhead на создание и управление компонентами',
      'Инструменты помогают обнаруживать overhead',
      'Компиляция снижает overhead в 2026'
    ],
    funFact: 'Overhead фреймворков стал особенно заметным с ростом сложности приложений. В 2010-х годах это привело к созданию альтернативных подходов: Svelte компилирует компоненты в нативный JavaScript, снижая runtime overhead до минимума.',
    tags: ['frameworks', 'performance', 'overhead', 'optimization', 'basics', 'fundamentals'],
    examples: [
      {
        title: 'Overhead Virtual DOM',
        code: `// Virtual DOM: overhead на сравнение
function Component({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// При каждом обновлении:
// 1. Создаётся новый Virtual DOM (overhead)
// 2. Сравнивается со старым (overhead)
// 3. Вычисляются изменения (overhead)
// 4. Применяются к реальному DOM

// Overhead: даже если ничего не изменилось
// Происходит сравнение всего дерева

// Преимущество: не нужно думать о том, что обновлять
// Недостаток: overhead на сравнение`
      },
      {
        title: 'Overhead реактивности',
        code: `// Реактивность: overhead на отслеживание
const state = reactive({
  count: 0,
  name: 'Иван'
});

// При каждом доступе к свойству:
// 1. Proxy перехватывает доступ (overhead)
// 2. Запоминает зависимость (overhead)
// 3. Создаёт подписку (overhead)

effect(() => {
  console.log(state.count); // Overhead на отслеживание
});

// Overhead: каждый доступ к свойству
// Требует перехвата и отслеживания

// Преимущество: автоматическая синхронизация
// Недостаток: overhead на отслеживание`
      },
      {
        title: 'Обнаружение overhead',
        code: `// React DevTools: обнаружение overhead
// Profiler показывает:
// - Время рендеринга каждого компонента
// - Количество ререндеров
// - Причины ререндеров

// Пример:
function Component() {
  const [count, setCount] = useState(0);
  
  // Profiler покажет:
  // - Время рендеринга: 5ms
  // - Ререндеры: 10 раз
  // - Причина: изменение count
  
  return <div>{count}</div>;
}

// Преимущество: видно где overhead
// Можно оптимизировать проблемные места`
      }
    ],
    relatedTopics: ['frameworks-performance-excessive-rerenders', 'frameworks-performance-devtools'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-performance-excessive-rerenders',
    title: 'Избыточные ререндеры',
    difficulty: 'beginner',
    description: 'Избыточные ререндеры — это перерисовка компонентов, когда они не должны перерисовываться. Компонент перерисовывается при изменении props или state, но иногда перерисовывается даже когда props и state не изменились. Это создаёт overhead: лишние вычисления, лишние обновления DOM.\n\nПричины избыточных ререндеров: создание новых объектов/функций в render (новый объект каждый раз → компонент думает что props изменились), передача нестабильных ссылок (новая функция каждый раз → компонент перерисовывается), отсутствие мемоизации (дорогие вычисления выполняются каждый раз).\n\nОбнаружение избыточных ререндеров: React DevTools Profiler показывает ререндеры и их причины, console.log в render помогает увидеть частоту ререндеров, React.memo предотвращает ререндеры при неизменных props. Понимание избыточных ререндеров критично для оптимизации производительности.\n\nВ 2026 инструменты улучшились: React DevTools показывает причины ререндеров, ESLint правила предупреждают о проблемах. Но понимание принципов остаётся важным для предотвращения избыточных ререндеров.',
    keyPoints: [
      'Избыточные ререндеры: перерисовка когда не должна',
      'Причины: новые объекты/функции в render, нестабильные ссылки, отсутствие мемоизации',
      'Создаёт overhead: лишние вычисления, лишние обновления DOM',
      'Обнаружение: React DevTools Profiler, console.log, React.memo',
      'Инструменты улучшились в 2026',
      'Понимание принципов критично для оптимизации'
    ],
    funFact: 'Избыточные ререндеры стали одной из самых частых проблем производительности в React приложениях. React DevTools Profiler был создан специально для обнаружения этих проблем, показывая время рендеринга и причины ререндеров.',
    tags: ['frameworks', 'performance', 'rerenders', 'optimization', 'basics', 'fundamentals', 'core'],
    examples: [
      {
        title: 'Проблема: новые объекты в render',
        code: `// ❌ Проблема: новый объект каждый раз
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <Child 
      user={{ name: 'Иван', age: 25 }} // Новый объект каждый раз!
    />
  );
}

function Child({ user }) {
  // Перерисовывается каждый раз, даже если user не изменился
  // React сравнивает по ссылке, а не по значению
  return <div>{user.name}</div>;
}

// ✅ Решение: мемоизация
function Parent() {
  const [count, setCount] = useState(0);
  const user = useMemo(() => ({ name: 'Иван', age: 25 }), []);
  
  return <Child user={user} />;
}

// Преимущество: user не меняется, Child не перерисовывается`
      },
      {
        title: 'Проблема: нестабильные ссылки',
        code: `// ❌ Проблема: новая функция каждый раз
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <Child 
      onClick={() => console.log('click')} // Новая функция каждый раз!
    />
  );
}

function Child({ onClick }) {
  // Перерисовывается каждый раз
  return <button onClick={onClick}>Клик</button>;
}

// ✅ Решение: useCallback
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  
  return <Child onClick={handleClick} />;
}

// Преимущество: handleClick не меняется, Child не перерисовывается`
      },
      {
        title: 'Обнаружение ререндеров',
        code: `// Обнаружение избыточных ререндеров
function Component({ data }) {
  // console.log помогает увидеть частоту ререндеров
  console.log('Component rendered', data);
  
  return <div>{data.name}</div>;
}

// React DevTools Profiler:
// 1. Запустить запись
// 2. Взаимодействовать с приложением
// 3. Остановить запись
// 4. Увидеть: какие компоненты перерисовывались
// 5. Увидеть: время рендеринга
// 6. Увидеть: причины ререндеров

// React.memo предотвращает ререндеры
const Component = React.memo(function Component({ data }) {
  return <div>{data.name}</div>;
});

// Преимущество: перерисовывается только при изменении data`
      }
    ],
    relatedTopics: ['frameworks-performance-memoization', 'frameworks-performance-devtools'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-performance-devtools',
    title: 'DevTools',
    difficulty: 'beginner',
    description: 'DevTools — это инструменты для отладки и профилирования приложений. React DevTools и Vue Devtools предоставляют возможности: инспекция компонентов (видеть структуру, props, state), профилирование производительности (видеть время рендеринга, ререндеры), отладка состояния (видеть изменения состояния).\n\nReact DevTools включает: Components (инспекция компонентов), Profiler (профилирование производительности), Settings (настройки). Vue Devtools включает: Components (инспекция компонентов), Timeline (временная шкала изменений), Vuex/Pinia (отладка хранилища). Эти инструменты критичны для оптимизации производительности.\n\nИспользование DevTools: Components для понимания структуры, Profiler для обнаружения проблем производительности, Timeline для отслеживания изменений. Понимание DevTools критично для эффективной отладки и оптимизации.\n\nВ 2026 DevTools улучшились: React DevTools показывает причины ререндеров, Vue Devtools показывает граф зависимостей. Но понимание принципов остаётся важным для эффективного использования инструментов.',
    keyPoints: [
      'DevTools: инструменты для отладки и профилирования',
      'React DevTools: Components, Profiler, Settings',
      'Vue Devtools: Components, Timeline, Vuex/Pinia',
      'Использование: инспекция, профилирование, отладка состояния',
      'Критичны для оптимизации производительности',
      'Улучшились в 2026: показывают причины ререндеров, граф зависимостей'
    ],
    funFact: 'React DevTools был создан командой Facebook в 2015 году как инструмент для отладки React приложений. За годы он стал стандартом для отладки React, используемым миллионами разработчиков.',
    tags: ['frameworks', 'performance', 'devtools', 'debugging', 'profiling', 'basics', 'fundamentals'],
    examples: [
      {
        title: 'React DevTools: Components',
        code: `// React DevTools: инспекция компонентов
// 1. Открыть DevTools
// 2. Вкладка Components
// 3. Видеть структуру компонентов
// 4. Видеть props и state каждого компонента
// 5. Изменять props и state для тестирования

// Пример:
function App() {
  const [count, setCount] = useState(0);
  return <Counter count={count} />;
}

// DevTools покажет:
// - Структуру: App → Counter
// - Props: Counter { count: 0 }
// - State: App { count: 0 }
// - Можно изменить count и увидеть результат`
      },
      {
        title: 'React DevTools: Profiler',
        code: `// React DevTools: профилирование
// 1. Открыть вкладку Profiler
// 2. Нажать "Record"
// 3. Взаимодействовать с приложением
// 4. Нажать "Stop"
// 5. Увидеть:
//    - Время рендеринга каждого компонента
//    - Количество ререндеров
//    - Причины ререндеров

// Пример:
function Component() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}

// Profiler покажет:
// - Время рендеринга: 2ms
// - Ререндеры: 5 раз
// - Причина: изменение count
// - Можно увидеть какие компоненты медленные`
      },
      {
        title: 'Vue Devtools',
        code: `// Vue Devtools: отладка Vue приложений
// 1. Components: инспекция компонентов
//    - Видеть структуру
//    - Видеть props и data
//    - Изменять данные

// 2. Timeline: временная шкала
//    - Видеть изменения состояния
//    - Видеть события
//    - Отслеживать производительность

// 3. Vuex/Pinia: отладка хранилища
//    - Видеть состояние
//    - Видеть мутации
//    - Откатывать изменения

// Преимущество: полная картина приложения
// Легко найти проблемы производительности`
      }
    ],
    relatedTopics: ['frameworks-performance-excessive-rerenders', 'frameworks-performance-memoization'],
    isFrontendEssential: false
  }
];
