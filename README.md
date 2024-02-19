# A boilerplate for building RESTful APIs using Node.js, Nest.js and TypeOrm

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/ruhit07/node-nest-boilerplate.git
cd node-nest-boilerplate
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env.development

# open .env.development and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
npm run dev
```

## Environment Variables

The environment variables can be found and modified in the `.env.development` file. They come with these default values:

```bash
# API
API_PORT=4000
API_PREFIX=api

# JWT
JWT_ACCESS_TOKEN_SECRET=myfavouritebackendframework
JWT_ACCESS_TOKEN_EXPIRES=36000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=101
DB_NAME=nest_boilerplate
```

## Project Structure
```
src\
 |--common\               # All common things
 |--config\               # Environment variables and configuration related things
 |--database\             # Database module 
 |--middlewares\          # Custom middlewares
 |--modules\              # Modules
 |--app.controller.ts\    # App controller layer
 |--app.module.ts\        # App module layer
 |--app.service.ts        # App service layer
 |--main.ts               # App entry point
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /api/auth/register` - register\
`POST /api/auth/login` - login\
`GET /api/auth/me` - retriving his profile\
`DELETE /api/auth/logout` - logout\
`DELETE /api/auth/me` - delete currect user

**User routes**:\
`GET /api/users` - get all users\
`GET /api/users/:id` - get user\
`POST /api/users` - create a user\
`PUT /api/users/:id` - update user\
`PATCH /api/users/update-password/:id` - update password\
`DELETE /api/users/:id` - delete user\
`POST /api/users/initiate` - importing users
