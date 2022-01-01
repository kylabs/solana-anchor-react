import {FC} from 'react'
import { WALLER_PROVIDERS, WalletProvider} from '../utils/WalletProviders'
import './css/WalletList.css';


export interface WalletListProps {

    selectedWallet? : (provider :WalletProvider) => void ;

}

export const WalletList: FC <WalletListProps> = ({selectedWallet}) => {
   

    const walletProviderDivs = WALLER_PROVIDERS.map((w, i) =>{

        return <div key={"walletProvider"+i} className="walletProviderRow"
        onClick={()=>{
            if ( selectedWallet){

                selectedWallet(w);
            }
        }}>
            <img src={w.icon} />
            <div className="title">{w.name}</div>
        </div>

    })

    return <div className="walletProviders">
    {walletProviderDivs}
    </div>
}
