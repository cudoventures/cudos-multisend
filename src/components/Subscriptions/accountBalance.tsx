import { Tooltip } from '@mui/material'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { SeparateFractions, SeparateDecimals, CutFractions} from '../../utils/regexFormatting'

const AccountBalance = () => {

  const { balance } = useSelector((state: RootState) => state.profile)
  const fullBalance = SeparateDecimals(SeparateFractions(balance?balance.toString():'0'))
  const displayBalance = CutFractions(fullBalance)

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
