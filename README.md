# Food Connect Backend

API + DB + Blockchain for Food-Connect

# Blockchain

Ask @Valerian on slack or Valerian.Clerc@ibm.com for IAM access to view IBM Blockchain cluster
[link](https://77363b8329d745788134bce17e26fadc-optools.uss02.blockchain.cloud.ibm.com)

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

# Routes

Constants for blockchain interactions (`status` field can be one of these):

- `"Donor Inspected/Posted"`
- `"Recipient Accepted"`
- `"Food Picked Up"`
- `"Recipient Inspected"`

## Users

`POST /signupdonor`

request body:

```json
{
  "email": "test@test.com",
  "password": "password",
  "orgName": "my_org",
  "address": "123 Some Street, Austin, TX",
  "orgType": "Grocery Store",
  "commercialID": "123abc",
  "posts": []
}
```

`POST /signuprecipient`

```json
{
  "email": "test@test.com",
  "password": "password",
  "orgName": "my_org",
  "address": "123 Some Street, Austin, TX",
  "orgType": "Homeless Shelter",
  "numberToFeed": 1000,
  "availableTimes": "Midday",
  "typeOfFood": "foodtype",
  "wishlistBlacklist": "String",
  "charityID": "String"
}
```

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
  "orgID": "test_org_id",
  "expirationDate": "2019-07-09",
  "matched": "matched_users_id",
  "status": "Donor Inspected/Posted"
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

curl -X POST http://localhost:3000/posts -b cookie-file.txt -H 'Content-Type: application/json' -d '{"pickupAddress":"testAddress", "foodType":"Perishable", "consumable": "Yes", "allergenInfo": "Peanuts", "foodWeight":100, "foodValue":1000, "reasonForDonation":"Old", "pickupTime":"Midday", "foodInspected":true, "created": "2019-07-09", "orgID": "test_org_id", "expirationDate":"2019-01-01", "matched":null, "status":"Donor Inspected/Posted"}'

```

# Advanced dev usage

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
