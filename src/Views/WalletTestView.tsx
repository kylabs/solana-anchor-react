import {FC, useState} from 'react'
import { WalletList } from './WalletList'
import { WalletProvider } from '../utils/WalletProviders';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection,clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const WalletTestView : FC = () => {


    const [balance, setBalance] = useState(0);

    const selectedWallet = async ( provider : WalletProvider) : Promise<void> => {

        let wallet = new Wallet(provider.url, "devnet");

        let connection = new Connection(clusterApiUrl('devnet'));

        wallet.on('connect', publicKey => {

           connection.getBalance(publicKey).then((b)=>{

                setBalance(b/LAMPORTS_PER_SOL);

           })
           .catch((e)=>{

                console.log("err::x", e);
           });
           

        });
        wallet.on('disconnect', () => console.log('Disconnected'));

        await wallet.connect();

    }

    return <div>
    <WalletList selectedWallet={selectedWallet}/>
    <div style={{marginTop:"10px"}}>Your Wallet Balance : {balance.toFixed(5)} SOL</div>
    </div>
}