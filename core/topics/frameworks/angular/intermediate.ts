import { Topic } from '../../../types';

export const ANGULAR_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'angular-di',
    title: 'Dependency Injection',
    difficulty: 'intermediate',
    description: 'Dependency Injection (DI) — это система управления зависимостями в Angular. Иерархия инжекторов: каждый компонент имеет свой инжектор, который наследует от родительского. Providers определяют как создавать зависимости. Это создаёт систему управления зависимостями, где зависимости предоставляются, а не создаются напрямую.\n\nИерархия инжекторов: корневой инжектор (приложение), модульные инжекторы (модули), компонентные инжекторы (компоненты). Зависимость ищется в текущем инжекторе, затем в родительском, и так далее до корневого. Это создаёт дерево инжекторов, соответствующее дереву компонентов.\n\nProviders: определяют как создавать зависимости. Могут быть: классы (singleton по умолчанию), фабрики (кастомная логика создания), значения (константы). Это даёт гибкость в управлении зависимостями. Понимание DI критично для работы с Angular.\n\nВ 2026 DI остаётся одной из сильных сторон Angular. Она создаёт систему управления зависимостями, которая упрощает тестирование и организацию кода. Понимание DI критично для эффективной работы с Angular.',
    keyPoints: [
      'DI: система управления зависимостями',
      'Иерархия инжекторов: корневой → модульные → компонентные',
      'Providers: определяют как создавать зависимости',
      'Зависимости предоставляются, а не создаются напрямую',
      'Сильная сторона Angular в 2026',
      'Критично для эффективной работы'
    ],
    funFact: 'Dependency Injection был одной из ключевых инноваций Angular 2. Идея пришла из enterprise разработки, где управление зависимостями критично для тестируемости и организации кода. Angular адаптировал это для фронтенд разработки.',
    tags: ['angular', 'dependency-injection', 'di', 'providers', 'intermediate', 'core'],
    examples: [
      {
        title: 'Dependency Injection',
        code: `// Dependency Injection в Angular
// Сервис
@Injectable({
  providedIn: 'root' // Singleton на уровне приложения
})
export class UserService {
  getUsers() {
    return this.http.get('/api/users');
  }
  
  constructor(private http: HttpClient) {
    // HttpClient инжектируется автоматически
  }
}

// Компонент использует сервис
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) {
    // UserService инжектируется автоматически
  }
}

// Преимущество: зависимости предоставляются
// Не нужно создавать вручную
// Легко тестировать (можно мокировать)`
      },
      {
        title: 'Иерархия инжекторов',
        code: `// Иерархия инжекторов
// Корневой инжектор (приложение)
//   ↓
// Модульный инжектор (модуль)
//   ↓
// Компонентный инжектор (компонент)

// Зависимость ищется:
// 1. В компонентном инжекторе
// 2. В модульном инжекторе
// 3. В корневом инжекторе

// Пример:
@Component({
  providers: [UserService] // Локальный provider
})
export class UserComponent {
  constructor(private userService: UserService) {
    // Используется локальный UserService
    // Не глобальный singleton
  }
}

// Преимущество: можно переопределить зависимости
// Локальные providers для изоляции`
      },
      {
        title: 'Providers',
        code: `// Providers: определяют как создавать зависимости
// 1. Класс (singleton по умолчанию)
providers: [UserService]

// 2. Фабрика (кастомная логика)
providers: [
  {
    provide: UserService,
    useFactory: () => {
      return new UserService(environment.apiUrl);
    }
  }
]

// 3. Значение (константа)
providers: [
  {
    provide: 'API_URL',
    useValue: 'https://api.example.com'
  }
]

// Преимущество: гибкость в управлении зависимостями
// Можно кастомизировать создание`
      }
    ],
    relatedTopics: ['angular-change-detection', 'angular-rxjs'],
    isFrontendEssential: true
  },
  {
    id: 'angular-change-detection',
    title: 'Change Detection',
    difficulty: 'intermediate',
    description: 'Change Detection — это механизм отслеживания изменений в Angular. Zone.js перехватывает асинхронные операции и запускает проверку изменений. Стратегии: Default (проверяет все компоненты), OnPush (проверяет только при изменении inputs или events). Ручное управление через ChangeDetectorRef.\n\nZone.js: перехватывает асинхронные операции (setTimeout, Promise, события), автоматически запускает проверку изменений после их выполнения. Это создаёт автоматическое отслеживание, но добавляет overhead. OnPush стратегия оптимизирует это: проверяет только при изменении inputs или events.\n\nСтратегии: Default проверяет все компоненты при каждом цикле, OnPush проверяет только при изменении inputs или events. Ручное управление через ChangeDetectorRef.detectChanges() для принудительной проверки. Понимание change detection критично для оптимизации производительности.\n\nВ 2026 change detection остаётся важной частью Angular. OnPush стратегия стала стандартом для оптимизации. Понимание change detection критично для создания производительных Angular приложений.',
    keyPoints: [
      'Change Detection: механизм отслеживания изменений',
      'Zone.js: перехватывает асинхронные операции, запускает проверку',
      'Стратегии: Default (все компоненты), OnPush (только при изменениях)',
      'OnPush: проверяет только при изменении inputs или events',
      'Ручное управление через ChangeDetectorRef',
      'Критично для оптимизации производительности'
    ],
    funFact: 'Zone.js был создан в 2014 году специально для Angular. Идея в том, что можно перехватывать асинхронные операции и автоматически запускать проверку изменений. Это упростило разработку, но добавило overhead, что привело к созданию OnPush стратегии.',
    tags: ['angular', 'change-detection', 'zonejs', 'onpush', 'intermediate', 'core'],
    examples: [
      {
        title: 'Zone.js',
        code: `// Zone.js: автоматическое отслеживание
@Component({
  selector: 'app-counter',
  template: '<div>{{ count }}</div>'
})
export class CounterComponent {
  count = 0;
  
  increment() {
    setTimeout(() => {
      this.count++; // Zone.js автоматически запускает проверку
    }, 1000);
  }
}

// Zone.js перехватывает setTimeout
// После выполнения запускает проверку изменений
// Компонент автоматически обновляется

// Преимущество: автоматическое отслеживание
// Недостаток: overhead на перехват`
      },
      {
        title: 'OnPush стратегия',
        code: `// OnPush: оптимизация change detection
@Component({
  selector: 'app-user',
  template: '<div>{{ user.name }}</div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user!: User;
  
  // Проверяется только при:
  // - Изменении @Input()
  // - Событиях (click, input, etc)
  // - Async pipe
  // - Ручном вызове detectChanges()
}

// Преимущество: меньше проверок
// Проверяется только при реальных изменениях
// Лучшая производительность`
      },
      {
        title: 'Ручное управление',
        code: `// Ручное управление change detection
@Component({
  selector: 'app-data',
  template: '<div>{{ data }}</div>'
})
export class DataComponent {
  data: any;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateData() {
    // Асинхронная операция вне Zone.js
    someThirdPartyLibrary.onUpdate((newData) => {
      this.data = newData;
      // Ручной вызов проверки
      this.cdr.detectChanges();
    });
  }
}

// Преимущество: контроль над проверкой
// Полезно для third-party библиотек
// Вне Zone.js`
      }
    ],
    relatedTopics: ['angular-rxjs', 'angular-performance'],
    isFrontendEssential: true
  },
  {
    id: 'angular-rxjs',
    title: 'RxJS',
    difficulty: 'intermediate',
    description: 'RxJS в Angular — это библиотека реактивного программирования, используемая для работы с асинхронными операциями. Observables представляют потоки данных, Operators трансформируют потоки, Subjects позволяют создавать кастомные потоки. RxJS интегрирован в Angular: HTTP клиент возвращает Observables, роутер использует Observables для навигации.\n\nObservables: представляют потоки данных, которые можно подписать через subscribe. Operators: map, filter, switchMap, mergeMap для трансформации потоков. Subjects: кастомные потоки, которые можно использовать для создания реактивных систем. Понимание RxJS критично для работы с Angular.\n\nBest practices: использовать async pipe для автоматической подписки и отписки, использовать операторы для трансформации, избегать утечек памяти (отписываться от подписок). Понимание RxJS критично для эффективной работы с Angular.\n\nВ 2026 RxJS остаётся важной частью Angular. Он создаёт реактивную систему для работы с асинхронными операциями. Понимание RxJS критично для работы с Angular.',
    keyPoints: [
      'RxJS: библиотека реактивного программирования',
      'Observables: потоки данных, подписка через subscribe',
      'Operators: map, filter, switchMap для трансформации',
      'Subjects: кастомные потоки для реактивных систем',
      'Интегрирован в Angular: HTTP, роутер используют Observables',
      'Критично для работы с Angular'
    ],
    funFact: 'RxJS был создан в 2012 году как порт Reactive Extensions для JavaScript. Angular 2 выбрал RxJS как основу для работы с асинхронными операциями, что сделало реактивное программирование стандартом в Angular экосистеме.',
    tags: ['angular', 'rxjs', 'observables', 'operators', 'intermediate', 'core'],
    examples: [
      {
        title: 'Observables',
        code: `// Observables: потоки данных
import { Observable } from 'rxjs';

// HTTP клиент возвращает Observable
this.http.get<User[]>('/api/users')
  .subscribe(users => {
    this.users = users;
  });

// Роутер использует Observable
this.router.events.subscribe(event => {
  console.log('Navigation:', event);
});

// Преимущество: реактивное программирование
// Можно трансформировать потоки
// Легко комбинировать`
      },
      {
        title: 'Operators',
        code: `// Operators: трансформация потоков
import { map, filter, switchMap } from 'rxjs/operators';

this.http.get<User[]>('/api/users')
  .pipe(
    map(users => users.filter(u => u.active)), // Фильтрация
    map(users => users.map(u => u.name)) // Трансформация
  )
  .subscribe(names => {
    this.names = names;
  });

// switchMap: переключение на новый поток
this.route.params.pipe(
  switchMap(params => this.http.get(\`/api/users/\${params.id}\`))
).subscribe(user => {
  this.user = user;
});

// Преимущество: мощная трансформация
// Композиция операторов
// Реактивное программирование`
      },
      {
        title: 'Async pipe',
        code: `// Async pipe: автоматическая подписка и отписка
@Component({
  template: \`
    <div *ngIf="user$ | async as user">
      {{ user.name }}
    </div>
  \`
})
export class UserComponent {
  user$ = this.http.get<User>('/api/user');
  
  // Async pipe автоматически:
  // - Подписывается на Observable
  // - Отписывается при уничтожении компонента
  // - Обновляет view при изменении данных
  
  // Преимущество: нет утечек памяти
  // Автоматическое управление подписками
  // Меньше boilerplate`
      }
    ],
    relatedTopics: ['angular-router', 'angular-forms'],
    isFrontendEssential: true
  },
  {
    id: 'angular-modular-system',
    title: 'Модульная система',
    difficulty: 'intermediate',
    description: 'Модульная система Angular — это организация кода в модули (NgModules). Standalone components (Angular 14+) позволяют создавать компоненты без модулей, упрощая структуру. Lazy loading модулей оптимизирует загрузку: модули загружаются только при навигации. SCAM (Single Component Angular Module) паттерн для изоляции компонентов.\n\nNgModules: определяют границы компиляции и инжекции. Они группируют компоненты, директивы, pipes, сервисы. Standalone components: компоненты без модулей, импортируют зависимости напрямую. Это упрощает структуру, но требует явных импортов.\n\nLazy loading: модули загружаются только при навигации, снижая размер начального бандла. SCAM паттерн: каждый компонент в своём модуле для изоляции. Понимание модульной системы критично для организации кода в Angular.\n\nВ 2026 standalone components стали популярными, упрощая структуру. Но модули остаются важными для организации кода. Понимание модульной системы критично для работы с Angular.',
    keyPoints: [
      'Модульная система: NgModules для организации кода',
      'Standalone components: компоненты без модулей (Angular 14+)',
      'Lazy loading: модули загружаются только при навигации',
      'SCAM паттерн: изоляция компонентов через модули',
      'Standalone components упрощают структуру в 2026',
      'Критично для организации кода'
    ],
    funFact: 'Standalone components были добавлены в Angular 14 в 2022 году как способ упростить структуру приложений. Идея в том, что не всегда нужны модули, особенно для простых компонентов. Это сделало Angular более гибким и простым для маленьких проектов.',
    tags: ['angular', 'modules', 'standalone', 'lazy-loading', 'intermediate'],
    examples: [
      {
        title: 'NgModules',
        code: `// NgModules: организация кода
@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule {}

// Преимущество: группировка компонентов
// Чёткие границы компиляции
// Управление зависимостями`
      },
      {
        title: 'Standalone components',
        code: `// Standalone components: без модулей
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: '<div>{{ user.name }}</div>'
})
export class UserComponent {
  // Не нужен модуль
  // Импорты напрямую в компоненте
  // Проще структура
}

// Преимущество: проще структура
// Не нужны модули для простых компонентов
// Явные импорты
// Стандарт для новых проектов`
      },
      {
        title: 'Lazy loading',
        code: `// Lazy loading модулей
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  }
];

// Модуль загружается только при навигации
// Не входит в начальный бандл
// Снижает размер начального бандла

// Преимущество: оптимизация загрузки
// Модули загружаются по мере необходимости
// Быстрее Time to Interactive`
      }
    ],
    relatedTopics: ['angular-forms', 'angular-router'],
    isFrontendEssential: false
  },
  {
    id: 'angular-forms',
    title: 'Forms',
    difficulty: 'intermediate',
    description: 'Forms в Angular: Template-driven (декларативные формы через директивы) и Reactive (императивные формы через FormBuilder). Template-driven проще для простых форм, Reactive даёт больше контроля для сложных форм. Валидация через встроенные валидаторы и кастомные валидаторы.\n\nTemplate-driven: формы через директивы в шаблоне, валидация через HTML5 атрибуты и Angular директивы. Reactive: формы через FormBuilder, валидация через валидаторы. Выбор зависит от сложности: простые формы → Template-driven, сложные формы → Reactive.\n\nВалидация: встроенные валидаторы (required, min, max, pattern), кастомные валидаторы для специфичной логики, асинхронные валидаторы для проверки на сервере. Понимание форм критично для работы с формами в Angular.\n\nВ 2026 Reactive forms стали стандартом для сложных форм, но Template-driven остаются популярными для простых форм. Понимание обоих подходов критично для работы с формами в Angular.',
    keyPoints: [
      'Два подхода: Template-driven (декларативные) и Reactive (императивные)',
      'Template-driven: проще для простых форм',
      'Reactive: больше контроля для сложных форм',
      'Валидация: встроенные, кастомные, асинхронные валидаторы',
      'Reactive forms стандарт для сложных форм в 2026',
      'Критично для работы с формами'
    ],
    funFact: 'Reactive forms были добавлены в Angular 2 как альтернатива Template-driven forms. Идея в том, что императивный подход даёт больше контроля для сложных форм, особенно с динамическими полями и сложной валидацией.',
    tags: ['angular', 'forms', 'template-driven', 'reactive', 'validation', 'intermediate'],
    examples: [
      {
        title: 'Template-driven forms',
        code: `// Template-driven: декларативные формы
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <input 
    name="email"
    ngModel
    required
    email
    #email="ngModel"
  />
  <div *ngIf="email.invalid && email.touched">
    Email обязателен и должен быть валидным
  </div>
  
  <button [disabled]="form.invalid">Отправить</button>
</form>

// Преимущество: простота
// Валидация через директивы
// Подходит для простых форм`
      },
      {
        title: 'Reactive forms',
        code: `// Reactive: императивные формы
import { FormBuilder, Validators } from '@angular/forms';

export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  
  constructor(private fb: FormBuilder) {}
  
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}

// Template:
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="email" />
  <div *ngIf="form.get('email')?.invalid">
    Email обязателен
  </div>
  
  <button [disabled]="form.invalid">Отправить</button>
</form>

// Преимущество: больше контроля
// Подходит для сложных форм
// Легче тестировать`
      },
      {
        title: 'Кастомные валидаторы',
        code: `// Кастомный валидатор
function customValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value && control.value.length < 5) {
    return { minLength: true };
  }
  return null;
}

// Использование:
this.form = this.fb.group({
  username: ['', [Validators.required, customValidator]]
});

// Асинхронный валидатор
function asyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return this.userService.checkUsername(control.value).pipe(
    map(exists => exists ? { usernameExists: true } : null)
  );
}

// Преимущество: гибкая валидация
// Можно проверять на сервере`
      }
    ],
    relatedTopics: ['angular-router', 'angular-state-management'],
    isFrontendEssential: false
  },
  {
    id: 'angular-router',
    title: 'Router',
    difficulty: 'intermediate',
    description: 'Angular Router — это официальная библиотека роутинга для Angular. Guards защищают маршруты (canActivate, canDeactivate), Resolvers предзагружают данные перед активацией маршрута, Lazy loading оптимизирует загрузку модулей. Это создаёт систему навигации с защитой и оптимизацией.\n\nGuards: canActivate (проверка перед активацией), canDeactivate (проверка перед деактивацией), canLoad (проверка перед загрузкой модуля). Resolvers: предзагружают данные перед активацией маршрута, данные доступны в компоненте через ActivatedRoute. Lazy loading: модули загружаются только при навигации.\n\nAuxiliary routes: дополнительные маршруты для отображения нескольких представлений одновременно (например, список и детали). Понимание роутинга критично для создания навигации в Angular приложениях.\n\nВ 2026 Angular Router остаётся стандартом для роутинга в Angular. Guards и Resolvers создают систему защиты и оптимизации маршрутов. Понимание роутинга критично для работы с Angular.',
    keyPoints: [
      'Angular Router: официальная библиотека роутинга',
      'Guards: canActivate, canDeactivate, canLoad для защиты маршрутов',
      'Resolvers: предзагружают данные перед активацией',
      'Lazy loading: модули загружаются только при навигации',
      'Auxiliary routes: дополнительные маршруты для нескольких представлений',
      'Критично для создания навигации'
    ],
    funFact: 'Angular Router был создан в 2014 году как часть Angular 2. За годы он стал одной из самых мощных библиотек роутинга, предоставляя guards, resolvers, lazy loading и другие возможности, которые стали стандартом для SPA роутинга.',
    tags: ['angular', 'router', 'guards', 'resolvers', 'intermediate', 'core'],
    examples: [
      {
        title: 'Guards',
        code: `// Guard: защита маршрута
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

// Использование:
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

// Преимущество: защита маршрутов
// Автоматическая проверка перед навигацией
// Редирект при необходимости`
      },
      {
        title: 'Resolvers',
        code: `// Resolver: предзагрузка данных
@Injectable()
export class UserResolver implements Resolve<User> {
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']);
  }
}

// Использование:
const routes: Routes = [
  {
    path: 'user/:id',
    component: UserComponent,
    resolve: { user: UserResolver }
  }
];

// В компоненте:
export class UserComponent {
  user$ = this.route.data.pipe(
    map(data => data['user'])
  );
  
  constructor(private route: ActivatedRoute) {}
}

// Преимущество: данные загружаются до активации
// Компонент получает готовые данные
// Лучший UX`
      },
      {
        title: 'Lazy loading',
        code: `// Lazy loading модулей
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module')
      .then(m => m.SettingsModule)
  }
];

// Модули загружаются только при навигации
// Не входят в начальный бандл
// Снижает размер начального бандла

// Преимущество: оптимизация загрузки
// Быстрее Time to Interactive
// Модули загружаются по мере необходимости`
      }
    ],
    relatedTopics: ['angular-state-management', 'angular-testing'],
    isFrontendEssential: true
  },
  {
    id: 'angular-state-management',
    title: 'Управление состоянием',
    difficulty: 'intermediate',
    description: 'Управление состоянием в Angular включает: NgRx (Redux паттерн для Angular), Akita (простота и TypeScript), NGXS (простота и производительность), Services с RxJS (простое решение для маленьких проектов). Каждая библиотека решает свою задачу и подходит для разных сценариев.\n\nNgRx: Redux паттерн для Angular, Actions, Reducers, Effects, Store. Подходит для больших проектов с сложным состоянием. Akita: простота, меньше boilerplate, лучшая TypeScript поддержка. NGXS: простота и производительность, декларативный подход. Services с RxJS: простое решение для маленьких проектов.\n\nВыбор зависит от требований: большие проекты → NgRx, средние проекты → Akita/NGXS, маленькие проекты → Services с RxJS. Понимание управления состоянием критично для выбора правильного инструмента.\n\nВ 2026 выбор библиотеки зависит от требований проекта. NgRx остаётся популярным для больших проектов, Akita и NGXS для средних, Services с RxJS для маленьких. Понимание управления состоянием критично для работы с Angular.',
    keyPoints: [
      'Библиотеки: NgRx, Akita, NGXS, Services с RxJS',
      'NgRx: Redux паттерн, подходит для больших проектов',
      'Akita: простота, меньше boilerplate',
      'NGXS: простота и производительность',
      'Services с RxJS: простое решение для маленьких проектов',
      'Выбор зависит от требований проекта'
    ],
    funFact: 'NgRx был создан в 2016 году как порт Redux для Angular. За годы он стал стандартом для управления состоянием в больших Angular приложениях, используемым тысячами команд по всему миру.',
    tags: ['angular', 'state-management', 'ngrx', 'akita', 'ngxs', 'intermediate'],
    examples: [
      {
        title: 'NgRx',
        code: `// NgRx: Redux паттерн
// Actions
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

// Reducer
export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users
  }))
);

// Effects
export const userEffects = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() =>
      this.userService.getUsers().pipe(
        map(users => loadUsersSuccess({ users }))
      )
    )
  )
);

// Использование:
this.store.dispatch(loadUsers());
this.users$ = this.store.select(selectUsers);

// Преимущество: структура, инструменты
// Подходит для больших проектов`
      },
      {
        title: 'Services с RxJS',
        code: `// Services с RxJS: простое решение
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
  
  loadUsers() {
    this.http.get<User[]>('/api/users').subscribe(users => {
      this.usersSubject.next(users);
    });
  }
}

// Использование:
this.userService.users$.subscribe(users => {
  this.users = users;
});

// Преимущество: простота
// Меньше boilerplate
// Подходит для маленьких проектов`
      },
      {
        title: 'Выбор библиотеки',
        code: `// Выбор библиотеки:
// NgRx:
// - Большие проекты
// - Сложное состояние
// - Нужны инструменты (DevTools)
// - Больше boilerplate

// Akita/NGXS:
// - Средние проекты
// - Проще чем NgRx
// - Меньше boilerplate

// Services с RxJS:
// - Маленькие проекты
// - Простое состояние
// - Минимум boilerplate

// Выбор зависит от:
// - Размера проекта
// - Сложности состояния
// - Опыта команды`
      }
    ],
    relatedTopics: ['angular-testing', 'angular-performance'],
    isFrontendEssential: false
  },
  {
    id: 'angular-testing',
    title: 'Тестирование',
    difficulty: 'intermediate',
    description: 'Тестирование Angular включает: TestBed для настройки тестового окружения, тестирование компонентов (рендеринг, взаимодействие), тестирование сервисов (изоляция зависимостей), тестирование директив и pipes. Angular предоставляет инструменты для всех типов тестирования.\n\nTestBed: настраивает тестовое окружение, создаёт модуль для тестов, предоставляет зависимости. Тестирование компонентов: рендеринг через TestBed, проверка отображения, взаимодействие через события. Тестирование сервисов: мокирование зависимостей, проверка методов, изоляция тестов.\n\nИзоляция тестов: каждый тест изолирован, зависимости мокируются, состояние не сохраняется между тестами. Это создаёт надёжные тесты, которые не зависят друг от друга. Понимание тестирования критично для создания качественного кода.\n\nВ 2026 тестирование стало стандартом для качественной разработки. Angular предоставляет мощные инструменты для тестирования. Понимание тестирования критично для работы в команде.',
    keyPoints: [
      'Тестирование: TestBed, компоненты, сервисы, директивы, pipes',
      'TestBed: настройка тестового окружения',
      'Тестирование компонентов: рендеринг, проверка, взаимодействие',
      'Тестирование сервисов: мокирование зависимостей, изоляция',
      'Стандарт для качественной разработки в 2026',
      'Критично для работы в команде'
    ],
    funFact: 'Angular был одним из первых фреймворков, который предоставил встроенные инструменты для тестирования. TestBed был создан специально для упрощения тестирования Angular приложений, предоставляя мощные возможности для настройки тестового окружения.',
    tags: ['angular', 'testing', 'testbed', 'jasmine', 'intermediate'],
    examples: [
      {
        title: 'TestBed',
        code: `// TestBed: настройка тестового окружения
describe('UserComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [UserService],
      imports: [CommonModule]
    });
  });
  
  it('should create', () => {
    const fixture = TestBed.createComponent(UserComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

// Преимущество: настройка тестового окружения
// Создание модуля для тестов
// Предоставление зависимостей`
      },
      {
        title: 'Тестирование компонентов',
        code: `// Тестирование компонентов
it('should display user name', () => {
  const fixture = TestBed.createComponent(UserComponent);
  fixture.componentInstance.user = { id: 1, name: 'Иван' };
  fixture.detectChanges();
  
  const compiled = fixture.nativeElement;
  expect(compiled.querySelector('h1').textContent).toContain('Иван');
});

it('should call onEdit when button clicked', () => {
  const fixture = TestBed.createComponent(UserComponent);
  spyOn(fixture.componentInstance, 'onEdit');
  
  const button = fixture.nativeElement.querySelector('button');
  button.click();
  
  expect(fixture.componentInstance.onEdit).toHaveBeenCalled();
});

// Преимущество: тестирование поведения
// Проверка отображения и взаимодействия`
      },
      {
        title: 'Тестирование сервисов',
        code: `// Тестирование сервисов
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should fetch users', () => {
    const mockUsers = [{ id: 1, name: 'Иван' }];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});

// Преимущество: изоляция тестов
// Мокирование HTTP запросов
// Проверка методов`
      }
    ],
    relatedTopics: ['angular-performance', 'angular-migrations'],
    isFrontendEssential: false
  }
];
