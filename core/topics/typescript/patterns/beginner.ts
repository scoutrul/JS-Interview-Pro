import { Topic } from '../../../types';

export const TYPESCRIPT_PATTERNS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-dom-events',
    title: 'Типизация событий DOM',
    description: 'DOM события в TypeScript типизируются через интерфейсы Event, MouseEvent, KeyboardEvent и другие. Позволяет получить типобезопасный доступ к свойствам и методам событий.',
    difficulty: 'beginner',
    tags: ['typescript', 'dom', 'events', 'typing', 'basics'],
    keyPoints: [
      'Базовые типы: Event, MouseEvent, KeyboardEvent, ChangeEvent и др.',
      'Свойства событий: event.target, event.currentTarget с правильными типами.',
      'Практика: обработчики событий, работа с формами, интерактивные элементы.'
    ],
    examples: [
      {
        title: 'Типизация событий',
        code: `// MouseEvent для кликов
function handleClick(event: MouseEvent) {
  console.log(event.clientX, event.clientY);
}

// KeyboardEvent для клавиатуры
function handleKeyPress(event: KeyboardEvent) {
  if (event.key === "Enter") {
    // ...
  }
}

// ChangeEvent для input
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
}`
      }
    ],
    relatedTopics: ['ts-react-events']
  }
];
