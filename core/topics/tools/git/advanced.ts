import { Topic } from '../../../types';

export const GIT_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'git-hooks',
    title: 'Hooks',
    difficulty: 'advanced',
    description: 'Git hooks позволяют запускать скрипты автоматически на определённые события: коммит, push, merge и другие. Автоматизация задач при пуше, коммите и других событиях. Hooks делают Git похожим на мини-сервер CI/CD прямо на вашей машине — можно автоматически проверять код и тесты до коммита.',
    keyPoints: [
      'Hooks — скрипты, выполняемые при событиях Git',
      'Хранятся в .git/hooks/ (не коммитятся в репозиторий по умолчанию)',
      'Pre-commit: выполняется перед коммитом, может его отменить',
      'Post-commit: выполняется после коммита',
      'Pre-push: выполняется перед push',
      'Commit-msg: проверка сообщения коммита',
      'Можно использовать для проверки кода, тестов, форматирования',
      'Husky упрощает управление hooks в проекте',
      'Hooks можно использовать для автоматизации деплоя и CI/CD'
    ],
    tags: ['git', 'version-control', 'hooks', 'automation', 'ci-cd', 'testing', 'linting', 'tools', 'productivity'],
    funFact: 'Hooks делают Git похожим на мини-сервер CI/CD прямо на вашей машине — можно автоматически проверять код и тесты до коммита. Многие компании используют pre-commit hooks для автоматического форматирования кода и запуска тестов, что значительно повышает качество кода.',
    examples: [
      {
        title: 'Доступные hooks',
        code: `# Pre-commit: перед коммитом
.git/hooks/pre-commit

# Post-commit: после коммита
.git/hooks/post-commit

# Pre-push: перед push
.git/hooks/pre-push

# Commit-msg: проверка сообщения коммита
.git/hooks/commit-msg

# И другие...`
      },
      {
        title: 'Простой pre-commit hook',
        code: `#!/bin/sh
# .git/hooks/pre-commit

# Запустить линтер
npm run lint

# Если линтер вернул ошибку, отменить коммит
if [ $? -ne 0 ]; then
  echo "Линтер нашел ошибки. Коммит отменен."
  exit 1
fi

exit 0`
      },
      {
        title: 'Pre-commit с проверкой тестов',
        code: `#!/bin/sh
# .git/hooks/pre-commit

echo "Запуск тестов..."

# Запустить тесты
npm test

if [ $? -ne 0 ]; then
  echo "Тесты не прошли. Коммит отменен."
  exit 1
fi

echo "Тесты прошли успешно!"
exit 0`
      },
      {
        title: 'Commit-msg hook',
        code: `#!/bin/sh
# .git/hooks/commit-msg

# Проверить формат сообщения
commit_msg=$(cat "$1")

# Должно начинаться с типа: feat, fix, docs, etc.
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore): "; then
  echo "Ошибка: сообщение должно начинаться с типа (feat, fix, docs, etc.)"
  exit 1
fi

exit 0`
      },
      {
        title: 'Использование Husky',
        code: `# Установить Husky
npm install --save-dev husky

# Инициализировать
npx husky install

# Добавить pre-commit hook
npx husky add .husky/pre-commit "npm test"

# Добавить commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

# Hooks хранятся в .husky/ и коммитятся в репозиторий`
      }
    ],
    relatedTopics: ['git-changes-management', 'git-submodules', 'testing-basics']
  },
  {
    id: 'git-submodules',
    title: 'Submodules',
    difficulty: 'advanced',
    description: 'Сабмодули позволяют включать другие Git-репозитории в ваш проект и управлять ими как зависимостями. Подключение внешних репозиториев как модулей. Полезно для повторного использования кода и монорепозиториев. Работа с вложенными репозиториями требует осторожности.',
    keyPoints: [
      'Submodules позволяют включать один репозиторий в другой',
      'Полезно для зависимостей, библиотек, общих компонентов',
      'git submodule add добавляет submodule',
      'git submodule update обновляет submodules',
      'Клонирование с submodules: git clone --recursive',
      'Работа с вложенными репозиториями требует осторожности',
      'Альтернативы: monorepo, пакетные менеджеры (npm, yarn)',
      '.gitmodules файл хранит конфигурацию submodules'
    ],
    tags: ['git', 'version-control', 'submodules', 'dependencies', 'monorepo', 'reusability', 'tools', 'productivity'],
    funFact: 'Сабмодули часто используют для подключения общих библиотек, чтобы не дублировать код и поддерживать единые версии. Они были добавлены в Git в 2008 году, однако многие разработчики предпочитают использовать monorepo или пакетные менеджеры для управления зависимостями.',
    examples: [
      {
        title: 'Добавление submodule',
        code: `# Добавить submodule
git submodule add https://github.com/user/library.git libs/library

# Это создаст:
# - .gitmodules файл с конфигурацией
# - libs/library директорию с репозиторием

# Посмотреть список submodules
git submodule status`
      },
      {
        title: 'Клонирование с submodules',
        code: `# Клонировать репозиторий с submodules
git clone --recursive https://github.com/user/project.git

# Или после клонирования
git clone https://github.com/user/project.git
cd project
git submodule init
git submodule update

# Или одной командой
git submodule update --init --recursive`
      },
      {
        title: 'Обновление submodules',
        code: `# Обновить все submodules до последней версии
git submodule update --remote

# Обновить конкретный submodule
git submodule update --remote libs/library

# Обновить и закоммитить изменения
git submodule update --remote
git add .gitmodules libs/library
git commit -m "Обновить submodule"`
      },
      {
        title: 'Работа с submodule',
        code: `# Перейти в submodule
cd libs/library

# Работать как с обычным репозиторием
git checkout -b feature
# ... изменения ...
git commit -m "Изменения в submodule"
git push origin feature

# Вернуться в основной репозиторий
cd ../..
git add libs/library
git commit -m "Обновить ссылку на submodule"`
      },
      {
        title: 'Удаление submodule',
        code: `# 1. Удалить из .gitmodules
git rm --cached libs/library

# 2. Удалить из .git/config
git config -f .git/config --remove-section submodule.libs/library

# 3. Удалить директорию
rm -rf .git/modules/libs/library
rm -rf libs/library

# 4. Закоммитить
git commit -m "Удалить submodule"`
      }
    ],
    relatedTopics: ['git-hooks', 'git-gui-tools', 'npm-basics']
  },
  {
    id: 'git-gui-tools',
    title: 'Продвинутые инструменты и GUI',
    difficulty: 'advanced',
    description: 'GUI-инструменты делают работу с Git визуальной и помогают управлять ветками, коммитами и конфликтами проще. Использование графических клиентов для работы с Git. Просмотр истории, веток, конфликтов через GUI. Ускорение работы и визуализация сложных веток.',
    keyPoints: [
      'GUI-инструменты: GitKraken, VS Code, JetBrains, GitHub Desktop',
      'GUI удобен для визуализации истории и веток',
      'GUI упрощает разрешение конфликтов',
      'CLI быстрее для частых операций и автоматизации',
      'VS Code: встроенная поддержка Git, визуальный diff, merge tool',
      'GitKraken: мощный GUI с графом истории, drag-and-drop merge',
      'JetBrains: интегрированный Git в IDE, визуальное сравнение',
      'GitHub Desktop: простой GUI для базовых операций',
      'Лучше знать оба подхода: GUI для сложных операций, CLI для повседневных'
    ],
    tags: ['git', 'version-control', 'gui', 'ide', 'tools', 'productivity', 'visualization'],
    funFact: 'Многие разработчики используют GUI-инструменты не вместо командной строки, а как ускоритель для визуализации сложных веток и истории. Первый GUI для Git появился в 2007 году, но большинство разработчиков до сих пор предпочитают CLI для повседневной работы.',
    examples: [
      {
        title: 'VS Code Git интеграция',
        code: `# VS Code имеет встроенную поддержку Git:
# - Визуальный diff файлов
# - Source Control панель для staging и коммитов
# - Встроенный merge tool для разрешения конфликтов
# - История коммитов через Git Graph extension
# - Визуальное сравнение веток

# Быстрые действия:
# - Ctrl+Shift+G: открыть Source Control
# - Click на файл: просмотр diff
# - + кнопка: добавить в staging
# - ✓ кнопка: создать коммит`
      },
      {
        title: 'GitKraken',
        code: `# GitKraken предоставляет:
# - Визуальный граф истории веток
# - Drag-and-drop для merge и rebase
# - Встроенный merge tool
# - Интеграция с GitHub, GitLab, Bitbucket
# - Поддержка submodules и LFS

# Особенности:
# - Красивая визуализация веток
# - Упрощенное разрешение конфликтов
# - История изменений файлов
# - Поиск по коммитам и файлам`
      },
      {
        title: 'JetBrains IDE (WebStorm, IntelliJ)',
        code: `# Встроенный Git в JetBrains:
# - VCS панель для всех операций
# - Визуальное сравнение файлов (diff)
# - Merge tool с трехпанельным видом
# - История изменений файла
# - Annotate (blame) с подсветкой
# - Визуальный rebase через интерфейс

# Горячие клавиши:
# - Ctrl+K: commit
# - Ctrl+Shift+K: push
# - Alt+\` : VCS меню`
      },
      {
        title: 'Когда использовать GUI vs CLI',
        code: `# GUI лучше для:
# - Визуализации истории веток
# - Разрешения сложных конфликтов
# - Поиска по истории коммитов
# - Просмотра изменений в файлах
# - Обучения Git новичками

# CLI лучше для:
# - Быстрых операций (add, commit, push)
# - Автоматизации через скрипты
# - Работы на серверах
# - CI/CD пайплайнов
# - Когда нужна точность команд`
      },
      {
        title: 'Git Graph в VS Code',
        code: `# Установить расширение "Git Graph"
# Позволяет:
# - Визуализировать все ветки и коммиты
# - Видеть merge и rebase операции
# - Создавать ветки прямо из графа
# - Cherry-pick коммиты через интерфейс
# - Сравнивать ветки визуально
# - Просматривать изменения в коммитах

# Открыть: Ctrl+Shift+P -> "Git Graph: View Git Graph"`
      }
    ],
    relatedTopics: ['git-submodules', 'git-hooks', 'devtools-basics']
  }
];
