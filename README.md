# JavaScript CRUD (ft. Express & Node.js & PostgreSQL)

## Purpose

This project is a simple CRUD (Create, Read, Update, Delete) application built with Node.js and Express as the Back-end side to handle data requests and responses.

## Difficulty

This project is designed for beginners and intermediate developers who want to learn how to build a simple CRUD application using JavaScript instead of PHP.

## Changes needed before start

1. Please check the `db.js` file first, which you have to assign a `.env` values there, so make your own `.env` and change as you desire in `db.js` file.
2. The database dummy column used in here is `uuid`, `name`, `gender`, and `age`. The `uuid` column is generated fill by PostgreSQL `uuid_generate_v4`, make sure you have installed the extension of `uuid_generate_v4` in your PostgreSQL. Check out on Google about how to install it, or [this one](https://stackoverflow.com/questions/12505158/generating-a-uuid-in-postgres-for-insert-statement).
3. Check every query in [router](https://github.com/rayzio-jax/JS-CRUD/tree/master/router) folder and make some change on the query based on your own database structures.

## How to start

1. Clone the repository to your local machine.

```bash
git clone https://github.com/rayzio-jax/JS-CRUD.git
```

2. Install the required packages.

```bash
npm install
```

3. Run the project locally

```bash
npm run dev
```

## Depedencies

<pre>
*required*
dotenv: 16.4.5
express: 4.19.2
pg: 8.12.0

*optional*
nodemon: 3.1.4
compression: 1.7.4
cors: 2.8.5
helmet: 7.1.0
</pre>

## FAQ
>
>Q: What is CRUD? </br>
A: CRUD stands for Create, Read, Update, and Delete, which are the four basic operations performed on data in a database or data storage system.

>Q: Why do you use JavaScript instead of PHP? </br>
A: As a JavaScript programmer, I decide to try using vanilla JavaScript, and using Express to handle the Back-end with Node.js as the web-server.

>Q: Can I use this project for my personal? </br>
A: Yes, you can use it as a basic for your personal project as this project is intended to educate and showing tutorial on how to make CRUD using JS only.

P.S: *I'm sorry if the project files a bit messy, my bad*
