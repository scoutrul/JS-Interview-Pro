import { Topic } from '../../../types';

export const BROWSERS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'browser-engines',
    title: 'Движки браузеров',
    difficulty: 'intermediate',
    description: 'Браузеры используют разные движки для обработки HTML, CSS и JavaScript. Понимание движков помогает объяснять различия в поведении и отладке кода.',
    keyPoints: [
      'Blink — используется в Chrome, Edge, Opera',
      'Gecko — движок Firefox',
      'WebKit — используется в Safari',
      'Различия проявляются в рендеринге, оптимизациях и поддержке API'
    ],
    additionalDescription: 'Хотя современные браузеры стремятся следовать единым стандартам, движки по-разному реализуют детали рендеринга и оптимизации. Это может приводить к визуальным или поведенческим расхождениям.',
    funFact: 'Edge раньше использовал собственный движок EdgeHTML, но перешёл на Blink ради совместимости.',
    tags: ['browser', 'engines', 'rendering', 'tools'],
    examples: [
      {
        title: 'Определение движка браузера',
        code: `navigator.userAgent;
// Используется для определения браузера и его движка
// Не рекомендуется для логики, но полезно для диагностики`
      }
    ],
    relatedTopics: ['browser-standards']
  },
  {
    id: 'browser-standards',
    title: 'Стандарты браузеров',
    difficulty: 'intermediate',
    description: 'Новые веб-технологии появляются через спецификации и постепенно внедряются в браузеры. Обновления браузеров позволяют поддерживать новые стандарты и улучшать безопасность.',
    keyPoints: [
      'Спецификации разрабатываются W3C и WHATWG',
      'Новые функции появляются сначала экспериментально',
      'Браузеры регулярно обновляются (обычно раз в 4–6 недель)',
      'Часто внедрение стандартов происходит не одновременно'
    ],
    additionalDescription: 'Перед массовым внедрением технологии часто доступны через экспериментальные флаги или preview-версии браузеров. Это позволяет разработчикам заранее тестировать будущие возможности.',
    funFact: 'HTML Living Standard от WHATWG обновляется непрерывно, без версионных релизов.',
    tags: ['browser', 'standards', 'specifications', 'tools'],
    examples: [
      {
        title: 'Включение экспериментальных функций',
        code: `// Chrome:
// chrome://flags
// Firefox:
// about:config`
      }
    ],
    relatedTopics: ['browser-support']
  },
  {
    id: 'browser-support',
    title: 'Поддержка технологий',
    difficulty: 'intermediate',
    description: 'Не все браузеры одинаково поддерживают веб-технологии. Проверка совместимости помогает избежать ошибок и поломок интерфейса.',
    keyPoints: [
      'caniuse.com — основной инструмент проверки поддержки',
      'Поддержка зависит от версии браузера',
      'Можно использовать fallback и progressive enhancement',
      'Полифиллы компенсируют отсутствие API'
    ],
    additionalDescription: 'Перед использованием новых возможностей важно понимать, какие браузеры входят в целевую аудиторию проекта. Это напрямую влияет на выбор технологий.',
    funFact: 'Internet Explorer долгое время тормозил внедрение современных стандартов.',
    tags: ['browser', 'compatibility', 'caniuse', 'tools'],
    examples: [
      {
        title: 'Проверка поддержки API',
        code: `if ('IntersectionObserver' in window) {
  // Используем API
} else {
  // fallback-логика
}`
      }
    ],
    relatedTopics: ['browser-mobile']
  },
  {
    id: 'browser-differences',
    title: 'Отличия браузеров',
    difficulty: 'intermediate',
    description: 'Несмотря на единые стандарты, браузеры могут отличаться в деталях реализации и поддержке API. Эти отличия важно учитывать при разработке.',
    keyPoints: [
      'Safari часто отстаёт в поддержке новых API',
      'Firefox реализует собственные оптимизации',
      'Chromium-браузеры быстрее внедряют новинки',
      'Некоторые браузеры имеют ограничения по памяти'
    ],
    additionalDescription: 'На практике большинство проблем возникает именно с Safari и мобильными браузерами, поэтому они требуют отдельного тестирования.',
    funFact: 'Safari ограничивает использование памяти вкладкой сильнее, чем Chrome.',
    tags: ['browser', 'differences', 'debugging'],
    examples: [
      {
        title: 'Обработка браузерных особенностей',
        code: `const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
// Используется только для диагностики`
      }
    ],
    relatedTopics: ['browser-mobile']
  },
  {
    id: 'browser-mobile',
    title: 'Мобильные браузеры',
    difficulty: 'intermediate',
    description: 'Мобильные браузеры имеют ограничения по производительности, памяти и поддержке API. Это влияет на архитектуру и оптимизацию фронтенд-приложений.',
    keyPoints: [
      'iOS использует WebKit для всех браузеров',
      'Opera Mini работает через серверный рендеринг',
      'Производительность ниже, чем на десктопе',
      'Некоторые API недоступны или ограничены'
    ],
    additionalDescription: 'Даже Chrome и Firefox на iOS используют WebKit, что делает тестирование на реальных устройствах особенно важным.',
    funFact: 'Opera Mini фактически рендерит страницы на сервере, а не на устройстве.',
    tags: ['browser', 'mobile', 'performance'],
    examples: [
      {
        title: 'Эмуляция мобильного устройства',
        code: `// Chrome DevTools → Toggle Device Toolbar
// Позволяет тестировать адаптивность`
      }
    ],
    relatedTopics: ['browser-differences']
  },
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
    relatedTopics: ['browser-support']
  }
];
