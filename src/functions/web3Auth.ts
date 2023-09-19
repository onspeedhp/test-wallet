import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { PhantomAdapter } from '@web3auth/phantom-adapter';
import { TorusWalletAdapter } from '@web3auth/torus-evm-adapter';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { SolanaWallet } from '@web3auth/solana-provider';
require('dotenv').config();

export const web3AuthPhantom = async () => {
  const web3auth = new Web3Auth({
    clientId:
      'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ', // get it from Web3Auth Dashboard
    web3AuthNetwork: 'sapphire_mainnet',
    chainConfig: {
      chainNamespace: 'solana',
      chainId: '0x1', // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
      rpcTarget: 'https://rpc.ankr.com/solana',
      displayName: 'Solana Mainnet',
      blockExplorer: 'https://explorer.solana.com',
      ticker: 'SOL',
      tickerName: 'Solana',
    },
  });
  await web3auth.initModal();

  const web3authProvider = await web3auth.connect();

  if (web3authProvider) {
    const solanaWallet = new SolanaWallet(web3authProvider);
  }
  
};

export const web3AuthEVM = async () => {
  const web3auth = new Web3Auth({
    clientId: process.env.REACT_APP_CLIENT_ID_WEB3_AUTH!, // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: 'sapphire_mainnet',
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x1',
      rpcTarget: process.env.REACT_APP_RPC_ETHEREUM, // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
    },
    uiConfig: {
      loginMethodsOrder: ['google'],
    },
  });

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: {
      /*
        pass the chain config that you want to connect with.
        all chainConfig fields are required.
        */
      chainConfig: {
        chainId: '0x1',
        rpcTarget: process.env.REACT_APP_RPC_ETHEREUM!,
        displayName: 'Ethereum Mainnet',
        blockExplorer: 'https://etherscan.io',
        ticker: 'ETH',
        tickerName: 'Ethereum',
      },
    },
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      network: 'sapphire_mainnet', // Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
      uxMode: 'popup',
      // whiteLabel: {
      //   appName: 'W3A Heroes',
      //   appUrl: 'https://web3auth.io',
      //   logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
      //   logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
      //   defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
      //   mode: 'dark', // whether to enable dark mode. defaultValue: auto
      //   theme: {
      //     primary: '#00D1B2',
      //   },
      //   useLogoLoader: true,
      // },
      loginConfig: {
        // Google login
        google: {
          verifier: 'YOUR_GOOGLE_VERIFIER_NAME', // Please create a verifier on the developer dashboard and pass the name here
          typeOfLogin: 'google', // Pass on the login provider of the verifier you've created
          clientId: 'GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Pass on the clientId of the login provider here - Please note this differs from the Web3Auth ClientID. This is the JWT Client ID
        },
      },
    },
    privateKeyProvider,
  });
  web3auth.configureAdapter(openloginAdapter);

  const torusWalletAdapter = new TorusWalletAdapter({
    adapterSettings: {
      buttonPosition: 'bottom-left',
    },
    loginSettings: {
      verifier: 'google',
    },
    initParams: {
      buildEnv: 'testing',
    },
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x1',
      rpcTarget: process.env.REACT_APP_RPC_ETHEREUM,
      // Avoid using public rpcTarget in production.
      // Use services like Infura, Quicknode etc
      displayName: 'Ethereum Mainnet',
      blockExplorer: 'https://etherscan.io',
      ticker: 'ETH',
      tickerName: 'Ethereum',
    },
    sessionTime: 3600, // 1 hour in seconds
    web3AuthNetwork: 'sapphire_mainnet',
  });

  // it will add/update  the torus-evm adapter in to web3auth class
  web3auth.configureAdapter(torusWalletAdapter);

  await web3auth.initModal({
    modalConfig: {
      [WALLET_ADAPTERS.OPENLOGIN]: {
        label: 'openlogin',
        loginMethods: {
          google: {
            name: 'google login',
            logoDark: 'url to your custom logo which will shown in dark mode',
          },
        },
        // setting it to false will hide all social login methods from modal.
        showOnModal: true,
      },
    },
  });

  console.log(web3auth);

  return web3auth;
};
