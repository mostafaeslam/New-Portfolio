# Portfolio Backend Service

Express microservice to handle contact form emails.

## Setup

1. Create backend/.env with:

CORS_ORIGIN=http://localhost:3000
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@example.com
SMTP_PASS=your_app_password
MAIL_TO=mostafaeslam1220@gmail.com

2. Install and run:

cd backend
npm i
npm run dev

## API
POST /api/contact
Body:

{ "name": "...", "email": "...", "subject": "...", "message": "..." }

Returns { ok: true } on success.

