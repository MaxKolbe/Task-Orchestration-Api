## Branches
Check branches for isolated implementations of the following:
1. Todo app with static/in-memory database: branch/static
2. Todo app using mongodb database: branch/mongo
3. Todo app using postgresql database: branch/postgres
4. Todo app using drizzle-orm: branch/drizzle
5. Todo app with redis cache: cache
6. Todo app with third party media storage (with cloudinary): branch/s3
7. Todo app with paystack api: branch/paystack
The main branch composes of all these but uses drizzle-orm. 

### Project Architecture (modular (feature-based) architecture)
```
/src
 ├── modules
 |    ├── todo
 │    │    ├── todo.controller.ts
 │    │    ├── todo.service.ts
 │    │    ├── todo.route.ts
 │    │    ├── todo.middleware.ts
 │    │    ├── todo.model.ts
 │    │    └── __tests__/
 │    │         └── todo.test.ts
 │    ├── auth
 │    │    ├── auth.controller.ts
 │    │    ├── auth.service.ts
 │    │    ├── auth.route.ts
 │    │    ├── auth.middleware.ts
 │    │    ├── auth.model.ts
 │    │    └── __tests__/
 │    │         └── auth.test.ts
 │    │
 │    └── user
 │         ├── user.controller.ts
 │         ├── user.service.ts
 │         ├── user.route.ts
 │         ├── user.model.ts
 │         └── __tests__/
 │              └── user.test.ts
 │
 ├── configs
 │    ├── db.config.ts
 │    ├── env.config.ts
 │    └── logger.config.ts
 │
 ├── middlewares
 │    ├── error.middleware.ts
 │    ├── validation.middleware.ts
 │    └── auth.middleware.ts
 │
 ├── utils
 │    ├── catchAsync.ts
 │    ├── AppError.ts
 │    └── responseHandler.ts
 │
 ├── types
 │    ├── global.d.ts
 │    └── express.d.ts
 │
 ├── app.ts
 └── server.ts

```
