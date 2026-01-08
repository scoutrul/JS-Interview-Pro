import { Topic } from '../../../types';

export const TYPESCRIPT_ANGULAR_TYPING_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-angular-components',
    title: 'Компоненты Angular',
    description: 'Angular использует TypeScript из коробки. Компоненты типизируются через декораторы @Component, сервисы через @Injectable. Dependency injection типизируется через конструктор.',
    difficulty: 'intermediate',
    tags: ['typescript', 'angular', 'components', 'typing', 'intermediate'],
    keyPoints: [
      '@Component: декоратор для типизации компонентов.',
      '@Injectable: декоратор для типизации сервисов.',
      'Dependency Injection: типизация через конструктор.',
      'Роутинг: типизация маршрутов и параметров.'
    ],
    examples: [
      {
        title: 'Типизация компонента',
        code: `import { Component } from '@angular/core';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-user',
  template: '<div>{{ user.name }}</div>'
})
export class UserComponent {
  user: User = { name: 'John', age: 30 };
}`
      }
    ],
    relatedTopics: ['ts-angular-services', 'ts-angular-routing']
  }
];
