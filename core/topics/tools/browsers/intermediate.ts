import { Topic } from '../../../types';

export const BROWSERS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'browser-practice',
    title: 'Практика фронтендера',
    difficulty: 'intermediate',
    description: 'Фронтендер должен учитывать особенности браузеров при выборе технологий и отладке. Это снижает количество багов и улучшает стабильность проектов.',
    keyPoints: [
      'Проверять поддержку через caniuse',
      'Тестировать минимум в Chrome и Firefox',
      'Учитывать Safari и мобильные браузеры',
      'Использовать progressive enhancement'
    ],
    additionalDescription: 'На собеседованиях часто ожидают не знания API браузеров, а понимания принципов совместимости и стратегии работы с ними.',
    tags: ['browser', 'best-practices', 'tools'],
    examples: [
      {
        title: 'Progressive enhancement',
        code: `button {
  background: gray;
}

@supports (background: paint(something)) {
  button {
    background: paint(something);
  }
}`
      }
    ],
    relatedTopics: ['browsers', 'browser-support']
  }
];
