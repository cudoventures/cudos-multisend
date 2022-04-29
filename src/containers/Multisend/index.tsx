// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Input, Table, TableHead, TableRow } from '@mui/material'
import Card from '../../components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { updateSteps } from '../../store/steps'
import PlusIcon from '../../assets/vectors/plus-icon.svg'
import { styles } from './styles'
import Dialog from '../../components/Dialog'
import Steps from '../../components/Steps'
import { Step } from '../../components/Steps'
import { StringStep, StepInfo } from '../../components/Steps'
import { DynamicTable } from '../../components/DynamicTable'
import { GetAccountBalance} from '../../utils/apiMethods'
import { RootState } from '../../store';

const Multisend = () => {
  const currentStep = parseInt(Step())
  const dispatch = useDispatch()
  const { address } = useSelector((state: RootState) => state.profile)
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
  
  return (
    <Box style={{display: 'inline-flex', width: '100%', padding: '0px 1%'}}>
      <Card style={styles.leftSteps}>
        <Steps />
      </Card>

      <Card style={styles.multiSendCard}>
        <div id='table-holder' style={styles.tableHolder}>
          <StringStep />
          <StepInfo />
          <DynamicTable />
          <Box style={{width: '100%'}}>
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
            
            {currentStep > 2? null:
            <Button
                style={styles.nextStep} 
                onClick={() => renderNextStep()}>
                Next Step
            </Button>}
          </Box>
        </div>
      </Card>
    </Box>
  )
}

export default Multisend
