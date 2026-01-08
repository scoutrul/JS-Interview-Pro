import { Topic } from '../../../types';

export const SECURITY_AUTHENTICATION_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'auth-advanced-patterns',
    title: 'Продвинутые паттерны аутентификации',
    description: 'Продвинутые паттерны включают использование нескольких факторов аутентификации, session management, token blacklisting, и архитектурные решения для микросервисов.',
    difficulty: 'advanced',
    tags: ['security', 'authentication', 'patterns', 'mfa', 'advanced'],
    keyPoints: [
      'Multi-factor authentication (MFA): несколько факторов (пароль + SMS, TOTP).',
      'Session management: управление активными сессиями, отзыв сессий.',
      'Token blacklisting: список отозванных токенов (для JWT).',
      'Микросервисы: централизованная аутентификация, API gateway.',
      'Zero-trust архитектура: проверка на каждом уровне.'
    ],
    examples: [
      {
        title: 'Multi-factor authentication',
        code: `// 1. Первый фактор: пароль
const passwordValid = await verifyPassword(username, password);
if (!passwordValid) {
  return res.status(401).json({ error: 'Invalid credentials' });
}

// 2. Второй фактор: TOTP (Time-based One-Time Password)
const totpCode = req.body.totpCode;
const totpValid = await verifyTOTP(username, totpCode);
if (!totpValid) {
  return res.status(401).json({ error: 'Invalid TOTP code' });
}

// Оба фактора проверены ✅
const token = generateToken(username);
res.json({ token });

// На клиенте:
async function loginWithMFA(username: string, password: string, totpCode: string) {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, totpCode })
  });
  
  if (response.status === 401) {
    const { error } = await response.json();
    if (error === 'Invalid TOTP code') {
      showTOTPInput(); // Показать поле для TOTP
    }
  }
  
  return response.json();
}`
      }
    ],
    relatedTopics: ['auth-refresh-tokens', 'auth-oauth-advanced']
  },
  {
    id: 'auth-oauth-advanced',
    title: 'OAuth 2.0 продвинутые',
    description: 'Продвинутые темы OAuth 2.0 включают различные flows (Implicit, Client Credentials, Device), PKCE для мобильных приложений, и безопасную реализацию OAuth клиентов.',
    difficulty: 'advanced',
    tags: ['security', 'authentication', 'oauth', 'oauth2', 'pkce', 'advanced'],
    keyPoints: [
      'PKCE (Proof Key for Code Exchange): защита authorization code flow для публичных клиентов.',
      'Implicit flow: устаревший, не рекомендуется (токен в URL).',
      'Client Credentials flow: для server-to-server аутентификации.',
      'Device flow: для устройств без браузера.',
      'Безопасная реализация: проверка state, валидация redirect_uri.'
    ],
    examples: [
      {
        title: 'PKCE для мобильных приложений',
        code: `// PKCE защищает authorization code flow

// 1. Генерация code_verifier и code_challenge
const codeVerifier = generateRandomString(128);
const codeChallenge = await sha256(codeVerifier);
const codeChallengeMethod = 'S256';

// 2. Authorization request с code_challenge
const authUrl = \`https://oauth-provider.com/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://yourapp.com/callback&
  response_type=code&
  code_challenge=\${codeChallenge}&
  code_challenge_method=\${codeChallengeMethod}\`;

window.location.href = authUrl;

// 3. Обмен authorization code на access token с code_verifier
const response = await fetch('https://oauth-provider.com/token', {
  method: 'POST',
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: 'https://yourapp.com/callback',
    client_id: 'YOUR_CLIENT_ID',
    code_verifier: codeVerifier // Проверка code_challenge
  })
});

// ✅ PKCE защищает от перехвата authorization code`
      }
    ],
    relatedTopics: ['auth-oauth-basics', 'auth-openid-connect']
  },
  {
    id: 'auth-openid-connect',
    title: 'OpenID Connect',
    description: 'OpenID Connect (OIDC) — это слой поверх OAuth 2.0, который добавляет аутентификацию. OIDC предоставляет ID token, который содержит информацию о пользователе, и стандартизирует процесс аутентификации.',
    difficulty: 'advanced',
    tags: ['security', 'authentication', 'oidc', 'openid-connect', 'advanced'],
    keyPoints: [
      'OIDC добавляет аутентификацию к OAuth 2.0 (который только для авторизации).',
      'ID token: JWT с информацией о пользователе (sub, email, name и т.д.).',
      'UserInfo endpoint: получение дополнительной информации о пользователе.',
      'Стандартизированные claims: sub, email, name, picture и т.д.',
      'OIDC используется для "Login with Google/Facebook" и т.д.'
    ],
    examples: [
      {
        title: 'OpenID Connect flow',
        code: `// 1. Authorization request с openid scope
const authUrl = \`https://oauth-provider.com/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://yourapp.com/callback&
  response_type=code&
  scope=openid email profile\`;

window.location.href = authUrl;

// 2. Обмен authorization code на tokens
const response = await fetch('https://oauth-provider.com/token', {
  method: 'POST',
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: 'https://yourapp.com/callback',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
  })
});

const { access_token, id_token } = await response.json();

// 3. Проверка ID token
const decoded = parseJWT(id_token);
// {
//   sub: "1234567890",
//   email: "user@example.com",
//   name: "John Doe",
//   picture: "https://...",
//   iss: "https://oauth-provider.com",
//   aud: "YOUR_CLIENT_ID",
//   exp: 1516242622
// }

// 4. Использование информации о пользователе
const user = {
  id: decoded.sub,
  email: decoded.email,
  name: decoded.name,
  picture: decoded.picture
};

// ✅ OIDC предоставляет стандартизированную аутентификацию`
      }
    ],
    relatedTopics: ['auth-oauth-advanced', 'auth-jwt-structure']
  },
  {
    id: 'auth-biometric',
    title: 'Биометрическая аутентификация',
    description: 'Биометрическая аутентификация использует уникальные биометрические данные (отпечатки пальцев, лицо, голос) для аутентификации. На веб-платформе доступна через Web Authentication API (WebAuthn).',
    difficulty: 'advanced',
    tags: ['security', 'authentication', 'biometric', 'webauthn', 'advanced'],
    keyPoints: [
      'WebAuthn API: стандарт для биометрической аутентификации в браузере.',
      'Использует публичные ключи вместо паролей (passwordless).',
      'Поддерживает отпечатки пальцев, Face ID, Windows Hello и т.д.',
      'Более безопасно, чем пароли (нельзя украсть, нельзя угадать).',
      'Требует поддержки браузера и устройства.'
    ],
    examples: [
      {
        title: 'WebAuthn регистрация',
        code: `// Регистрация биометрического ключа
async function registerBiometric() {
  const publicKeyCredentialCreationOptions = {
    challenge: Uint8Array.from(randomStringFromServer, c => c.charCodeAt(0)),
    rp: {
      name: "Example Corp",
      id: "example.com",
    },
    user: {
      id: Uint8Array.from(userId, c => c.charCodeAt(0)),
      name: "user@example.com",
      displayName: "John Doe",
    },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required"
    },
    timeout: 60000,
    attestation: "direct"
  };

  const credential = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions
  });

  // Отправка credential на сервер
  await fetch('/api/register-biometric', {
    method: 'POST',
    body: JSON.stringify({
      id: credential.id,
      rawId: Array.from(new Uint8Array(credential.rawId)),
      response: {
        attestationObject: Array.from(new Uint8Array(credential.response.attestationObject)),
        clientDataJSON: Array.from(new Uint8Array(credential.response.clientDataJSON))
      }
    })
  });
}`
      },
      {
        title: 'WebAuthn аутентификация',
        code: `// Аутентификация с биометрией
async function authenticateBiometric() {
  const publicKeyCredentialRequestOptions = {
    challenge: Uint8Array.from(randomStringFromServer, c => c.charCodeAt(0)),
    allowCredentials: [{
      id: Uint8Array.from(credentialId, c => c.charCodeAt(0)),
      type: 'public-key',
      transports: ['internal']
    }],
    timeout: 60000,
    userVerification: "required"
  };

  const assertion = await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions
  });

  // Отправка assertion на сервер для проверки
  await fetch('/api/authenticate-biometric', {
    method: 'POST',
    body: JSON.stringify({
      id: assertion.id,
      rawId: Array.from(new Uint8Array(assertion.rawId)),
      response: {
        authenticatorData: Array.from(new Uint8Array(assertion.response.authenticatorData)),
        clientDataJSON: Array.from(new Uint8Array(assertion.response.clientDataJSON)),
        signature: Array.from(new Uint8Array(assertion.response.signature))
      }
    })
  });
}`
      }
    ],
    relatedTopics: ['auth-advanced-patterns']
  }
];
