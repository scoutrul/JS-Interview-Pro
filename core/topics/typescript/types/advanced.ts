import { Topic } from '../../../types';

export const TYPESCRIPT_TYPES_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'ts-branded-types',
    title: 'Branded Types',
    description: 'Branded types — это техника создания номинальных типов в TypeScript, который по умолчанию использует структурную типизацию. Добавляя уникальное "брендированное" свойство к типу, можно различать структурно идентичные типы.',
    difficulty: 'advanced',
    tags: ['typescript', 'types', 'branded-types', 'advanced'],
    keyPoints: [
      'Проблема: TypeScript использует структурную типизацию, одинаковые структуры совместимы.',
      'Решение: добавление уникального свойства-бренда для различения типов.',
      'Практика: различение ID разных сущностей, единицы измерения, безопасные типы.',
      'Реализация: type UserId = string & { __brand: "UserId" } — intersection с уникальным свойством.',
      'Использование: создание безопасных оберток для примитивов.'
    ],
    examples: [
      {
        title: 'Базовый branded type',
        code: `// Проблема: UserId и OrderId структурно одинаковы
type UserId = string;
type OrderId = string;

function getUser(id: UserId) { }
function getOrder(id: OrderId) { }

const userId: UserId = "user-123";
getOrder(userId); // ✅ Ошибки нет, но логически неправильно!

// Решение: branded types
type UserId = string & { __brand: "UserId" };
type OrderId = string & { __brand: "OrderId" };

function getUser(id: UserId) { }
function getOrder(id: OrderId) { }

const userId = "user-123" as UserId;
// getOrder(userId); // ❌ Ошибка: типы не совместимы`
      },
      {
        title: 'Создание branded значений',
        code: `type UserId = string & { __brand: "UserId" };
type OrderId = string & { __brand: "OrderId" };

// Функция для создания branded значения
function createUserId(id: string): UserId {
  return id as UserId;
}

function createOrderId(id: string): OrderId {
  return id as OrderId;
}

// Использование
const userId = createUserId("user-123");
const orderId = createOrderId("order-456");

function getUser(id: UserId) {
  return { id, name: "John" };
}

getUser(userId); // ✅
// getUser(orderId); // ❌ ошибка`
      },
      {
        title: 'Практический пример: единицы измерения',
        code: `// Различение метров и килограммов
type Meters = number & { __brand: "Meters" };
type Kilograms = number & { __brand: "Kilograms" };

function createMeters(value: number): Meters {
  return value as Meters;
}

function createKilograms(value: number): Kilograms {
  return value as Kilograms;
}

function calculateSpeed(distance: Meters, time: number): number {
  return distance / time;
}

const distance = createMeters(100);
const weight = createKilograms(70);

calculateSpeed(distance, 10); // ✅
// calculateSpeed(weight, 10); // ❌ ошибка: нельзя использовать вес как расстояние`
      }
    ],
    relatedTopics: ['ts-phantom-types', 'ts-nominal-typing']
  },
  {
    id: 'ts-phantom-types',
    title: 'Phantom Types',
    description: 'Phantom types — это техника, где тип-параметр используется только для проверки типов, но не присутствует в значении во время выполнения. Позволяет создавать более безопасные API с дополнительной информацией о типе.',
    difficulty: 'advanced',
    tags: ['typescript', 'types', 'phantom-types', 'advanced'],
    keyPoints: [
      'Phantom параметр: тип-параметр, который не используется в структуре значения.',
      'Использование: маркировка состояний, валидация, безопасные преобразования.',
      'Практика: различение валидированных и невалидированных данных, состояния объектов.',
      'Реализация: generic тип с параметром, который не влияет на структуру.',
      'Нишевая тема: редко используется в повседневной разработке.'
    ],
    examples: [
      {
        title: 'Базовый phantom type',
        code: `// Phantom параметр Validated не влияет на структуру
interface User<T = never> {
  name: string;
  email: string;
}

type UnvalidatedUser = User<never>;
type ValidatedUser = User<{ validated: true }>;

function validateUser(user: UnvalidatedUser): ValidatedUser {
  // Валидация
  if (!user.email.includes("@")) {
    throw new Error("Invalid email");
  }
  return user as ValidatedUser;
}

function saveUser(user: ValidatedUser) {
  // Можно сохранять только валидированных пользователей
}

const user: UnvalidatedUser = { name: "John", email: "john@example.com" };
const validated = validateUser(user);
saveUser(validated); // ✅
// saveUser(user); // ❌ ошибка: невалидированный пользователь`
      },
      {
        title: 'Практический пример: состояния',
        code: `// Различение состояний объекта
interface Request<State = "pending"> {
  url: string;
  method: string;
}

type PendingRequest = Request<"pending">;
type CompletedRequest = Request<"completed">;
type FailedRequest = Request<"failed">;

function sendRequest(req: PendingRequest): Promise<CompletedRequest> {
  return fetch(req.url).then(() => req as CompletedRequest);
}

function handleRequest(req: CompletedRequest) {
  // Обработка только завершенных запросов
}

const request: PendingRequest = { url: "/api", method: "GET" };
sendRequest(request).then(handleRequest); // ✅`
      }
    ],
    relatedTopics: ['ts-branded-types', 'ts-nominal-typing']
  },
  {
    id: 'ts-nominal-typing',
    title: 'Nominal Typing Patterns',
    description: 'Nominal typing patterns — это техники имитации номинальной типизации в TypeScript, который использует структурную типизацию. Позволяют различать структурно идентичные типы через различные подходы: branded types, phantom types, unique symbols.',
    difficulty: 'advanced',
    tags: ['typescript', 'types', 'nominal-typing', 'advanced'],
    keyPoints: [
      'Проблема: структурная типизация делает одинаковые структуры совместимыми.',
      'Решения: branded types, phantom types, unique symbols, private fields.',
      'Выбор: зависит от конкретной задачи и требований к производительности.',
      'Практика: различение ID, единицы измерения, состояния объектов.',
      'Компромисс: дополнительная сложность vs безопасность типов.'
    ],
    examples: [
      {
        title: 'Сравнение подходов',
        code: `// 1. Branded types
type UserId = string & { __brand: "UserId" };

// 2. Unique symbols
const UserIdBrand = Symbol("UserId");
type UserId = string & { [UserIdBrand]: true };

// 3. Private fields (в классах)
class UserId {
  private __brand: "UserId";
  constructor(public value: string) {}
}

// Все подходы решают одну задачу: различение структурно идентичных типов`
      },
      {
        title: 'Практический пример: безопасные ID',
        code: `// Создание безопасной системы ID
type EntityId<T> = string & { __entity: T };

type UserId = EntityId<"User">;
type OrderId = EntityId<"Order">;

function createUserId(id: string): UserId {
  return id as UserId;
}

function createOrderId(id: string): OrderId {
  return id as OrderId;
}

// Функции принимают только правильные ID
function getUser(id: UserId) { }
function getOrder(id: OrderId) { }

const userId = createUserId("123");
const orderId = createOrderId("456");

getUser(userId); // ✅
// getUser(orderId); // ❌ ошибка`
      }
    ],
    relatedTopics: ['ts-branded-types', 'ts-phantom-types']
  }
];
