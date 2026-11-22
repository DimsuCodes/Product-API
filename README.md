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

honestly this one was a lot but i got through it. at first i wrote my schema like a function when it was supposed to be new Schema, and in my server i named my connection twice so it kept crashing. i also kept wanting to use axios like my movie finder project but this time im talking to my own database so the Product model does all the work. i accidentally put my get route inside my post route too and had to learn that every route is its own block and they all go above export default router. the hardest part was the get all route, i was confused about the url and req.query and i put my filter in extra curly braces so nothing showed up. i also learned 1 is small to big and -1 is big to small for sorting, and that sort has to go before skip and limit. i thought my filters were broken but i only had one product in my database lol, once i added more everything worked. also my git wasnt committing because i forgot the -m message.
