import { Category } from './types';
import { MetaCategoryId } from './metaCategories';
import { CS_KNOWLEDGE_BASE } from './topics/computer-science';
import { JS_KNOWLEDGE_BASE } from './topics/javascript';
import { TOOLS_CATEGORIES } from './topics/tools';
import { MARKUP_CATEGORIES } from './topics/markup';
import { TYPESCRIPT_CATEGORIES } from './topics/typescript';
import { FRAMEWORKS_CATEGORIES } from './topics/frameworks';
import { ARCHITECTURE_CATEGORIES } from './topics/architecture';
import { SECURITY_CATEGORIES } from './topics/security';
import { NETWORK_CATEGORIES } from './topics/network';
import { OPTIMIZATION_CATEGORIES } from './topics/optimization';
import { HIRING_CATEGORIES } from './topics/hiring';

// Данные по категориям - единая структура для всех мета-категорий
export const META_CATEGORIES_DATA: Record<MetaCategoryId, Category[]> = {
  "computer-science": CS_KNOWLEDGE_BASE,
  javascript: JS_KNOWLEDGE_BASE,
  markup: MARKUP_CATEGORIES,
  tools: TOOLS_CATEGORIES,
  typescript: TYPESCRIPT_CATEGORIES,
  frameworks: FRAMEWORKS_CATEGORIES,
  architecture: ARCHITECTURE_CATEGORIES,
  security: SECURITY_CATEGORIES,
  network: NETWORK_CATEGORIES,
  optimization: OPTIMIZATION_CATEGORIES,
  hiring: HIRING_CATEGORIES
};

