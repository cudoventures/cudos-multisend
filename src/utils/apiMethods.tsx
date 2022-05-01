/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { updateUser } from '../store/profile';

const config = {
    rpc: import.meta.env.VITE_APP_RPC,
    rest: import.meta.env.VITE_APP_API,
    chainName: import.meta.env.VITE_APP_CHAIN_NAME,
    chainId: import.meta.env.VITE_APP_CHAIN_ID,
    currencies: [
    {
        coinDenom: 'CUDOS',
        coinMinimalDenom: 'acudos',
        coinDecimals: 18,
        coinGeckoId: 'cudos'
    }
    ],
    stakeCurrency: {
    coinDenom: 'CUDOS',
    coinMinimalDenom: 'acudos',
    coinDecimals: 18,
    coinGeckoId: 'cudos'
    },
    feeCurrencies: [
    {
        coinDenom: 'CUDOS',
        coinMinimalDenom: 'acudos',
        coinDecimals: 18,
        coinGeckoId: 'cudos'
    }
    ],
    bip44: { coinType: 118 },
    bech32Config: {
    bech32PrefixAccAddr: 'cudos',
    bech32PrefixAccPub: 'cudospub',
    bech32PrefixValAddr: 'cudosvaloper',
    bech32PrefixValPub: 'cudosvaloperpub',
    bech32PrefixConsAddr: 'cudosvalcons',
    bech32PrefixConsPub: 'cudosvalconspub'
    },
    coinType: 118,
    gasPriceStep: {
    low: 5000000000000,
    average: 5000000000000 * 2,
    high: 5000000000000 * 4
    }
}


  
export const GetAccountBalance = async (account: string) => {
    const url: string = config.rest + '/bank/balances/' + account
    return axios.get(url)
                .then(response => {
                    let accountBalance
                    if (response.status === 200 && response.data.result[0]) {
                        accountBalance = response.data.result[0].amount
                    } else {
                        accountBalance = '0'
                    }
                    return { accountBalance }
                })
}

export const UpdateAccountBalanceInState = async () => {
    const dispatch = useDispatch()
    const { address } = useSelector((state: RootState) => state.profile)
    const { accountBalance } = await GetAccountBalance(address)
    dispatch(updateUser({ address, balance: accountBalance }))
}
