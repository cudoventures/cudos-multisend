import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  Avatar,
  Box,
  Collapse,
  Button,
  Tooltip
} from '@mui/material'
import { RootState } from '../../store'
import { updateUser } from '../../store/profile'
import { updateSteps } from '../../store/steps'
import { copyToClipboard, formatAddress } from '../../utils/projectUtils'
import { StyledUser, styles } from './styles'
import WalletIcon from '../../assets/vectors/wallet-icon.svg'
import LinkIcon from '../../assets/vectors/link-icon.svg'
import CopyIcon from '../../assets/vectors/copy-icon.svg'
import CudosLogo from '../../assets/vectors/cudos-logo.svg'
import ArrowIcon from '../../assets/vectors/arrow-down.svg'
import AccountBalance from '../Subscriptions/accountBalance'
import { updateSingleRow } from '../../store/singlerow'
import { updatemultiRows } from '../../store/multirows'
import { EXPLORER_PUBLIC_ADDRESS } from '../../utils/constants'

const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { address, balance } = useSelector((state: RootState) => state.profile)

  const explorerAddressCheck = EXPLORER_PUBLIC_ADDRESS + '/account/' + address

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<boolean>(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleCopy = (value: string) => {
    copyToClipboard(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const handleDisconnect = () => {
    dispatch(updateSteps({ currentStep: '' }))
    dispatch(updateUser({ address: '', balance: '' }))
    dispatch(updateSingleRow({ tempAddress: '', tempAmount: '' }))
    dispatch(updatemultiRows({multisendRows: []}))
    navigate('/')
  }

  return (
    <StyledUser>
      <Box onClick={() => toggleOpen()} style={styles.userContainer}>
        <Box style={styles.userInnerContainer}>
          <img src={CudosLogo} alt="Cudos logo" />
          <AccountBalance />
          <hr style={styles.fancyLine}></hr>
          <Box
            sx={{
              marginRight: '10px'
            }}
          >
            <Avatar
              style={{ borderRadius: "0px", width: '18px', height: '18px' }}
              src={WalletIcon}
              alt="Wallet Logo"
            />
          </Box>
          <Typography>{formatAddress(address, 10)}</Typography>
          <Box style={{ marginLeft: '15px' }}>
            <img
              style={{
                cursor: 'pointer',
                transform: open ? 'rotate(180deg)' : 'rotate(360deg)'
              }}
              src={ArrowIcon}
              alt="Arrow Icon"
            />
          </Box>
        </Box>
      </Box>
      <Collapse
        onMouseLeave={() => setOpen(false)}
        style={{ marginTop: '-28px', zIndex: '-1' }}
        in={open}
      >
        <Box style={styles.dropdownMenuContainer}>
          <Box style={{ marginTop: '40px' }}>
            <Box style={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  marginTop: '10px'
                }}
              >
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: '12px', marginBottom: '10px' }}
                >
                  {formatAddress(address, 20)}
                </Typography>
              </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip
                onClick={() => handleCopy(address)}
                title={copied ? 'Copied' : 'Copy to clipboard'}
              >
                <img
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  src={CopyIcon}
                  alt="Copy"
                />
              </Tooltip>
              <Tooltip title="Go to Explorer">
                <a href={explorerAddressCheck} target='_blank'>
                  <img
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                    src={LinkIcon}
                    alt="Link"
                  />
                </a>
              </Tooltip>
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px'
              }}
            >
              <Button onClick={() => handleDisconnect()}>Disconnect</Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </StyledUser>
  )
}

export default UserInfo
