# Poetry apps - KabitaKunja

# Poetry API MVP - Backend (Kunja)

## Features

- User Authentication (JWT)
- Role-based Authorization
- Poem CRUD
- Ownership Protection
- Draft / Published status
- Filtering
- Pagination

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Joi
- JWT

## API Endpoints

### Auth
POST /api/v1/auth/register  
POST /api/v1/auth/login  

### Poems
GET /api/v1/poems  
POST /api/v1/poems  
PUT /api/v1/poems/:id  
DELETE /api/v1/poems/:id  
