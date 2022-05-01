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

const Welcome = () => {
  const initialModalState = {
    loading: false,
    success: false,
    failure: false,
    title: '',
    message: ''
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(updateSteps({ currentStep: '' }))
  dispatch(updateModalsState({ ...initialModalState }))

  const renderStepOne = async () => {
    try {   
      document.getElementById("card-resizer").parentNode.style.margin = '0 0 0 3.05%'
      document.getElementById("card-resizer").parentNode.style.width = '100%'
      document.getElementById("card-resizer").parentNode.style.height = '100%'
      document.getElementById("card-resizer").style.opacity = '0'
      document.getElementById("hidden-card-resizer").parentNode.style.width = '23%'
      document.getElementById("hidden-card-resizer").parentNode.style.margin = '0 0 0 0'
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/multisend')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
      <Box style={styles.holder}>
        <Card style={styles.leftSteps}>
          <div id='hidden-card-resizer'></div>
        </Card>
        
        <Card style={styles.Card}>
          <div id='card-resizer' style={styles.contentDissapear}>
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
