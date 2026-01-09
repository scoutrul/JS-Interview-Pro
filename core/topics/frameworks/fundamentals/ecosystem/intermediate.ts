import { Topic } from '../../../../types';

export const ECOSYSTEM_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'frameworks-ecosystem-testing',
    title: 'Тестирование',
    difficulty: 'intermediate',
    description: 'Тестирование фреймворковых приложений включает: unit тесты (тестирование отдельных компонентов и функций), integration тесты (тестирование взаимодействия компонентов), e2e тесты (тестирование полных сценариев пользователя). Каждый тип решает свою задачу и важен для качества кода.\n\nИнструменты тестирования: Jest для unit тестов, React Testing Library / Vue Test Utils для тестирования компонентов, Cypress / Playwright для e2e тестов. Каждый инструмент имеет свои особенности: Jest простой и быстрый, Testing Library фокусируется на пользовательском опыте, Cypress даёт визуальную отладку.\n\nПодходы к тестированию: тестировать поведение, а не реализацию (что делает компонент, а не как), тестировать изолированно (мокировать зависимости), тестировать критичные пути (важные функции пользователя). Понимание подходов критично для эффективного тестирования.\n\nВ 2026 тестирование стало стандартом для качественной разработки. Инструменты улучшились: автоматическая генерация тестов, визуальная отладка, интеграция с CI/CD. Но понимание принципов остаётся важным для написания хороших тестов.',
    keyPoints: [
      'Тестирование: unit, integration, e2e тесты',
      'Инструменты: Jest, Testing Library, Cypress/Playwright',
      'Подходы: тестировать поведение, изолированно, критичные пути',
      'Каждый тип решает свою задачу',
      'Стандарт для качественной разработки в 2026',
      'Понимание принципов критично для хороших тестов'
    ],
    funFact: 'React Testing Library был создан в 2018 году Кентом Доддсом как альтернатива Enzyme. Философия: тестировать компоненты как пользователь, а не как разработчик. Это привело к более надёжным тестам, которые не ломаются при рефакторинге.',
    tags: ['frameworks', 'ecosystem', 'testing', 'jest', 'cypress', 'intermediate'],
    examples: [
      {
        title: 'Unit тесты',
        code: `// Unit тесты: тестирование отдельных функций
import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';

test('Counter increments on click', () => {
  render(<Counter />);
  const button = screen.getByText('0');
  fireEvent.click(button);
  expect(screen.getByText('1')).toBeInTheDocument();
});

// Преимущество: быстрые, изолированные
// Тестируют отдельную функциональность`
      },
      {
        title: 'Integration тесты',
        code: `// Integration тесты: тестирование взаимодействия
import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

test('Login form submits with valid data', async () => {
  render(<LoginForm />);
  
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'password123' }
  });
  fireEvent.click(screen.getByText('Войти'));
  
  await waitFor(() => {
    expect(screen.getByText('Добро пожаловать')).toBeInTheDocument();
  });
});

// Преимущество: тестируют взаимодействие компонентов`
      },
      {
        title: 'E2E тесты',
        code: `// E2E тесты: тестирование полных сценариев
// Cypress
describe('User flow', () => {
  it('should complete purchase', () => {
    cy.visit('/');
    cy.get('[data-testid="product"]').click();
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="cart"]').click();
    cy.get('[data-testid="checkout"]').click();
    cy.get('[data-testid="success"]').should('be.visible');
  });
});

// Преимущество: тестируют полный сценарий пользователя
// Недостаток: медленные, хрупкие`
      }
    ],
    relatedTopics: ['frameworks-ecosystem-storybook', 'frameworks-ecosystem-tooling'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-ecosystem-storybook',
    title: 'Storybook',
    difficulty: 'intermediate',
    description: 'Storybook — это инструмент для разработки и документации компонентов в изоляции. Компоненты разрабатываются и тестируются отдельно от приложения, что упрощает разработку и создаёт документацию. Это особенно полезно для дизайн-систем и переиспользуемых компонентов.\n\nStorybook позволяет: разрабатывать компоненты в изоляции (без зависимости от приложения), тестировать компоненты в разных состояниях (loading, error, success), документировать компоненты (описание, примеры использования), визуально тестировать компоненты (видеть как выглядят в разных состояниях).\n\nИспользование Storybook: создание stories для каждого компонента (описание состояний), документация API компонента (props, примеры), визуальное тестирование (проверка внешнего вида). Это создаёт библиотеку компонентов, которую можно использовать в приложении.\n\nВ 2026 Storybook стал стандартом для разработки компонентов и дизайн-систем. Он упрощает разработку, создавая изоляцию и документацию. Понимание Storybook критично для работы с компонентами.',
    keyPoints: [
      'Storybook: разработка и документация компонентов в изоляции',
      'Позволяет: разрабатывать изолированно, тестировать состояния, документировать',
      'Создаёт библиотеку компонентов с документацией',
      'Полезен для дизайн-систем и переиспользуемых компонентов',
      'Стандарт для разработки компонентов в 2026',
      'Упрощает разработку, создавая изоляцию'
    ],
    funFact: 'Storybook был создан в 2016 году командой Chroma как инструмент для разработки компонентов в изоляции. За годы он стал стандартом для разработки компонентов, используемым тысячами команд по всему миру.',
    tags: ['frameworks', 'ecosystem', 'storybook', 'components', 'documentation', 'intermediate'],
    examples: [
      {
        title: 'Storybook: создание stories',
        code: `// Storybook: stories для компонента
// Button.stories.tsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button
};

export const Primary = {
  args: {
    label: 'Кнопка',
    variant: 'primary'
  }
};

export const Secondary = {
  args: {
    label: 'Кнопка',
    variant: 'secondary'
  }
};

export const Disabled = {
  args: {
    label: 'Кнопка',
    disabled: true
  }
};

// Преимущество: видно все состояния компонента
// Можно тестировать в изоляции`
      },
      {
        title: 'Документация компонентов',
        code: `// Storybook: документация компонента
// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Кнопка для действий пользователя'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Вариант кнопки'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключена ли кнопка'
    }
  }
};

// Преимущество: автоматическая документация
// Описание, примеры, контролы для тестирования`
      },
      {
        title: 'Визуальное тестирование',
        code: `// Storybook: визуальное тестирование
// Можно тестировать компоненты визуально:
// - Разные состояния
// - Разные размеры экрана
// - Разные темы
// - Разные данные

// Пример: тестирование Button в разных состояниях
export const AllStates = () => (
  <div>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button disabled>Disabled</Button>
  </div>
);

// Преимущество: видно как компонент выглядит
// Легко найти проблемы дизайна
// Легко протестировать изменения`
      }
    ],
    relatedTopics: ['frameworks-ecosystem-testing', 'frameworks-ecosystem-tooling'],
    isFrontendEssential: false
  }
];
