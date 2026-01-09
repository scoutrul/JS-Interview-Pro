import { Topic } from '../../../../types';

export const REACTIVITY_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'frameworks-reactivity-pull-vs-push',
    title: 'Pull-based vs Push-based',
    difficulty: 'advanced',
    description: 'Pull-based и Push-based — это два фундаментальных подхода к реактивности. Pull-based (React) работает по принципу "спроси": компонент спрашивает "не изменилось ли что-то?", перерисовывается, если да. Push-based (Vue 3, Solid.js) работает по принципу "сообщи": система знает, какие данные изменились и кому сообщить.\n\nВ Pull-based подходе компонент не знает, изменились ли данные, пока не проверит. Это требует перерисовки компонента для проверки. В Push-based подходе система знает о зависимостях и уведомляет только те части, которые зависят от изменившихся данных.\n\nPull-based даёт простую ментальную модель: компонент всегда перерисовывается, diff определяет что изменилось. Push-based даёт лучшую производительность: обновляются только зависимые части, нет лишних перерисовок. Но Push-based сложнее отлаживать из-за циклических зависимостей.\n\nВ 2026 оба подхода эволюционируют: React добавляет компиляцию для оптимизации Pull-based, Vue 3 и Solid.js улучшают инструменты отладки для Push-based. Понимание различий критично для выбора подхода под задачу.',
    keyPoints: [
      'Pull-based: компонент спрашивает "не изменилось ли что-то?", перерисовывается для проверки',
      'Push-based: система знает о зависимостях, уведомляет только зависимые части',
      'Pull-based: простая ментальная модель, но лишние перерисовки',
      'Push-based: лучшая производительность, но сложнее отладка',
      'React добавляет компиляцию для оптимизации Pull-based',
      'Выбор зависит от требований к производительности и сложности отладки'
    ],
    funFact: 'Термины "pull" и "push" пришли из паттернов проектирования итераторов. Pull-based итератор запрашивает данные (next()), Push-based итератор получает данные через callback (onNext()).',
    tags: ['frameworks', 'reactivity', 'pull-based', 'push-based', 'performance', 'advanced', 'architecture'],
    examples: [
      {
        title: 'Pull-based: компонент спрашивает',
        code: `// React (Pull-based): компонент спрашивает "не изменилось ли?"
function Component({ data }) {
  // Компонент не знает, изменились ли данные
  // Перерисовывается для проверки
  return (
    <div>
      {data.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
}

// При изменении data:
// 1. Компонент перерисовывается (не знает, изменилось ли)
// 2. Diff сравнивает новый и старый Virtual DOM
// 3. Применяются только изменения

// Преимущество: простая ментальная модель
// Недостаток: лишние перерисовки для проверки`
      },
      {
        title: 'Push-based: система сообщает',
        code: `// Vue 3 / Solid.js (Push-based): система знает и сообщает
const data = reactive([...]);

// Система знает зависимости
effect(() => {
  // Система запомнила: этот effect зависит от data
  renderItems(data);
});

// При изменении data:
// 1. Система знает, какие effects зависят от data
// 2. Уведомляет только их
// 3. Нет лишних перерисовок

data.push(newItem); // Только зависимые effects обновятся

// Преимущество: нет лишних перерисовок
// Недостаток: сложнее отладка циклических зависимостей`
      },
      {
        title: 'Сравнение производительности',
        code: `// Pull-based: лишние перерисовки
function Table({ rows }) {
  // При изменении одной ячейки:
  // - Перерисовывается весь компонент
  // - Diff определяет, что изменилась только одна ячейка
  // - Обновляется только она
  
  return (
    <table>
      {rows.map(row => (
        <Row key={row.id}>
          {row.cells.map(cell => (
            <Cell key={cell.id} value={cell.value} />
          ))}
        </Row>
      ))}
    </table>
  );
}

// Push-based: обновляется только зависимая часть
function Table({ rows }) {
  // При изменении одной ячейки:
  // - Система знает, какой effect зависит от этой ячейки
  // - Обновляется только он
  // - Нет перерисовки всего компонента
  
  return (
    <table>
      {rows.map(row => (
        <Row key={row.id}>
          {row.cells.map(cell => (
            <Cell key={cell.id} value={cell.value} />
          ))}
        </Row>
      ))}
    </table>
  );
}`
      }
    ],
    relatedTopics: ['frameworks-reactivity-runtime-vs-compile-time', 'frameworks-reactivity-circular-dependencies'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-reactivity-runtime-vs-compile-time',
    title: 'Runtime vs Compile-time',
    difficulty: 'advanced',
    description: 'Runtime и Compile-time реактивность — это два подхода к реализации реактивности. Runtime реактивность (React, Vue 3) работает во время выполнения: система отслеживает зависимости и обновляет интерфейс динамически. Compile-time реактивность (Svelte, Solid.js) работает на этапе компиляции: компилятор статически анализирует код и генерирует оптимизированный код обновлений.\n\nRuntime реактивность даёт гибкость: зависимости определяются динамически, можно создавать реактивные системы на лету. Но это добавляет overhead: нужно отслеживать зависимости во время выполнения. Compile-time реактивность даёт производительность: нет runtime overhead, компилятор оптимизирует код. Но это требует этапа компиляции и менее гибко.\n\nВ 2026 тренд на компиляцию: React добавляет React Forget для компиляционной оптимизации, Vue 3 рассматривает compile-time оптимизации, Svelte и Solid.js показывают преимущества compile-time подхода. Гибридный подход становится популярным: compile-time оптимизации для статических частей, runtime для динамических.',
    keyPoints: [
      'Runtime: зависимости отслеживаются во время выполнения',
      'Compile-time: зависимости анализируются на этапе компиляции',
      'Runtime: гибкость, но overhead на отслеживание',
      'Compile-time: производительность, но нужен этап компиляции',
      'Тренд 2026: компиляция для оптимизации (React Forget, Svelte)',
      'Гибридный подход: compile-time для статики, runtime для динамики'
    ],
    funFact: 'Svelte был первым фреймворком, который полностью полагался на compile-time реактивность. Создатель Svelte Рич Харрис сказал: "Svelte — это компилятор, а не фреймворк", подчёркивая важность compile-time оптимизаций.',
    tags: ['frameworks', 'reactivity', 'runtime', 'compile-time', 'compilation', 'advanced', 'performance'],
    examples: [
      {
        title: 'Runtime реактивность',
        code: `// React / Vue 3: runtime реактивность
function Component() {
  const [count, setCount] = useState(0);
  
  // Зависимости определяются во время выполнения
  useEffect(() => {
    // React отслеживает зависимости динамически
    console.log(count);
  }, [count]);
  
  return <div>{count}</div>;
}

// Runtime overhead:
// - Отслеживание зависимостей
// - Сравнение Virtual DOM
// - Планирование обновлений

// Преимущество: гибкость, можно создавать зависимости динамически`
      },
      {
        title: 'Compile-time реактивность',
        code: `// Svelte: compile-time реактивность
<script>
  let count = 0;
  $: doubled = count * 2; // Реактивное значение
</script>

<div>{count}</div>
<div>{doubled}</div>

// Компилятор статически анализирует:
// - count используется в doubled
// - count и doubled используются в template
// - Генерирует оптимизированный код

// Сгенерированный код:
function update() {
  if (changed.count) {
    text1.data = count;
    text2.data = count * 2;
  }
}

// Нет runtime overhead на отслеживание
// Преимущество: производительность
// Недостаток: нужен этап компиляции`
      },
      {
        title: 'Гибридный подход',
        code: `// React Forget: compile-time оптимизация runtime реактивности
function Component({ items, filter }) {
  const [count, setCount] = useState(0);
  
  // Компилятор статически анализирует:
  // - Какие зависимости статические (items, filter)
  // - Какие динамические (count)
  // - Генерирует оптимизированный код
  
  const filtered = useMemo(() => {
    // Компилятор знает, что это зависит только от items и filter
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  return (
    <div>
      <p>{count}</p>
      <List items={filtered} />
    </div>
  );
}

// Гибридный подход:
// - Статические зависимости оптимизируются compile-time
// - Динамические остаются runtime
// - Лучшее из обоих миров`
      }
    ],
    relatedTopics: ['frameworks-reactivity-pull-vs-push', 'frameworks-future-compilation'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-reactivity-circular-dependencies',
    title: 'Циклические зависимости',
    difficulty: 'advanced',
    description: 'Циклические зависимости — это проблема, когда два или более реактивных значения зависят друг от друга, создавая бесконечный цикл обновлений. Например, computed A зависит от B, а computed B зависит от A. При изменении одного значения обновляется другое, которое обновляет первое, и так далее.\n\nВ Pull-based подходе (React) циклические зависимости менее проблематичны: компонент просто перерисовывается, diff определяет что изменилось. В Push-based подходе (Vue 3, Solid.js) циклические зависимости могут вызвать бесконечный цикл обновлений, если не обработаны правильно.\n\nРешения включают: детекцию циклов на этапе компиляции, ограничение глубины обновлений, использование мемоизации для разрыва циклов. Понимание циклических зависимостей критично для отладки сложных реактивных систем.\n\nВ 2026 инструменты отладки улучшаются: Vue DevTools показывает граф зависимостей, React DevTools помогает найти циклические обновления. Но понимание принципов остаётся важным для предотвращения проблем.',
    keyPoints: [
      'Циклические зависимости: два значения зависят друг от друга',
      'Могут вызвать бесконечный цикл обновлений',
      'В Pull-based менее проблематичны (просто перерисовка)',
      'В Push-based могут вызвать бесконечный цикл',
      'Решения: детекция циклов, ограничение глубины, мемоизация',
      'Инструменты отладки помогают находить циклические зависимости'
    ],
    funFact: 'Проблема циклических зависимостей известна в программировании с 1960-х годов. В компиляторах это называется "circular dependency", в базах данных — "referential integrity". В реактивных системах это стало проблемой с появлением fine-grained реактивности.',
    tags: ['frameworks', 'reactivity', 'circular-dependencies', 'debugging', 'advanced', 'problems'],
    examples: [
      {
        title: 'Циклическая зависимость',
        code: `// ❌ Проблема: циклическая зависимость
const a = ref(0);
const b = ref(0);

// computed A зависит от B
const computedA = computed(() => {
  return b.value * 2; // Зависит от B
});

// computed B зависит от A
const computedB = computed(() => {
  return computedA.value + 1; // Зависит от A
});

// При изменении a:
a.value = 1;
// → computedA обновляется (зависит от b)
// → computedB обновляется (зависит от computedA)
// → Если computedA зависит от computedB → бесконечный цикл

// Решение: разорвать цикл
const computedA = computed(() => {
  return a.value * 2; // Зависит от a, а не от b
});

const computedB = computed(() => {
  return computedA.value + 1; // Зависит от computedA
});`
      },
      {
        title: 'Детекция циклов',
        code: `// Vue 3: детекция циклов
const a = ref(0);
const b = ref(0);

const computedA = computed(() => {
  // Vue отслеживает зависимости
  // Если обнаружен цикл, выбрасывает ошибку
  return computedB.value * 2; // Зависит от computedB
});

const computedB = computed(() => {
  return computedA.value + 1; // Зависит от computedA
});

// Vue обнаружит цикл и выбросит ошибку:
// "Circular dependency detected"`

      },
      {
        title: 'Мемоизация для разрыва циклов',
        code: `// Мемоизация разрывает цикл
const a = ref(0);
const b = ref(0);

// Мемоизация предотвращает пересчёт
const computedA = computed(() => {
  // Мемоизируется, не пересчитывается если зависимости не изменились
  return b.value * 2;
});

const computedB = computed(() => {
  // Использует мемоизированное значение computedA
  // Не создаёт цикл, если computedA не изменилось
  return computedA.value + 1;
});

// Преимущество: мемоизация предотвращает лишние пересчёты
// Разрывает потенциальные циклы`
      }
    ],
    relatedTopics: ['frameworks-reactivity-pull-vs-push', 'frameworks-performance-memoization'],
    isFrontendEssential: false
  }
];
