import { Topic } from '../../../types';

export const TYPESCRIPT_CLASSES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-classes-generics',
    title: 'Generic классы',
    description: 'Классы могут быть generic, принимая параметры типа. Позволяет создавать переиспользуемые классы, которые работают с разными типами данных.',
    difficulty: 'intermediate',
    tags: ['typescript', 'classes', 'generics', 'intermediate'],
    keyPoints: [
      'Синтаксис: class Name<T> { }.',
      'Использование: new Name<Type>().',
      'Практика: контейнеры, репозитории, коллекции.'
    ],
    examples: [
      {
        title: 'Generic класс',
        code: `class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const stringContainer = new Container<string>("hello");
const numberContainer = new Container<number>(42);`
      }
    ],
    relatedTopics: ['ts-class-typing', 'ts-generics-basics']
  }
];
