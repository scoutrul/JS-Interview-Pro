import { Category } from '../../../types';
import { HIRING_SELF_PRESENTATION_TELL_ABOUT_TOPICS } from './tell-about';
import { HIRING_SELF_PRESENTATION_STAR_TOPICS } from './star';
import { HIRING_SELF_PRESENTATION_PROJECTS_TOPICS } from './projects';

export const HIRING_SELF_PRESENTATION_CATEGORIES: Category[] = [
  {
    id: 'hiring-self-presentation',
    title: 'САМОПРЕЗЕНТАЦИЯ — ОСНОВА ЛЮБОГО ЭТАПА',
    topics: [
      ...HIRING_SELF_PRESENTATION_TELL_ABOUT_TOPICS,
      ...HIRING_SELF_PRESENTATION_STAR_TOPICS,
      ...HIRING_SELF_PRESENTATION_PROJECTS_TOPICS
    ]
  }
];
