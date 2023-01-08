# TEKANA-EWALLET API

Technical assessment for a backend developer role at RSSB.

### API Link

##### Localhost: http://localhost:3000

##### Documentation: https://documenter.getpostman.com/view/3997258/2s8Z75SpYf

### Requirements

- `Nodejs v10 or later versions` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `POSTGRES` - a database management system for data persistence
- `IDE` - Also known as code editor, applications that allows developers to write code

### SETUP

First clone the project on your machine:

```
git@github.com:Muhire-Josue/Tekana-eWallet.git
```

Install all needed node packages

```
npm install
```

Add variable environment

```
Create .env file in the root folder of the project, reference in .env.example for the variable environment needed to run and test the project.
```

To start the app

```
npm run dev
```

To run tests

```
npm test
```

Open it using your favorite IDE,
like ([vs code](https://code.visualstudio.com/download)) to view the codebase.

### API ENDPOINTS

| API                      | Methods | Description       |
| ------------------------ | ------- | ----------------- |
| `/`                      | GET     | Welcome message   |
| `api/v1/auth/signup`     | POST    | Create a user     |
| `api/v1/auth/login`      | POST    | Login a user      |
| `api/v1/auth/users`      | GET     | Get all user      |
| `api/v1/wallets`         | POST    | Create a wallet   |
| `api/v1/transactions`    | POST    | Create a wallet   |
| `api/v1/wallets/id`      | GET     | Get a wallet      |
| `api/v1/transactions/id` | GET     | Get a transaction |

### How can it be manually tested

- using [postman](https://www.getpostman.com/downloads/)

### Other technologies used

- `NPM OR YARN` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development

### API Resources Description

1. AUTH: Auth is used to create, login and view all users. after a user is created, the password is encrypted and stored along other
   properties like names, email etc. (tableName = `users`).
2. WALLET: The wallet resource is a user's wallet. a user can only create one wallet with a balance on it. Every transactions will
   update the wallet balance too. (tableName = `wallet`).
3. TRANSACTION: A transaction can be created if the user is authenticated and has a wallet. A user can only debit an amount less than
   the current wallet balance. (tableName = `transaction`).

PS:

- Every endpoint has basic input validations applied.
- Transaction and wallet tables are indexed to improve overall performance. The reason these two tables are indexed
  is because I anticipate those two tables will have more traffic than the users table.
- There are two types of transactions, debit and credit. Debit decreases the wallet balance, and credit increases the wallet balance.
