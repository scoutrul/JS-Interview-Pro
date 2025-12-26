import { Category } from '../../types';
import { GIT_TOPICS } from './git';
import { TERMINAL_TOPICS } from './terminal';
import { NPM_TOPICS } from './npm';
import { DOCKER_TOPICS } from './docker';
import { DEVTOOLS_TOPICS } from './devtools';
import { CURSOR_TOPICS } from './cursor';
import { AI_TOOLS_TOPICS } from './ai-tools';
import { TESTING_TOPICS } from './testing';
import { CI_CD_TOPICS } from './ci-cd';
import { VPS_TOPICS } from './vps';

export const TOOLS_CATEGORIES: Category[] = [
  {
    id: 'git',
    title: 'Git',
    topics: GIT_TOPICS
  },
  {
    id: 'terminal',
    title: 'Terminal',
    topics: TERMINAL_TOPICS
  },
  {
    id: 'npm',
    title: 'npm',
    topics: NPM_TOPICS
  },
  {
    id: 'docker',
    title: 'Docker',
    topics: DOCKER_TOPICS
  },
  {
    id: 'devtools',
    title: 'DevTools',
    topics: DEVTOOLS_TOPICS
  },
  {
    id: 'cursor',
    title: 'Cursor',
    topics: CURSOR_TOPICS
  },
  {
    id: 'ai',
    title: 'AI инструменты',
    topics: AI_TOOLS_TOPICS
  },
  {
    id: 'testing',
    title: 'Тестирование',
    topics: TESTING_TOPICS
  },
  {
    id: 'ci-cd',
    title: 'CI/CD',
    topics: CI_CD_TOPICS
  },
  {
    id: 'vps',
    title: 'VPS',
    topics: VPS_TOPICS
  }
];

// Экспорт плоского массива для обратной совместимости
export const TOOLS_TOPICS = [
  ...GIT_TOPICS,
  ...TERMINAL_TOPICS,
  ...NPM_TOPICS,
  ...DOCKER_TOPICS,
  ...DEVTOOLS_TOPICS,
  ...CURSOR_TOPICS,
  ...AI_TOOLS_TOPICS,
  ...TESTING_TOPICS,
  ...CI_CD_TOPICS,
  ...VPS_TOPICS
];