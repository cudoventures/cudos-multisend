// @ts-nocheck
import { Box, Button } from '@mui/material'
import Card from '../../components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { updateSteps } from '../../store/steps'
import { styles } from './styles'
import Steps from '../../components/Steps'
import { Step } from '../../components/Steps'
import { StringStep, StepInfo } from '../../components/Steps'
import { DynamicTable } from '../../components/DynamicTable'
import { RootState } from '../../store'
import { OverviewTable } from '../../components/OverviewTable'
import { SignAndSubmit } from '../../components/SignAndSubmit'
import { notEnoughBalance } from '../../utils/projectUtils';

const Multisend = () => {
  const currentStep = parseInt(Step())
  const dispatch = useDispatch()
  const { multisendRows } = useSelector((state: RootState) => state.multiRows)

  const renderStepOne = () => {
    dispatch(updateSteps({ currentStep: '1' }))
  }
  
  const renderStepTwo = () => {
    dispatch(updateSteps({ currentStep: '2' }))
  }

  const renderStepThree = () => {
    dispatch(updateSteps({ currentStep: '3' }))
  }

  const renderNextStep = () => {
    switch (currentStep) {
      
      case 1:
      renderStepTwo()
      break

      case 2:
      renderStepThree()
      break

      default:
      break
    }
  }

  const renderPreviousStep = () => {
    switch (currentStep) {
      
      case 3:
      renderStepTwo()
      break

      case 2:
      renderStepOne()
      break

      default:
      break
    }
  }
  const insufficientAmount = notEnoughBalance()
  return (
    <Box style={styles.holder}>
      <Card style={styles.leftSteps}>
        <Steps />
      </Card>
    
    <Card style={styles.Card}>
      <div id='content-holder' style={styles.contentHolder}>
        <Box id='informative-block' style={styles.informativeBlock}>
          <StringStep />
          <StepInfo />
        </Box>
        
        <Box id='dynamic-table-holder' style={{width: '100%'}}>
          {currentStep === 1? <DynamicTable />:
          currentStep === 2? <OverviewTable />:
          currentStep === 3? <SignAndSubmit />:null}
        </Box>
        
        <Box id='navigation-holder' style={styles.navigationHolder}>
          {currentStep > 1?
              <Button
              style={styles.backButtonDefault} 
              onClick={() => renderPreviousStep()}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(82, 166, 248, 0.2)'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(82, 166, 248, 0.1)'
              e.target.style.color = '#52A6F8'
              }}> 
                Back
              </Button>:null}
            {currentStep > 3? null:
            currentStep === 2?
              <Button
              disabled={insufficientAmount}
              style={styles.nextStep} 
              onClick={() => renderNextStep()}>
                {insufficientAmount?<small style={{color: 'red'}}>insufficient balance</small>:'Approve'}
              </Button>
            :
                <Button
                disabled={multisendRows < 1}
                style={styles.nextStep} 
                onClick={() => renderNextStep()}>
                  {currentStep === 1? "Next step": "Sign and Submit"}
                </Button>}
        </Box>
      </div>
    </Card>
  </Box>
  )
}

export default Multisend
