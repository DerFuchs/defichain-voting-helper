# DeFiChain Voting Helper

A desktop app for easy voting with your DeFiChain master nodes.

## Restrictions
This software only works when you're running a full node on the same computer which is holding the owner addresses for your masternodes. This full node is usually the desktop wallet app. This app connects to that wallet and performs actions remotely. 

## Latest version for Windows
https://defichain-votings.com/app/DeFiChain%20Voting%20Helper%20App.exe

## Latest version for MacOS
Apple Silicon (M1 / M2): https://defichain-votings.com/app/DeFiChain%20Voting%20Helper%20App.app.zip

(Unzip => Right click => Open || Double click will not work because it's not signed yet.)


Intel: https://defichain-votings.com/app/DeFiChain-Voting-Helper-App-Intel.dmg

(Move to Applications => Right click => Open || Double click will not work because it's not signed yet.)



## Usage

1. Start your DeFiChain Full Wallet, holding your masternode's owner addresses on the same computer
2. Open the app
3. Set up the connection to your Full Wallet by providing the "rpcauth" key from the defi.conf file.

### defi.conf location
Windows: ```C:\Users\username\.defi\defi.conf```

MacOS: ```~/Library/Application Support/Defi/.defi/defi.conf```

## Contact
@dt_buzzjoe on Twitter (https://twitter.com/dt_buzzjoe)
@Buzzjoe on Telegram (https://t.me/Buzzjoe)

![Overview](https://raw.githubusercontent.com/DerFuchs/defichain-voting-helper/main/img/screenshot1.png)
![Voting Detail](https://raw.githubusercontent.com/DerFuchs/defichain-voting-helper/main/img/screenshot2.png)
![Node Connection](https://raw.githubusercontent.com/DerFuchs/defichain-voting-helper/main/img/screenshot3.png)

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

#### force building for Windows when on MacOS ARM64

```bash
quasar build -m electron -T win32 --arch x64
```

#### force building for MacOS when not on MacOS (won't be able to sign)

```bash
quasar build -m electron -T macOS
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
