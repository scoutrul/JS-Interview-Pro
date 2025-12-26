import { Topic } from '../../../types';

export const VPS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'vps-basics',
    title: 'Основы VPS',
    difficulty: 'beginner',
    description: 'VPS (Virtual Private Server) — виртуальный выделенный сервер с собственными ресурсами. Предоставляет root-доступ, полный контроль над ОС и установкой ПО. Используется для хостинга приложений, баз данных, CI/CD, VPN и других серверных задач.',
    keyPoints: [
      'VPS: виртуальный сервер с выделенными ресурсами (CPU, RAM, диск).',
      'Root-доступ: полный контроль над системой и установкой ПО.',
      'ОС: выбор дистрибутива Linux (Ubuntu, Debian, CentOS).',
      'Подключение: доступ по SSH с использованием ключей или пароля.',
      'Провайдеры: DigitalOcean, AWS, Hetzner, Vultr, Linode и другие.',
      'Тарифы: зависят от CPU, RAM, диска и трафика.'
    ],
    tags: ['vps', 'server', 'hosting', 'linux', 'ssh', 'devops', 'infrastructure', 'cloud', 'tools'],
    examples: [
      {
        title: 'Подключение к VPS по SSH',
        code: `# Подключение по паролю
ssh root@123.123.123.123

# Подключение с указанием порта
ssh -p 2222 root@123.123.123.123

# Подключение с использованием ключа
ssh -i ~/.ssh/id_rsa root@123.123.123.123

# Первое подключение: добавить в known_hosts
# The authenticity of host can't be established.
# Are you sure you want to continue connecting (yes/no)? yes`
      },
      {
        title: 'Базовая настройка после создания VPS',
        code: `# Обновление системы
apt update && apt upgrade -y  # Ubuntu/Debian
yum update -y                 # CentOS/RHEL

# Установка базовых инструментов
apt install -y curl wget git vim htop

# Создание нового пользователя (вместо root)
adduser deploy
usermod -aG sudo deploy

# Настройка SSH ключей
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys  # Вставить публичный ключ
chmod 600 ~/.ssh/authorized_keys`
      },
      {
        title: 'Проверка ресурсов сервера',
        code: `# Информация о системе
uname -a                      # Версия ядра и ОС
cat /etc/os-release           # Дистрибутив Linux

# Использование ресурсов
free -h                       # RAM
df -h                         # Диск
top                           # CPU и процессы
htop                          # Улучшенная версия top

# Сетевая информация
ip addr show                  # IP адреса
netstat -tulpn                # Открытые порты`
      }
    ],
    relatedTopics: ['terminal-advanced', 'github-actions-vps-deploy', 'vps-ssh-security']
  }
];

