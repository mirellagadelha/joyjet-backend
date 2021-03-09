## Description

An implementation of a REST API for Joyjet's back-end application test.

## Getting Started
These instructions will get you a copy of the full project up and running on your local machine for development and testing purposes.

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't have any installed on your system.

* **Npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/)

* **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general. [Download Yarn](https://yarnpkg.com/en/docs/install)

## Tecnologies
* [Node.js] (https://nodejs.org/en/).
* [NestJS] (https://nestjs.com/).
* [Typescript] (https://www.typescriptlang.org/).

## Prerequisites

Before starting, you will need to have the following tools installed on your machine:
* [Git] (https://git-scm.com), 
* [Node.js] (https://nodejs.org/en/).
* In addition, it is good to have an editor to work with the code like [VSCode] (https://code.visualstudio.com/)

## How to Install

* To download the project follow the instructions bellow:

```
$ git clone https://github.com/tgmarinho/meetapp-api.git
$ cd meetapp-api
```

* Install the dependencies and start the server:

```
$ yarn install
$ yarn dev
```

or

```
$ npm install
$ npm dev
```

## Unit Tests

* To run tests follow the instructions bellow:

```bash
$ yarn test
```

or

```bash
$ npm run test
```

## Request & Response Example

### POST /checkout

Example: http://localhost:3000/checkout

Request body:

    {
        "articles": [
            { "id": 1, "name": "water", "price": 100 },
            { "id": 2, "name": "honey", "price": 200 },
            { "id": 3, "name": "mango", "price": 400 },
            { "id": 4, "name": "tea", "price": 1000 },
            { "id": 5, "name": "ketchup", "price": 999 },
            { "id": 6, "name": "mayonnaise", "price": 999 },
            { "id": 7, "name": "fries", "price": 378 },
            { "id": 8, "name": "ham", "price": 147 }
        ],
        "carts": [
            {
            "id": 1,
            "items": [
                { "article_id": 1, "quantity": 6 },
                { "article_id": 2, "quantity": 2 },
                { "article_id": 4, "quantity": 1 }
            ]
            }
        ],
        "delivery_fees": [
            {
            "eligible_transaction_volume": {
                "min_price": 0,
                "max_price": 1000
            },
            "price": 800
            },
            {
            "eligible_transaction_volume": {
                "min_price": 1000,
                "max_price": 2000
            },
            "price": 400
            },
            {
            "eligible_transaction_volume": {
                "min_price": 2000,
                "max_price": null
            },
            "price": 0
            }
        ],
        "discounts": [
            { "article_id": 2, "type": "amount", "value": 25 },
            { "article_id": 5, "type": "percentage", "value": 30 },
            { "article_id": 6, "type": "percentage", "value": 30 },
            { "article_id": 7, "type": "percentage", "value": 25 },
            { "article_id": 8, "type": "percentage", "value": 10 }
        ]
    }

Response body:

    {
        "carts": [
            {
            "id": 1,
            "total": 2350
            }
        ]
    }
