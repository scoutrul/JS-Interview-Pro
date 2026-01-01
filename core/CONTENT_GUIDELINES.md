# Правила структуры контента

Руководство по созданию и оформлению тем для базы знаний.

## Иерархия информации

```
Description + KeyPoints → Examples
(суть и структура)     → (детали с кодом)
```

**Опционально:**
- Занимательный факт (funFact) — интересная, необычная информация по теме
- Дополнительное описание (additionalDescription) — расширенная информация после ключевых моментов

## 1. Description + KeyPoints (Описание и ключевые моменты)

**Description (Описание):**
- ✅ **Краткое** (2-3 предложения максимум)
- ✅ Только суть + контекст, **БЕЗ примеров**
- ✅ Отвечает на: "Что это?" и "Зачем нужно?"
- ✅ Легко читается и сканируется глазами
- ✅ **Разбиение на абзацы**: если описание больше 100 слов, разбить на абзацы через `\n\n` для лучшей читаемости
- ❌ **Не дублировать информацию из KeyPoints** — описание дает общий контекст, KeyPoints — структурированные детали

**KeyPoints (Ключевые моменты):**

**Правила:**
- ✅ Структурированный список категорий/аспектов
- ✅ Краткие примеры в скобках допустимы как справка
- ✅ Каждый пункт = отдельный аспект/категория
- ✅ Используется как шпаргалка/справочник
- ❌ **Не дублировать информацию из Description** — если факт в описании, не повторять в ключевых моментах
- ❌ **Не дублировать информацию из funFact** — занимательные факты отдельно от ключевых моментов

**Хорошо:**
```
- Арифметические: +, -, *, /, %, ** (возведение в степень).
- Сравнения: == (нестрогое), === (строгое), !=, !==, <, >, <=, >=.
- Логические: && и || возвращают последнее вычисленное значение, не boolean.
```

**Плохо:**
```
- Есть операторы плюс, минус и другие для вычислений
- Операторы сравнения проверяют равенство и неравенство
```

## 2. Examples (Примеры)

**Правила:**
- ✅ Детальные примеры с кодом
- ✅ Каждый пример = отдельная категория/концепция
- ✅ Первый пример может быть обзорным (разграничение типов)
- ✅ Комментарии поясняют результат
- ✅ Практика и углубление материала
- ✅ **Экранирование специальных символов** в шаблонных строках (template literals)

**Экранирование символов в примерах кода:**

При использовании шаблонных строк (backticks) в TypeScript/JavaScript необходимо экранировать специальные символы, которые могут быть интерпретированы как синтаксис языка:

- `${{` → `\${{` (GitHub Actions, шаблоны)
- `` `${ `` → `` \`${ `` (интерполяция в шаблонных строках)
- `` ` `` → `` \` `` (обратная кавычка внутри строки)
- `\` → `\\` (обратный слэш)

**Примеры правильного экранирования:**

```typescript
// ❌ НЕПРАВИЛЬНО - вызовет ошибку парсинга
{
  title: 'GitHub Actions',
  code: `run: docker build -t my-app:${{ github.sha }} .`
}

// ✅ ПРАВИЛЬНО - экранирован ${
{
  title: 'GitHub Actions',
  code: `run: docker build -t my-app:\${{ github.sha }} .`
}

// ❌ НЕПРАВИЛЬНО - обратная кавычка внутри строки
{
  title: 'Команда',
  code: `echo "Используйте \`git status\` для проверки"`
}

