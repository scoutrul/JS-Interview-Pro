import { Topic } from '../../../types';

export const GIT_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'git-branches-merge',
    title: 'Ветки и слияние',
    difficulty: 'intermediate',
    description: 'Ветки позволяют разрабатывать новые функции изолированно и безопасно сливать их в основную ветку. Создание, переключение и объединение веток, разрешение конфликтов при слиянии. Ветка — это указатель на коммит, не копия файлов, поэтому создание ветки происходит мгновенно.',
    keyPoints: [
      'git branch: создает новую ветку или показывает список веток',
      'git switch / git checkout: переключается на другую ветку',
      'git checkout -b / git switch -c: создает и переключается одной командой',
      'main/master: основная ветка проекта',
      'Ветка — это указатель на коммит, не копия файлов',
      'git merge: объединяет изменения из ветки в текущую',
      'Fast-forward merge: когда целевая ветка не имеет новых коммитов',
      'Merge commit: создается при объединении двух историй',
      'Конфликты возникают при разных изменениях в одних строках',
      'Маркеры конфликтов: <<<<<<, =======, >>>>>>'
    ],
    tags: ['git', 'version-control', 'branches', 'merge', 'conflicts', 'collaboration', 'tools', 'productivity'],
    funFact: 'Изначально Git не имел команды "git switch", она появилась позже для упрощения переключения веток и сокращения ошибок. Ветки в Git — это просто указатели на коммиты, поэтому создание ветки происходит мгновенно и не занимает дополнительное место.',
    examples: [
      {
        title: 'Работа с ветками',
        code: `# Показать все ветки
git branch

# Создать новую ветку
git branch feature-login

# Переключиться на ветку
git checkout feature-login
# или (новый способ)
git switch feature-login

# Создать и переключиться одной командой
git checkout -b feature-login
# или
git switch -c feature-login

# Удалить ветку (после merge)
git branch -d feature-login

# Принудительно удалить ветку
git branch -D feature-login`
      },
      {
        title: 'Слияние веток',
        code: `# Переключиться на основную ветку
git checkout main

# Слить feature ветку в main
git merge feature-login

# После успешного merge удалить ветку
git branch -d feature-login

# Если merge не удался, отменить
git merge --abort

# Fast-forward merge (без merge commit)
git merge feature-login

# Если нужен merge commit даже при fast-forward
git merge --no-ff feature-login`
      },
      {
        title: 'Разрешение конфликтов',
        code: `# При конфликтах Git остановит merge
git merge feature-login
# CONFLICT (content): Merge conflict in file.js

# Файл с конфликтом выглядит так:
<<<<<<< HEAD
const name = "Alice";
=======
const name = "Bob";
>>>>>>> feature-branch

# Нужно выбрать один вариант или объединить:
const name = "Alice and Bob";

# После разрешения:
git add file.js
git commit

# Или использовать инструмент
git mergetool`
      },
      {
        title: 'Проверка веток',
        code: `# На какой ветке я нахожусь
git branch --show-current

# Последний коммит в каждой ветке
git branch -v

# Ветки, слитые в текущую
git branch --merged

# Ветки, не слитые в текущую
git branch --no-merged`
      }
    ],
    relatedTopics: ['git-status-history', 'git-changes-management']
  },
  {
    id: 'git-changes-management',
    title: 'Управление изменениями',
    difficulty: 'intermediate',
    description: 'Git предоставляет гибкие способы отмены изменений, временного хранения работы и переноса отдельных коммитов. Инструменты для безопасного управления коммитами и временными изменениями: reset, revert, stash, cherry-pick.',
    keyPoints: [
      'git reset: откатывает HEAD к указанному коммиту',
      '--soft: сохраняет изменения в staging area',
      '--mixed: сохраняет изменения в рабочей директории (по умолчанию)',
      '--hard: удаляет все изменения (опасно!)',
      'git revert: создает новый коммит, отменяющий изменения (безопасно)',
      'git stash: временно сохраняет незакоммиченные изменения',
      'git stash pop: восстанавливает и удаляет stash',
      'git stash apply: восстанавливает, но не удаляет',
      'git cherry-pick: применяет изменения из коммита в текущую ветку',
      'Reset опасен для публичных веток, revert безопасен'
    ],
    tags: ['git', 'version-control', 'reset', 'revert', 'stash', 'cherry-pick', 'undo', 'tools', 'productivity'],
    funFact: 'Команда "git stash" может спасти вас, если вы начали менять код, но срочно нужно переключиться на другую ветку — она как карман для временных изменений. Stash использует специальную область хранения, которая не является частью рабочей директории или индекса.',
    examples: [
      {
        title: 'Reset (откат коммитов)',
        code: `# Откатить последний коммит, сохранив изменения в staging
git reset --soft HEAD~1

# Откатить последний коммит, сохранив изменения в рабочей директории
git reset HEAD~1
# или
git reset --mixed HEAD~1

# ОПАСНО! Откатить и удалить все изменения
git reset --hard HEAD~1

# Откатить к конкретному коммиту
git reset --hard abc123`
      },
      {
        title: 'Revert (безопасный откат)',
        code: `# Создать новый коммит, отменяющий изменения
git revert HEAD

# Отменить конкретный коммит
git revert abc123

# Отменить несколько коммитов
git revert HEAD~3..HEAD

# Revert безопасен для публичных веток
# Не переписывает историю`
      },
      {
        title: 'Stash (временное сохранение)',
        code: `# Сохранить текущие изменения
git stash

# Или с сообщением
git stash save "WIP: работа над функцией"

# Переключиться на другую ветку
git checkout main

# Вернуться и восстановить
git checkout feature
git stash pop

# Применить stash, но не удалять
git stash apply stash@{0}

# Список всех stash
git stash list

# Включить неотслеживаемые файлы
git stash -u`
      },
      {
        title: 'Cherry-pick (перенос коммитов)',
        code: `# Применить коммит в текущую ветку
git cherry-pick abc123

# Применить несколько коммитов
git cherry-pick abc123 def456

# Применить диапазон (не включая начальный)
git cherry-pick abc123..def456

# Применить изменения, но не коммитить
git cherry-pick -n abc123

# Если есть конфликты, разрешить и:
git add file.js
git cherry-pick --continue

# Или отменить
git cherry-pick --abort`
      }
    ],
    relatedTopics: ['git-branches-merge', 'git-hooks']
  }
];
