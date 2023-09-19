import { useWeb3Modal } from '@web3modal/react';
import { PhantomAdapter } from '@web3auth/phantom-adapter';

export const HomePage = () => {
  const { open, close } = useWeb3Modal();

  return <button onClick={() => open()}>Connect</button>;
};