// ✅ ПРАВИЛЬНО - экранирована обратная кавычка
{
  title: 'Команда',
  code: `echo "Используйте \\\`git status\\\` для проверки"`
}
```

**Хорошо:**
```typescript
{
  title: "Арифметические операторы",
  code: `10 + 5; // 15 (сложение)
10 - 5; // 5 (вычитание)
10 * 5; // 50 (умножение)`
}
```

## 3. Занимательный факт (FunFact) - опционально

**Правила:**
- ✅ Интересная, необычная, нестандартная информация по теме
- ✅ Может быть исторический факт, курьез, особенность реализации
- ✅ Не обязательное поле, добавляется только если есть что-то интересное
- ✅ Краткое (1-2 предложения)
- ❌ **Не дублировать информацию из KeyPoints** — если факт в ключевых моментах, не повторять в funFact
- ❌ **Не дублировать информацию из Description** — занимательный факт должен быть уникальным

**Примеры:**
```
JavaScript был создан за 10 дней в 1995 году.
typeof null возвращает "object" из-за исторического бага в языке.
```

## 4. Дополнительное описание (AdditionalDescription) - опционально

**Правила:**
- ✅ Расширенная информация, которая идет после ключевых моментов
- ✅ Дополняет KeyPoints более детальными объяснениями
- ✅ Не обязательное поле, используется когда нужно больше контекста
- ✅ Может содержать дополнительные детали, нюансы, важные замечания
- ❌ **Не дублировать информацию из KeyPoints** — дополняет, а не повторяет ключевые моменты
- ❌ **Не дублировать информацию из Description** — расширяет, а не повторяет основное описание

**Примеры:**
```
Важно понимать, что прототипное наследование работает иначе, чем классы в других языках.
Все объекты в JavaScript имеют скрытое свойство [[Prototype]], которое ссылается на другой объект.
```

## 5. Принципы

- **От общего к частному**: сначала концепция, потом детали
- **Избегать дублирования**: не повторять одну информацию в разных секциях
  - Description и KeyPoints — разные уровни детализации, не дублировать
  - funFact — уникальная информация, не повторять в других секциях
  - additionalDescription — дополняет, а не повторяет KeyPoints
- **Явное разделение**: категории/типы четко разделены
- **Сканируемость**: описание легко читается беглым взглядом
- **KeyPoints = справочник**: быстрый поиск информации
- **Examples = практика**: углубление и применение
- **Уникальность контента**: каждая секция добавляет новую информацию, не повторяет существующую

## 6. Антипаттерны (чего избегать)

❌ **Примеры кода в description**  
❌ **Длинные описания с перечислениями**  
❌ **KeyPoints без структуры** (просто текст)  
❌ **Повторение одной информации** в разных секциях:
  - Один факт в Description и в KeyPoints
  - Один факт в funFact и в KeyPoints
  - Один факт в Description и в additionalDescription
  - Повторение KeyPoints в additionalDescription
❌ **Смешивание категорий** в одном пункте  
❌ **Отсутствие структуры** в KeyPoints
❌ **Дублирование контента** между секциями — каждая секция должна добавлять уникальную информацию  

## 7. Название темы (Title)

**Правила:**
- ✅ **Краткое** (не более 5 слов, лучше 2-4)
- ✅ Понятное и информативное
- ✅ Без лишних слов и уточнений
- ✅ Легко сканируется глазами

**Хорошо:**
```
- История JavaScript
- JavaScript vs Java
- Типизация
- Окружение выполнения
```

**Плохо:**
```
- История JavaScript: когда появился и зачем он был создан
- JavaScript vs Java: принципиальные отличия между языками
- Типизация в JavaScript и её особенности
```

## 8. Структура Topic

```typescript
{
  id: 'unique-id',
  title: 'Название темы',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  description: 'Краткое описание БЕЗ примеров (2-3 предложения)',
  keyPoints: [
    'Структурированный список',
    'Каждый пункт = отдельный аспект',
    'Краткие примеры в скобках допустимы'
  ],
  funFact?: 'Занимательный факт (опционально)',
  additionalDescription?: 'Дополнительное описание после ключевых моментов (опционально)',
  tags: ['tag1', 'tag2'],
  examples: [
    {
      title: 'Название примера',
      code: '// Код с комментариями'
    }
  ],
  relatedTopics: ['related-topic-id']
}
```

## 9. Теги (Tags) и связанные темы (RelatedTopics)

**Правила использования тегов:**
- ✅ Используйте релевантные теги из списка доступных тегов
- ✅ Добавляйте 5-10 тегов на тему (не слишком много, не слишком мало)
- ✅ Включайте общие теги: `tools`, `productivity`, `basics`/`intermediate`/`advanced`
- ✅ Добавляйте специфичные теги для категоризации
- ✅ Теги должны отражать содержание темы

**Правила связанных тем (RelatedTopics):**
- ✅ Связывайте темы логически связанные по содержанию
- ✅ Обычно 2-4 связанные темы на одну тему
- ✅ Связывайте темы из того же раздела и смежных разделов
- ✅ Используйте ID тем (например: `git-basics-workflow`, `docker-compose-volumes`)
- ✅ Связывайте базовые темы с продвинутыми и наоборот

**Примеры связанных тем:**
```typescript
// Базовая тема Git связана с другими базовыми темами Git и терминалом
relatedTopics: ['git-status-history', 'terminal-basics']

