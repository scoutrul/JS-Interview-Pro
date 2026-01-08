import { Topic } from '../../../types';

export const TYPESCRIPT_INTERFACES_TYPES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-declaration-merging',
    title: 'Declaration Merging',
    description: 'Declaration merging — это возможность TypeScript автоматически объединять несколько объявлений одного интерфейса в один. Уникальная особенность interface, которая позволяет расширять типы из библиотек без их модификации.',
    difficulty: 'intermediate',
    tags: ['typescript', 'interfaces', 'declaration-merging', 'intermediate'],
    keyPoints: [
      'Только interface: type не поддерживает declaration merging.',
      'Автоматическое объединение: несколько объявлений одного интерфейса объединяются.',
      'Практика: расширение глобальных типов (Window, Document), модульное расширение библиотек.',
      'Ограничения: конфликтующие типы свойств вызывают ошибку.',
      'Порядок: порядок объявлений не важен, все объединяются.'
    ],
    examples: [
      {
        title: 'Базовое объединение',
        code: `// Первое объявление
interface User {
  name: string;
}

// Второе объявление (объединяется автоматически)
interface User {
  age: number;
}

// Результат: User имеет и name, и age
const user: User = {
  name: "John",
  age: 30
};`
      },
      {
        title: 'Расширение глобальных типов',
        code: `// Расширение Window
interface Window {
  myCustomProperty: string;
  myCustomMethod(): void;
}

// Теперь доступно глобально
window.myCustomProperty = "value";
window.myCustomMethod(); // ✅

// Расширение Document
interface Document {
  customMethod(): void;
}

document.customMethod(); // ✅`
      },
      {
        title: 'Модульное расширение',
        code: `// В файле types/user.d.ts
interface User {
  id: string;
  name: string;
}

// В другом файле можно расширить
interface User {
  email: string;
}

// В третьем файле еще расширить
interface User {
  age: number;
}

// Все объявления объединяются`
      },
      {
        title: 'Конфликты типов',
        code: `interface Config {
  timeout: number;
}

// ✅ Можно расширить
interface Config {
  retries: number;
}

// ❌ Конфликт типов
// interface Config {
//   timeout: string; // ошибка: timeout уже number
// }`
      }
    ],
    relatedTopics: ['ts-interface-vs-type', 'ts-module-augmentation']
  },
  {
    id: 'ts-generic-interfaces',
    title: 'Generic интерфейсы',
    description: 'Generic интерфейсы позволяют создавать переиспользуемые интерфейсы с параметрами типов. Полезны для создания универсальных структур данных и API, которые работают с разными типами.',
    difficulty: 'intermediate',
    tags: ['typescript', 'interfaces', 'generics', 'intermediate'],
    keyPoints: [
      'Синтаксис: interface Name<T> { } — интерфейс с параметром типа.',
      'Множественные параметры: interface Name<T, U> { } — несколько параметров.',
      'Constraints: interface Name<T extends Base> { } — ограничения на параметры.',
      'Практика: коллекции, API ответы, контейнеры данных.',
      'Переиспользование: один интерфейс для разных типов данных.'
    ],
    examples: [
      {
        title: 'Базовый generic интерфейс',
        code: `// Интерфейс для коллекции любого типа
interface Collection<T> {
  items: T[];
  add(item: T): void;
  get(index: number): T | undefined;
}

// Использование с разными типами
const numbers: Collection<number> = {
  items: [1, 2, 3],
  add(item) { this.items.push(item); },
  get(index) { return this.items[index]; }
};

const strings: Collection<string> = {
  items: ["a", "b", "c"],
  add(item) { this.items.push(item); },
  get(index) { return this.items[index]; }
};`
      },
      {
        title: 'Множественные параметры',
        code: `// Интерфейс для пары ключ-значение
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<string, number> = {
  key: "age",
  value: 30
};

const pair2: KeyValuePair<number, string> = {
  key: 1,
  value: "first"
};`
      },
      {
        title: 'С constraints',
        code: `// Ограничение: T должен иметь id
interface Identifiable {
  id: string;
}

interface Repository<T extends Identifiable> {
  findById(id: string): T | undefined;
  save(entity: T): void;
}

// T должен иметь id
interface User extends Identifiable {
  name: string;
}

const userRepo: Repository<User> = {
  findById(id) { /* ... */ },
  save(user) { /* user имеет id */ }
};`
      },
      {
        title: 'Практический пример: API ответы',
        code: `// Generic интерфейс для API ответов
interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  error?: string;
}

// Использование с разными типами данных
type UserResponse = ApiResponse<{ id: string; name: string }>;
type ProductResponse = ApiResponse<{ id: string; title: string; price: number }>;

function handleResponse<T>(response: ApiResponse<T>): T | null {
  if (response.status === "success" && response.data) {
    return response.data;
  }
  return null;
}`
      }
    ],
    relatedTopics: ['ts-generics-basics', 'ts-mapped-types']
  }
];
