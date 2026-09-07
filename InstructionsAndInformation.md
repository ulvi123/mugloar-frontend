# Dragons of Mugloar — Frontend

React frontend for the Dragons of Mugloar fullstack challenge. It lets a
user start a game, see the current ads, pick which ones to solve, buy items
from the shop, and watch score/gold/lives update live — plus an auto-play
button that hands the whole game over to the backend's strategy engine.

This talks to the [mugloar-backend](../mugloar-backend) API — it never
calls the real Dragons of Mugloar API directly.

## How it's structured

State lives in one place: a `useReducer` inside `GameContext`, exposed to
every component through a `useGame()` hook. I went with Context + reducer
instead of Redux — the state shape here is small (one game's score, gold,
lives, ads, shop) and doesn't need middleware, time-travel debugging, or
cross-slice coordination, so pulling in Redux would have been extra
hustle for no real benefit.(please correct me if I am wrong)


Every network call goes through `api.js` — no `fetch()` calls anywhere else
in the codebase. That was mainly my decision for testability: `api.js` can be mocked
completely in tests without touching components, and if the backend's URL
scheme ever changes, there's exactly one file to update.

## Why a proxy, not absolute URLs

`package.json` has `"proxy": "http://localhost:8080"`. All requests in
`api.js` use relative paths like `/api/game/start`. In development, Create
React App's dev server forwards anything it doesn't recognize as a static
asset like straight to the backend on port 8080. This sidesteps CORS entirely in
dev environment, as the browser only ever talks to `localhost:3000` — the proxy hop
happens server-side. If I ever decide to go with real deployment this would need to become an
actual reverse proxy config or absolute backend URL, but for local dev and
this challenge it's the standard CRA approach.

## Features

- Start a game, see live score/gold/lives/turn in the dashboard
- Ads are sorted best-probability-first, color-coded (green/amber/red) by
  how good the odds are
- Manually solve individual ads
- Open the shop, see items and cost, buy what's affordable(if you are poor,have no gold or a peasant in the 3rd century Scandinavia, you can't buy anything)
- One-click auto-play that runs the backend's strategy loop and reports the
  final result
- Error banner surfaces any backend/API failure without crashing the app
- Responsive layout — dashboard and controls reflow on narrow screens

## Running it

Requirements: Node 18+, and the backend running first (mugloar-backend on port 8080).

```bash
npm install
npm start
```

Opens on `http://localhost:3000`. Please ensure the backend is already running and there are no zombie processes
on `http://localhost:8080` before starting this, or every request will fail.

### Running the tests

```bash
npm test -- --watchAll=false
```

`api.js`, the reducer, and `AdList`'s sorting/click behavior are covered
with mocked `fetch` calls — no test depends on the backend actually running.


## Known limitations

- No persistence(it was pout of scope of the task but I would love to add persistence layer to that,nice game to develop anyway in Unity) — refreshing the page loses the current game (the backend
  itself doesn't expose a "resume game" endpoint, so this would need
  backend support first).
- The shop UI only supports buying one item at a time via a button per row;
  there's no cart/multi-buy flow, since the task was not referrign to this.