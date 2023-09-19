import { Web3Auth } from '@web3auth/modal';
import { LOGIN_MODAL_EVENTS } from '@web3auth/ui';

// subscribe to lifecycle events emitted by web3auth
const subscribeAuthEvents = (web3auth: Web3Auth) => {
  // emitted when modal visibility changes.
  web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
    console.log('is modal visible', isVisible);
  });
};
