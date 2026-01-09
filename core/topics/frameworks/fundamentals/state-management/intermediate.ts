import { Topic } from '../../../../types';

export const STATE_MANAGEMENT_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'frameworks-state-management-flux',
    title: 'Flux, атомарные stores',
    difficulty: 'intermediate',
    description: 'Flux — это архитектурный паттерн для управления состоянием, который обеспечивает однонаправленный поток данных. Основные части: Actions (действия), Dispatcher (диспетчер), Stores (хранилища), Views (представления). Поток: Action → Dispatcher → Store → View → Action.\n\nFlux решает проблему циклических зависимостей и неожиданных обновлений: все изменения проходят через централизованный Dispatcher, который отправляет их в Stores. Stores обновляют состояние и уведомляют Views, которые обновляют интерфейс. Это создаёт предсказуемый цикл обновлений.\n\nАтомарные stores (Jotai, Recoil) — это эволюция Flux, где состояние разбивается на атомы (независимые части). Каждый атом может быть обновлён независимо, что улучшает производительность: обновляется только то, что изменилось, а не всё состояние.\n\nВ 2026 Flux остаётся основой для Redux, а атомарные stores становятся популярными для больших приложений. Redux Toolkit упрощает работу с Flux паттерном, а Jotai и Recoil показывают преимущества атомарного подхода.',
    keyPoints: [
      'Flux: однонаправленный поток данных (action → dispatcher → store → view)',
      'Решает проблему циклических зависимостей и неожиданных обновлений',
      'Все изменения проходят через централизованный Dispatcher',
      'Атомарные stores: состояние разбивается на независимые атомы',
      'Атомарный подход улучшает производительность: обновляется только изменившееся',
      'Redux Toolkit упрощает Flux, атомарные stores популярны для больших приложений'
    ],
    funFact: 'Flux был создан в Facebook в 2014 году специально для решения проблем с синхронизацией данных в больших приложениях. Redux, созданный в 2015 году, упростил Flux, убрав множественные stores и сделав state неизменяемым.',
    tags: ['frameworks', 'state-management', 'flux', 'atomic', 'redux', 'intermediate', 'patterns'],
    examples: [
      {
        title: 'Flux паттерн',
        code: `// Flux: однонаправленный поток
// 1. Action
const incrementAction = { type: 'INCREMENT' };

// 2. Dispatcher
const dispatcher = {
  stores: [],
  register(store) {
    this.stores.push(store);
  },
  dispatch(action) {
    this.stores.forEach(store => store.handleAction(action));
  }
};

// 3. Store
const counterStore = {
  state: { count: 0 },
  listeners: [],
  
  handleAction(action) {
    if (action.type === 'INCREMENT') {
      this.state.count++;
      this.notify();
    }
  },
  
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  },
  
  subscribe(listener) {
    this.listeners.push(listener);
  }
};

// 4. View
counterStore.subscribe(state => {
  renderCounter(state.count);
});

// Поток: Action → Dispatcher → Store → View`
      },
      {
        title: 'Атомарные stores',
        code: `// Jotai: атомарные stores
import { atom, useAtom } from 'jotai';

// Атомы: независимые части состояния
const countAtom = atom(0);
const nameAtom = atom('Иван');

// Компонент использует только нужные атомы
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  // Не подписывается на nameAtom
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

function NameDisplay() {
  const [name] = useAtom(nameAtom);
  // Не подписывается на countAtom
  return <div>{name}</div>;
}

// Преимущество: при изменении countAtom обновляется только Counter
// NameDisplay не перерисовывается, так как не подписан на countAtom`
      },
      {
        title: 'Redux Toolkit: упрощённый Flux',
        code: `// Redux Toolkit: упрощённый Flux
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Slice: action creators + reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count++;
    }
  }
});

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// Использование
function Counter() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(counterSlice.actions.increment())}>
      {count}
    </button>
  );
}

// Redux Toolkit упрощает Flux:
// - Автоматически создаёт action creators
// - Использует Immer для неизменяемости
// - Упрощает настройку store`
      }
    ],
    relatedTopics: ['frameworks-state-management-selectors-derived', 'frameworks-state-management-local-lifted-global'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-state-management-selectors-derived',
    title: 'Селекторы и derived state',
    difficulty: 'intermediate',
    description: 'Селекторы — это функции, которые извлекают и трансформируют данные из хранилища. Они мемоизируются для производительности: если входные данные не изменились, селектор возвращает кэшированный результат. Это предотвращает лишние пересчёты и перерисовки компонентов.\n\nDerived state (производное состояние) — это состояние, вычисляемое из другого состояния. Например, отфильтрованный список вычисляется из полного списка и фильтра. Вместо хранения производного состояния отдельно, оно вычисляется на лету через селекторы.\n\nМемоизация селекторов критична для производительности: без неё каждый раз при обращении к селектору происходит пересчёт, даже если данные не изменились. Библиотеки типа Reselect (Redux) и computed (Vue) автоматически мемоизируют селекторы.\n\nВ 2026 мемоизация селекторов стала стандартом. Redux Toolkit включает Reselect, Vue использует computed для производного состояния, React использует useMemo. Понимание селекторов и derived state критично для оптимизации производительности.',
    keyPoints: [
      'Селекторы: функции для извлечения и трансформации данных из хранилища',
      'Мемоизация предотвращает лишние пересчёты при неизменных данных',
      'Derived state: состояние, вычисляемое из другого состояния',
      'Вместо хранения производного состояния отдельно вычисляется на лету',
      'Мемоизация критична для производительности',
      'Стандарт во всех современных библиотеках управления состоянием'
    ],
    funFact: 'Reselect был создан в 2015 году специально для мемоизации селекторов в Redux. Идея в том, что селектор пересчитывается только если изменились входные данные, что значительно улучшает производительность больших приложений.',
    tags: ['frameworks', 'state-management', 'selectors', 'derived-state', 'memoization', 'intermediate', 'performance'],
    examples: [
      {
        title: 'Селекторы без мемоизации',
        code: `// ❌ Проблема: селектор пересчитывается каждый раз
function TodoList({ todos, filter }) {
  // Пересчитывается при каждом рендере, даже если todos и filter не изменились
  const filteredTodos = todos.filter(todo => 
    filter === 'all' || todo.status === filter
  );
  
  return (
    <ul>
      {filteredTodos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}

// Проблема: лишние пересчёты, снижение производительности`
      },
      {
        title: 'Селекторы с мемоизацией',
        code: `// ✅ Решение: мемоизация селектора
import { useMemo } from 'react';

function TodoList({ todos, filter }) {
  // Мемоизация: пересчитывается только если todos или filter изменились
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => 
      filter === 'all' || todo.status === filter
    );
  }, [todos, filter]);
  
  return (
    <ul>
      {filteredTodos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}

// Преимущество: пересчёт только при изменении зависимостей`
      },
      {
        title: 'Reselect для сложных селекторов',
        code: `// Reselect: мемоизация сложных селекторов
import { createSelector } from 'reselect';

// Базовый селектор
const getTodos = (state) => state.todos;
const getFilter = (state) => state.filter;

// Мемоизированный селектор
const getFilteredTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    // Пересчитывается только если todos или filter изменились
    return todos.filter(todo => 
      filter === 'all' || todo.status === filter
    );
  }
);

// Использование
function TodoList() {
  const filteredTodos = useSelector(getFilteredTodos);
  // Селектор мемоизирован, пересчёт только при изменении зависимостей
  return <ul>{filteredTodos.map(todo => <li>{todo.text}</li>)}</ul>;
}`
      }
    ],
    relatedTopics: ['frameworks-state-management-flux', 'frameworks-state-management-normalization'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-state-management-normalization',
    title: 'Нормализация состояния',
    difficulty: 'intermediate',
    description: 'Нормализация состояния — это организация данных в плоскую структуру, где каждая сущность хранится один раз и ссылается по ID. Вместо вложенных структур (массив объектов с вложенными объектами) используется плоская структура с отдельными объектами и связями через ID.\n\nНормализация решает проблемы дублирования данных и сложности обновлений. Если данные дублируются в разных местах, обновление требует синхронизации всех копий. В нормализованном состоянии данные хранятся один раз, обновление происходит в одном месте.\n\nСтруктура нормализованного состояния: объекты с ключами-ID, массивы ID для списков, отдельные объекты для связанных сущностей. Это упрощает обновления: изменение одной сущности не требует обновления других, так как они ссылаются на неё по ID.\n\nВ 2026 нормализация стала стандартом для серверных данных. Redux Toolkit включает нормализацию через createEntityAdapter, Apollo Client нормализует GraphQL данные автоматически. Понимание нормализации критично для работы с серверными данными.',
    keyPoints: [
      'Нормализация: плоская структура, каждая сущность хранится один раз',
      'Связи через ID вместо вложенных структур',
      'Решает проблемы дублирования и сложности обновлений',
      'Обновление происходит в одном месте, все ссылки обновляются автоматически',
      'Стандарт для серверных данных',
      'Redux Toolkit и Apollo Client включают нормализацию'
    ],
    funFact: 'Нормализация состояния пришла из теории баз данных, где нормализация используется для устранения избыточности данных. В контексте управления состоянием это было популяризировано Redux в 2015 году.',
    tags: ['frameworks', 'state-management', 'normalization', 'data-structure', 'intermediate', 'best-practices'],
    examples: [
      {
        title: 'Проблема без нормализации',
        code: `// ❌ Проблема: вложенная структура, дублирование
const state = {
  posts: [
    {
      id: 1,
      title: 'Post 1',
      author: { id: 1, name: 'Иван' }, // Дублирование
      comments: [
        { id: 1, text: 'Comment 1', author: { id: 1, name: 'Иван' } } // Дублирование
      ]
    }
  ]
};

// Проблемы:
// - Дублирование данных (author повторяется)
// - Сложно обновить: нужно найти все места где author
// - Несогласованность: если изменится author, нужно обновить везде`
      },
      {
        title: 'Нормализованное состояние',
        code: `// ✅ Решение: нормализация
const state = {
  posts: {
    byId: {
      1: { id: 1, title: 'Post 1', authorId: 1, commentIds: [1] }
    },
    allIds: [1]
  },
  authors: {
    byId: {
      1: { id: 1, name: 'Иван' } // Хранится один раз
    }
  },
  comments: {
    byId: {
      1: { id: 1, text: 'Comment 1', authorId: 1 }
    }
  }
};

// Преимущества:
// - Данные хранятся один раз
// - Обновление в одном месте: state.authors.byId[1].name = 'Новое имя'
// - Все ссылки автоматически обновляются (через authorId)`
      },
      {
        title: 'Redux Toolkit: createEntityAdapter',
        code: `// Redux Toolkit: автоматическая нормализация
import { createEntityAdapter } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter();

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    addPost: postsAdapter.addOne,
    updatePost: postsAdapter.updateOne,
    removePost: postsAdapter.removeOne
  }
});

// Автоматически создаёт нормализованную структуру:
// {
//   ids: [1, 2, 3],
//   entities: {
//     1: { id: 1, ... },
//     2: { id: 2, ... },
//     3: { id: 3, ... }
//   }
// }

// Селекторы
const { selectAll, selectById } = postsAdapter.getSelectors();
const allPosts = selectAll(state.posts);
const post = selectById(state.posts, 1);`
      }
    ],
    relatedTopics: ['frameworks-state-management-selectors-derived', 'frameworks-state-management-server-vs-client'],
    isFrontendEssential: false
  }
];
