import { Topic } from '../../../types';

export const TYPESCRIPT_INTERFACES_TYPES_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-interface-vs-type',
    title: 'interface vs type',
    description: 'interface и type — два способа определения типов в TypeScript. interface используется для объектов и может быть расширен через extends. type более универсален и может описывать примитивы, union, intersection и другие конструкции. Выбор зависит от конкретной задачи.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'interfaces', 'types', 'basics', 'fundamentals'],
    keyPoints: [
      'interface: для объектов, поддерживает declaration merging, расширение через extends.',
      'type: универсальный, для примитивов, union, intersection, computed properties.',
      'Расширение: interface через extends, type через intersection (&).',
      'Declaration merging: только interface поддерживает объединение нескольких объявлений.',
      'Практика: interface для объектов и классов, type для union и сложных типов.',
      'Совместимость: в большинстве случаев взаимозаменяемы, но есть нюансы.'
    ],
    funFact: 'Declaration merging в interface позволяет расширять типы из библиотек без их модификации. Это уникальная особенность interface, которой нет у type.',
    examples: [
      {
        title: 'Базовое использование',
        code: `// interface для объектов
interface User {
  name: string;
  age: number;
}

// type для объектов (альтернатива)
type UserType = {
  name: string;
  age: number;
};

// Оба работают одинаково
const user: User = { name: "John", age: 30 };
const user2: UserType = { name: "John", age: 30 };`
      },
      {
        title: 'Расширение',
        code: `// interface через extends
interface Person {
  name: string;
}

interface User extends Person {
  email: string;
}

// type через intersection
type PersonType = {
  name: string;
};

type UserType = PersonType & {
  email: string;
};

// Результат одинаковый`
      },
      {
        title: 'Когда использовать type',
        code: `// type для union
type Status = "pending" | "success" | "error";

// type для примитивов
type ID = string | number;

// type для сложных типов
type Callback = (value: number) => void;

// interface не может это сделать напрямую`
      },
      {
        title: 'Declaration merging (только interface)',
        code: `// Можно объявить interface несколько раз
interface Window {
  title: string;
}

interface Window {
  width: number;
}

// Автоматически объединяются
const win: Window = {
  title: "My App",
  width: 800
  // ✅ Оба свойства доступны
};

// type не поддерживает это
// type Window = { title: string; }
// type Window = { width: number; } // ❌ ошибка`
      },
      {
        title: 'Практические рекомендации',
        code: `// ✅ interface для объектов и классов
interface ComponentProps {
  title: string;
  onClick: () => void;
}

// ✅ type для union и сложных типов
type ApiResponse<T> = 
  | { status: "success"; data: T }
  | { status: "error"; message: string };

// ✅ type для примитивов
type ID = string;
type Timestamp = number;`
      }
    ],
    relatedTopics: ['ts-interfaces-extending', 'ts-types-advanced']
  },
  {
    id: 'ts-optional-properties',
    title: 'Опциональные свойства',
    description: 'Опциональные свойства в TypeScript помечаются знаком вопроса (?). Такие свойства могут отсутствовать в объекте, но если присутствуют, должны иметь указанный тип. Полезны для частичных объектов и конфигураций.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'interfaces', 'optional', 'basics'],
    keyPoints: [
      'Синтаксис: property?: Type — свойство может отсутствовать.',
      'Проверка: перед использованием опционального свойства нужна проверка на undefined.',
      'Практика: конфигурации, пропсы компонентов, частичные обновления.',
      'Сочетание: можно комбинировать с readonly и другими модификаторами.',
      'Partial<T>: utility type, делает все свойства опциональными.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `interface User {
  name: string;        // обязательное
  age?: number;         // опциональное
  email?: string;       // опциональное
}

// Все варианты валидны
const user1: User = { name: "John" };
const user2: User = { name: "John", age: 30 };
const user3: User = { name: "John", age: 30, email: "john@example.com" };

// ❌ Ошибка: name обязательное
// const user4: User = { age: 30 };`
      },
      {
        title: 'Проверка опциональных свойств',
        code: `function processUser(user: User) {
  console.log(user.name); // ✅ всегда есть

  // ❌ Может быть undefined
  // console.log(user.age.toFixed());

  // ✅ Нужна проверка
  if (user.age !== undefined) {
    console.log(user.age.toFixed(2));
  }

  // ✅ Или через optional chaining
  console.log(user.age?.toFixed(2));
}`
      },
      {
        title: 'Сочетание с readonly',
        code: `interface Config {
  readonly apiUrl: string;
  readonly timeout?: number;  // опциональное и readonly
  retries?: number;            // только опциональное
}

const config: Config = {
  apiUrl: "https://api.example.com"
  // timeout можно не указывать
};

// config.apiUrl = "other"; // ❌ readonly
// config.timeout = 5000;   // ❌ readonly`
      }
    ],
    relatedTopics: ['ts-interfaces-extending', 'ts-partial-utility']
  },
  {
    id: 'ts-readonly-properties',
    title: 'Readonly свойства',
    description: 'Readonly свойства помечаются ключевым словом readonly и не могут быть изменены после инициализации. Полезны для создания иммутабельных структур данных и предотвращения случайных изменений.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'interfaces', 'readonly', 'immutability', 'basics'],
    keyPoints: [
      'Синтаксис: readonly property: Type — свойство только для чтения.',
      'Инициализация: readonly свойства можно задать только при создании объекта.',
      'Практика: конфигурации, константы, иммутабельные данные.',
      'Readonly<T>: utility type, делает все свойства readonly.',
      'Глубина: readonly поверхностный, не делает вложенные объекты readonly.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };

// ✅ Можно читать
console.log(point.x, point.y);

// ❌ Нельзя изменять
// point.x = 30; // ошибка

// Можно создать новый объект
const newPoint: Point = { x: 30, y: 40 };`
      },
      {
        title: 'Readonly массивы',
        code: `interface Config {
  readonly values: readonly number[];
}

const config: Config = {
  values: [1, 2, 3]
};

// ❌ Нельзя изменять массив
// config.values.push(4); // ошибка
// config.values[0] = 10; // ошибка

// Альтернативный синтаксис
const readonlyArray: ReadonlyArray<number> = [1, 2, 3];
// или
const readonlyArray2: readonly number[] = [1, 2, 3];`
      },
      {
        title: 'Поверхностная иммутабельность',
        code: `interface User {
  readonly name: string;
  readonly address: {
    street: string;
    city: string;
  };
}

const user: User = {
  name: "John",
  address: { street: "Main St", city: "NYC" }
};

// ❌ Нельзя изменить name
// user.name = "Jane";

// ⚠️ Но можно изменить вложенный объект!
user.address.street = "Other St"; // ✅ Работает (поверхностная иммутабельность)

// Для глубокой иммутабельности нужны специальные техники`
      }
    ],
    relatedTopics: ['ts-interfaces-extending', 'ts-readonly-utility']
  },
  {
    id: 'ts-index-signatures',
    title: 'Индексные сигнатуры',
    description: 'Индексные сигнатуры позволяют описывать объекты с динамическими ключами, когда точная структура неизвестна. Полезны для словарей, конфигураций с произвольными ключами и работы с данными извне.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'interfaces', 'index-signatures', 'basics'],
    keyPoints: [
      'Синтаксис: [key: string]: Type или [key: number]: Type.',
      'Строковые ключи: [key: string]: value — объект с любыми строковыми ключами.',
      'Числовые ключи: [key: number]: value — объект с числовыми ключами (как массив).',
      'Смешанные: можно комбинировать известные свойства с индексной сигнатурой.',
      'Ограничения: все значения должны соответствовать типу индексной сигнатуры.'
    ],
    examples: [
      {
        title: 'Строковые индексные сигнатуры',
        code: `// Словарь с строковыми ключами
interface Dictionary {
  [key: string]: string;
}

const dict: Dictionary = {
  "hello": "привет",
  "world": "мир"
};

dict["new"] = "новый"; // ✅
dict.another = "еще один"; // ✅

// Все значения должны быть string
// dict["number"] = 123; // ❌ ошибка`
      },
      {
        title: 'Числовые индексные сигнатуры',
        code: `// Объект с числовыми ключами
interface NumberDictionary {
  [key: number]: string;
}

const numDict: NumberDictionary = {
  1: "one",
  2: "two",
  3: "three"
};

numDict[4] = "four"; // ✅

// Похоже на массив, но это объект`
      },
      {
        title: 'Смешанные объекты',
        code: `// Известные свойства + индексная сигнатура
interface Config {
  apiUrl: string;           // обязательное свойство
  timeout: number;           // обязательное свойство
  [key: string]: string | number; // остальные свойства
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,                // ✅ через индексную сигнатуру
  debug: "true"              // ✅
};

// Все дополнительные свойства должны быть string | number`
      },
      {
        title: 'Практический пример: переводы',
        code: `interface Translations {
  [locale: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    hello: "Hello",
    goodbye: "Goodbye"
  },
  ru: {
    hello: "Привет",
    goodbye: "До свидания"
  }
};

function translate(locale: string, key: string): string {
  return translations[locale]?.[key] || key;
}`
      }
    ],
    relatedTopics: ['ts-objects', 'ts-interfaces-extending']
  },
  {
    id: 'ts-interfaces-extending',
    title: 'Расширение интерфейсов',
    description: 'Интерфейсы можно расширять через ключевое слово extends, создавая новые интерфейсы на основе существующих. Позволяет переиспользовать определения типов и создавать иерархии интерфейсов.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'interfaces', 'extending', 'inheritance', 'basics'],
    keyPoints: [
      'Синтаксис: interface Child extends Parent { } — наследование свойств.',
      'Множественное наследование: interface Child extends Parent1, Parent2 { }.',
      'Переопределение: можно переопределить свойство с более узким типом.',
      'Практика: базовые интерфейсы для общих свойств, специализированные для конкретных случаев.',
      'Отличие от type: interface использует extends, type использует intersection (&).'
    ],
    examples: [
      {
        title: 'Базовое расширение',
        code: `// Базовый интерфейс
interface Person {
  name: string;
  age: number;
}

// Расширение интерфейса
interface User extends Person {
  email: string;
  password: string;
}

// User имеет все свойства Person + свои
const user: User = {
  name: "John",
  age: 30,
  email: "john@example.com",
  password: "secret"
};`
      },
      {
        title: 'Множественное наследование',
        code: `interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

// Наследование от нескольких интерфейсов
interface Duck extends Flyable, Swimmable {
  quack(): void;
}

const duck: Duck = {
  fly() { },
  swim() { },
  quack() { }
};`
      },
      {
        title: 'Переопределение свойств',
        code: `interface Base {
  id: string | number;
}

// Можно сузить тип при расширении
interface User extends Base {
  id: string;  // более узкий тип
}

// ✅ Валидно: string - подтип string | number
const user: User = {
  id: "123"  // только string
};

// ❌ Нельзя расширить тип
// interface Invalid extends Base {
//   id: number | string | boolean; // ошибка
// }`
      },
      {
        title: 'Практический пример: компоненты',
        code: `// Базовый интерфейс для всех компонентов
interface BaseComponent {
  id: string;
  className?: string;
}

// Специализированные компоненты
interface Button extends BaseComponent {
  onClick: () => void;
  label: string;
}

interface Input extends BaseComponent {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Оба имеют id и className, но разные специфичные свойства`
      }
    ],
    relatedTopics: ['ts-interface-vs-type', 'ts-intersection-types']
  },
  {
    id: 'ts-intersection-types',
    title: 'Объединение типов (Intersection)',
    description: 'Intersection типы (&) комбинируют несколько типов в один, требуя, чтобы значение соответствовало всем типам одновременно. Полезны для создания комбинированных типов и расширения существующих типов.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'intersection', 'basics'],
    keyPoints: [
      'Синтаксис: Type1 & Type2 — значение должно соответствовать обоим типам.',
      'Расширение: альтернатива extends для type, комбинирование нескольких типов.',
      'Практика: миксины, расширение типов, комбинирование интерфейсов.',
      'Отличие от union: intersection требует все типы, union — один из типов.',
      'Порядок: порядок типов в intersection не важен (A & B === B & A).'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

// Intersection: должен иметь оба типа
type Staff = Person & Employee;

const staff: Staff = {
  name: "John",
  employeeId: 123
}; // ✅ имеет и name, и employeeId

// ❌ Ошибка: не хватает свойств
// const invalid: Staff = { name: "John" };`
      },
      {
        title: 'Расширение через intersection',
        code: `// Базовый тип
type Base = {
  id: string;
};

// Расширение через intersection
type User = Base & {
  name: string;
  email: string;
};

// Эквивалентно
type UserAlt = {
  id: string;
  name: string;
  email: string;
};`
      },
      {
        title: 'Комбинирование нескольких типов',
        code: `interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Identifiable {
  id: string;
}

interface Named {
  name: string;
}

// Комбинирование всех типов
type Entity = Timestamped & Identifiable & Named;

const entity: Entity = {
  id: "123",
  name: "John",
  createdAt: new Date(),
  updatedAt: new Date()
};`
      },
      {
        title: 'Практический пример: миксины',
        code: `// Функциональность, которую можно "примешать"
type Serializable = {
  serialize(): string;
};

type Validatable = {
  validate(): boolean;
};

// Комбинирование для создания полного типа
type FormField = {
  value: string;
} & Serializable & Validatable;

const field: FormField = {
  value: "test",
  serialize() { return this.value; },
  validate() { return this.value.length > 0; }
};`
      }
    ],
    relatedTopics: ['ts-union-intersection', 'ts-interfaces-extending']
  }
];
