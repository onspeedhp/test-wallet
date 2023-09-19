import { ADAPTER_EVENTS, CONNECTED_EVENT_DATA } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

// subscribe to lifecycle events emitted by web3auth
export const subscribeAuthEvents = (web3auth: Web3Auth) => {
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
    console.log('connected to wallet', data);
  });
  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    console.log('connecting');
  });
  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    console.log('disconnected');
  });
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log('error', error);
  });
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log('error', error);
  });
};
