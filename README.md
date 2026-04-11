# Code Challenge Summary

This repository contains the deliverables for `problem-4`, `problem-5`, and `problem-6`.

## Repository Overview

| Problem | Topic | Output |
| --- | --- | --- |
| `problem-4` | Algorithm implementation | Three TypeScript solutions for `sum_to_n` |
| `problem-5` | Backend CRUD service | ExpressJS + TypeScript + PostgreSQL service for `resource` management |
| `problem-6` | System design specification | Backend module specification for a real-time leaderboard API service |

## Problem 4

Location: [problem-4/README.md](./problem-4/README.md)

Summary:

- implements the `sum_to_n` problem in three different ways
- includes:
  - `for-loop.ts`
  - `recursion.ts`
  - `math-formula.ts`
- compares the approaches by time and space complexity
- includes commands to run each implementation from the `problem-4` directory

Main takeaway:

- the mathematical formula is the most efficient approach with `O(1)` time and `O(1)` space

## Problem 5

Location: [problem-5/README.md](./problem-5/README.md)

Summary:

- implements a CRUD backend service for a `resource` entity
- uses:
  - ExpressJS
  - TypeScript
  - TypeORM
  - PostgreSQL
  - Docker Compose
- supports:
  - create, read, update, delete endpoints
  - list filtering across multiple field types
  - database migrations
  - local run and Docker-based run
  - helper scripts for manual endpoint testing

Main takeaway:

- this problem is implemented as a small but production-structured REST API with clear separation across routes, controllers, services, repositories, validation, and database setup

## Problem 6

Location: [problem-6/README.md](./problem-6/README.md)

Summary:

- provides a backend specification for a real-time leaderboard module
- focuses on:
  - idempotent score updates through `action_id`
  - burst update handling
  - Redis-backed leaderboard reads
  - SSE-based live updates
  - cross-instance event propagation through Redis pub/sub
  - reconciliation from Postgres to Redis through a worker
- includes:
  - architecture overview
  - detailed architecture visualization
  - entity design
  - critical execution flow
  - API contracts
  - engineering notes and implementation guidance

Main takeaway:

- this problem is documented as an implementation-ready backend design where write-path correctness lives in Postgres, hot reads live in Redis, and horizontal scaling of live updates is handled through Redis pub/sub plus per-instance SSE fanout

## Notes

- each problem keeps its own detailed README inside its folder
- `problem-6/highlevel.excalidraw.json` and `problem-6/highlevel.png` contain the detailed architecture visualization used by the leaderboard specification
