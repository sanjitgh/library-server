# Library Management System - Backend

A RESTful API for library management system built with Node.js, Express, and MongoDB.

## Features

- Book CRUD operations
- Book borrowing system
- Borrow summary aggregation
- Input validation
- Error handling

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- TypeScript
- Cors, Dotenv

## Installation

1. Clone the repository

```bash
git clone https://github.com/sanjitgh/library-server.git
cd library-server
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```env
MONGODB_URI= (connect mongodb)
```

4. Start the server

```bash
npm run dev
```

## API Endpoints

### Books

- `GET /books` - Get all books
- `GET /books/:id` - Get single book
- `POST /books` - Create new book
- `PUT /edit-book/:id` - Update book
- `DELETE /delete-book/:id` - Delete book

### Borrows

- `POST /borrows` - Borrow a book
- `GET /borrows-summary` - Get borrow summary

## Data Models

### Book Schema

```typescript
{
  title: String (required),
  author: String (required),
  genre: String (required),
  isbn: String (required, unique),
  description: String,
  copies: Number (default: 1),
  available: Boolean (default: true)
}
```

### Borrow Schema

```typescript
{
  bookId: ObjectId (required),
  quantity: Number (required),
  dueDate: Date (required),
  borrowDate: Date (default: now)
}
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string

## Error Handling

- Validation errors return 400 status
- Not found errors return 404 status
- Server errors return 500 status
- All errors include descriptive messages
