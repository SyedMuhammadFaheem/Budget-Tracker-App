# Budget Tracker App
Budget Tracker is a web app made with the PERN stack. It helps you manage expenses, track income, and plan savings securely. With features like Google login and clear permissions, you can trust your data's privacy. Whether it's for personal use or small-scale finance tracking, our app keeps things easy and reliable.

## Table of Contents

- [Installation](#Installation)
  - [Client](#Client)
  - [Server](#Server)

## Installation

### Client

1. Navigate to the `client` directory.

```bash
cd client
```

2. Install the required react dependencies through.

```bash
npm install
```

3. Run the frontend server.

```bash
npm start
```


### Server

1. Navigate to the `server` directory.

```bash
cd server
```

2. Install the required react dependencies through.

```bash
npm install
```

3. All the commands to create all the functionalites for the sql database are in `Database.sql` file. You have to run them one by one to create all the required tables, triggers and other procedures.

4. Change this code snippet in the `src/config/db.js` file accordingly. The comments represent the values I have set for my local machine.

```bash
   const appDataSource = new dbConnect.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,  // Change port if needed
    username: "postgres",  // Change username if required
    password: "123",  // Change to your specified password
    database: "Budget-Tracker-App",  // Change to your specified database name
    synchronize: true,
    entities: ["src/models/*.js"],
    logging: true,
    migrations: ["src/migrations/*.ts"]
  });
});
```

5. Run the backend server.

```bash
npm run index.js
```
