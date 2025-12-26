import { Topic } from '../../../types';

export const CI_CD_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'github-actions-vps-deploy',
    title: 'Автодеплой проекта на VPS через GitHub Actions',
    difficulty: 'intermediate',
    description: 'GitHub Actions — встроенный CI/CD-инструмент GitHub для автоматизации сборки и деплоя. В связке с SSH обеспечивает безопасный деплой на VPS без необходимости настраивать вебхуки и открывать HTTP-порты.',
    keyPoints: [
      'Триггеры: push в выбранную ветку (main, develop), pull_request, manual (workflow_dispatch).',
      'CI/CD среда: GitHub Actions выполняется на серверах GitHub (ubuntu-latest, windows-latest).',
      'Доступ к VPS: подключение по SSH с использованием приватных ключей.',
      'Secrets: чувствительные данные (IP, пользователь, SSH-ключ) хранятся в GitHub Secrets.',
      'Процесс деплоя: git pull, установка зависимостей (npm install), сборка (npm run build), перезапуск сервиса.',
      'Логи: все шаги деплоя доступны в интерфейсе GitHub Actions с детальным выводом.',
      'Безопасность: не требуется открывать HTTP-доступ, webhook endpoint или порты на VPS.'
    ],
    tags: ['ci-cd', 'github-actions', 'deploy', 'vps', 'ssh', 'automation', 'devops', 'continuous-integration', 'continuous-deployment', 'github', 'workflow'],
    examples: [
      {
        title: 'Workflow GitHub Actions для деплоя на VPS',
        code: `# .github/workflows/deploy.yml
name: Deploy to VPS

# Триггеры запуска
on:
  push:
    branches:
      - main
    paths-ignore:
      - '**.md'
      - '.gitignore'
  workflow_dispatch: # Ручной запуск

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          key: \${{ secrets.VPS_SSH_KEY }}
          port: 22
          script: |
            cd /var/www/my-project
            git pull origin main
            npm ci --production=false
            npm run build
            pm2 restart my-app || pm2 start npm --name "my-app" -- start`
      },
      {
        title: 'Настройка GitHub Secrets',
        code: `# GitHub Repository → Settings → Secrets and variables → Actions → New repository secret

# Добавить секреты:
VPS_HOST=123.123.123.123
# или домен:
VPS_HOST=example.com

VPS_USER=deploy
# или root (не рекомендуется)

VPS_SSH_KEY=-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn...
-----END OPENSSH PRIVATE KEY-----

# Генерация ключа на локальной машине:
# ssh-keygen -t ed25519 -C "github-actions"
# Затем добавить публичный ключ на VPS:
# ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@123.123.123.123`
      },
      {
        title: 'Расширенный workflow с проверками',
        code: `# .github/workflows/deploy.yml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test # Деплой только после успешных тестов
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/my-project
            git pull origin main
            npm ci
            npm run build
            pm2 restart my-app`
      },
      {
        title: 'Структура проекта на VPS',
        code: `# Типичное расположение проекта на VPS
/var/www/my-project/
  ├── .git/              # Git репозиторий
  ├── .github/
  │   └── workflows/
  │       └── deploy.yml  # Workflow файл
  ├── package.json
  ├── node_modules/      # Зависимости
  ├── dist/              # Собранный проект
  ├── src/               # Исходники
  └── .env               # Переменные окружения

# Права доступа
sudo chown -R deploy:deploy /var/www/my-project
sudo chmod -R 755 /var/www/my-project`
      },
      {
        title: 'Обработка ошибок и откат',
        code: `# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/my-project
            
            # Сохраняем текущую версию для отката
            git tag backup-\$(date +%Y%m%d-%H%M%S)
            
            # Пытаемся обновить
            if git pull origin main; then
              npm ci
              npm run build
              pm2 restart my-app
            else
              echo "Deploy failed, keeping current version"
              exit 1
            fi
            
            # Проверка работоспособности
            sleep 5
            if ! curl -f http://localhost:3000/health; then
              echo "Health check failed, rolling back"
              git reset --hard HEAD~1
              pm2 restart my-app
              exit 1
            fi`
      }
    ],
    relatedTopics: ['git-remote', 'git-remote-advanced', 'terminal-advanced', 'vps-basics', 'vps-ssh-security']
  }
];

