import { Topic } from '../../../types';

export const DOCKER_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'docker-optimization',
    title: 'Оптимизация образов и оркестрация',
    difficulty: 'advanced',
    description: 'Продвинутые техники работы с Docker для CI/CD и деплоя. Оптимизация размеров образов через Alpine и .dockerignore, оркестрация контейнеров через Docker Swarm и Kubernetes, автоматизация CI/CD для фронтенд-проектов. Масштабирование и управление контейнерами в production.',
    keyPoints: [
      '.dockerignore: исключает ненужные файлы из контекста сборки',
      'Alpine образы: значительно меньше стандартных (~5 МБ vs ~150 МБ)',
      'Docker Swarm: управляет несколькими контейнерами на кластере',
      'Kubernetes: масштабируемая оркестрация через pods и services',
      'CI/CD: автоматизирует сборку и деплой образов',
      'Layer caching: оптимизация через правильный порядок команд',
      'Health checks: мониторинг состояния контейнеров',
      'Resource limits: ограничение CPU и памяти для контейнеров'
    ],
    tags: ['docker', 'containers', 'devops', 'kubernetes', 'swarm', 'optimization', 'ci-cd', 'orchestration', 'tools', 'productivity'],
    funFact: 'Alpine Linux используется в Docker благодаря своему минимальному размеру (~5 МБ), что делает контейнеры лёгкими и быстрыми для фронтенд-приложений. Kubernetes был создан Google и открыт в 2014 году, сейчас это стандарт для оркестрации контейнеров в крупных компаниях.',
    examples: [
      {
        title: 'Оптимизация образа',
        code: `# .dockerignore
node_modules
.git
.env
*.log
dist
.DS_Store
coverage
.vscode

# Оптимизированный Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD node healthcheck.js
CMD ["node", "dist/index.js"]`
      },
      {
        title: 'Docker Swarm',
        code: `# Инициализировать swarm
docker swarm init

# Создать сервис с репликами
docker service create --replicas 3 --name my-app -p 3000:3000 my-app

# Список сервисов
docker service ls

# Масштабировать сервис
docker service scale my-app=5

# Обновить сервис
docker service update --image my-app:v2 my-app

# Просмотр логов
docker service logs my-app`
      },
      {
        title: 'Kubernetes Deployment',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer`
      },
      {
        title: 'CI/CD с Docker',
        code: `# GitHub Actions пример
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t my-app:\${{ github.sha }} .
      - name: Push to registry
        run: |
          echo \${{ secrets.DOCKER_PASSWORD }} | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push my-app:\${{ github.sha }}
      - name: Deploy
        run: |
          kubectl set image deployment/my-app my-app=my-app:\${{ github.sha }}`
      }
    ],
    relatedTopics: ['docker-multi-stage', 'ci-cd-basics', 'vps-basics']
  }
];
