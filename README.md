# Typescript and Express.js

An Express.js project implemented using Typescript with strongly typed objects:

# Installation

Clone the repository

```
npm install
```

For development:

```
npm run dev
```

To start:

```
npm run start
```

To debug in visual studio code:

```
npm run debug
```

Then run the `launch.json` configuration inside visual studio code `f5`. You should now be able to set breakpoints in your typescript.

Test

```
npm run test
```

Test Watch

```
npm run test:watch
```

Build to `./dist`

```
npm run build
```

Browse to http://localhost:3000

# Routes

## Posts

#### Get all posts

`GET /posts/`

#### Create a post

`POST /posts/:id`

request body:

```json
{
  "pickupAddress": "testAddress",
  "foodType": "Perishable",
  "consumable": true,
  "containerType": "Box",
  "allergenInfo": "Peanuts",
  "foodWeight": 100,
  "foodValue": 1000,
  "reasonForDonation": "Old",
  "pickupTime": "Midday",
  "foodInspected": true,
  "created": "2019-07-09",
  "orgID": "test_org_id"
}
```

#### Get a post

`GET /posts/:id`

#### Update a post

`PATCH /posts/:id`

request body:

```json
{
  "field to update": "new value",
  "other field to update": "other new value"
}
```

#### Delete a post

`DELETE /posts/:id`

# Testing scripts

### Create Post:

```

curl -X POST http://localhost:3000/posts -b cookie-file.txt -H 'Content-Type: application/json' -d '{"pickupAddress":"testAddress", "foodType":"Perishable", "consumable": true, "containerType":"Box", "allergenInfo": "Peanuts", "foodWeight":100, "foodValue":1000, "reasonForDonation":"Old", "pickupTime":"Midday", "foodInspected":true, "created": "2019-07-09", "orgID": "test_org_id"}'

```

# Folder structure

```

|-- Dockerfile
|-- README.md
|-- package.json
|-- spec
| -- index.spec.ts
|-- src
| |-- config
| | -- config.ts
| | -- express.ts
| |-- controllers
| | -- index.server.controller.ts
| |-- index.ts
| |-- public
| | -- stylesheets
| | -- style.css
| |-- routes
| | -- index.server.route.ts
| |-- tsconfig.json
| -- views
| -- error.jade
| -- index.jade
| -- layout.jade
-- tsconfig.json

```

# Docker

Build the image `sudo docker build -t rjmacarthy/express-typescript-starter .`

Run the image `docker-compose up`

Open `http://localhost:8080`

# License

MIT - Do with as you like.

```

```
