### Awesome Project Build with Typescript, TypeORM, Express, Postgres, etc

Steps to run this project:

N/B: Make sure you have node and postgres installed

1. Run `npm i` to install dependencies
2. Setup database settings inside an `.env` file, see `.env.sample` for inspiration
3. Run `npm start` to start server (without hot reload). N/B: (runs compiled js)
4. Run `npm run server` to start server (without hot reload). N/B: (runs typescript with `ts-node`)
5. Run `npm run dev` to use hot reload on local environment. N/B: (runs typescript with `ts-node`)
6. Run `npm run tsoa_build_and_run` to build routes field and swagger files also start server (needed after making changes to models, services or controllers)



# Errors
Run this below script if you ever encounter some funny ***Error : Cannot find module*** errors..

`rm -rf node_modules package-lock.json && npm install && npm start`


# Routes
Documentation: `localhost:3000/docs/`
Admin: `localhost:3000/admin/`
