# HW3

## React: Tic-Tac-Toe (`react/`)

### Requirements

- Node.js (current LTS) and npm

### How to run

From the `hw3/` folder:

```
cd react
npm install --legacy-peer-deps
npm start
```

The app opens at http://localhost:3000/. If it doesn't open on its own, paste that address into your browser. Stop the server with `Ctrl+C`.

`--legacy-peer-deps` is required. The project uses `react-scripts` (Create React App), which declares an older peer-dependency range than the React version in the tutorial's starter files, so a plain `npm install` fails with an `ERESOLVE` error.

### Troubleshooting

**`npm start` fails with `Cannot find module 'ajv/dist/compile/codegen'`**

Installing with `--legacy-peer-deps` can leave `ajv-keywords` with the wrong version of `ajv` (it needs v8). Install the correct version, then start again:

```
npm install ajv@8 --legacy-peer-deps
npm start
```

### Project structure

```
react/
├── public/          static files (index.html)
├── src/
│   ├── App.js       Square, Board, and Game components, plus calculateWinner
│   ├── index.js     entry point that renders <Game /> into the page
│   └── styles.css   board and layout styles
├── package.json
└── package-lock.json
```

---

## Socket.IO: Basic Chat (`socketio/`)

### Requirements

- Node.js (current LTS) and npm

### How to run

From the `hw3/` folder:

```
cd socketio
npm install
node index.js
```

The server prints `listening on *:3000`. Open http://localhost:3000/ in two or more browser tabs and send messages; each message appears in every tab. Stop the server with `Ctrl+C`.

Port 3000 is also used by the React app, so stop that one first if it's still running.

### Project structure

```
socketio/
├── index.js         Express server with Socket.IO
├── index.html       chat page (form, message list, client script)
├── package.json
└── package-lock.json
```

---

## REST Countries App (`countries/`)

### Requirements

- Node.js 18 or newer and npm
- A free REST Countries API key (https://restcountries.com/sign-up)

### How to run

From the `hw3/` folder:

```
cd countries
npm install
```

Create a file named `.env` in the `countries/` folder (see `.env.example`):

```
RESTCOUNTRIES_API_KEY=your_api_key_here
PORT=3000
```

Then start the server:

```
npm start
```

The server prints `listening on http://localhost:3000`. Open http://localhost:3000/ in your browser. Stop the server with `Ctrl+C`.

The `.env` file is not committed (see `.gitignore`), so you need to create it with your own key. Port 3000 is also used by the other apps in this homework, so stop those first if they are still running.

### Routes

| Route        | What it shows                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| `/home`      | Welcome page with links to the other pages                                                             |
| `/countries` | All countries in alphabetical order, with their capitals and leaders (with title)                      |
| `/populous`  | Countries with a population of at least 50 million, most populous first, with each flag and population |
| `/regions`   | The number of countries and the country names in each region                                           |

Countries with missing data (no capital, region, population, or flag) are handled with default values instead of breaking the page. Countries with no region are listed under "No region listed".

The `leaders` field is a premium field in the REST Countries API. On the free plan the API does not send leader names, so the leader column shows "Not available".

### Project structure

```
countries/
├── server.js        Express server, API requests, and routes
├── views/           Pug templates (layout, home, countries, populous, regions)
├── public/
│   └── styles.css   page styles
├── .env.example     template for the .env file
├── package.json
└── package-lock.json
```
