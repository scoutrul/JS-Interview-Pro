import { Category } from '../../types';
import { FUNDAMENTALS_CATEGORIES } from './fundamentals';
import { REACT_TOPICS } from './react';
import { VUE_TOPICS } from './vue';
import { ANGULAR_TOPICS } from './angular';
import { SVELTE_TOPICS } from './svelte';

export const FRAMEWORKS_CATEGORIES: Category[] = [
  ...FUNDAMENTALS_CATEGORIES,
  {
    id: 'react',
    title: 'React',
    topics: REACT_TOPICS
  },
  {
    id: 'vue',
    title: 'Vue',
    topics: VUE_TOPICS
  },
  {
    id: 'angular',
    title: 'Angular',
    topics: ANGULAR_TOPICS
  },
  {
    id: 'svelte',
    title: 'Svelte',
    topics: SVELTE_TOPICS
  }
];

// Экспорт плоского массива для обратной совместимости
import { EVOLUTION_TOPICS } from './fundamentals/evolution';
import { COMPONENT_MODEL_TOPICS } from './fundamentals/component-model';
import { REACTIVITY_TOPICS } from './fundamentals/reactivity';
import { STATE_MANAGEMENT_TOPICS } from './fundamentals/state-management';
import { RENDERING_TOPICS } from './fundamentals/rendering';
import { META_FRAMEWORKS_TOPICS } from './fundamentals/meta-frameworks';
import { ARCHITECTURE_TOPICS } from './fundamentals/architecture';
import { PERFORMANCE_TOPICS } from './fundamentals/performance';
import { ECOSYSTEM_TOPICS } from './fundamentals/ecosystem';
import { FUTURE_TOPICS } from './fundamentals/future';
import { INTERVIEWS_TOPICS } from './fundamentals/interviews';

export const FRAMEWORKS_TOPICS = [
  ...EVOLUTION_TOPICS,
  ...COMPONENT_MODEL_TOPICS,
  ...REACTIVITY_TOPICS,
  ...STATE_MANAGEMENT_TOPICS,
  ...RENDERING_TOPICS,
  ...META_FRAMEWORKS_TOPICS,
  ...ARCHITECTURE_TOPICS,
  ...PERFORMANCE_TOPICS,
  ...ECOSYSTEM_TOPICS,
  ...FUTURE_TOPICS,
  ...INTERVIEWS_TOPICS,
  ...REACT_TOPICS,
  ...VUE_TOPICS,
  ...ANGULAR_TOPICS,
  ...SVELTE_TOPICS
];