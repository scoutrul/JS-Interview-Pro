import { Topic } from '../../../types';

export const TYPESCRIPT_CLASSES_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-class-typing',
    title: 'Типизация классов',
    description: 'Классы в TypeScript типизируются через модификаторы доступа (public, private, protected), readonly свойства и типизацию методов. Поддерживают наследование с проверкой типов.',
    difficulty: 'beginner',
    tags: ['typescript', 'classes', 'typing', 'basics'],
    keyPoints: [
      'Модификаторы: public (по умолчанию), private, protected.',
      'Readonly: readonly property: Type — только для чтения.',
      'Типизация методов: method(param: Type): ReturnType.',
      'Наследование: class Child extends Parent с проверкой типов.'
    ],
    examples: [
      {
        title: 'Базовый класс',
        code: `class User {
  public name: string;
  private age: number;
  protected email: string;
  readonly id: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.id = Math.random().toString();
  }

  getAge(): number {
    return this.age; // ✅ Доступ внутри класса
  }
}

const user = new User("John", 30, "john@example.com");
user.name; // ✅ public
// user.age; // ❌ private
// user.email; // ❌ protected
// user.id = "new"; // ❌ readonly`
      }
    ],
    relatedTopics: ['ts-classes-generics', 'ts-abstract-classes']
  }
];
