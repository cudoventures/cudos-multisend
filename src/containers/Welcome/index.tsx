// @ts-nocheck
import { Box, Button, Typography } from '@mui/material'
import Card from '../../components/Card/Card'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateSteps } from '../../store/steps'
import { updateModalsState } from '../../store/modals'
import WelcomeGroupLogo from '../../assets/vectors/welcome-group-logos.svg'
import PlusIcon from '../../assets/vectors/plus-icon.svg'
import { styles } from  './styles'
import { updatemultiRows } from '../../store/multirows'

const Welcome = () => {
  
  const initialModalState = {
    loading: false,
    success: false,
    failure: false,
    title: '',
    message: '',
    costOfMultiSendOperation: '',
    finalCost: '',
    youAreSaving: '',
    txHash: ''
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(updateSteps({ currentStep: '' }))
  dispatch(updateModalsState({ ...initialModalState }))
  dispatch(updatemultiRows({ multisendRows: [] }))

  const renderStepOne = async () => {
    try {
      // REMOVING CONTENT FROM RIGHT CARD
      document.getElementById("content-dissapear").style.opacity = '0'

      // RESIZING RIGHT CARD
      document.getElementById("resizable-card-right").style.justifyContent = 'center'
      document.getElementById("resizable-card-right").style.flexDirection = 'column'
      document.getElementById("resizable-card-right").style.display = 'flex'
      document.getElementById("resizable-card-right").style.textAlign = 'center'
      document.getElementById("resizable-card-right").style.width = '1030px'
      document.getElementById("resizable-card-right").style.height = '600px'
      
      // RESIZING LEFT CARD
      document.getElementById("resizable-card-left").style.display = 'flex'
      document.getElementById("resizable-card-left").style.justifyContent = 'center'
      document.getElementById("resizable-card-left").style.width = '240px'
      document.getElementById("resizable-card-left").style.textAlign = 'center'
      document.getElementById("resizable-card-left").style.height = '600px'
      document.getElementById("resizable-card-left").style.pading = '0 40px'
      document.getElementById("resizable-card-left").style.marginRight = '40px'

      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/multisend')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
      <Box style={styles.holder}>
        <Card id='resizable-card-left' style={styles.leftSteps}></Card>
        
        <Card id='resizable-card-right' style={styles.Card}>
          <div id='content-dissapear' style={styles.contentDissapear}>
          <Box>
            <img src={WelcomeGroupLogo} alt="Welcome logo" />
          </Box>
          <Box>
              <h2>Welcome to CUDOS MultiSend!</h2>
          </Box>
          <Box>
              <Typography variant="subtitle1" color="text.secondary">
                MultiSend allows you to batch send tokens to multiple addresses in one transaction.
              </Typography>
          </Box>
          <Box>
            <Button style={styles.connectButton} onClick={() => renderStepOne()}>
                <img style={styles.plusIcon} src={PlusIcon} alt="Keplr Logo" />
                Multisend tokens
            </Button>
          </Box>
          </div>
        </Card>
      </Box>
  )
}

export default Welcome
