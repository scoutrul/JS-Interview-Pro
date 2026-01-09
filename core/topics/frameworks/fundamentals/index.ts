import { Category } from '../../../types';
import { EVOLUTION_TOPICS } from './evolution';
import { COMPONENT_MODEL_TOPICS } from './component-model';
import { REACTIVITY_TOPICS } from './reactivity';
import { STATE_MANAGEMENT_TOPICS } from './state-management';
import { RENDERING_TOPICS } from './rendering';
import { META_FRAMEWORKS_TOPICS } from './meta-frameworks';
import { ARCHITECTURE_TOPICS } from './architecture';
import { PERFORMANCE_TOPICS } from './performance';
import { ECOSYSTEM_TOPICS } from './ecosystem';
import { FUTURE_TOPICS } from './future';
import { INTERVIEWS_TOPICS } from './interviews';

export const FUNDAMENTALS_CATEGORIES: Category[] = [
  {
    id: 'fundamentals-evolution',
    title: 'Эволюция и философия',
    topics: EVOLUTION_TOPICS
  },
  {
    id: 'fundamentals-component-model',
    title: 'Компонентная модель',
    topics: COMPONENT_MODEL_TOPICS
  },
  {
    id: 'fundamentals-reactivity',
    title: 'Реактивность',
    topics: REACTIVITY_TOPICS
  },
  {
    id: 'fundamentals-state-management',
    title: 'Управление состоянием',
    topics: STATE_MANAGEMENT_TOPICS
  },
  {
    id: 'fundamentals-rendering',
    title: 'Стратегии рендеринга',
    topics: RENDERING_TOPICS
  },
  {
    id: 'fundamentals-meta-frameworks',
    title: 'Мета-фреймворки',
    topics: META_FRAMEWORKS_TOPICS
  },
  {
    id: 'fundamentals-architecture',
    title: 'Архитектура приложений',
    topics: ARCHITECTURE_TOPICS
  },
  {
    id: 'fundamentals-performance',
    title: 'Производительность',
    topics: PERFORMANCE_TOPICS
  },
  {
    id: 'fundamentals-ecosystem',
    title: 'Экосистема и инструменты',
    topics: ECOSYSTEM_TOPICS
  },
  {
    id: 'fundamentals-future',
    title: 'Будущее и альтернативы',
    topics: FUTURE_TOPICS
  },
  {
    id: 'fundamentals-interviews',
    title: 'Собеседования',
    topics: INTERVIEWS_TOPICS
  }
];
