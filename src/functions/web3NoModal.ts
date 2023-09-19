import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin';

export const web3NoModalAuthEVM = async () => {
  const web3auth = new Web3AuthNoModal({
    clientId: process.env.REACT_APP_CLIENT_ID_WEB3_AUTH!, // Get your Client ID from the Web3Auth Dashboard
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x1',
      displayName: 'Ethereum Mainnet',
      blockExplorer: 'https://etherscan.io',
      ticker: 'ETH',
      tickerName: 'Ethereum',
      rpcTarget: process.env.REACT_APP_RPC_ETHEREUM, // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
    },
    web3AuthNetwork: 'sapphire_mainnet',
  });

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: {
      /*
        pass the chain config that you want to connect with.
        all chainConfig fields are required.
        */
      chainConfig: {
        chainId: '0x1',
        rpcTarget: 'https://rpc.ankr.com/eth',
        displayName: 'Ethereum Mainnet',
        blockExplorer: 'https://etherscan.io',
        ticker: 'ETH',
        tickerName: 'Ethereum',
      },
    },
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      clientId: process.env.REACT_APP_CLIENT_ID_WEB3_AUTH!, //Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
      network: 'sapphire_mainnet', // Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
      uxMode: 'popup',
      whiteLabel: {
        appName: 'W3A Heroes',
        appUrl: 'https://web3auth.io',
        logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
        logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
        defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
        mode: 'dark', // whether to enable dark mode. defaultValue: auto
        theme: {
          primary: '#00D1B2',
        },
        useLogoLoader: true,
      },
      loginConfig: {
        jwt: {
          verifier: 'YOUR-VERIFIER-NAME-ON-WEB3AUTH-DASHBOARD',
          typeOfLogin: 'jwt',
          clientId: process.env.REACT_OAUTH_GOOGLE,
        },
      },
    },
    privateKeyProvider,
  });
  web3auth.configureAdapter(openloginAdapter);

  const torusPlugin = new TorusWalletConnectorPlugin({
    torusWalletOpts: {},
    walletInitOptions: {
      whiteLabel: {
        theme: { isDark: true, colors: { primary: '#00a8ff' } },
        logoDark: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
        logoLight: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
      },
      useWalletConnect: true,
      enableLogging: true,
    },
  });

  await web3auth.addPlugin(torusPlugin); // add plugin to web3auth instance

  await web3auth.init();

  return web3auth;
};
