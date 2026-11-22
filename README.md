# Zenith Product API

A RESTful API for managing a store's product inventory, built with Node.js, Express, and Mongoose. It supports full CRUD, plus filtering, sorting, and pagination on the product list.

Built for the Module 13 SBA: Build a Product API.

## Tech Used

- Node.js
- Express
- MongoDB Atlas + Mongoose
- dotenv

## Project Structure

```
product-api/
├── server.js               # starts the app, connects to the DB, mounts routes at /api/products
├── config/
│   └── connection.js       # connects to MongoDB Atlas with Mongoose
├── models/
│   └── Product.js          # product schema and validation
├── routes/
│   └── productRoutes.js    # all 5 API endpoints
├── .env                    # MONGO_URI and PORT (not on GitHub)
└── .gitignore              # ignores node_modules/ and .env
```

## Setup

1. Clone the repo and install the packages:
   ```bash
   npm install
   ```
2. Make a `.env` file in the main folder:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=3000
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   You should see the server address and `Connected!` in the terminal.

## Product Schema

| Field | Type | Rules |
|---|---|---|
| `name` | String | required |
| `description` | String | required |
| `price` | Number | required, must be greater than 0 |
| `category` | String | required |
| `inStock` | Boolean | defaults to `true` |
| `tags` | [String] | list of words |
| `createdAt` | Date | defaults to now |

## Endpoints

All routes start with `/api/products`.

| Method | Route | What it does | Responses |
|---|---|---|---|
| POST | `/` | Create a product from the request body | `201` with the new product, `400` if validation fails |
| GET | `/` | Get all products (with filters, see below) | `200` with an array |
| GET | `/:id` | Get one product by its `_id` | `200`, or `404` if not found |
| PUT | `/:id` | Update a product by its `_id` | `200` with the updated product, or `404` |
| DELETE | `/:id` | Delete a product by its `_id` | `200` with a success message, or `404` |

### Example POST body

```json
{
  "name": "Headphones",
  "description": "Wireless, noise cancelling",
  "price": 99.99,
  "category": "electronics",
  "tags": ["audio", "wireless"]
}
```

### Filtering, Sorting and Pagination

`GET /api/products` accepts these optional query parameters, and they can be combined:

| Parameter | Example | What it does |
|---|---|---|
| `category` | `?category=kitchen` | only products in that category |
| `minPrice` | `?minPrice=20` | price greater than or equal to this |
| `maxPrice` | `?maxPrice=70` | price less than or equal to this |
| `sortBy` | `?sortBy=price_asc` / `?sortBy=price_desc` | cheapest first / most expensive first |
| `page` | `?page=2` | which page (default `1`) |
| `limit` | `?limit=5` | how many per page (default `10`) |

Example:

```
GET /api/products?category=electronics&minPrice=10&sortBy=price_asc&page=1&limit=2
```

## What I Struggled With

- **Schemas vs. functions.** I first wrote the schema as `export function productSchema(){ ... }`. A schema is made with `new Schema({ ... })`, and only the model gets exported.
- **Importing and calling things.** In `server.js` I made a second box with the same name (`const connection = connection()`), which crashed the server. I just needed to call it: `connection()`. I also learned `Router` comes from `'express'`, and a default export is imported without `{ }`.
- **axios vs. Mongoose.** In my POST route I reached for `axios` like in my Movie Finder project. Here I'm talking to my own database, so the `Product` model does the work: `Product.create(req.body)`. There's no `.data` either.
- **Keeping routes separate.** At one point I put my GET route inside my POST route. Each route is its own block, and they all go above `export default router`.
- **Using the right error message.** I learned `e.message` gives a clear reason (like which field is missing) instead of a generic "Something went wrong."
- **Reading the URL.** `req.query` holds everything after the `?`. I tried to type the URL itself into my code before I understood the code just reads what the user sends.
- **Building the filter.** I wrapped my filter in extra braces (`find({filter})`) and left `filter.category = {}` empty, so nothing matched. The filter is already an object, so it's `find(filter)`, filled with values from `req.query`.
- **Sort order.** `1` means small to big and `-1` means big to small. Sorting has to happen before `.skip()` and `.limit()` so the pages come out in the right order.
- **Testing with enough data.** With only one product, my filters and sorting looked broken. Adding more products showed they actually worked.
- **Git.** My commit didn't go through at first because I ran it without a message. `git commit -m "..."` fixed it.
