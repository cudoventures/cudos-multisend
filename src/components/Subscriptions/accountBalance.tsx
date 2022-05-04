import { Tooltip } from '@mui/material'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { SeparateFractions, SeparateDecimals, CutFractions} from '../../utils/regexFormatting'
import { GetAccountBalance } from '../../utils/apiMethods'
import { useEffect } from 'react'
import { updateUser } from '../../store/profile'

const AccountBalance = () => {

  const { address, balance } = useSelector((state: RootState) => state.profile)
  const fullBalance = SeparateDecimals(SeparateFractions(balance?balance.toString():'0'))
  const displayBalance = CutFractions(fullBalance)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { accountBalance } = await GetAccountBalance(address)
        dispatch(updateUser({ address, balance: accountBalance }))
      } catch (error: any) {
        alert(error.message)
      }
    }
    const timer = setInterval(async () => {
      await fetchData()
    }, 15000)

    return () => {
      clearInterval(timer)
    }
  }, [balance])

  return (
    <Tooltip title={fullBalance + ' CUDOS'}>
    <div>
      <span style={{margin: '0 5px 0 10px'}}>{displayBalance}</span>
      <span>CUDOS</span>
    </div>
    </Tooltip>
  )
}

export default AccountBalance
