# DeFiChain Voting Helper

A desktop app for easy voting with your DeFiChain master nodes.

Download latest version for MacOS:
https://defichain-votings.com/app/DeFiChain%20Voting%20Helper%20App.app.zip
(Unzip => Right click => Open || Double click will not work because it's not signed yet.)

## Build on your own

### Install the dependencies

```bash
yarn
# or
npm install
```

### Build the app for production

#### for the system you're currently running

```bash
quasar build -m electron
```

#### force building for Windows when on MacOS M1

```bash
quasar build -m electron -T win32 --arch x64
```

#### force building for MacOS when not on MacOS (won't be able to sign)

```bash
quasar build -m electron -T macOS
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
