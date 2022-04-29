
//@ts-nocheck
import { Box, Typography  } from '@mui/material'
import { styles } from './styles'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import StepOnePic from '../../assets/vectors/step-one.svg'
import StepTwoPic from '../../assets/vectors/step-two.svg'
import StepThreePic from '../../assets/vectors/step-three.svg'

export const Step = () => {
  const { currentStep } = useSelector((state: RootState) => state.steps)
  return currentStep?currentStep:'1'
}

export const StepInfo = () => {
  
  let title: string = 'Prepare Addresses'
  let subTitle: string = 'Add the addresses you want to send tokens'

  switch (Step()){
    case '2':
      title = 'Approve for Sending'
      subTitle = 'Check if the addresses and amounts are correct'
      break
    case '3':
      title = 'Proceed with executing Multisend transaction'
      subTitle = 'Check the details and continue with Submit'
      break
    default:
      break
  }

  return (
    <div>
      <Box>
        <h3 style={{float: 'left', margin: '3px auto'}}>{title}</h3>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          <span style={{float: 'left'}}>{subTitle}</span>
        </Typography>
      </Box>
    </div>
  )
}

export const StringStep = () => {
  return (
    <span style={{color:'#52A6F8', fontSize: '12px', fontWeight: '600', float: 'left'}}>Step {Step()}/3</span>
  )
}

const Steps = () => {
  let stepPic: string = StepOnePic
  switch (Step()){
    case '2':
      stepPic = StepTwoPic
      break
    case '3':
      stepPic = StepThreePic
      break
    default:
      break
  }

  return (
    <div style={styles.stepsHolder}>
          <div style={{margin: '20px 0  20px 0'}}>
            <Box>
              <h3 style={{margin: '0 auto'}}>Multisend Tokens</h3>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Follow the steps and send
              </Typography>
            </Box>
          </div>
          <div id='options'>
            <img style={{margin: '30% auto'}} src={stepPic} alt="Steps" />
          </div>
        </div>
  )
}

export default Steps
