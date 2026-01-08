import { Category } from '../../../types';
import { HIRING_TECHNICAL_STAGES_FORMATS_TOPICS } from './formats';
import { HIRING_TECHNICAL_STAGES_PREPARATION_TOPICS } from './preparation';
import { HIRING_TECHNICAL_STAGES_BEHAVIOR_TOPICS } from './behavior';

export const HIRING_TECHNICAL_STAGES_CATEGORIES: Category[] = [
  {
    id: 'hiring-technical-stages',
    title: 'ТЕХНИЧЕСКИЕ ЭТАПЫ — КАК ПРОЙТИ, ЕСЛИ НЕ ГЕНИЙ',
    topics: [
      ...HIRING_TECHNICAL_STAGES_FORMATS_TOPICS,
      ...HIRING_TECHNICAL_STAGES_PREPARATION_TOPICS,
      ...HIRING_TECHNICAL_STAGES_BEHAVIOR_TOPICS
    ]
  }
];
