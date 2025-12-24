import { Category } from '../types';
import { BEGINNER_TOPICS } from './beginner';
import { INTERMEDIATE_TOPICS } from './intermediate';
import { ADVANCED_TOPICS } from './advanced';

// Собираем все темы в один массив для удобного поиска
const ALL_TOPICS = [...BEGINNER_TOPICS, ...INTERMEDIATE_TOPICS, ...ADVANCED_TOPICS];

const getTopic = (id: string) => ALL_TOPICS.find(t => t.id === id);

export const KNOWLEDGE_BASE: Category[] = [
  { 
    id: 'basics', 
    title: 'Основы JavaScript', 
    topics: [
      getTopic('data-types'),
      getTopic('type-coercion'),
      getTopic('comparison'),
      getTopic('operators'),
      getTopic('functions-types'),
      getTopic('arrays-basic'),
      getTopic('objects-basic'),
      getTopic('destructuring-basic'),
      getTopic('strings-methods'),
      getTopic('conditions-loops'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'variables', 
    title: 'Переменные и Область видимости', 
    topics: [
      getTopic('var-let-const'),
      getTopic('hoisting-basic'),
      getTopic('tdz-basic'),
      getTopic('scope-chain'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'closures', 
    title: 'Замыкания и Окружение', 
    topics: [
      getTopic('lexical-env'),
      getTopic('closures-basic'),
      getTopic('private-state'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'this-context', 
    title: 'Контекст this', 
    topics: [
      getTopic('this-basics'),
      getTopic('arrow-functions'),
      getTopic('context-loss'),
      getTopic('bind-call-apply'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'prototypes', 
    title: 'Прототипы и ООП', 
    topics: [
      getTopic('prototype-chain'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'advanced-js', 
    title: 'Продвинутый JavaScript', 
    topics: [
      getTopic('event-loop'),
      getTopic('promises'),
      getTopic('async-await'),
      getTopic('generators'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'functional', 
    title: 'Функциональные концепции', 
    topics: [
      getTopic('immutability'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'collections', 
    title: 'Коллекции и структуры данных', 
    topics: [
      getTopic('arrays-advanced'),
      getTopic('map-set'),
      getTopic('weakmap-weakset'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'oop-modules', 
    title: 'ООП и Модули', 
    topics: [
      getTopic('classes'),
      getTopic('modules'),
      getTopic('symbol'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  },
  { 
    id: 'advanced-features', 
    title: 'Продвинутые возможности', 
    topics: [
      getTopic('destructuring-advanced'),
      getTopic('error-handling'),
      getTopic('proxy-reflect'),
      getTopic('iterators-iterables'),
      getTopic('memory-management'),
      getTopic('regexp-advanced'),
    ].filter((t): t is NonNullable<typeof t> => t !== undefined)
  }
];

