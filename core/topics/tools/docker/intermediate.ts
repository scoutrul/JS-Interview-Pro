import { Topic } from '../../../types';

export const DOCKER_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'docker-compose-volumes',
    title: 'Docker Compose, Volumes и Networks',
    difficulty: 'intermediate',
    description: 'Docker Compose позволяет описывать несколько контейнеров в одном YAML-файле, связывать их сетью и сохранять данные между перезапусками с помощью Volumes. Управление многоконтейнерными приложениями и связью между ними. Идеально для локальной разработки fullstack приложений с базой данных и фронтендом.',
    keyPoints: [
      'docker-compose.yml: описывает все сервисы проекта в одном файле',
      'Volumes: сохраняют данные между перезапусками контейнеров',
      'Networks: обеспечивают связь между контейнерами',
      'docker-compose up: запускает все сервисы из compose файла',
      'docker-compose down: останавливает и удаляет контейнеры',
      'docker-compose logs: просмотр логов всех сервисов',
      'Named volumes: именованные тома для персистентного хранения',
      'Bind mounts: монтирование директорий хоста в контейнер'
    ],
    tags: ['docker', 'containers', 'devops', 'compose', 'volumes', 'networks', 'fullstack', 'tools', 'productivity'],
    funFact: 'Docker Compose был создан для упрощения работы с многоконтейнерными приложениями. Один файл docker-compose.yml может описать целый стек технологий: фронтенд, бэкенд, база данных, Redis и другие сервисы.',
    examples: [
      {
        title: 'docker-compose.yml',
        code: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - db
  
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  db-data:`
      },
      {
        title: 'Команды Docker Compose',
        code: `# Запустить все сервисы
docker-compose up

# Запустить в фоне
docker-compose up -d

# Остановить все сервисы
docker-compose down

# Пересобрать образы
docker-compose build

# Просмотр логов
docker-compose logs -f web

# Выполнить команду в сервисе
docker-compose exec web npm test`
      },
      {
        title: 'Volumes и Networks',
        code: `# Создать именованный volume
docker volume create my-volume

# Список volumes
docker volume ls

# Удалить volume
docker volume rm my-volume

# Создать network
docker network create my-network

# Запустить контейнер в сети
docker run --network my-network my-app

# Просмотр сетей
docker network ls`
      }
    ],
    relatedTopics: ['docker-basics', 'docker-multi-stage']
  },
  {
    id: 'docker-multi-stage',
    title: 'Многоэтапная сборка (Multi-stage build)',
    difficulty: 'intermediate',
    description: 'Multi-stage build позволяет использовать один образ для сборки приложения, а затем переносить только готовые артефакты в финальный, облегчённый образ. Уменьшение размера образа и разделение этапов сборки. Изолирует инструменты сборки от продакшн-образа.',
    keyPoints: [
      'Снижает размер финального образа в несколько раз',
      'Изолирует инструменты сборки от продакшн-образа',
      'Использует промежуточные образы для оптимизации',
      'COPY --from: копирует файлы из предыдущего stage',
      'AS: именует stage для последующего использования',
      'Ускоряет деплой и уменьшает использование диска',
      'Особенно полезно для фронтенд-приложений с build-процессом'
    ],
    tags: ['docker', 'containers', 'devops', 'optimization', 'build', 'tools', 'productivity'],
    funFact: 'Многоэтапная сборка (multi-stage build) была добавлена в Docker в 2017 году и позволяет создавать минимальные образы, убирая ненужные промежуточные зависимости. Используя multi-stage build, можно сократить размер фронтенд-образа в несколько раз, что ускоряет деплой и уменьшает использование диска на сервере.',
    examples: [
      {
        title: 'Multi-stage build для фронтенда',
        code: `# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "dist/index.js"]`
      },
      {
        title: 'Multi-stage для React приложения',
        code: `# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production с nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      },
      {
        title: 'Сравнение размеров',
        code: `# Без multi-stage: ~800MB
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["node", "dist/index.js"]

# С multi-stage: ~150MB
# Используя alpine и только production зависимости
# Размер уменьшается в 5+ раз!`
      }
    ],
    relatedTopics: ['docker-compose-volumes', 'docker-optimization']
  }
];
