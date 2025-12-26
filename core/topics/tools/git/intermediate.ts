import { Topic } from '../../../types';

export const GIT_INTERMEDIATE_TOPICS: Topic[] = [
{
    id: 'git-conflicts',
    title: 'Git: Разрешение конфликтов',
    difficulty: 'intermediate',
    description: 'Конфликты возникают при merge/rebase, когда в одних и тех же строках есть разные изменения. Git помечает конфликтные участки маркерами <<<<<<, =======, >>>>>>. Нужно вручную выбрать нужные изменения или объединить их. После разрешения нужно добавить файлы и завершить merge/rebase.',
    keyPoints: [
      'Конфликты возникают при слиянии веток с разными изменениями в одних строках.',
      'Git помечает конфликтные участки маркерами: <<<<<<, =======, >>>>>>.',
      'Нужно вручную выбрать изменения или объединить их.',
      'После разрешения: git add, затем git commit (для merge) или git rebase --continue.',
      'Можно отменить merge: git merge --abort, rebase: git rebase --abort.'
    ],
    tags: ['git', 'version-control', 'conflicts', 'merge', 'rebase', 'tools', 'productivity'],
    examples: [
      {
        title: "Типичный конфликт",
        code: `<<<<<<< HEAD
const name = "Alice";
=======
const name = "Bob";
>>>>>>> feature-branch

// Нужно выбрать один вариант или объединить:
const name = "Alice and Bob";`
      },
      {
        title: "Разрешение конфликта",
        code: `# 1. Открыть файл с конфликтом
# 2. Найти маркеры конфликта
# 3. Выбрать нужные изменения
# 4. Удалить маркеры <<<<<<, =======, >>>>>>
# 5. Сохранить файл

# 6. Добавить разрешенный файл
git add file.js

# 7. Завершить merge
git commit

# Или для rebase
git rebase --continue`
      },
      {
        title: "Отмена merge/rebase",
        code: `# Отменить merge
git merge --abort

# Отменить rebase
git rebase --abort

# Вернуться к состоянию до начала операции`
      },
      {
        title: "Использование инструментов для разрешения",
        code: `# Открыть визуальный инструмент
git mergetool

# Настроить инструмент по умолчанию
git config --global merge.tool vimdiff
git config --global merge.tool meld
git config --global merge.tool vscode`
      }
    ],
    relatedTopics: ['git-merge', 'git-rebase'],
  },
{
    id: 'git-rebase',
    title: 'Git: Rebase',
    difficulty: 'intermediate',
    description: 'git rebase переносит коммиты из одной ветки на другую, переписывая историю. Создает линейную историю без merge коммитов. Интерактивный rebase (git rebase -i) позволяет изменять, объединять, удалять коммиты. Опасно для публичных веток — переписывает историю. Используется для очистки истории перед merge.',
    keyPoints: [
      'rebase переносит коммиты, переписывая историю.',
      'Создает линейную историю без merge коммитов.',
      'Интерактивный rebase (-i) позволяет редактировать коммиты.',
      'Опасно для публичных веток — переписывает историю.',
      'Используется для очистки истории перед merge в main.'
    ],
    tags: ['git', 'version-control', 'rebase', 'history', 'tools', 'productivity'],
    examples: [
      {
        title: "Базовый rebase",
        code: `# Переключиться на feature ветку
git checkout feature

# Перебазировать на main
git rebase main

# Если есть конфликты, разрешить их и:
git add .
git rebase --continue

# Отменить rebase при проблемах
git rebase --abort`
      },
      {
        title: "Интерактивный rebase",
        code: `# Редактировать последние 3 коммита
git rebase -i HEAD~3

# Откроется редактор с опциями:
# pick - использовать коммит как есть
# reword - изменить сообщение
# edit - остановиться для редактирования
# squash - объединить с предыдущим
# fixup - как squash, но удалить сообщение
# drop - удалить коммит

# После сохранения Git применит изменения`
      },
      {
        title: "Squash коммитов",
        code: `# Объединить несколько коммитов в один
git rebase -i HEAD~3

# В редакторе изменить:
# pick abc123 Первый коммит
# squash def456 Второй коммит
# squash ghi789 Третий коммит

# После сохранения откроется редактор для нового сообщения`
      },
      {
        title: "Rebase vs Merge",
        code: `# Merge создает merge commit
git checkout main
git merge feature
# История: main -> feature -> merge commit

# Rebase создает линейную историю
git checkout feature
git rebase main
git checkout main
git merge feature
# История: main -> feature (линейно)`
      }
    ],
    relatedTopics: ['git-conflicts', 'git-reset-revert'],
  },
{
    id: 'git-reset-revert',
    title: 'Git: Reset и Revert',
    difficulty: 'intermediate',
    description: 'git reset откатывает HEAD и индекс к указанному коммиту. --soft сохраняет изменения в staging, --mixed (по умолчанию) в рабочей директории, --hard удаляет все. git revert создает новый коммит, отменяющий изменения указанного коммита. Reset опасен для публичных веток, revert безопасен.',
    keyPoints: [
      'git reset откатывает HEAD к указанному коммиту.',
      '--soft: сохраняет изменения в staging area.',
      '--mixed: сохраняет изменения в рабочей директории (по умолчанию).',
      '--hard: удаляет все изменения (опасно!).',
      'git revert создает новый коммит, отменяющий изменения.',
      'Reset опасен для публичных веток, revert безопасен.'
    ],
    tags: ['git', 'version-control', 'reset', 'revert', 'undo', 'tools', 'productivity'],
    examples: [
      {
        title: "Reset --soft (сохраняет в staging)",
        code: `# Откатить последний коммит, сохранив изменения в staging
git reset --soft HEAD~1

# Изменения остались в staging area
git status
# Changes to be committed: ...`
      },
      {
        title: "Reset --mixed (сохраняет в рабочей директории)",
        code: `# Откатить последний коммит, сохранив изменения
git reset HEAD~1
# или
git reset --mixed HEAD~1

# Изменения в рабочей директории, не в staging
git status
# Changes not staged for commit: ...`
      },
      {
        title: "Reset --hard (удаляет все)",
        code: `# ОПАСНО! Откатить и удалить все изменения
git reset --hard HEAD~1

# Все изменения потеряны!
# Использовать только если уверен

# Откатить к конкретному коммиту
git reset --hard abc123`
      },
      {
        title: "Revert (безопасный откат)",
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
        title: "Восстановление после reset",
        code: `# Если случайно сделали reset --hard
# Можно восстановить через reflog
git reflog

# Найти нужный коммит
git reset --hard HEAD@{1}

# Или по хешу
git reset --hard abc123`
      }
    ],
    relatedTopics: ['git-rebase', 'git-history'],
  },
{
    id: 'git-history',
    title: 'Git: Работа с историей',
    difficulty: 'intermediate',
    description: 'git log показывает историю коммитов с различными опциями форматирования. Можно фильтровать по автору, дате, файлу, сообщению. git show показывает изменения конкретного коммита. git diff сравнивает версии. git blame показывает, кто и когда изменил каждую строку файла.',
    keyPoints: [
      'git log показывает историю с различными опциями форматирования.',
      'Можно фильтровать по автору, дате, файлу, сообщению.',
      'git show показывает изменения конкретного коммита.',
      'git diff сравнивает версии файлов или коммитов.',
      'git blame показывает автора каждой строки файла.'
    ],
    tags: ['git', 'version-control', 'history', 'log', 'blame', 'tools', 'productivity'],
    examples: [
      {
        title: "Просмотр истории",
        code: `# Компактный вид
git log --oneline

# Граф веток
git log --oneline --graph --all

# Последние 10 коммитов
git log -10

# История конкретного файла
git log -- file.js

# История с патчами
git log -p

# История с статистикой
git log --stat`
      },
      {
        title: "Фильтрация по автору и дате",
        code: `# Коммиты конкретного автора
git log --author="John"

# Коммиты за последние 2 недели
git log --since="2 weeks ago"

# Коммиты до определенной даты
git log --until="2023-12-31"

# Коммиты между датами
git log --since="2023-01-01" --until="2023-12-31"`

      },
      {
        title: "Поиск по сообщению",
        code: `# Коммиты с текстом в сообщении
git log --grep="bug fix"

# Коммиты с регулярным выражением
git log --grep="fix|bug" --regexp-ignore-case

# Коммиты, изменяющие код
git log -S "functionName" --source --all`
      },
      {
        title: "Просмотр изменений",
        code: `# Изменения в коммите
git show abc123

# Изменения между коммитами
git diff abc123 def456

# Изменения между ветками
git diff main..feature

# Изменения конкретного файла
git diff HEAD~1 HEAD -- file.js`
      },
      {
        title: "Git blame",
        code: `# Кто изменил каждую строку
git blame file.js

# Blame с игнорированием пробелов
git blame -w file.js

# Blame для диапазона строк
git blame -L 10,20 file.js

# Blame с переименованиями
git blame -M file.js`
      }
    ],
    relatedTopics: ['git-reset-revert', 'git-stash'],
  },
{
    id: 'git-stash',
    title: 'Git: Stash',
    difficulty: 'intermediate',
    description: 'git stash временно сохраняет незакоммиченные изменения. Полезно при переключении веток с незавершенной работой. git stash pop восстанавливает изменения. Можно создавать несколько stash, именовать их, применять выборочно. Stash не включает неотслеживаемые файлы по умолчанию (нужен -u).',
    keyPoints: [
      'git stash временно сохраняет незакоммиченные изменения.',
      'Полезно при переключении веток с незавершенной работой.',
      'git stash pop восстанавливает и удаляет stash.',
      'git stash apply восстанавливает, но не удаляет.',
      'Можно создавать именованные stash и применять выборочно.',
      'Stash не включает неотслеживаемые файлы по умолчанию.'
    ],
    tags: ['git', 'version-control', 'stash', 'temporary', 'tools', 'productivity'],
    examples: [
      {
        title: "Базовое использование",
        code: `# Сохранить текущие изменения
git stash

# Или с сообщением
git stash save "WIP: работа над функцией"

# Переключиться на другую ветку
git checkout main

# Вернуться и восстановить
git checkout feature
git stash pop`
      },
      {
        title: "Stash с неотслеживаемыми файлами",
        code: `# Включить неотслеживаемые файлы
git stash -u
# или
git stash --include-untracked

# Включить все, включая игнорируемые
git stash -a
# или
git stash --all`
      },
      {
        title: "Работа с несколькими stash",
        code: `# Список всех stash
git stash list

# Применить конкретный stash (не удаляя)
git stash apply stash@{0}

# Удалить stash
git stash drop stash@{0}

# Очистить все stash
git stash clear`
      },
      {
        title: "Stash pop vs apply",
        code: `# pop: восстановить и удалить
git stash pop
# Если конфликт, stash не удаляется

# apply: восстановить, но оставить stash
git stash apply stash@{0}

# Удалить вручную
git stash drop stash@{0}`
      },
      {
        title: "Создание ветки из stash",
        code: `# Создать новую ветку и применить stash
git stash branch new-feature stash@{0}

# Полезно, если stash конфликтует с текущей веткой`
      }
    ],
    relatedTopics: ['git-history', 'git-remote-advanced'],
  },
{
    id: 'git-remote-advanced',
    title: 'Git: Удаленные репозитории (продвинуто)',
    difficulty: 'intermediate',
    description: 'Работа с несколькими удаленными репозиториями. git fetch получает изменения без слияния. Настройка upstream для веток. Отслеживание удаленных веток. Синхронизация с удаленным репозиторием. Работа с форками: добавление upstream, синхронизация изменений.',
    keyPoints: [
      'git fetch получает изменения без слияния.',
      'Можно работать с несколькими удаленными репозиториями.',
      'Upstream связывает локальную ветку с удаленной.',
      'Удаленные ветки можно отслеживать и переключаться на них.',
      'Форки можно синхронизировать с оригинальным репозиторием.'
    ],
    tags: ['git', 'version-control', 'remote', 'fetch', 'upstream', 'tools', 'productivity'],
    examples: [
      {
        title: "Fetch vs Pull",
        code: `# Fetch: получить изменения без слияния
git fetch origin

# Посмотреть изменения
git log HEAD..origin/main

# Слить вручную
git merge origin/main

# Pull: fetch + merge одной командой
git pull origin main`
      },
      {
        title: "Настройка upstream",
        code: `# Установить upstream при push
git push -u origin feature

# После этого можно просто
git push
git pull

# Изменить upstream
git branch --set-upstream-to=origin/main main`
      },
      {
        title: "Работа с несколькими remote",
        code: `# Добавить несколько remote
git remote add upstream https://github.com/original/repo.git
git remote add fork https://github.com/myuser/repo.git

# Получить изменения из всех remote
git fetch --all

# Push в конкретный remote
git push fork main

# Показать все remote
git remote -v`
      },
      {
        title: "Отслеживание удаленных веток",
        code: `# Показать удаленные ветки
git branch -r

# Переключиться на удаленную ветку
git checkout -b local-branch origin/remote-branch

# Или автоматически
git checkout --track origin/feature

# Удалить удаленную ветку
git push origin --delete branch-name`
      },
      {
        title: "Синхронизация форка",
        code: `# Добавить оригинальный репозиторий как upstream
git remote add upstream https://github.com/original/repo.git

# Получить изменения
git fetch upstream

# Слить в свою ветку
git checkout main
git merge upstream/main

# Отправить обновления
git push origin main`
      }
    ],
    relatedTopics: ['git-stash', 'git-remote', 'github-actions-vps-deploy']
  }
];
