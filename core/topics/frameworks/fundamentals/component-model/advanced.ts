import { Topic } from '../../../../types';

export const COMPONENT_MODEL_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'frameworks-component-model-architectural-boundary',
    title: 'Компонент как архитектурная граница',
    difficulty: 'advanced',
    description: 'Компонент — это не только единица UI, но и архитектурная граница. Он определяет границы владения: кто владеет данными, кто отвечает за логику, кто тестирует код. Компонент инкапсулирует не только код, но и ответственность.\n\nАрхитектурная граница определяет изоляцию: изменения внутри компонента не должны влиять на другие компоненты. Это позволяет командам работать параллельно, не мешая друг другу. Каждый компонент может иметь свои тесты, свою документацию, свою версию.\n\nВ больших приложениях компоненты становятся модулями: они могут быть в разных пакетах, развёрнуты отдельно (micro-frontends), иметь свои зависимости. Понимание компонента как архитектурной границы критично для масштабирования команды и приложения.\n\nВ 2026 с ростом популярности micro-frontends компонент как архитектурная граница становится ещё важнее. Компоненты могут быть написаны на разных фреймворках, развёрнуты отдельно, но работать вместе через чётко определённые интерфейсы.',
    keyPoints: [
      'Компонент определяет границы владения: данные, логика, тесты',
      'Архитектурная граница обеспечивает изоляцию: изменения не влияют на другие компоненты',
      'Позволяет командам работать параллельно над разными компонентами',
      'В больших приложениях компоненты становятся модулями',
      'Критично для масштабирования команды и приложения',
      'В micro-frontends компонент как граница становится ещё важнее'
    ],
    funFact: 'Идея компонента как архитектурной границы пришла из модульного программирования 1970-х годов. В 2000-х Microsoft популяризировала это через COM (Component Object Model), а современные UI-фреймворки адаптировали для веба.',
    tags: ['frameworks', 'components', 'architecture', 'boundaries', 'advanced', 'scaling'],
    examples: [
      {
        title: 'Границы владения',
        code: `// Компонент определяет границы владения
// PaymentForm компонент владеет:
// - Логикой валидации платежей
// - Состоянием формы
// - Тестами компонента
// - Документацией API

function PaymentForm({ onSuccess }) {
  // Владеет логикой валидации
  const validateCard = (cardNumber) => {
    // Логика валидации
  };
  
  // Владеет состоянием формы
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  
  // Владеет обработкой отправки
  const handleSubmit = async () => {
    if (validateCard(formData.cardNumber)) {
      await processPayment(formData);
      onSuccess();
    }
  };
  
  return (/* ... */);
}

// Другие компоненты не знают о деталях валидации
// Изменения в PaymentForm не влияют на другие компоненты`
      },
      {
        title: 'Изоляция и параллельная работа',
        code: `// Команда A работает над UserProfile
// Команда B работает над ProductCard
// Они не мешают друг другу

// UserProfile (команда A)
function UserProfile({ userId }) {
  // Изоляция: изменения здесь не влияют на ProductCard
  const [user, setUser] = useState(null);
  // ...
}

// ProductCard (команда B)
function ProductCard({ productId }) {
  // Изоляция: изменения здесь не влияют на UserProfile
  const [product, setProduct] = useState(null);
  // ...
}

// Преимущество: параллельная разработка без конфликтов`
      },
      {
        title: 'Компонент как модуль в micro-frontends',
        code: `// В micro-frontends компонент может быть отдельным приложением
// PaymentForm развёрнут отдельно, но используется в основном приложении

// Основное приложение
function CheckoutPage() {
  return (
    <div>
      <CartSummary />
      <PaymentForm 
        // Компонент загружается с другого сервера
        // Но работает через чётко определённый интерфейс
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

// PaymentForm (отдельное приложение)
// Может быть на React, Vue, Angular
// Главное: чёткий интерфейс (props, events)

// Преимущество: независимое развёртывание, разные команды, разные технологии`
      }
    ],
    relatedTopics: ['frameworks-component-model-antipatterns', 'frameworks-architecture-feature-based'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-component-model-antipatterns',
    title: 'Антипаттерны компонентов',
    difficulty: 'advanced',
    description: 'Антипаттерны компонентов — это распространённые ошибки, которые усложняют код и делают его неподдерживаемым. Божественный компонент (God Component) — это компонент, который делает слишком много: управляет состоянием, обрабатывает данные, отображает UI, вызывает API. Он нарушает принцип единственной ответственности.\n\nПропс-дриллинг (Props Drilling) — это передача props через множество уровней компонентов, которые не используют эти props, а только передают их дальше. Это создаёт ненужные зависимости и усложняет рефакторинг.\n\nДругие антипаттерны: мутация props (изменение props внутри компонента), избыточное состояние (дублирование данных между props и state), тесная связанность (компонент знает слишком много о других компонентах). Понимание антипаттернов помогает избежать их и писать более чистый код.\n\nВ 2026 инструменты (ESLint правила, TypeScript) помогают обнаруживать антипаттерны на этапе разработки. Но понимание принципов остаётся важным для создания поддерживаемого кода.',
    keyPoints: [
      'Божественный компонент: делает слишком много, нарушает единственную ответственность',
      'Пропс-дриллинг: передача props через множество уровней без использования',
      'Мутация props: изменение props внутри компонента (нарушает неизменяемость)',
      'Избыточное состояние: дублирование данных между props и state',
      'Тесная связанность: компонент знает слишком много о других компонентах',
      'Инструменты помогают обнаруживать антипаттерны, но понимание принципов важно'
    ],
    funFact: 'Термин "God Object" (божественный объект) был введён в 1995 году в книге "Design Patterns" как антипаттерн объектно-ориентированного программирования. В контексте компонентов это стало "God Component".',
    tags: ['frameworks', 'components', 'antipatterns', 'best-practices', 'advanced', 'refactoring'],
    examples: [
      {
        title: 'Божественный компонент',
        code: `// ❌ Плохо: компонент делает слишком много
function GodComponent() {
  // Управляет состоянием
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  // Получает данные
  useEffect(() => {
    fetch('/api/users').then(setUsers);
    fetch('/api/products').then(setProducts);
  }, []);
  
  // Обрабатывает данные
  const processUsers = () => { /* ... */ };
  const processProducts = () => { /* ... */ };
  
  // Управляет корзиной
  const addToCart = (product) => { /* ... */ };
  const removeFromCart = (id) => { /* ... */ };
  
  // Валидирует форму
  const validateForm = () => { /* ... */ };
  
  // Отображает всё
  return (
    <div>
      {/* 500 строк JSX */}
    </div>
  );
}

// ✅ Хорошо: разделение на компоненты
function App() {
  return (
    <div>
      <UserList />
      <ProductList />
      <Cart />
    </div>
  );
}`
      },
      {
        title: 'Пропс-дриллинг',
        code: `// ❌ Плохо: пропс-дриллинг
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
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  // Наконец использует user
  return <div>{user.name}</div>;
}

// ✅ Хорошо: Context или композиция
const UserContext = createContext();

function App() {
  const user = { id: 1, name: 'Иван' };
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function UserMenu() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}`
      },
      {
        title: 'Мутация props',
        code: `// ❌ Плохо: мутация props
function UserCard({ user }) {
  // Мутация props нарушает неизменяемость
  user.name = 'Новое имя'; // ❌ Нельзя!
  
  return <div>{user.name}</div>;
}

// ✅ Хорошо: создание нового объекта
function UserCard({ user, onUpdate }) {
  const handleChange = (newName) => {
    // Создаём новый объект
    onUpdate({ ...user, name: newName });
  };
  
  return (
    <div>
      <input 
        value={user.name}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  );
}

// Преимущество: предсказуемость, легче отлаживать`
      }
    ],
    relatedTopics: ['frameworks-component-model-architectural-boundary', 'frameworks-state-management-prop-drilling'],
    isFrontendEssential: false
  }
];
