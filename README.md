# pm2-dotenv

A package to load environment variables from .env files for PM2 ecosystem.config.js.

## Features

- Automatically loads environment variables from `.env.<environment>` files in the project directory.

## Installation

```bash
yarn add pm2-dotenv
```

## Usage

Prepare your `.env` files in the project directory, note that all the env variables must be prefixed with the app name.

```env
APP1_NAME=app # this will be load to the app1 and the name will be NAME
APP2_NAME=worker # this will be load to the app2 and the name will be NAME
```

Use the `injectVars()` function to inject environment variables

```
const injectVars = require('pm2-dotenv').injectVars;

module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      ...injectVars('app'),
    },
    {
      name: 'worker',
      script: 'worker.js',
      ...injectVars('worker'),
    }
  ],
};
```
