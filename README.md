# Friendly Lamp

[![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=friendly-lamp)](https://friendly-lamp.vercel.app/)

Solana GIF wall

## Install dependencies

```shell
npm install
```

## Building the application

To build the client application you need to run the following command:

```shell
npm run build:client
```

To build the program you need to run the following command:

```shell
npm run build:program
```

## Running the application

### Development

To run the development server with HMR, run the following command:

```shell
npm run start:client:dev
```

### Production preview

The application is not supposed to be run by the built-in server, but in-case if you would like to have a preview view
of the application, after you built the application, you can run the following command:

```shell
npm run start:client:prev
```

### Deploying the program

To deploy the program first you need to generate a keypair with the following command:

```shell
solana-keygen new --outfile keypair.json
```

After that you need to airdrop some solana to that account

```shell
solana airdrop 500 $(solana-keygen pubkey keypair.json)
```

Now you can deploy the application by running the following command:

```shell
npm run deploy:program
```
