/* eslint-disable import/prefer-default-export */
import { API_ADDRESS } from './constants'
import { CudosNetworkConsts } from 'cudosjs';
  
export const GetAccountBalance = async (account: string) => {
    const url: string = `${API_ADDRESS}/cosmos/bank/v1beta1/balances/${account}/by_denom?denom=${CudosNetworkConsts.CURRENCY_DENOM}`;
    const amount = (await (await fetch(url)).json()).balance.amount;
    return { accountBalance: amount }
}