// Продвинутая тема Docker связана с промежуточными темами и CI/CD
relatedTopics: ['docker-multi-stage', 'ci-cd-basics', 'vps-basics']
```

## 10. Чеклист при создании темы

- [ ] Title краткое (не более 5 слов, лучше 2-4)
- [ ] Description краткое и без примеров
- [ ] KeyPoints структурированы по категориям
- [ ] Examples детальные с комментариями
- [ ] **Экранирование символов в примерах кода:**
  - [ ] `${{` экранировано как `\${{`
  - [ ] Обратные кавычки `` ` `` экранированы как `` \` ``
  - [ ] Специальные символы правильно экранированы
- [ ] **Нет дублирования между секциями:**
  - [ ] Description не повторяет KeyPoints
  - [ ] funFact не повторяет KeyPoints или Description
  - [ ] additionalDescription не повторяет KeyPoints или Description
  - [ ] Каждая секция добавляет уникальную информацию
- [ ] **Теги и связанные темы:**
  - [ ] Использованы релевантные теги из списка
  - [ ] Добавлены связанные темы (2-4 штуки)
  - [ ] Связанные темы логически связаны с текущей
- [ ] Информация идет от общего к частному
- [ ] Категории/типы явно разделены
- [ ] Код примеров рабочий и понятный

## 11. Список всех доступных тегов

Ниже представлен полный список всех тегов, используемых в темах базы знаний. Теги используются для категоризации и поиска тем.

**JavaScript основы:**
- `arrays`, `arrays-basic`, `objects`, `objects-basic`, `objects-advanced`, `object-api`, `object-methods`, `object-assign`, `object-create`, `object.create`, `object.keys`
- `types`, `typing`, `primitives`, `data-types`, `data-types-overview`, `reference-types`, `references`
- `variables`, `variables-basic`, `var`, `let`, `const`, `var-let-const`
- `functions`, `functions-types`, `arrow-functions`, `declaration`, `expression`, `iife`
- `operators`, `arithmetic`, `logical`, `comparison`, `equality`, `strict-equality`
- `strings`, `string-api`, `template-literals`
- `json`, `serialization`, `parsing`, `data`
- `date`, `date-api`, `time`, `formatting`
- `strict-mode`, `strict`, `best-practices`

**Область видимости и замыкания:**
- `scope`, `function-scope`, `block-scope`, `scope-chain`, `lexical-scoping`, `lexical-environment`, `lexical environment`
- `closure`, `closures-basic`, `encapsulation`, `privacy`, `module pattern`
- `hoisting`, `hoisting-basic`, `tdz`, `tdz-basic`
- `блочная область видимости`, `функциональная область видимости`, `область видимости`

**This и контекст:**
- `this`, `this-basics`, `this-context`, `context`, `context-loss`
- `bind`, `call`, `apply`, `bind-call-apply`

**Прототипы и ООП:**
- `prototype`, `prototype-chain`, `prototypes`, `inheritance`, `oop`
- `constructors`, `new`, `classes`, `ES6`
- `getprototypeof`, `setprototypeof`, `object.create`
- `instanceof`, `hasownproperty`, `in`, `properties`
- `getters`, `setters`, `getownpropertynames`

**Функциональное программирование:**
- `functional`, `higher-order-functions`, `patterns`
- `currying`, `partial-application`, `composition`, `compose`
- `memoization`, `recursion`, `caching`
- `immutability`, `immutable`, `mutability`, `mutable`, `иммутабельность`, `мутабельность`
- `map`, `filter`, `reduce`, `forEach`, `some`, `every`, `flat`
- `destructuring`, `rest`, `parameters`, `spread`, `optional-chaining`, `nullish-coalescing`

**Асинхронность:**
- `async`, `await`, `async-await`, `async-deep`, `promise`, `promises`
- `callbacks`, `flow`, `error-handling`
- `event-loop`, `event loop`, `concurrency`, `non-blocking`, `blocking`
- `threading`, `single-threaded`, `multithreading`

**Коллекции:**
- `collections`, `map`, `set`, `maps`, `weakmap`, `weakset`
- `iterables`, `iterators`, `iteration`

**Окружение выполнения:**
- `runtime`, `browser`, `nodejs`, `node`, `environment`, `global`
- `dom`, `bom`, `modules`, `import`, `export`
- `javascript`, `ecmascript`, `language`, `introduction`

**Оптимизация и производительность:**
- `performance`, `optimization`, `algorithms`, `scalability`, `data-structures`
- `complexity`, `big-o`, `profiling`, `metrics`, `lighthouse`
- `bundling`, `webpack`, `lazy-loading`
- `runtime`, `caching`, `memory`, `memory-leaks`, `memory-management`, `garbage-collection`, `heap`, `stack`

**Копирование объектов:**
- `copying`, `shallow-copy`, `deep-copy`, `spread`, `object-assign`, `structured-clone`

**Обработка ошибок:**
- `errors`, `exceptions`, `try-catch`, `throw`, `error-handling`**Операторы и управление:**
- `conditions`, `loops`, `if`, `for`, `while`, `control-flow`
- `coercion`, `conversion`, `type-coercion`, `truthy-falsy`, `to-primitive`

**Инструменты разработки:**
- `tools`, `productivity`, `devtools`, `debugging`, `console`
- `git`, `version-control`, `basics`, `init`, `clone`, `add`, `commit`, `staging`, `status`, `log`, `diff`, `history`, `blame`, `branches`, `checkout`, `merge`, `remote`, `push`, `pull`, `github`, `conflicts`, `rebase`, `reset`, `revert`, `undo`, `stash`, `temporary`, `fetch`, `upstream`, `cherry-pick`, `reflog`, `recovery`, `hooks`, `automation`, `submodules`, `dependencies`, `workflow`, `team`, `collaboration`, `gui`, `ide`, `visualization`, `linting`
- `npm`, `package-manager`, `versioning`, `workspaces`, `monorepo`
- `docker`, `containers`, `volumes`, `compose`, `networks`, `swarm`, `kubernetes`, `optimization`, `build`, `deployment`, `fullstack`, `orchestration`, `alpine`
- `vps`, `server`, `hosting`, `linux`, `ssh`, `devops`, `infrastructure`, `cloud`
- `ci-cd`, `cicd`, `github-actions`, `deploy`, `continuous-integration`, `continuous-deployment`, `automation`
- `terminal`, `bash`, `shell`, `tmux`, `cli`, `filesystem`, `environment`
- `testing`, `tdd`, `bdd`, `unit-tests`, `e2e`, `jest`, `vitest`, `cypress`, `playwright`, `mocking`, `coverage`, `snapshots`
- `cursor`, `ai`, `chatgpt`, `copilot`, `ollama`, `local-models`, `custom-models`, `fine-tuning`, `prompts`, `code-generation`
- `documentation`, `refactoring`, `design`, `architecture`
- `nodejs`, `node`, `runtime`, `modules`, `commonjs`, `es-modules`, `packages`

**Browser API:**
- `browser-api`, `dom`, `elements`, `events`, `listeners`, `observer`
- `fetch`, `http`, `networking`, `networks`, `cors`, `same-origin`
- `storage`, `localStorage`, `sessionStorage`, `indexeddb`, `cookies`
- `file`, `blob`, `filereader`, `clipboard`, `copy`, `paste`
- `geolocation`, `camera`, `mediadevices`, `microphone`
- `service-workers`, `pwa`, `offline`
- `websocket`, `realtime`, `streaming`
- `web-workers`, `parallelism`
- `intersection-observer`, `mutation-observer`, `resize-observer`, `page-visibility`
- `abort-controller`, `cancellation`
- `location`, `history`, `routing`, `spa`

**Безопасность:**
- `security`, `xss`, `csrf`, `cors`, `same-origin`, `safety`**Специальные темы:**
- `history`, `netscape`, `brendan-eich`, `java`, `comparison`
- `high-level`, `abstraction`, `standard-library`
- `paradigms`, `imperative`, `event-driven`, `programming-styles`
- `dynamic-typing`, `weak-typing`
- `call-stack`, `internals`
- `symbol`, `proxy`, `reflect`, `metaprogramming`
- `generators`, `yield`
- `regex`, `regexp`, `regular-expressions`
- `unique`
- `factory`, `singleton`, `mixins`
- `super`
- `descriptors`, `freeze`, `seal`, `defineProperty`
- `iterables`, `iterators`
- `compose`, `pipes`
- `observer`
- `responsive`, `viewport`, `layout`

**Версии и стандарты:**
- `ES6`, `ES2017`

**Дополнительные:**
- `api`, `methods`, `iteration`, `entries`, `keys`, `values`
- `call-stack`, `stack`, `heap`
- `formatting`, `parsing`
- `scripting`
- `database`
- `html`
- `kubernetes`
- `processes`
- `reactivity`
- `safety`
- `version-control`
- `versioning`

**Примечание:** Теги используются для фильтрации и поиска тем. При создании новой темы выбирайте релевантные теги из этого списка для лучшей категоризации.
