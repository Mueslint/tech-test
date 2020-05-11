# Streamroot's technical test

## Email address

solom.emmanuel@gmail.com

## Project structure

Once unzipped, the project is under the folder `Techtest`.
It has a mono-repo structure with the backend and the front split respectively under `frontend-test-backend` and `frontend-test`

# Run the application

---

**Launch the backend**

`cd frontend-test-backend && npm i && npm start`

**Launch the frontend**

`cd frontend-test && npm i && npm start`

**Run tests (frontend)**

`npm run test`

# Application structure

---

The application has 2 distinct views:

- the Login page
- the Dashboard page

You can use the credentials `swagtv / bling$bling` or `urtoob / ToobRU` to log in.

→ `shinynewclient / siriusblack` only has limited functionality (notifications) others are not yet developed

The dashboard layout is split between the Menu on the left and the Views's content on the right.

The Menu is divided in 3 sections, each divided in parts:

- Stream monitoring
  - Stream stats
- Traffic monitoring
  - Last 24 hours
  - Last week
  - All time
- Account
  - Notifications
  - Logout

# Forseen improvements

---

→ Not all endpoints have been used as I focused on a "streaming performance" kind of user's journey - thinking of `countries` or `isps`

→ Improve `react-query` implementation to get rid of some unnecessary re-renders - may need to be coupled with `useMemo` on charts's data props

→ Improve `tuicharts` implementation - or replace with `charts.js` or `D3.js` - to have more control and build zoomable charts Components

→ UI test with `react-testing-library`

→ Menu built with `<nav>` and `<a>` possible implementation of `react-router-dom`

→ Disconnect/Reconnect user on app crash
