import { Topic } from '../../../types';

export const TYPESCRIPT_VUE_TYPING_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-vue-components',
    title: 'Компоненты Vue 3',
    description: 'Vue 3 поддерживает TypeScript через Composition API и Options API. Компоненты типизируются через defineComponent, props типизируются через PropType или interface.',
    difficulty: 'intermediate',
    tags: ['typescript', 'vue', 'components', 'typing', 'intermediate'],
    keyPoints: [
      'defineComponent: обертка для типизации компонентов.',
      'Composition API: типизация через setup() функцию.',
      'Options API: типизация через интерфейсы опций компонента.',
      'Props: типизация через PropType или interface.'
    ],
    examples: [
      {
        title: 'Composition API',
        code: `import { defineComponent, ref } from 'vue';

interface Props {
  title: string;
  count?: number;
}

export default defineComponent({
  props: {
    title: String,
    count: Number
  },
  setup(props: Props) {
    const message = ref<string>('Hello');
    return { message };
  }
});`
      }
    ],
    relatedTopics: ['ts-vue-props', 'ts-vue-composables']
  }
];
