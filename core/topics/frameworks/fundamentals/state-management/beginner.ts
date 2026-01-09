import { Topic } from '../../../../types';

export const STATE_MANAGEMENT_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'frameworks-state-management-local-lifted-global',
    title: 'Local → lifted → global',
    difficulty: 'beginner',
    description: 'Состояние в приложении имеет иерархию: local (локальное), lifted (поднятое), global (глобальное). Local состояние живёт внутри компонента и используется только им. Lifted состояние поднимается к общему родителю нескольких компонентов, которые его используют. Global состояние доступно всему приложению через контекст или хранилище.\n\nВыбор уровня состояния зависит от того, кто его использует. Если состояние нужно только одному компоненту — local. Если нужно нескольким компонентам-братьям — lifted к общему родителю. Если нужно многим компонентам в разных частях приложения — global.\n\nПравило: начинайте с local состояния, поднимайте только когда нужно. Глобальное состояние должно быть последним выбором, так как оно усложняет код и делает его менее предсказуемым. Каждый уровень добавляет сложность, поэтому используйте минимально необходимый уровень.\n\nВ 2026 это правило остаётся актуальным. Современные фреймворки предоставляют инструменты для всех уровней: useState для local, Context для lifted, Redux/Zustand для global. Понимание иерархии критично для правильной организации состояния.',
    keyPoints: [
      'Local: состояние внутри компонента, используется только им',
      'Lifted: состояние у общего родителя, используется несколькими компонентами-братьями',
      'Global: состояние доступно всему приложению через контекст или хранилище',
      'Начинайте с local, поднимайте только когда нужно',
      'Глобальное состояние — последний выбор, добавляет сложность',
      'Используйте минимально необходимый уровень состояния'
    ],
    funFact: 'Принцип "поднимания состояния" (lifting state up) был популяризирован React в 2013 году. Идея в том, что состояние должно жить на самом низком общем предке компонентов, которые его используют.',
    tags: ['frameworks', 'state-management', 'local', 'lifted', 'global', 'basics', 'fundamentals', 'core'],
    examples: [
      {
        title: 'Local состояние',
        code: `// Local: состояние внутри компонента
function Counter() {
  // count используется только внутри Counter
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Преимущество: простота, изоляция
// Используйте когда: состояние нужно только этому компоненту`
      },
      {
        title: 'Lifted состояние',
        code: `// Lifted: состояние у общего родителя
function App() {
  // count используется в Counter и Display
  // Поднимаем к общему родителю
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Counter count={count} onIncrement={() => setCount(count + 1)} />
      <Display count={count} />
    </div>
  );
}

function Counter({ count, onIncrement }) {
  return <button onClick={onIncrement}>+</button>;
}

function Display({ count }) {
  return <p>{count}</p>;
}

// Преимущество: общее состояние для нескольких компонентов
// Используйте когда: состояние нужно компонентам-братьям`
      },
      {
        title: 'Global состояние',
        code: `// Global: состояние доступно всему приложению
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Main />
      <Footer />
    </UserContext.Provider>
  );
}

function Header() {
  const { user } = useContext(UserContext);
  return <div>Привет, {user?.name}</div>;
}

function Main() {
  const { user } = useContext(UserContext);
  return <div>Профиль: {user?.email}</div>;
}

// Преимущество: доступ из любой части приложения
// Используйте когда: состояние нужно многим компонентам в разных частях`
      }
    ],
    relatedTopics: ['frameworks-state-management-prop-drilling', 'frameworks-state-management-flux', 'react-state-management', 'vue-pinia'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-state-management-prop-drilling',
    title: 'Пропс-дриллинг и решения',
    difficulty: 'beginner',
    description: 'Пропс-дриллинг — это передача props через множество уровней компонентов, которые не используют эти props, а только передают их дальше. Это создаёт ненужные зависимости: компонент знает о props, которые ему не нужны, что усложняет рефакторинг и делает код менее поддерживаемым.\n\nПроблема пропс-дриллинга возникает когда нужно передать данные от компонента высокого уровня к компоненту глубокого уровня. Если между ними много промежуточных компонентов, все они должны принимать и передавать props, даже если не используют их.\n\nРешения включают: Context API для глобального состояния, композицию компонентов для уменьшения уровней, состояние ближе к месту использования. Каждое решение имеет свои trade-offs: Context упрощает передачу, но может усложнить отладку, композиция уменьшает уровни, но может усложнить структуру.\n\nВ 2026 Context API стал стандартным решением для пропс-дриллинга в React. Vue использует provide/inject для той же цели. Понимание пропс-дриллинга и его решений критично для создания поддерживаемого кода.',
    keyPoints: [
      'Пропс-дриллинг: передача props через множество уровней без использования',
      'Создаёт ненужные зависимости: компонент знает о ненужных props',
      'Усложняет рефакторинг и поддержку кода',
      'Решения: Context API, композиция, состояние ближе к использованию',
      'Context упрощает передачу, но может усложнить отладку',
      'Context API стал стандартным решением в 2026'
    ],
    funFact: 'Термин "prop drilling" был придуман сообществом React для описания проблемы передачи props через множество уровней. Это игра слов на "oil drilling" (бурение нефти) — "пробуривание" props через компоненты.',
    tags: ['frameworks', 'state-management', 'prop-drilling', 'context', 'basics', 'fundamentals', 'problems'],
    examples: [
      {
        title: 'Проблема пропс-дриллинга',
        code: `// ❌ Проблема: пропс-дриллинг
function App() {
  const user = { id: 1, name: 'Иван' };
  return <Layout user={user} />;
}

function Layout({ user }) {
  // Не использует user, только передаёт дальше
  return <Header user={user} />;
}

function Header({ user }) {
  // Не использует user, только передаёт дальше
  return <Navigation user={user} />;
}

function Navigation({ user }) {
  // Не использует user, только передаёт дальше
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  // Наконец использует user
  return <div>{user.name}</div>;
}

// Проблема: Layout, Header, Navigation знают о user, но не используют
// Усложняет рефакторинг: если изменится структура user, нужно обновить все компоненты`
      },
      {
        title: 'Решение: Context API',
        code: `// ✅ Решение: Context API
const UserContext = createContext();

function App() {
  const user = { id: 1, name: 'Иван' };
  
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function Layout() {
  // Не знает о user
  return <Header />;
}

function Header() {
  // Не знает о user
  return <Navigation />;
}

function Navigation() {
  // Не знает о user
  return <UserMenu />;
}

function UserMenu() {
  // Получает user напрямую из Context
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}

// Преимущество: промежуточные компоненты не знают о user
// Упрощает рефакторинг`
      },
      {
        title: 'Решение: композиция',
        code: `// ✅ Решение: композиция (уменьшение уровней)
function App() {
  const user = { id: 1, name: 'Иван' };
  
  return (
    <Layout>
      <UserMenu user={user} />
    </Layout>
  );
}

function Layout({ children }) {
  // Не знает о user
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}

function UserMenu({ user }) {
  // Получает user напрямую от App
  return <div>{user.name}</div>;
}

// Преимущество: меньше уровней, user передаётся напрямую
// Недостаток: может усложнить структуру`
      }
    ],
    relatedTopics: ['frameworks-state-management-local-lifted-global', 'frameworks-state-management-flux'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-state-management-one-way-flow',
    title: 'Односторонний поток данных',
    difficulty: 'beginner',
    description: 'Односторонний поток данных — это принцип, при котором данные текут в одном направлении: сверху вниз через props, события текут снизу вверх через callbacks. Это создаёт предсказуемость: всегда знаете откуда пришли данные и куда идут события.\n\nОдносторонний поток защищает от хаоса: нет циклических зависимостей, нет неожиданных обновлений, легко отследить откуда пришло изменение. Это упрощает отладку: если что-то работает неправильно, вы знаете где искать — в данных, которые пришли сверху, или в событиях, которые пошли наверх.\n\nВ глобальном состоянии односторонний поток реализуется через паттерны типа Flux: действия (actions) отправляются в хранилище (store), которое обновляет состояние и уведомляет представления (views). Это создаёт предсказуемый цикл: action → store → view → action.\n\nВ 2026 односторонний поток данных стал стандартом во всех современных фреймворках. Даже когда используются глобальные хранилища (Redux, Zustand), принцип остаётся: данные текут в одном направлении, события в другом.',
    keyPoints: [
      'Односторонний поток: данные сверху вниз, события снизу вверх',
      'Создаёт предсказуемость: всегда знаете откуда данные и куда события',
      'Защищает от хаоса: нет циклических зависимостей, нет неожиданных обновлений',
      'Упрощает отладку: легко отследить откуда пришло изменение',
      'В глобальном состоянии реализуется через Flux: action → store → view',
      'Стандарт во всех современных фреймворках'
    ],
    funFact: 'Принцип одностороннего потока данных был популяризирован Flux в 2014 году, но идея существовала в программировании задолго до этого. В функциональном программировании это называется "immutable data flow".',
    tags: ['frameworks', 'state-management', 'one-way-flow', 'data-flow', 'basics', 'fundamentals'],
    examples: [
      {
        title: 'Односторонний поток в компонентах',
        code: `// Односторонний поток: данные вниз, события наверх
function App() {
  const [count, setCount] = useState(0);
  
  // Данные текут вниз
  return (
    <Counter 
      count={count}           // Данные вниз
      onIncrement={() => setCount(count + 1)} // Callback для событий наверх
    />
  );
}

function Counter({ count, onIncrement }) {
  // Получает данные сверху
  // Отправляет события наверх через callback
  return (
    <div>
      <p>{count}</p>
      <button onClick={onIncrement}>+</button>
    </div>
  );
}

// Поток: App → Counter (данные), Counter → App (события)
// Предсказуемо: всегда знаете откуда данные и куда события`
      },
      {
        title: 'Односторонний поток в Flux',
        code: `// Flux: односторонний поток данных
// 1. Action (действие)
const incrementAction = { type: 'INCREMENT' };

// 2. Dispatcher отправляет в Store
dispatcher.dispatch(incrementAction);

// 3. Store обновляет состояние
const counterStore = {
  state: { count: 0 },
  handleAction(action) {
    if (action.type === 'INCREMENT') {
      this.state.count++;
      this.notify(); // Уведомляет Views
    }
  }
};

// 4. Views обновляются
counterStore.on('change', () => {
  renderCounter(counterStore.state.count);
});

// Поток: Action → Store → View → Action
// Предсказуемо: всегда в одном направлении`
      },
      {
        title: 'Защита от хаоса',
        code: `// Односторонний поток защищает от хаоса
function App() {
  const [data, setData] = useState({ count: 0, name: 'Иван' });
  
  // Данные текут вниз
  return (
    <div>
      <Counter 
        count={data.count}
        onIncrement={() => setData(prev => ({ ...prev, count: prev.count + 1 }))}
      />
      <NameDisplay name={data.name} />
    </div>
  );
}

// Преимущества:
// - Нет циклических зависимостей
// - Нет неожиданных обновлений
// - Легко отследить: данные пришли от App, события идут в App
// - Предсказуемость: при одинаковых данных всегда одинаковый интерфейс`
      }
    ],
    relatedTopics: ['frameworks-reactivity-data-down-events-up', 'frameworks-state-management-flux'],
    isFrontendEssential: false
  }
];
