import { Topic } from '../../../../types';

export const EVOLUTION_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'frameworks-evolution-mvc-flux-components',
    title: 'MVC → Flux → Component-based',
    difficulty: 'intermediate',
    description: 'Эволюция архитектурных парадигм во фронтенде отражает поиск решения проблемы управления состоянием и синхронизации данных. MVC (Model-View-Controller) пришёл из бэкенда и пытался разделить логику, представление и данные. Но во фронтенде это создавало проблемы: контроллеры росли, связи между компонентами становились запутанными, было сложно отследить откуда пришло изменение.\n\nFlux появился в Facebook как ответ на проблемы MVC. Основная идея: однонаправленный поток данных. Действия (actions) отправляются в хранилище (store), которое обновляет состояние и уведомляет представления (views). Это устранило циклические зависимости и сделало поток данных предсказуемым.\n\nComponent-based архитектура стала следующим шагом: вместо разделения на Model, View и Controller, всё инкапсулируется в компонентах. Каждый компонент управляет своим состоянием, получает данные через props и отправляет события наверх. Это упростило ментальную модель и сделало код более переиспользуемым.\n\nВ 2026 component-based подход доминирует, но идеи Flux (однонаправленный поток) остались в Redux, Zustand и других библиотеках управления состоянием. Современные фреймворки комбинируют компонентную модель с паттернами Flux для глобального состояния.',
    keyPoints: [
      'MVC: разделение на Model, View, Controller, но контроллеры росли и запутывались',
      'Flux: однонаправленный поток данных (actions → store → views), предсказуемость',
      'Component-based: инкапсуляция логики, состояния и представления в компонентах',
      'Flux решал проблему циклических зависимостей в MVC',
      'Component-based упростил ментальную модель и переиспользование кода',
      'Современные фреймворки комбинируют компоненты с паттернами Flux для глобального состояния'
    ],
    funFact: 'Flux был создан в Facebook в 2014 году специально для решения проблем с синхронизацией данных в больших приложениях. Redux, созданный в 2015 году, упростил Flux, убрав множественные stores и сделав state неизменяемым.',
    tags: ['frameworks', 'architecture', 'mvc', 'flux', 'components', 'intermediate', 'evolution', 'patterns'],
    examples: [
      {
        title: 'MVC: проблемы с контроллерами',
        code: `// MVC: контроллер управляет всем
class UserController {
  updateName(name) {
    this.model.name = name;
    this.view.updateName(name);
    this.view.updateStatus(); // Нужно помнить обновить
    this.view.updateAvatar(); // И это тоже
  }
  
  updateAge(age) {
    this.model.age = age;
    this.view.updateAge(age);
    this.view.updateStatus(); // Дублирование логики
    // Легко забыть обновить что-то
  }
}

// Проблема: контроллер знает слишком много о представлении`
      },
      {
        title: 'Flux: однонаправленный поток',
        code: `// Flux: однонаправленный поток данных
// 1. Action (действие)
const updateUserAction = { type: 'UPDATE_USER', payload: { name: 'Иван' } };

// 2. Dispatcher отправляет в Store
dispatcher.dispatch(updateUserAction);

// 3. Store обновляет состояние
const userStore = {
  state: { name: 'Иван', age: 25 },
  handleAction(action) {
    if (action.type === 'UPDATE_USER') {
      this.state = { ...this.state, ...action.payload };
      this.notify(); // Уведомляет все views
    }
  }
};

// 4. Views подписываются на изменения
userStore.on('change', () => {
  // View автоматически обновляется
  renderUser(userStore.state);
});

// Преимущество: предсказуемый поток, нет циклических зависимостей`
      },
      {
        title: 'Component-based: инкапсуляция',
        code: `// Component-based: всё в одном месте
function UserProfile({ user, onUpdate }) {
  // Логика, состояние и представление вместе
  const [localName, setLocalName] = useState(user.name);
  
  const handleSubmit = () => {
    onUpdate({ ...user, name: localName });
  };
  
  return (
    <div>
      <input value={localName} onChange={e => setLocalName(e.target.value)} />
      <button onClick={handleSubmit}>Сохранить</button>
      <p>{user.name}</p>
    </div>
  );
}

// Преимущество: компонент самодостаточен, легко переиспользовать
// Состояние управляется внутри или через props`
      }
    ],
    relatedTopics: ['frameworks-evolution-jquery-to-components', 'frameworks-state-management-flux'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-evolution-cost-of-abstractions',
    title: 'Стоимость абстракций',
    difficulty: 'intermediate',
    description: 'Каждая абстракция решает проблему, но создаёт новую: сложность понимания, накладные расходы на производительность, ограничения гибкости. Virtual DOM решает проблему эффективного обновления DOM, но добавляет overhead на сравнение деревьев. Компонентная модель упрощает структуру, но усложняет отладку из-за множества слоёв.\n\nПонимание стоимости абстракций критично для принятия решений. Когда фреймворк становится проблемой? Когда накладные расходы превышают выгоду, когда абстракция скрывает необходимый контроль, когда команда тратит больше времени на борьбу с фреймворком, чем на решение бизнес-задач.\n\nВ 2026 тренд на "меньше JavaScript" и компиляцию — это попытка снизить стоимость абстракций. Svelte компилирует компоненты в нативный JavaScript, Qwik использует resumability чтобы избежать гидратации. Цель: сохранить DX (Developer Experience), но снизить runtime overhead.',
    keyPoints: [
      'Каждая абстракция решает проблему, но создаёт новую: сложность, overhead, ограничения',
      'Virtual DOM решает проблему обновления DOM, но добавляет overhead на сравнение',
      'Фреймворк становится проблемой когда overhead превышает выгоду',
      'Когда команда тратит больше времени на борьбу с фреймворком, чем на задачи',
      'Тренд 2026: компиляция для снижения runtime overhead (Svelte, Qwik)',
      'Цель: сохранить DX, но снизить стоимость абстракций'
    ],
    funFact: 'React изначально был создан для внутренних нужд Facebook, где производительность была критична. Virtual DOM был выбран как компромисс между простотой разработки и производительностью, хотя изначально это добавляло overhead.',
    tags: ['frameworks', 'abstractions', 'performance', 'trade-offs', 'intermediate', 'architecture'],
    examples: [
      {
        title: 'Стоимость Virtual DOM',
        code: `// Virtual DOM: overhead на сравнение
function Component({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// При каждом обновлении:
// 1. Создаётся новый Virtual DOM
// 2. Сравнивается со старым (diff алгоритм)
// 3. Вычисляются минимальные изменения
// 4. Применяются к реальному DOM

// Overhead: даже если ничего не изменилось, происходит сравнение
// Выгода: не нужно думать о том, что обновлять вручную`
      },
      {
        title: 'Когда абстракция становится проблемой',
        code: `// Проблема: фреймворк скрывает необходимый контроль
function CustomChart() {
  // Нужен прямой доступ к canvas для кастомной отрисовки
  // Но фреймворк пытается управлять DOM
  
  // Решение 1: обходные пути (refs, escape hatches)
  const canvasRef = useRef();
  useEffect(() => {
    // Прямой доступ к canvas, минуя фреймворк
    const ctx = canvasRef.current.getContext('2d');
    // Кастомная отрисовка
  }, []);
  
  return <canvas ref={canvasRef} />;
  
  // Проблема: приходится бороться с фреймворком
  // Когда таких случаев много — фреймворк мешает`
      },
      {
        title: 'Компиляция снижает overhead',
        code: `// Svelte: компилирует компоненты в нативный JS
// Исходный код:
<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  {count}
</button>

// Компилятор генерирует:
function create_fragment(ctx) {
  let button, t0, t1;
  return {
    c() {
      button = element("button");
      t0 = text("0");
      t1 = text(" clicks");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);
      button.addEventListener("click", ctx[0]);
    },
    p(ctx, [dirty]) {
      if (dirty & 1) set_data(t0, ctx[0]);
    }
  };
}

// Преимущество: нет runtime overhead на Virtual DOM
// Недостаток: нужен этап компиляции`
      }
    ],
    relatedTopics: ['frameworks-evolution-mvc-flux-components', 'frameworks-performance-overhead'],
    isFrontendEssential: false
  }
];
