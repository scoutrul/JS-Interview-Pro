import { Topic } from '../../../../types';

export const COMPONENT_MODEL_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'frameworks-component-model-atom',
    title: 'Компонент как атом UI',
    difficulty: 'beginner',
    description: 'Компонент — это минимальная переиспользуемая единица интерфейса, которая инкапсулирует логику, состояние и представление. Как атом в химии является базовой единицей вещества, компонент является базовой единицей UI. Он имеет чёткие границы ответственности: знает только о себе и своих дочерних компонентах, не знает о родителях или соседях.\n\nПреимущество компонентного подхода в том, что вы можете собрать сложный интерфейс из простых блоков. Каждый компонент решает одну задачу: кнопка — отображает кнопку и обрабатывает клики, форма — собирает данные, список — отображает элементы. Это делает код предсказуемым и тестируемым.\n\nКомпонент должен быть самодостаточным: он получает данные через props (интерфейс), управляет внутренним состоянием через state, и отображает результат через template. Если компонент зависит от внешних данных или логики, это нарушает инкапсуляцию и усложняет переиспользование.\n\nВ 2026 компонентная модель стала настолько стандартной, что даже дизайн-системы (Material-UI, Ant Design, Chakra UI) строятся на компонентах. Это позволяет создавать консистентные интерфейсы, переиспользуя готовые компоненты.',
    keyPoints: [
      'Компонент = минимальная переиспользуемая единица UI с чёткими границами',
      'Инкапсулирует логику, состояние и представление в одном месте',
      'Знает только о себе и дочерних компонентах, не знает о родителях',
      'Сложный интерфейс собирается из простых компонентов',
      'Самодостаточность: получает данные через props, управляет state, отображает через template',
      'Компонентная модель — основа всех современных фреймворков'
    ],
    funFact: 'Идея компонентов пришла из объектно-ориентированного программирования. В 1990-х годах Microsoft создала COM (Component Object Model) для переиспользования кода. Современные UI-компоненты — это адаптация этой идеи для веб-интерфейсов.',
    tags: ['frameworks', 'components', 'ui', 'encapsulation', 'basics', 'fundamentals', 'architecture'],
    examples: [
      {
        title: 'Компонент как атом',
        code: `// Компонент Button: минимальная единица UI
function Button({ label, onClick }) {
  // Инкапсулирует: логику (onClick), представление (кнопка)
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}

// Компонент Form: собирается из атомов
function Form() {
  return (
    <form>
      <Button label="Отправить" onClick={handleSubmit} />
      <Button label="Отмена" onClick={handleCancel} />
    </form>
  );
}

// Преимущество: Button можно переиспользовать везде`
      },
      {
        title: 'Чёткие границы ответственности',
        code: `// ✅ Хорошо: компонент знает только о себе
function UserCard({ user }) {
  // Компонент знает: как отобразить пользователя
  // Не знает: откуда пришёл user, куда он пойдёт дальше
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// ❌ Плохо: компонент знает слишком много
function UserCard({ user }) {
  // Компонент знает о родителе (fetchUser)
  // Нарушает инкапсуляцию
  useEffect(() => {
    fetchUser(user.id); // Не должен знать об этом
  }, []);
  
  return <div>{user.name}</div>;
}`
      },
      {
        title: 'Самодостаточность компонента',
        code: `// ✅ Хорошо: компонент самодостаточен
function Counter() {
  // Всё внутри компонента
  const [count, setCount] = useState(0);
  
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

// ❌ Плохо: зависит от внешнего состояния
let externalCount = 0; // Вне компонента

function Counter() {
  // Зависит от внешней переменной
  // Нельзя переиспользовать
  return <div>{externalCount}</div>;
}`
      }
    ],
    relatedTopics: ['frameworks-component-model-props-state-template', 'frameworks-component-model-tree', 'react-mental-model', 'vue-options-vs-composition'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-component-model-props-state-template',
    title: 'Props, State, Template',
    difficulty: 'beginner',
    description: 'Каждый компонент состоит из трёх частей: Props (интерфейс), State (внутреннее состояние), Template (визуализация). Props — это данные, которые компонент получает от родителя. Они неизменяемы (immutable) и используются для настройки компонента. State — это внутреннее состояние компонента, которое может изменяться и влияет на отображение. Template — это описание того, как компонент выглядит.\n\nProps определяют интерфейс компонента: что он принимает, какие данные нужны для работы. State определяет поведение: как компонент реагирует на действия пользователя, какое у него внутреннее состояние. Template определяет внешний вид: как данные преобразуются в HTML.\n\nРазделение на Props, State и Template делает компонент предсказуемым: при одинаковых props и state всегда будет одинаковый template. Это упрощает тестирование и отладку. Если что-то работает неправильно, вы знаете где искать: в props (данные), state (состояние) или template (отображение).\n\nВ 2026 это разделение стало настолько стандартным, что даже в разных фреймворках (React, Vue, Angular) используется похожая терминология, хотя реализация может отличаться.',
    keyPoints: [
      'Props: данные от родителя, неизменяемые, настройка компонента',
      'State: внутреннее состояние, изменяемое, влияет на отображение',
      'Template: описание внешнего вида, преобразование данных в HTML',
      'Props определяют интерфейс, State — поведение, Template — внешний вид',
      'При одинаковых props и state всегда одинаковый template (предсказуемость)',
      'Разделение упрощает тестирование и отладку'
    ],
    funFact: 'Термин "props" (properties) пришёл из React, но идея передачи данных от родителя к ребёнку существовала в программировании задолго до этого. В объектно-ориентированном программировании это называется "dependency injection".',
    tags: ['frameworks', 'components', 'props', 'state', 'template', 'basics', 'fundamentals'],
    examples: [
      {
        title: 'Props: интерфейс компонента',
        code: `// Props: данные от родителя
function UserCard({ name, email }) {
  // name и email — это props
  // Они неизменяемы, приходят от родителя
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

// Использование: передаём props
<UserCard name="Иван" email="ivan@example.com" />

// Props определяют интерфейс: что компонент принимает`
      },
      {
        title: 'State: внутреннее состояние',
        code: `// State: внутреннее состояние компонента
function Counter() {
  // count — это state
  // Может изменяться внутри компонента
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1); // Изменяем state
  };
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

// State определяет поведение: как компонент реагирует на действия`
      },
      {
        title: 'Template: визуализация',
        code: `// Template: описание внешнего вида
function UserProfile({ user, isOnline }) {
  // Template преобразует props и state в HTML
  return (
    <div className="profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <span className={isOnline ? 'online' : 'offline'}>
        {isOnline ? 'В сети' : 'Не в сети'}
      </span>
    </div>
  );
}

// Template определяет: как данные выглядят
// При одинаковых props и state всегда одинаковый результат`
      }
    ],
    relatedTopics: ['frameworks-component-model-atom', 'frameworks-reactivity-auto-update'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-component-model-tree',
    title: 'Дерево компонентов',
    difficulty: 'beginner',
    description: 'Компоненты образуют дерево: корневой компонент содержит дочерние, те содержат свои дочерние, и так далее. Это дерево компонентов отражает структуру интерфейса. Каждый компонент знает только о своих дочерних компонентах, не знает о родителях или соседях.\n\nДерево компонентов — это ментальная модель для понимания структуры приложения. Когда вы видите интерфейс, вы можете представить его как дерево: App содержит Header и Main, Main содержит Sidebar и Content, Content содержит список статей. Это упрощает навигацию по коду и понимание зависимостей.\n\nДанные в дереве компонентов текут сверху вниз (data down): родитель передаёт данные дочерним компонентам через props. События текут снизу вверх (events up): дочерний компонент отправляет событие родителю через callback. Это однонаправленный поток данных, который делает приложение предсказуемым.\n\nВ 2026 инструменты разработки (React DevTools, Vue DevTools) визуализируют дерево компонентов, что упрощает отладку. Вы можете видеть структуру приложения, состояние каждого компонента, и как данные передаются между компонентами.',
    keyPoints: [
      'Компоненты образуют дерево: корневой → дочерние → их дочерние',
      'Дерево отражает структуру интерфейса',
      'Каждый компонент знает только о дочерних, не знает о родителях',
      'Data down: данные текут сверху вниз через props',
      'Events up: события текут снизу вверх через callbacks',
      'Однонаправленный поток данных делает приложение предсказуемым'
    ],
    funFact: 'Идея дерева компонентов пришла из DOM (Document Object Model), где HTML элементы тоже образуют дерево. Компоненты — это абстракция над DOM, которая упрощает работу с интерфейсом.',
    tags: ['frameworks', 'components', 'tree', 'data-flow', 'basics', 'fundamentals', 'architecture'],
    examples: [
      {
        title: 'Дерево компонентов',
        code: `// Дерево компонентов:
// App
//   ├── Header
//   │     ├── Logo
//   │     └── Navigation
//   └── Main
//         ├── Sidebar
//         │     └── Menu
//         └── Content
//               └── ArticleList
//                     └── Article (×3)

function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

function Main() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// Каждый компонент знает только о своих дочерних`
      },
      {
        title: 'Data down: props текут сверху вниз',
        code: `// Data down: данные от родителя к ребёнку
function App() {
  const user = { name: 'Иван', email: 'ivan@example.com' };
  
  // Передаём данные вниз через props
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  // Получаем данные от родителя
  // Передаём дальше вниз
  return (
    <div>
      <UserName name={user.name} />
      <UserEmail email={user.email} />
    </div>
  );
}

// Данные текут: App → UserProfile → UserName/UserEmail`
      },
      {
        title: 'Events up: события снизу вверх',
        code: `// Events up: события от ребёнка к родителю
function App() {
  const [count, setCount] = useState(0);
  
  // Callback для получения события от ребёнка
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  // Передаём callback вниз
  return <Counter onIncrement={handleIncrement} />;
}

function Counter({ onIncrement }) {
  // Отправляем событие наверх через callback
  return (
    <button onClick={onIncrement}>
      Увеличить
    </button>
  );
}

// События текут: Counter → App (через callback)`
      }
    ],
    relatedTopics: ['frameworks-component-model-atom', 'frameworks-reactivity-data-down-events-up'],
    isFrontendEssential: false
  }
];
