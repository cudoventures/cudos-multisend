
import { Dialog as MuiDialog } from '@mui/material'
import { Box, Typography, Button, CircularProgress, Divider, Stack, Tooltip } from '@mui/material'
import { ModalContainer, CancelRoundedIcon } from './styles'
import FailureIcon from '../../assets/vectors/failure.svg'
import SuccessIcon from '../../assets/vectors/success.svg'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { updateModalsState } from '../../store/modals'
import { updateSteps } from '../../store/steps'
import { OpenInNewRounded as OpenInNewRoundedIcon } from '@mui/icons-material'
import { totalAmountDue } from '../../utils/projectUtils'
import { useNavigate } from 'react-router-dom'
import { EXPLORER_PUBLIC_ADDRESS } from '../../utils/constants'

const Dialog = () => {

  const initialState = {
    loading: false,
    success: false,
    failure: false,
    title: '',
    message: '',
    costOfMultiSendOperation: '',
    youAreSaving: '',
    txHash: '',
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { success, loading, failure, title, message, costOfMultiSendOperation, finalCost, txHash } = useSelector((state: RootState) => state.modalsState)
  const { multisendRows } = useSelector((state: RootState) => state.multiRows)
  const amountPaid = totalAmountDue()
  const TxCheckAddress = EXPLORER_PUBLIC_ADDRESS + "/transactions/" + txHash

  const startOver = () => {
    navigate('/welcome')
  }

  const handleClose = () => {
    dispatch(updateModalsState({ ...initialState }))
    dispatch(updateSteps({ currentStep: '1' }))
    navigate('/multisend')
  }


  const onClose = (ev: any, reason: string) => {
    if (reason !== 'backdropClick') {
      handleClose()
    }
  }

  switch(true) {
    case failure:
      return (
        <MuiDialog
          open={failure}
          onClose={onClose}
          PaperProps={{
            sx: {
              background: 'transparent',
              boxShadow: 'none',
              position: 'fixed',
              overflow: 'hidden',
              borderRadius: '25px'
            }
          }}
        >
          <ModalContainer sx={{ padding: '4rem' }}>
          <img src={FailureIcon} alt="failure-icon" />
          <CancelRoundedIcon onClick={handleClose} />
          <Box
            width='400px'
            height= '200px'
            display="block"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            gap={1}
          >
            <Typography style={{margin: '20px 0 20px 0'}} variant="h4" fontWeight={900} letterSpacing={2}>
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {message}
            </Typography>
          </Box>
          <Button
            sx={(theme) => ({
              width: '50%',
              fontWeight: 700,
              '&:hover': {
                background: theme.palette.primary.main
              }
            })}
            onClick={handleClose}
          >
            Try again
          </Button>
        </ModalContainer>
        </MuiDialog>
      )
    case loading:
      return (
        <MuiDialog
          open={loading}
          onClose={onClose}
          PaperProps={{
            sx: {
              background: 'transparent',
              boxShadow: 'none',
              position: 'fixed',
              overflow: 'hidden',
              borderRadius: '25px'
            }
          }}
        >
          <ModalContainer sx={{ minWidth: '600px', minHeight:'300px', padding: '4rem' }}>
            <CircularProgress thickness={5} sx={{ borderRadius: '20px' }} />
            <Typography style={{margin: '20px 0 20px 0'}} variant="h4" fontWeight={900} letterSpacing={2}>
              Processing...
            </Typography>
            <Typography color="primary.main" fontWeight={900} letterSpacing={1}>
              Check details in your Keplr Wallet
            </Typography>
          </ModalContainer>
        </MuiDialog>
      )
    case success:
      return (
        <MuiDialog
          open={success}
          onClose={onClose}
          PaperProps={{
            sx: {
              background: 'transparent',
              boxShadow: 'none',
              position: 'fixed',
              overflow: 'hidden',
              borderRadius: '25px'
            }
          }}
        >
          <ModalContainer sx={{ padding: '4rem' }}>
            <img src={SuccessIcon} alt="success-icon" />
            <CancelRoundedIcon onClick={startOver} />
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Typography variant="h4" fontWeight={900} letterSpacing={2}>
                Success!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                You have successfully finished your Multisend!
              </Typography>
            </Box>
            <Box padding='0px 10px 0 10px' width='100%' display="flex" flexDirection="column" gap={2}>

              <Box>
                <Typography margin='10px 0 5px 0' color="text.secondary" variant="body2">
                  Total Recipients
                </Typography>
                <Typography variant="body2">{multisendRows.length}</Typography>
              </Box>

              <Box>
                <Typography margin='10px 0 5px 0' color="text.secondary" variant="body2">
                  Total Amount
                </Typography>
                <Typography variant="body2">{amountPaid} CUDOS</Typography>
              </Box>

              <Box>
                <Typography margin='10px 0 5px 0' color="text.secondary" variant="body2">
                  Total Transactions
                </Typography>
                <Typography variant="body2">1</Typography>
              </Box>

              <Divider />

              <Box display="flex" alignItems="center" gap={1} padding="0.5rem 0">
                <Typography variant="body2">Fee</Typography>

                <Typography
                  variant="body2"
                  color="primary.main"
                  fontWeight={700}
                  letterSpacing={1}
                  sx={{ marginLeft: 'auto' }}
                >
                  {finalCost} CUDOS
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2">Transaction</Typography>
                <Tooltip title="Go to Explorer">
                <a href={TxCheckAddress} target='_blank'>
                <Stack
                  marginBottom='20px'
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ cursor: 'pointer' }}
                >
                  <Typography
                    variant="body2"
                    color="primary.main"
                    sx={{ textDecoration: 'underline' }}
                  >
                    Transaction link
                  </Typography>
                  <OpenInNewRoundedIcon
                    fontSize="small"
                    sx={(theme) => ({
                      color: theme.palette.primary.main
                    })}
                  />
                </Stack>
                </a>
              </Tooltip>
              </Box>
            </Box>
            <Button
              sx={(theme) => ({
                width: '50%',
                fontWeight: 700,
                '&:hover': {
                  background: theme.palette.primary.main
                }
              })}
              onClick={startOver}
            >
              Finish
            </Button>
          </ModalContainer>
        </MuiDialog>
      )
    default:
      break
  }
}

export default Dialog
