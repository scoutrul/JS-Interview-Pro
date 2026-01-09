import { Topic } from '../../../../types';

export const COMPONENT_MODEL_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'frameworks-component-model-composition',
    title: 'Композиция компонентов',
    difficulty: 'intermediate',
    description: 'Композиция — это объединение простых компонентов в более сложные. Вместо создания одного большого компонента, который делает всё, вы создаёте маленькие компоненты и комбинируете их. Это как конструктор: из простых деталей собирается сложная конструкция.\n\nКомпозиция даёт гибкость: вы можете переиспользовать компоненты в разных комбинациях, создавать новые интерфейсы без написания нового кода. Например, компонент Button можно использовать в Form, Modal, Card — везде, где нужна кнопка.\n\nПаттерны композиции включают: Containment (компонент принимает children), Specialization (специализированный компонент использует базовый), Render Props (компонент принимает функцию рендеринга), HOC (Higher-Order Components, компонент оборачивает другой). Каждый паттерн решает свою задачу и подходит для разных сценариев.\n\nВ 2026 композиция стала стандартным подходом. Современные фреймворки предоставляют инструменты для композиции: slots в Vue, children в React, content projection в Angular. Понимание композиции критично для создания переиспользуемых компонентов.',
    keyPoints: [
      'Композиция: объединение простых компонентов в сложные',
      'Вместо одного большого компонента — много маленьких, которые комбинируются',
      'Гибкость: переиспользование компонентов в разных комбинациях',
      'Паттерны: Containment, Specialization, Render Props, HOC',
      'Современные фреймворки предоставляют инструменты для композиции',
      'Композиция — основа переиспользуемых компонентов'
    ],
    funFact: 'Идея композиции пришла из функционального программирования, где функции комбинируются для создания более сложного поведения. В React композиция компонентов — это адаптация этой идеи для UI.',
    tags: ['frameworks', 'components', 'composition', 'patterns', 'intermediate', 'architecture'],
    examples: [
      {
        title: 'Containment: компонент принимает children',
        code: `// Containment: компонент принимает children
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children} {/* Любое содержимое */}
      </div>
    </div>
  );
}

// Использование: передаём любое содержимое
<Card title="Пользователь">
  <UserProfile user={user} />
</Card>

<Card title="Статистика">
  <Stats data={stats} />
</Card>

// Преимущество: один компонент, разное содержимое`
      },
      {
        title: 'Specialization: специализированный компонент',
        code: `// Specialization: специализированный компонент использует базовый
function Button({ label, onClick, variant = 'primary' }) {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Специализированные компоненты
function PrimaryButton({ label, onClick }) {
  return <Button label={label} onClick={onClick} variant="primary" />;
}

function DangerButton({ label, onClick }) {
  return <Button label={label} onClick={onClick} variant="danger" />;
}

// Преимущество: переиспользование базового компонента`
      },
      {
        title: 'Render Props: функция рендеринга',
        code: `// Render Props: компонент принимает функцию рендеринга
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  // Вызываем функцию рендеринга с данными
  return render({ data, loading });
}

// Использование: передаём функцию рендеринга
<DataFetcher 
  url="/api/users"
  render={({ data, loading }) => (
    loading ? <Spinner /> : <UserList users={data} />
  )}
/>

// Преимущество: компонент управляет логикой, рендеринг гибкий`
      }
    ],
    relatedTopics: ['frameworks-component-model-controlled-uncontrolled', 'frameworks-component-model-container-presentational'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-component-model-controlled-uncontrolled',
    title: 'Controlled vs Uncontrolled',
    difficulty: 'intermediate',
    description: 'Controlled компонент — это компонент, состояние которого управляется родителем через props. Родитель контролирует значение и обновляет его через callback. Uncontrolled компонент — это компонент, который управляет своим состоянием самостоятельно, используя внутренний state или ref.\n\nControlled компоненты дают полный контроль родителю: вы можете валидировать, трансформировать, синхронизировать данные. Но они требуют больше кода: нужно управлять состоянием в родителе, передавать value и onChange. Uncontrolled компоненты проще в использовании: просто используете компонент, он сам управляет состоянием. Но контроль ограничен: сложнее валидировать, синхронизировать с другими компонентами.\n\nВыбор зависит от задачи: для простых форм uncontrolled может быть достаточно. Для сложных форм с валидацией, синхронизацией полей, условной логикой — controlled даёт больше контроля. В современных фреймворках controlled компоненты стали стандартом для форм, так как они дают предсказуемость и контроль.\n\nВ 2026 библиотеки форм (React Hook Form, Formik) используют гибридный подход: uncontrolled по умолчанию для производительности, но с возможностью сделать controlled для сложных сценариев.',
    keyPoints: [
      'Controlled: состояние управляется родителем через props (value, onChange)',
      'Uncontrolled: компонент управляет состоянием сам (внутренний state или ref)',
      'Controlled: полный контроль, но больше кода',
      'Uncontrolled: проще использовать, но меньше контроля',
      'Для простых форм — uncontrolled, для сложных — controlled',
      'Современные библиотеки форм используют гибридный подход'
    ],
    funFact: 'Термины "controlled" и "uncontrolled" пришли из React, но концепция существовала в программировании задолго до этого. В объектно-ориентированном программировании это называется "encapsulation" vs "external control".',
    tags: ['frameworks', 'components', 'controlled', 'uncontrolled', 'forms', 'intermediate', 'patterns'],
    examples: [
      {
        title: 'Controlled компонент',
        code: `// Controlled: родитель управляет состоянием
function App() {
  const [value, setValue] = useState('');
  
  // Родитель контролирует значение
  const handleChange = (e) => {
    setValue(e.target.value);
    // Можем валидировать, трансформировать
    if (e.target.value.length > 10) {
      alert('Слишком длинно');
    }
  };
  
  return (
    <input 
      value={value}        // Значение от родителя
      onChange={handleChange} // Обновление через callback
    />
  );
}

// Преимущество: полный контроль над данными`
      },
      {
        title: 'Uncontrolled компонент',
        code: `// Uncontrolled: компонент управляет состоянием сам
function App() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    // Получаем значение через ref
    const value = inputRef.current.value;
    console.log(value);
  };
  
  return (
    <input 
      ref={inputRef} // Ссылка на элемент
      defaultValue="начальное значение"
    />
  );
}

// Преимущество: проще использовать, меньше кода`
      },
      {
        title: 'Когда что использовать',
        code: `// ✅ Controlled: сложная форма с валидацией
function ComplexForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Валидация, синхронизация полей
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Валидация
    if (field === 'password' && value.length < 8) {
      setError('Пароль слишком короткий');
    }
    
    // Синхронизация
    if (field === 'password') {
      setFormData(prev => ({
        ...prev,
        confirmPassword: '' // Сброс подтверждения
      }));
    }
  };
  
  return (
    <form>
      <input 
        value={formData.email}
        onChange={e => handleChange('email', e.target.value)}
      />
      {/* ... */}
    </form>
  );
}

// ✅ Uncontrolled: простая форма
function SimpleForm() {
  const formRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    // Отправляем данные
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="email" />
      <input name="message" />
      <button type="submit">Отправить</button>
    </form>
  );
}`
      }
    ],
    relatedTopics: ['frameworks-component-model-container-presentational', 'frameworks-state-management-local-lifted-global'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-component-model-container-presentational',
    title: 'Container/Presentational',
    difficulty: 'intermediate',
    description: 'Container/Presentational — это паттерн разделения компонентов на два типа: Container (умные) и Presentational (глупые). Container компоненты управляют данными и логикой: получают данные, обрабатывают их, управляют состоянием. Presentational компоненты отвечают только за отображение: получают данные через props и отображают их.\n\nРазделение упрощает тестирование: Presentational компоненты легко тестировать, так как они просто отображают данные. Container компоненты тестируются отдельно, фокусируясь на логике. Это также упрощает переиспользование: один Presentational компонент может использоваться с разными Container компонентами.\n\nВ современных фреймворках этот паттерн эволюционировал: хуки (React) и composables (Vue) позволяют выносить логику из компонентов, делая их более переиспользуемыми. Но идея разделения остаётся актуальной: компоненты должны фокусироваться либо на логике, либо на представлении.\n\nВ 2026 этот паттерн стал менее явным благодаря хукам и composables, но принцип разделения ответственности остаётся важным для создания поддерживаемого кода.',
    keyPoints: [
      'Container: управляет данными и логикой (умный компонент)',
      'Presentational: отвечает только за отображение (глупый компонент)',
      'Разделение упрощает тестирование и переиспользование',
      'Presentational компоненты легко тестировать (просто отображают данные)',
      'Современные хуки и composables позволяют выносить логику из компонентов',
      'Принцип разделения ответственности остаётся важным'
    ],
    funFact: 'Паттерн Container/Presentational был популяризирован Дэном Абрамовым в 2015 году в статье "Presentational and Container Components". Хотя сейчас с появлением хуков этот паттерн стал менее явным, принцип разделения ответственности остаётся актуальным.',
    tags: ['frameworks', 'components', 'patterns', 'separation', 'intermediate', 'architecture'],
    examples: [
      {
        title: 'Presentational компонент',
        code: `// Presentational: только отображение
function UserList({ users, onUserClick }) {
  // Не знает откуда пришли данные
  // Не знает как они обрабатываются
  // Только отображает
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user.id)}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

// Преимущество: легко тестировать, легко переиспользовать
// Тест: передаём данные, проверяем отображение`
      },
      {
        title: 'Container компонент',
        code: `// Container: управляет данными и логикой
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Получаем данные
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);
  
  // Обрабатываем действия
  const handleUserClick = (userId) => {
    // Логика обработки
    navigate(\`/users/\${userId}\`);
  };
  
  // Передаём данные в Presentational компонент
  if (loading) return <Spinner />;
  
  return (
    <UserList 
      users={users}
      onUserClick={handleUserClick}
    />
  );
}

// Преимущество: логика отделена от представления`
      },
      {
        title: 'Современный подход: хуки',
        code: `// Современный подход: логика в хуке
function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);
  
  return { users, loading };
}

// Компонент использует хук
function UserList() {
  const { users, loading } = useUsers();
  
  if (loading) return <Spinner />;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Преимущество: логика переиспользуема, компонент проще`
      }
    ],
    relatedTopics: ['frameworks-component-model-composition', 'frameworks-state-management-local-lifted-global'],
    isFrontendEssential: true
  }
];
