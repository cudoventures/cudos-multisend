/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { API_ADDRESS } from './constants'
  
export const GetAccountBalance = async (account: string) => {
    const url: string = API_ADDRESS + '/bank/balances/' + account
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
