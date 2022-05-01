//@ts-nocheck
import { Tooltip, Input, Button }  from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { isValidAddress, isValidAmount } from '../../utils/validation'
import { styles } from './styles'
import PlusIcon from '../../assets/vectors/plus-icon.svg'
import { updatemultiRows } from '../../store/multirows'

const SingleInputRow = () => {

    const initialState = {
        isOpen: false,
        recipientAddress: '',
        recipientAmount: ''
    }

   
    const dispatch = useDispatch()
    const [state, setState] = useState({ ...initialState })
    const { multisendRows } = useSelector((state: RootState) => state.multiRows)


    const handleChange = (e: any) => {
        const { name, value } = e.target
        setState({...state,
            [e.target.name]:[value]
        })
    }

    const handleAddRow = () => {
        const item = {
            recipient: state.recipientAddress[0],
            cudos: state.recipientAmount[0]
        }
        const newRows = [...multisendRows, item]
        dispatch(updatemultiRows({multisendRows: newRows}))
        document.getElementById('singleAddressTab').value = ''
        document.getElementById('singleAmountTab').value = ''
        
        setState({...state,
            recipientAddress: '',
            recipientAmount: ''
        })
    }

    const invalidInput = !isValidAddress(...state.recipientAddress) || !isValidAmount(...state.recipientAmount)
    return (
            <div className='input-group' style={styles.inputGroup}>
                <div id='wallet-address-group' style={{display: 'grid', justifyItems: 'start'}}>
                    <span style={{margin: '20px 0 10px 0'}}>Wallet address</span>
                    <Input
                    disableUnderline
                    style={styles.walletInput}
                    type="text"
                    name="recipientAddress"
                    id='singleAddressTab'
                    placeholder="e.g cudos1nkf0flyugd2ut40cg4tn48sp70p2e65wse8abc"
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div id='amount-group' style={{ display: 'grid', justifyItems: 'start', margin: 'auto 20px'}}>
                    <span style={{margin: '20px 0 10px 0'}}>Amount</span>
                    <Input
                    disableUnderline
                    style={styles.amountInput}
                    type="number"
                    name="recipientAmount"
                    id='singleAmountTab'
                    placeholder="0"
                    min={1}
                    onKeyDown={event => {if (['e', 'E', '+', "-", ".", ","].includes(event.key)) {event.preventDefault()}}}
                    onPaste={(e)=>{e.preventDefault()}} 
                    onChange={handleChange}
                    />
                </div>
                <Tooltip title={invalidInput?"Please provide valid address and amount":'Add address and amount to list'}>
                    <div className='tooltip-base'>
                        <Button
                        disabled={invalidInput}
                        style={styles.addToListButton} 
                        onClick={handleAddRow}
                        >
                        {invalidInput?null:<img style={{marginRight: '10px'}} src={PlusIcon} alt="Keplr Logo" />}
                        Add to list
                        </Button>
                    </div>
                </Tooltip>
            </div>
    )
}

export {
    SingleInputRow
}