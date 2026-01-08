import { Topic } from '../../../types';

export const TYPESCRIPT_REACT_TYPING_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-react-components',
    title: 'React компоненты',
    description: 'React компоненты типизируются через React.FC или явную типизацию пропсов. React.ComponentType позволяет типизировать компоненты как значения. Дженерики используются для типизации пропсов с параметрами типа.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'react', 'components', 'typing', 'intermediate', 'fundamentals'],
    keyPoints: [
      'React.FC<Props>: функциональный компонент с типизированными пропсами.',
      'Явная типизация: const Component = (props: Props) => { } — альтернатива FC.',
      'React.ComponentType<Props>: тип для компонента как значения.',
      'Дженерики: компоненты с generic пропсами для переиспользования.'
    ],
    examples: [
      {
        title: 'React.FC',
        code: `interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};`
      },
      {
        title: 'Явная типизация',
        code: `const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};`
      },
      {
        title: 'Generic компонент',
        code: `interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}`
      }
    ],
    relatedTopics: ['ts-react-props', 'ts-react-hooks']
  },
  {
    id: 'ts-react-props',
    title: 'Пропсы и state',
    description: 'Пропсы компонентов типизируются через интерфейсы или типы. State типизируется через дженерики useState<Type>. Позволяет получить типобезопасность для всех данных компонента.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'react', 'props', 'state', 'intermediate', 'fundamentals'],
    keyPoints: [
      'Пропсы: interface Props { } для описания структуры пропсов.',
      'State: useState<Type>(initialValue) — типизация состояния.',
      'Опциональные пропсы: prop?: Type — могут отсутствовать.',
      'Default props: значения по умолчанию для опциональных пропсов.'
    ],
    examples: [
      {
        title: 'Типизация пропсов',
        code: `interface UserCardProps {
  name: string;
  age: number;
  email?: string; // опциональный
}

const UserCard: React.FC<UserCardProps> = ({ name, age, email }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {email && <p>Email: {email}</p>}
    </div>
  );
};`
      },
      {
        title: 'Типизация state',
        code: `const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};`
      }
    ],
    relatedTopics: ['ts-react-components', 'ts-react-hooks']
  },
  {
    id: 'ts-react-events',
    title: 'События',
    description: 'События в React типизируются через React.ChangeEvent, React.MouseEvent и другие типы. Каждый тип события привязан к конкретному элементу (HTMLInputElement, HTMLButtonElement).',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'react', 'events', 'intermediate', 'fundamentals'],
    keyPoints: [
      'React.ChangeEvent<HTMLInputElement>: события изменения input.',
      'React.MouseEvent<HTMLButtonElement>: события клика на кнопку.',
      'React.FormEvent<HTMLFormElement>: события формы.',
      'event.target: типизированный доступ к элементу события.'
    ],
    examples: [
      {
        title: 'Типизация событий',
        code: `const Input: React.FC = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value); // ✅ Тип string
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.clientX, e.clientY); // ✅ Координаты
  };

  return (
    <>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Click</button>
    </>
  );
};`
      }
    ],
    relatedTopics: ['ts-react-components', 'ts-dom-events']
  },
  {
    id: 'ts-react-hooks',
    title: 'Хуки',
    description: 'Хуки React типизируются через дженерики: useState<Type>, useRef<Type>, useEffect и другие. Собственные хуки также должны быть типизированы, особенно если возвращают кортеж с функцией.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'react', 'hooks', 'intermediate', 'fundamentals'],
    keyPoints: [
      'useState<Type>: типизация состояния через generic параметр.',
      'useRef<Type>: типизация рефа, может быть null для DOM элементов.',
      'Собственные хуки: типизация параметров и возвращаемого значения.',
      'Кортежи: хуки, возвращающие [value, setValue], должны типизировать оба элемента.'
    ],
    examples: [
      {
        title: 'Типизация встроенных хуков',
        code: `const Component: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Типизированный доступ
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} />;
};`
      },
      {
        title: 'Собственный хук',
        code: `function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Использование
const { count, increment } = useCounter(10);`
      }
    ],
    relatedTopics: ['ts-react-props', 'ts-react-refs']
  },
  {
    id: 'ts-react-refs',
    title: 'Рефы',
    description: 'Рефы в React типизируются через useRef<Type>(null) для DOM элементов или useRef<Type>() для значений. forwardRef позволяет типизировать рефы, передаваемые в дочерние компоненты.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'react', 'refs', 'forwardref', 'intermediate', 'fundamentals'],
    keyPoints: [
      'useRef<HTMLInputElement>(null): реф для DOM элемента, может быть null.',
      'useRef<Type>(): реф для значения, не связанного с DOM.',
      'forwardRef: типизация рефов, передаваемых в дочерние компоненты.',
      'Практика: доступ к DOM элементам, хранение значений между рендерами.'
    ],
    examples: [
      {
        title: 'useRef для DOM',
        code: `const Input: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus(); // ✅ Optional chaining
  };

  return <input ref={inputRef} />;
};`
      },
      {
        title: 'forwardRef',
        code: `interface ButtonProps {
  label: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label }, ref) => {
    return <button ref={ref}>{label}</button>;
  }
);

// Использование
const buttonRef = useRef<HTMLButtonElement>(null);
<Button ref={buttonRef} label="Click" />`
      }
    ],
    relatedTopics: ['ts-react-hooks', 'ts-react-components']
  },
  {
    id: 'ts-react-context',
    title: 'Context API',
    description: 'Context API типизируется через createContext<Type>(defaultValue). Provider и Consumer получают типизированные значения. useContext возвращает типизированное значение контекста.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'react', 'context', 'intermediate', 'fundamentals'],
    keyPoints: [
      'createContext<Type>: создание типизированного контекста.',
      'useContext: получение типизированного значения контекста.',
      'Практика: глобальное состояние, темы, аутентификация.'
    ],
    examples: [
      {
        title: 'Типизация Context',
        code: `interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(t => t === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Использование
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};`
      }
    ],
    relatedTopics: ['ts-react-hooks', 'ts-react-components']
  }
];
