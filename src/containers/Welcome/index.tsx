// @ts-nocheck
import { Box, Button, Typography } from '@mui/material'
import Card from '../../components/Card/Card'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateSteps } from '../../store/steps'
import WelcomeGroupLogo from '../../assets/vectors/welcome-group-logos.svg'
import PlusIcon from '../../assets/vectors/plus-icon.svg'
import { styles } from  './styles'

const Welcome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(updateSteps({ currentStep: '' }))

  const renderStepOne = async () => {
    try {   
      document.getElementById("card-resizer").parentNode.style.margin = '0%'
      document.getElementById("card-resizer").parentNode.style.marginLeft = '2%'
      document.getElementById("card-resizer").parentNode.style.width = '100%'
      document.getElementById("card-resizer").style.opacity = '0'
      document.getElementById("transitionHolder").style.marginBottom = '6.5px'
      document.getElementById("hidden-card-resizer").parentNode.style.display = 'flex'
      document.getElementById("hidden-card-resizer").parentNode.style.width = '25%'
      document.getElementById("hidden-card-resizer").parentNode.style.marginLeft = '0'
      document.getElementById("hidden-card-resizer").parentNode.style.marginRight = '0'
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/multisend')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div id='transitionHolder'>
      <Box style={{display: 'inline-flex', width: '100%', padding: '0px 1%'}}>
        <Card style={styles.hiddenCard}>
          <div id='hidden-card-resizer'></div>
        </Card>
        <Card style={styles.Card}>
          <div id='card-resizer' style={{opacity: '1', transition: 'opacity 0.5s', WebkitTransition: 'opacity 0.5s'}}>
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
    </div>
  )
}

export default Welcome
