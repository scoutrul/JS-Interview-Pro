import { Topic } from '../../../../types';

export const REACTIVITY_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'frameworks-reactivity-virtual-dom-vs-fine-grained',
    title: 'Virtual DOM vs Fine-grained',
    difficulty: 'intermediate',
    description: 'Virtual DOM и Fine-grained reactivity — это два подхода к реализации реактивности. Virtual DOM (React) создаёт легковесную копию реального DOM в памяти. При изменении данных создаётся новый Virtual DOM, который сравнивается со старым (diff алгоритм), и вычисляются минимальные изменения для применения к реальному DOM.\n\nFine-grained reactivity (Vue 3, Solid.js) отслеживает конкретные зависимости: система знает, какие части интерфейса зависят от каких данных. При изменении данных обновляются только те части, которые от них зависят, без перебора всего дерева.\n\nVirtual DOM даёт стабильную ментальную модель: компонент перерисовывается полностью, но diff алгоритм оптимизирует обновления. Fine-grained даёт лучшую производительность для частых точечных обновлений, но сложнее отладка циклических зависимостей.\n\nВ 2026 оба подхода эволюционируют: React добавляет компиляцию (React Forget) для оптимизации, Vue 3 использует Proxy для отслеживания зависимостей, Solid.js компилирует компоненты в fine-grained обновления. Выбор зависит от типа приложения и требований к производительности.',
    keyPoints: [
      'Virtual DOM: создаёт копию DOM, сравнивает, применяет изменения',
      'Fine-grained: отслеживает конкретные зависимости, обновляет только нужные части',
      'Virtual DOM: стабильная ментальная модель, но overhead на сравнение',
      'Fine-grained: лучшая производительность, но сложнее отладка',
      'React добавляет компиляцию для оптимизации Virtual DOM',
      'Выбор зависит от типа приложения и требований к производительности'
    ],
    funFact: 'Virtual DOM был изобретён не в React. Впервые его использовали в игровых движках в 1990-х годах для минимизации перерисовок экрана. React адаптировал эту идею для веб-интерфейсов.',
    tags: ['frameworks', 'reactivity', 'virtual-dom', 'fine-grained', 'performance', 'intermediate', 'core'],
    examples: [
      {
        title: 'Virtual DOM: сравнение деревьев',
        code: `// Virtual DOM: создание и сравнение
function Component({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// При изменении items:
// 1. Создаётся новый Virtual DOM
const newVDOM = {
  type: 'ul',
  children: items.map(item => ({
    type: 'li',
    key: item.id,
    children: [item.name]
  }))
};

// 2. Сравнивается со старым Virtual DOM (diff)
const changes = diff(oldVDOM, newVDOM);

// 3. Применяются минимальные изменения к реальному DOM
applyChanges(realDOM, changes);

// Overhead: даже если ничего не изменилось, происходит сравнение`
      },
      {
        title: 'Fine-grained: отслеживание зависимостей',
        code: `// Fine-grained: отслеживание конкретных зависимостей
// Vue 3 / Solid.js

const count = ref(0); // Реактивное значение

// Система знает, что этот effect зависит от count
effect(() => {
  // Только это обновится при изменении count
  document.getElementById('counter').textContent = count.value;
});

// При изменении count:
// 1. Система знает, какие effects зависят от count
// 2. Обновляет только их
// 3. Не перебирает всё дерево

// Преимущество: нет overhead на сравнение
// Недостаток: сложнее отладка циклических зависимостей`
      },
      {
        title: 'Сравнение производительности',
        code: `// Virtual DOM: хорошо для умеренных обновлений
function Table({ rows }) {
  // При изменении одной строки:
  // - Пересоздаётся весь Virtual DOM
  // - Сравнивается со старым
  // - Применяются изменения только к изменившимся строкам
  
  return (
    <table>
      {rows.map(row => <Row key={row.id} data={row} />)}
    </table>
  );
}

// Fine-grained: хорошо для частых точечных обновлений
function Table({ rows }) {
  // При изменении одной ячейки:
  // - Обновляется только эта ячейка
  // - Нет перебора всего дерева
  // - Нет overhead на сравнение
  
  return (
    <table>
      {rows.map(row => (
        <Row key={row.id}>
          {row.cells.map(cell => (
            <Cell value={cell.value} /> // Обновляется только изменившаяся ячейка
          ))}
        </Row>
      ))}
    </table>
  );
}`
      }
    ],
    relatedTopics: ['frameworks-reactivity-dependency-tracking', 'frameworks-reactivity-batching-scheduling', 'react-optimization-rerenders', 'vue-performance'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-reactivity-dependency-tracking',
    title: 'Dependency tracking',
    difficulty: 'intermediate',
    description: 'Dependency tracking — это механизм отслеживания зависимостей между данными и интерфейсом. Система должна знать, какие части интерфейса зависят от каких данных, чтобы обновлять их при изменении данных.\n\nВ Virtual DOM подходе (React) зависимости не отслеживаются явно: компонент перерисовывается полностью, и diff алгоритм определяет что изменилось. В Fine-grained подходе (Vue 3, Solid.js) зависимости отслеживаются явно: система запоминает, какие computed/effects зависят от каких реактивных значений.\n\nМеханизмы отслеживания включают: Proxy (Vue 3) для перехвата доступа к свойствам, геттеры/сеттеры для отслеживания чтения/записи, компиляция для статического анализа зависимостей. Каждый подход имеет свои преимущества и недостатки.\n\nВ 2026 компиляция становится популярной для оптимизации dependency tracking: компилятор статически анализирует код и генерирует оптимизированный код отслеживания зависимостей. Это даёт лучшее из обоих миров: явное отслеживание и производительность компиляции.',
    keyPoints: [
      'Dependency tracking: отслеживание зависимостей между данными и интерфейсом',
      'Virtual DOM: зависимости не отслеживаются явно, diff определяет изменения',
      'Fine-grained: зависимости отслеживаются явно через Proxy/геттеры',
      'Механизмы: Proxy, геттеры/сеттеры, компиляция',
      'Компиляция становится популярной для оптимизации',
      'Понимание dependency tracking критично для отладки реактивности'
    ],
    funFact: 'Proxy API был добавлен в JavaScript в ES2015 специально для создания реактивных систем. Vue 3 использует Proxy для отслеживания зависимостей, что позволяет отслеживать изменения в объектах и массивах без необходимости оборачивать каждое свойство.',
    tags: ['frameworks', 'reactivity', 'dependency-tracking', 'proxy', 'intermediate', 'core'],
    examples: [
      {
        title: 'Proxy для отслеживания зависимостей',
        code: `// Vue 3: Proxy для отслеживания
const state = reactive({
  count: 0,
  name: 'Иван'
});

// Proxy перехватывает доступ к свойствам
effect(() => {
  // При чтении state.count Proxy запоминает зависимость
  console.log(state.count); // Зависимость: effect зависит от state.count
});

// При изменении state.count
state.count = 1;
// Proxy знает, какие effects зависят от state.count
// Обновляет только их

// Преимущество: автоматическое отслеживание
// Недостаток: overhead на Proxy`
      },
      {
        title: 'Геттеры/сеттеры для отслеживания',
        code: `// Solid.js: геттеры/сеттеры
function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = new Set();
  
  const getter = () => {
    // При чтении запоминаем зависимость
    if (currentEffect) {
      subscribers.add(currentEffect);
    }
    return value;
  };
  
  const setter = (newValue) => {
    value = newValue;
    // При записи обновляем всех подписчиков
    subscribers.forEach(effect => effect());
  };
  
  return [getter, setter];
}

const [count, setCount] = createSignal(0);

// При чтении count запоминается зависимость
effect(() => {
  console.log(count()); // Зависимость запомнена
});

// При изменении count обновляются подписчики
setCount(1);`
      },
      {
        title: 'Компиляция для оптимизации',
        code: `// Svelte: компиляция статически анализирует зависимости
// Исходный код:
<script>
  let count = 0;
  $: doubled = count * 2;
</script>

<p>{count}</p>
<p>{doubled}</p>

// Компилятор статически анализирует:
// - count используется в doubled
// - count и doubled используются в template
// - Генерирует оптимизированный код обновления

// Сгенерированный код:
function update() {
  if (changed.count) {
    // Обновляется только то, что зависит от count
    text1.data = count;
    text2.data = count * 2;
  }
}

// Преимущество: нет runtime overhead на отслеживание
// Недостаток: нужен этап компиляции`
      }
    ],
    relatedTopics: ['frameworks-reactivity-virtual-dom-vs-fine-grained', 'frameworks-reactivity-batching-scheduling'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-reactivity-batching-scheduling',
    title: 'Батчинг и scheduling',
    difficulty: 'intermediate',
    description: 'Батчинг — это группировка множественных обновлений в одно обновление DOM. Когда вы изменяете несколько реактивных значений подряд, система не обновляет DOM после каждого изменения, а группирует их и обновляет один раз. Это улучшает производительность, так как обновление DOM — дорогая операция.\n\nScheduling — это планирование обновлений с приоритетами. Не все обновления одинаково важны: обновление текста в поле ввода должно быть мгновенным, а обновление списка результатов может быть отложено. Система планирует обновления, отдавая приоритет критичным (пользовательский ввод) над некритичными (рендеринг списка).\n\nReact использует батчинг и scheduling через свой scheduler: обновления группируются и планируются с приоритетами. Vue 3 также батчит обновления в рамках одного тика event loop. Понимание батчинга и scheduling критично для оптимизации производительности.\n\nВ 2026 батчинг и scheduling стали стандартом во всех современных фреймворках. React Concurrent Features расширяют возможности scheduling, позволяя прерывать низкоприоритетные обновления для высокоприоритетных.',
    keyPoints: [
      'Батчинг: группировка множественных обновлений в одно',
      'Scheduling: планирование обновлений с приоритетами',
      'Улучшает производительность, так как обновление DOM дорогое',
      'Критичные обновления (ввод) имеют приоритет над некритичными (рендеринг)',
      'React и Vue используют батчинг и scheduling',
      'React Concurrent Features расширяют возможности scheduling'
    ],
    funFact: 'Батчинг обновлений был введён в React для решения проблемы "мерцания" интерфейса при множественных быстрых обновлениях. Без батчинга каждое обновление вызывало бы перерисовку, что создавало бы визуальные артефакты.',
    tags: ['frameworks', 'reactivity', 'batching', 'scheduling', 'performance', 'intermediate', 'core'],
    examples: [
      {
        title: 'Батчинг обновлений',
        code: `// Без батчинга: каждое обновление вызывает перерисовку
function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  const handleClick = () => {
    setA(1); // Обновление 1 → перерисовка
    setB(2); // Обновление 2 → перерисовка
    setC(3); // Обновление 3 → перерисовка
    // Итого: 3 перерисовки
  };
  
  return <div>{a} {b} {c}</div>;
}

// С батчингом: все обновления группируются
function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  const handleClick = () => {
    setA(1); // Обновление 1 → в очередь
    setB(2); // Обновление 2 → в очередь
    setC(3); // Обновление 3 → в очередь
    // Все обновления применяются вместе → 1 перерисовка
  };
  
  return <div>{a} {b} {c}</div>;
}`
      },
      {
        title: 'Scheduling с приоритетами',
        code: `// React: scheduling с приоритетами
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // Низкоприоритетное обновление
    fetchResults(query).then(setResults);
  }, [query]);
  
  return (
    <div>
      <input 
        value={query}
        onChange={e => setQuery(e.target.value)} // Высокоприоритетное
      />
      <ResultsList results={results} /> {/* Низкоприоритетное */}
    </div>
  );
}

// React планирует обновления:
// 1. Высокий приоритет: обновление input (мгновенно)
// 2. Низкий приоритет: обновление ResultsList (может быть отложено)
// Если пользователь продолжает вводить, низкоприоритетное обновление прерывается`
      },
      {
        title: 'React Concurrent Features',
        code: `// React Concurrent Features: прерываемые обновления
import { startTransition } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  
  const handleChange = (value) => {
    // Высокоприоритетное: обновление input
    setInput(value);
    
    // Низкоприоритетное: обновление результатов
    startTransition(() => {
      setResults(filterResults(value));
    });
  };
  
  return (
    <div>
      <input value={input} onChange={e => handleChange(e.target.value)} />
      <ResultsList results={results} />
    </div>
  );
}

// startTransition помечает обновление как низкоприоритетное
// Если пользователь продолжает вводить, обновление результатов прерывается
// Интерфейс остаётся отзывчивым`
      }
    ],
    relatedTopics: ['frameworks-reactivity-virtual-dom-vs-fine-grained', 'frameworks-performance-excessive-rerenders'],
    isFrontendEssential: true
  }
];
