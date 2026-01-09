import { Topic } from '../../../../types';

export const FUTURE_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'frameworks-future-alternative',
    title: 'Альтернативные фреймворки',
    difficulty: 'beginner',
    description: 'Альтернативные фреймворки — это фреймворки кроме React, Vue и Angular, которые предлагают другие подходы к разработке. Solid.js использует fine-grained reactivity без Virtual DOM, Qwik использует resumability для минимальной гидратации, Svelte компилирует компоненты в нативный JavaScript. Каждый фреймворк решает проблемы по-своему.\n\nАльтернативные фреймворки появились как ответ на проблемы популярных фреймворков: React имеет overhead Virtual DOM, Vue имеет overhead реактивности, Angular имеет сложность. Альтернативные фреймворки пытаются решить эти проблемы: меньше overhead, проще использование, лучшая производительность.\n\nВыбор альтернативного фреймворка зависит от требований: нужна ли максимальная производительность (Solid.js, Qwik), нужна ли простота (Svelte), нужна ли минимальная гидратация (Qwik). Но альтернативные фреймворки имеют меньшую экосистему и меньше разработчиков на рынке.\n\nВ 2026 альтернативные фреймворки становятся популярными для специфичных задач: Solid.js для производительности, Qwik для минимальной гидратации, Svelte для простоты. Понимание альтернативных фреймворков помогает выбрать правильный инструмент под задачу.',
    keyPoints: [
      'Альтернативные фреймворки: Solid.js, Qwik, Svelte и другие',
      'Предлагают другие подходы: fine-grained, resumability, компиляция',
      'Решают проблемы популярных фреймворков: меньше overhead, проще',
      'Выбор зависит от требований: производительность, простота, гидратация',
      'Меньшая экосистема и меньше разработчиков на рынке',
      'Популярны для специфичных задач в 2026'
    ],
    funFact: 'Solid.js был создан Райаном Карниато в 2018 году как ответ на проблемы React. Он использует fine-grained reactivity без Virtual DOM, что даёт лучшую производительность. За годы он набрал популярность, особенно для приложений, где производительность критична.',
    tags: ['frameworks', 'future', 'alternatives', 'solid', 'qwik', 'svelte', 'basics', 'fundamentals'],
    examples: [
      {
        title: 'Solid.js: fine-grained reactivity',
        code: `// Solid.js: fine-grained reactivity без Virtual DOM
import { createSignal, createEffect } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  
  // Обновляется только текст, не весь компонент
  createEffect(() => {
    console.log(count()); // Зависимость отслеживается автоматически
  });
  
  return (
    <button onClick={() => setCount(count() + 1)}>
      {count()}
    </button>
  );
}

// Преимущество: нет Virtual DOM overhead
// Обновляется только то, что изменилось
// Лучшая производительность`
      },
      {
        title: 'Qwik: resumability',
        code: `// Qwik: resumability для минимальной гидратации
// Компонент сериализуется на сервере
// Продолжает выполнение на клиенте без гидратации

export default component$(() => {
  const count = useSignal(0);
  
  return (
    <button onClick$={() => count.value++}>
      {count.value}
    </button>
  );
});

// Преимущество: минимальная гидратация
// Продолжает выполнение с сервера
// Быстрая интерактивность`
      },
      {
        title: 'Svelte: компиляция',
        code: `// Svelte: компиляция в нативный JavaScript
<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  {count}
</button>

// Компилятор генерирует оптимизированный код
// Нет runtime overhead на Virtual DOM
// Нет runtime overhead на реактивность

// Преимущество: минимальный runtime
// Компилируется в эффективный код
// Лучшая производительность`
      }
    ],
    relatedTopics: ['frameworks-future-solid-qwik-svelte', 'frameworks-future-comparison'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-future-solid-qwik-svelte',
    title: 'Solid.js, Qwik, Svelte',
    difficulty: 'beginner',
    description: 'Solid.js, Qwik и Svelte — это современные альтернативные фреймворки, которые предлагают новые подходы к разработке. Solid.js использует fine-grained reactivity без Virtual DOM, что даёт лучшую производительность для частых обновлений. Qwik использует resumability для минимальной гидратации, что даёт быструю интерактивность. Svelte компилирует компоненты в нативный JavaScript, что даёт минимальный runtime overhead.\n\nSolid.js подходит для: приложений с частыми обновлениями (таблицы, графики, редакторы), где производительность критична. Qwik подходит для: контентных сайтов, где важна скорость первой загрузки и интерактивность. Svelte подходит для: приложений, где важна простота и производительность, где не нужна большая экосистема.\n\nСравнение с популярными фреймворками: Solid.js быстрее React для частых обновлений, Qwik быстрее Next.js для первой загрузки, Svelte проще Vue для маленьких приложений. Но у них меньшая экосистема и меньше разработчиков на рынке.\n\nВ 2026 эти фреймворки становятся популярными для специфичных задач. Понимание их подходов помогает выбрать правильный инструмент под задачу. Но для большинства проектов React, Vue и Angular остаются стандартом.',
    keyPoints: [
      'Solid.js: fine-grained reactivity, лучшая производительность для частых обновлений',
      'Qwik: resumability, быстрая первая загрузка и интерактивность',
      'Svelte: компиляция, минимальный runtime overhead',
      'Подходят для специфичных задач: производительность, скорость загрузки, простота',
      'Меньшая экосистема и меньше разработчиков',
      'Популярны для специфичных задач в 2026'
    ],
    funFact: 'Svelte был создан Ричем Харрисом в 2016 году как "компилятор, а не фреймворк". Идея в том, что компиляция может устранить runtime overhead, давая лучшую производительность. За годы Svelte набрал популярность, особенно для маленьких приложений.',
    tags: ['frameworks', 'future', 'solid', 'qwik', 'svelte', 'alternatives', 'basics', 'fundamentals'],
    examples: [
      {
        title: 'Solid.js: fine-grained',
        code: `// Solid.js: fine-grained reactivity
import { createSignal, createEffect } from 'solid-js';

const [count, setCount] = createSignal(0);
const [name, setName] = createSignal('Иван');

// Обновляется только то, что зависит от count
createEffect(() => {
  console.log('Count:', count()); // Зависит только от count
});

// Обновляется только то, что зависит от name
createEffect(() => {
  console.log('Name:', name()); // Зависит только от name
});

// Преимущество: нет лишних обновлений
// Обновляется только зависимое
// Лучшая производительность для частых обновлений`
      },
      {
        title: 'Qwik: resumability',
        code: `// Qwik: resumability
// Сервер рендерит и сериализует состояние
export default component$(() => {
  const count = useSignal(0);
  
  return (
    <button onClick$={() => count.value++}>
      {count.value}
    </button>
  );
});

// На клиенте:
// 1. HTML уже отрендерен
// 2. Состояние сериализовано
// 3. Продолжает выполнение без гидратации

// Преимущество: минимальная гидратация
// Быстрая интерактивность
// Подходит для контентных сайтов`
      },
      {
        title: 'Svelte: компиляция',
        code: `// Svelte: компиляция
<script>
  let count = 0;
  $: doubled = count * 2; // Реактивное значение
</script>

<button on:click={() => count++}>
  {count} (удвоено: {doubled})
</button>

// Компилятор генерирует:
// - Оптимизированный код обновления
// - Нет runtime overhead
// - Минимальный бандл

// Преимущество: минимальный runtime
// Компилируется в эффективный код
// Лучшая производительность`
      }
    ],
    relatedTopics: ['frameworks-future-alternative', 'frameworks-future-comparison'],
    isFrontendEssential: false
  }
];
