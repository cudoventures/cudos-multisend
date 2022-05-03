/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { updateUser } from '../store/profile'
import { API_ADDRESS } from './constants';
  
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

export const UpdateAccountBalanceInState = async () => {
    const dispatch = useDispatch()
    const { address } = useSelector((state: RootState) => state.profile)
    const { accountBalance } = await GetAccountBalance(address)
    dispatch(updateUser({ address, balance: accountBalance }))
}
