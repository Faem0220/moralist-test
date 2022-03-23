import React, { useState } from 'react';
import './App.css';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

function App() {
  // Moralis built-in methods in moralis hook.
  const { authenticate, isAuthenticated, isAuthenticating,network, chainId, account, logout} = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [tokens, setTokens] = useState<any>([])
  const [nfts, setNfts] = useState<any>([])

  // LOGIN-LOGOUT FUNCTIONS-> LOGS TO MORALIS SERVER
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: 'Log in using Moralis for testing'})
        .then((user)=>{
          console.log('logged in user:', user);
          console.log(user!.get('ethAddress'));
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  const logOut = async () =>{
    await logout();
    console.log('logget out')
  }

  const fetchTokenBalances = async (chainId : any, accountF : any) => {
  const tokenBalances = await Web3Api.account.getTokenBalances({chain:chainId,address:accountF})
  console.log('TOKEN BALANCES: ',tokenBalances)
  setTokens(tokenBalances)
  }
  const fetchNFTs = async (chainId : any, accountF : any) => {
    const nfts = await Web3Api.account.getNFTs({chain:chainId,address:accountF})
    console.log('NFTS: ',nfts)
    setNfts(nfts.result)
  }
  const clear = () => {
    setTokens([])
    setNfts([])
  }

  return (
    <div className="App">
      <h1> Moralis Test</h1>
      <p>Account: <mark>{account}</mark></p>
      <p>Network: {network}</p>
      <p>Chain Id: {chainId}</p>
      {!isAuthenticated?
      (
        <button onClick={login}>Moralis Metamask Login</button>
      ):
      (
        <button onClick={logOut} disabled={isAuthenticating}> Logout</button>
      )}
      <br></br>
      <button onClick={e => fetchTokenBalances(chainId,account)}> Tokens </button>
      <button onClick={e => fetchNFTs(chainId,account)}> NFTs </button>
      <br></br>
      <button onClick={clear}>Clear</button>
      {tokens?
      (
        <div>
          <h2>TOKENS</h2>
          {tokens.map((token : any, i : number) => (
            <p className='nftCard' key={i}>{token.name} : {token.balance * (10**-token.decimals)}</p>
          ))}
        </div>
      )
      :
      null}
      {nfts?
      (
        <div >
          <h2>NFTs</h2>
          <div className='nftGrid'>
          {nfts.map((nft : any, i : number) => (
            <div className='nftCard' key={i}>
            <p>{nft.contract_type}</p>
            <p>{nft.token_address}</p>
            <p> Token ID: {nft.token_id}</p>
            <p> Amount: {nft.amount} </p>
            <a href={nft.token_uri} target="_blank" rel='noreferrer'> URI</a>
            </div>
          ))}
        </div>
        </div>
      )
      :
      null}

      

      
      
      
    </div>
  );
}

export default App;
