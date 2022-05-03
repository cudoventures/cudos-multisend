import { Box, Button, Typography } from '@mui/material'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { updateUser } from '../../store/profile'
import { ConnectLedger } from '../../ledgers/KeplrLedger'
import { GetAccountBalance} from '../../utils/apiMethods'
import InfoIcon from '../../assets/vectors/info-icon.svg'
import KeplrLogo from '../../assets/vectors/keplr-logo.svg'
import Header from '../../components/Layout/Header'

import { styles } from './styles'

const ConnectWallet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { address } = useSelector((state: RootState) => state.profile)

  const connect = async () => {
    try {
      window.keplr.defaultOptions = {
        sign: {
            preferNoSetFee: true,
        }
      }
      const { address } = await ConnectLedger()
      const { accountBalance } = await GetAccountBalance(address)
      dispatch(updateUser({ address, balance: accountBalance }))
      navigate('welcome')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return address ?
  (<Navigate to="/welcome" state={{ from: location }} replace />)
  :
  (
    <Box style={styles.backgroundStyle}>
      <Header />
      <Box>
        <Box style={styles.connectContainer}>
          <Box>
            <h1>Welcome to CUDOS MultiSend Tool!</h1>
          </Box>
          <Box style={styles.subHeaderContainer}>
            <Typography variant="subtitle1" color="text.secondary">
              MultiSend allows you to batch send tokens to multiple addresses in one transaction.<br />
              In order to continue please connect your wallet.
            </Typography>
          </Box>
          <Box>
            <Button onClick={() => connect()} style={styles.connectButton}>
              <img style={styles.keplrLogo} src={KeplrLogo} alt="Keplr Logo" />
              Connect Keplr wallet
            </Button>
          </Box>
          <Box style={styles.pluginWarning} color="primary.main">
            <img style={styles.infoIcon} src={InfoIcon} alt="Info" />
            Make sure you have Keplr plugin installed.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ConnectWallet
