### Notes
I recently learned of the modular (feature-based) architecture for structuring my codebase. 
It taskes the form: 
```
/src
 ├── modules
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
