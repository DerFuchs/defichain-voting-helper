# DeFiChain Voting Helper

A desktop app for easy voting with your DeFiChain Masternodes.

## Restrictions & How It Works
This app needs a Full Wallet running on the same computer. This Full Wallet has to hold the OWNER address(es) of the masternode(s).
That's neccessary because this app connects to the DeFiChain Node, running underneath the Full Wallet and performs actions remotely. It's basically like you're executing commands via CMD, but completely automated.

## Download

### Latest version for Windows
https://defichain-votings.com/app/DeFiChain-Voting-Helper-App-Setup.exe

### Latest version for MacOS
Apple Silicon (M1 / M2): https://defichain-votings.com/app/DeFiChain-Voting-Helper-App-Apple-Silicon.dmg

Intel: https://defichain-votings.com/app/DeFiChain-Voting-Helper-App-Intel.dmg

(Move to Applications => Right click => Open || Double click will not work because it's not signed yet)

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


## FAQ

### I have hosted my MN at mydefichain, can I use this app?

Yes! It does not matter where your MN is hosted because it is the OWNER address which is performing the vote. So, all you need is a Full Wallet, running on the same machine as this app. This Full Wallet has to hold the OWNER address, of course.


### Someone sent me this app as a download via Telegram or Twitter, can I trust it?

NO! The only trusted source to download this app is the domain https://defichain-votings.com. I will NEVER send you this app from any other source. If this happens to you, the other guy is most likely an attacker, pretending to be me. Please report this account immediately and do NOT download or execute the application!

## This is how it looks

![Overview](https://raw.githubusercontent.com/DerFuchs/defichain-voting-helper/main/img/screenshot1.png)
![Voting Detail](https://raw.githubusercontent.com/DerFuchs/defichain-voting-helper/main/img/screenshot2.png)
![Node Connection](https://raw.githubusercontent.com/DerFuchs/defichain-voting-helper/main/img/screenshot3.png)


## Geek Land - Build on your own

If you don't trust the builds, you can build it on your own!

Attention, this is Geek Land starting. You should better not do this your first time and know what you're doing.

### Prerequisites 
First of all, clone this repo. 

Then install: 
- node.js
- NPM or YARN
- Quasar CLI (https://quasar.dev/start/quasar-cli)

Then cd into the directory and proceed...

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

#### force building for Windows

```bash
quasar build -m electron -T win32 --arch x64
```

#### force building for MacOS

For Apple Silicon:
```bash
quasar build -m electron -T macOS -arch arm64
```

For Intel Macs
```bash
quasar build -m electron -T macOS -arch x64
```

## Geek Land^2

### Customize the configuration

Quasar utilizes Vite as build tool. You can customize it.

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
