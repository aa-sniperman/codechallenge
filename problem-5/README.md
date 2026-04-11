# Problem 5: ExpressJS CRUD Service

This project implements a TypeScript backend server with ExpressJS, TypeORM, and PostgreSQL.

It provides CRUD endpoints for a `resource` entity and supports basic filtering on list queries.

## Tech Stack

- ExpressJS
- TypeScript
- TypeORM
- PostgreSQL
- Docker Compose

## Resource Entity

Each resource includes:

- `id`: UUID
- `name`: string
- `category`: enum (`book`, `device`, `service`)
- `status`: enum (`draft`, `published`, `archived`)
- `price`: number
- `rating`: integer from `1` to `5`
- `isActive`: boolean
- `tags`: string array
- `metadata`: JSON object
- `createdAt`: ISO timestamp
- `updatedAt`: ISO timestamp

These fields were chosen to make filtering more useful across multiple data types.

## API Endpoints

- `POST /resources`
- `GET /resources`
- `GET /resources/:id`
- `PUT /resources/:id`
- `DELETE /resources/:id`
- `GET /health`

## Supported Filters

The `GET /resources` endpoint supports:

- `name`
- `category`
- `status`
- `isActive`
- `minPrice`
- `maxPrice`
- `minRating`
- `tag`
- `limit`
- `offset`

Example:

```bash
curl "http://localhost:3000/resources?category=device&isActive=true&minPrice=100&tag=portable"
```

## Run With Docker Compose

From inside the `problem-5` directory:

```bash
docker compose up --build
```

Services:

- App: `http://localhost:3000`
- PostgreSQL: `localhost:5432`

The app container runs TypeORM migrations before the server starts.

## Run Locally

1. Install dependencies:

```bash
yarn install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Make sure PostgreSQL is running and the database exists.

The default values are:

- database: `resource_db`
- user: `postgres`
- password: `postgres`

4. Run migrations:

```bash
yarn migration:run
```

5. Run the app in development mode:

```bash
yarn dev
```

You can revert the last migration with:

```bash
yarn migration:revert
```

## Test Scripts

The following scripts call the local server at `http://localhost:3000`.

Run them from inside `problem-5`:

```bash
yarn test:create-resource
yarn test:list-resources
yarn test:get-resource
yarn test:update-resource
yarn test:delete-resource
```

Notes:

- `test:create-resource` creates a sample resource and stores its id in `scripts/.resource-id`
- `test:get-resource`, `test:update-resource`, and `test:delete-resource` use that saved id
- If your app runs on another host or port, set `BASE_URL`, for example:

```bash
BASE_URL=http://localhost:4000 yarn test:list-resources
```

## Example Request

```bash
curl -X POST http://localhost:3000/resources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Portable Speaker",
    "category": "device",
    "status": "published",
    "price": 149.99,
    "rating": 4,
    "isActive": true,
    "tags": ["portable", "audio"],
    "metadata": {
      "color": "black",
      "originCountry": "Japan",
      "featured": true
    }
  }'
```

## Project Structure

```text
src/
  config/
  controllers/
  middleware/
  models/
    resource.entity.ts
    resource.types.ts
  repositories/
  routes/
  services/
  utils/
  validators/
```
