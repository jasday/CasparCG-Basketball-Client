# CasparCG Client for Basketball

This project aims to create an open source CasparCG client and template for use with basketball broadcasts.


## Project Structure

`client` directory - Electron client source

`template` directory - CasparCG template source - contains a subfolder that should be copied into CasparCG `/templates` (or appropriate directory for templates)


## Dev Scripts

In the client directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run dev`

Runs the app in dev move, starting the React dev server, and the Electron app in separate instances.


### `npm run ebuild`

Builds the Electron app for production to the `build` folder.

The build is minified and the filenames include the hashes.



