![Калькулятор в веб-версии](./public/calc-preview.png)
# MEGA Calculator

Онлайн калькулятор с сохранением истории вычислений, работой с памятью и персональными аккаунтами.

## Демонстрация

### Веб-версия
<div align="center">
  <img src="./public/desktop-login.png" alt="Страница входа на десктопе" width="300" />
  <img src="./public/desktop-calc.png" alt="Калькулятор на десктопе" width="300" />
</div>

### Мобильная версия
<div align="center">
  <img src="./public/mobile-calc.png" alt="Калькулятор на мобильном устройстве" width="300" />
  <img src="./public/mobile-login.png" alt="Страница входа на мобильном устройстве" width="300" />
</div>

### API Документация
![Swagger API документация](./public/swagger-preview.png)

## Функциональность

- Математические расчеты с поддержкой различных операций
- Сохранение истории вычислений
- Функции памяти калькулятора (сохранение, вызов, сложение, вычитание)
- Регистрация и авторизация пользователей
- Поддержка светлой и темной темы
- Адаптивный дизайн для мобильных устройств

## Технологии

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion (анимации)
- Zustand (управление состоянием)

### Backend
- NestJS
- MongoDB
- JWT-авторизация
- Swagger API-документация

## Запуск

Проект можно запустить с помощью Docker Compose:

```bash
docker-compose up -d
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

Swagger API доступно по адресу [http://localhost:8000/api](http://localhost:8000/api)

## Разработка

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run start:dev
```

## API

API документация доступна по адресу [http://localhost:8000/api](http://localhost:8000/api) после запуска бэкенда. 