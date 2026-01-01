import { Topic } from '../../../types';

export const DOCKER_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'docker-basics',
    title: 'Основы Docker',
    difficulty: 'beginner',
    description: 'Docker позволяет упаковать приложение и все его зависимости в контейнеры, которые одинаково работают на любой машине. Для фронтенда это удобно для локальной разработки и тестирования приложений. Контейнеризация упрощает запуск, сборку и деплой фронтенд и fullstack проектов.',
    keyPoints: [
      'docker run: запуск контейнера из образа',
      'docker build: сборка образа из Dockerfile',
      'FROM: задаёт базовый образ в Dockerfile',
      'RUN: выполняет команды при сборке образа',
      'COPY: копирует файлы из хоста в образ',
      'WORKDIR: устанавливает рабочую директорию',
      'EXPOSE: указывает порт, который слушает контейнер',
      'CMD: команда по умолчанию при запуске контейнера',
      'Образы (images) — шаблоны для контейнеров',
      'Контейнеры (containers) — запущенные экземпляры образов'
    ],
    tags: ['docker', 'containers', 'devops', 'basics', 'deployment', 'tools', 'productivity'],
    funFact: 'Docker был создан Соломоном Хайксом в 2013 году и изначально развивался как проект внутри dotCloud. Уже через несколько лет он стал стандартом для контейнеризации в IT, изменив подход к разработке и деплою приложений.',
    examples: [
      {
        title: 'Базовый Dockerfile',
        code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]`
      },
      {
        title: 'Работа с образами и контейнерами',
        code: `# Собрать образ
docker build -t my-app .

# Список образов
docker images

# Запустить контейнер
docker run -p 3000:3000 my-app

# Список запущенных контейнеров
docker ps

# Остановить контейнер
docker stop <container-id>

# Удалить контейнер
docker rm <container-id>

# Удалить образ
docker rmi my-app`
      },
      {
        title: 'Полезные команды',
        code: `# Запустить контейнер в фоне
docker run -d -p 3000:3000 my-app

# Посмотреть логи контейнера
docker logs <container-id>

# Войти в запущенный контейнер
docker exec -it <container-id> sh

# Очистить неиспользуемые ресурсы
docker system prune`
      }
    ],
    relatedTopics: ['docker-compose-volumes', 'terminal-basics']
  }
];
