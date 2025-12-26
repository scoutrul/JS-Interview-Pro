import { Topic } from '../../../types';

export const VPS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'vps-ssh-security',
    title: 'SSH безопасность на VPS',
    difficulty: 'intermediate',
    description: 'Безопасность SSH критична для защиты VPS от несанкционированного доступа. Основные меры: отключение входа по паролю, использование ключей, изменение стандартного порта, настройка firewall, ограничение доступа по IP, использование fail2ban для защиты от брутфорса.',
    keyPoints: [
      'Отключение пароля: PasswordAuthentication no в /etc/ssh/sshd_config.',
      'SSH ключи: использование ed25519 или RSA ключей вместо паролей.',
      'Изменение порта: Port 2222 (нестандартный порт снижает атаки).',
      'Firewall: настройка UFW или iptables для ограничения доступа.',
      'Fail2ban: автоматическая блокировка IP после неудачных попыток входа.',
      'Ограничение пользователей: AllowUsers в sshd_config для белого списка.'
    ],
    tags: ['vps', 'ssh', 'security', 'server', 'devops', 'infrastructure', 'tools'],
    examples: [
      {
        title: 'Настройка SSH ключей',
        code: `# На локальной машине: генерация ключа
ssh-keygen -t ed25519 -C "vps-key"
# Или RSA (если ed25519 не поддерживается)
ssh-keygen -t rsa -b 4096 -C "vps-key"

# Копирование ключа на сервер
ssh-copy-id -i ~/.ssh/id_ed25519.pub root@123.123.123.123

# Или вручную
cat ~/.ssh/id_ed25519.pub | ssh root@123.123.123.123 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# На сервере: проверка прав
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys`
      },
      {
        title: 'Настройка sshd_config',
        code: `# /etc/ssh/sshd_config

# Изменить порт (необязательно)
Port 2222

# Отключить вход по паролю
PasswordAuthentication no
PermitRootLogin prohibit-password  # или no

# Разрешить только ключи
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# Ограничить пользователей
AllowUsers deploy admin

# Ограничить попытки входа
MaxAuthTries 3
LoginGraceTime 30

# После изменений
sudo systemctl restart sshd
# Или
sudo service ssh restart`
      },
      {
        title: 'Настройка UFW (Uncomplicated Firewall)',
        code: `# Установка
apt install ufw

# Базовые правила
ufw default deny incoming   # Запретить входящие по умолчанию
ufw default allow outgoing  # Разрешить исходящие

# Разрешить SSH (важно сделать ДО активации!)
ufw allow 22/tcp           # Стандартный порт
# или
ufw allow 2222/tcp         # Кастомный порт

# Разрешить HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Активация
ufw enable

# Проверка статуса
ufw status verbose

# Удаление правила
ufw delete allow 22/tcp`
      },
      {
        title: 'Установка и настройка fail2ban',
        code: `# Установка
apt install fail2ban

# Конфигурация
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Редактирование /etc/fail2ban/jail.local
[DEFAULT]
bantime = 3600        # Время бана (секунды)
findtime = 600        # Окно времени для попыток
maxretry = 3          # Количество попыток

[sshd]
enabled = true
port = 22
# или port = 2222 если изменили порт

# Запуск
systemctl enable fail2ban
systemctl start fail2ban

# Проверка статуса
fail2ban-client status
fail2ban-client status sshd

# Разбан IP вручную
fail2ban-client set sshd unbanip 123.123.123.123`
      }
    ],
    relatedTopics: ['vps-basics', 'terminal-advanced', 'github-actions-vps-deploy']
  }
];

