//@ts-nocheck
import { Typography, TableContainer, Table, TableRow, Tooltip } from '@mui/material'
import { styles } from './styles'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { totalAmountDue } from '../../utils/projectUtils'
import AccountBalance from '../Subscriptions/accountBalance'
import ToolTipIcon from '../../assets/vectors/tooltip-icon.svg'

const SignAndSubmit = () => {

    const { multisendRows } = useSelector((state: RootState) => state.multiRows)
    const { costOfMultiSendOperation, youAreSaving } = useSelector((state: RootState) => state.modalsState)

    const totalRecipients = multisendRows.length
    const totalAmount = totalAmountDue()

    return (
        <div id='component-holder'>
            <TableContainer>
                <Table style={styles.upperTable}>
                    <TableRow style={{display: 'inline'}}>
                        <h3 style={{float: 'left'}}>Transaction Details</h3>
                    </TableRow>

                    <TableRow style={{display: 'inline'}}>
                    <Typography style={{float: 'left'}} variant="subtitle1" color="text.secondary">
                        Total Recipients
                    </Typography>
                    <span style={{float: 'right'}}>{totalRecipients}</span>
                    </TableRow>

                    <TableRow style={{display: 'inline'}}>
                    <Typography style={{float: 'left'}} variant="subtitle1" color="text.secondary">
                        Total Amount to be Send
                    </Typography>
                    <span style={{float: 'right'}}>{totalAmount} CUDOS</span>
                    </TableRow>

                    <TableRow style={{display: 'inline'}}>
                    <Typography style={{float: 'left'}} variant="subtitle1" color="text.secondary">
                        Your Token Balance
                    </Typography>
                    <span style={{float: 'right'}}><AccountBalance /></span>
                    </TableRow>

                    <TableRow style={{display: 'inline'}}>
                    <Typography style={{float: 'left'}} variant="subtitle1" color="text.secondary">
                        Total Number of Transactions Needed
                    </Typography>
                    <span style={{float: 'right'}}>1</span>
                    </TableRow>
                    
                </Table>
            </TableContainer>

            <TableContainer>
                <Table style={styles.lowerTable}>
                    <TableRow style={{display: 'inline-flex', flexDirection: 'column'}}>
                        <div>
                            <Typography style={{float: 'left'}} variant="subtitle1" color="text.secondary">
                                Approximate cost of operations
                            </Typography>
                            <Tooltip title='(Estimated GAS * 1.3 multiplier) * GAS price'>
                                <img style={{ float: 'left', padding: '0', margin: '0', height: '25px'}} src={ToolTipIcon} alt="Tooltip" />
                            </Tooltip>
                            <span style={{color: '#52A6F8', float: 'right'}}>{costOfMultiSendOperation} CUDOS</span>
                        </div>
                        {youAreSaving?
                            <div style={{textSize: '20px'}}>
                                <Typography style={{float: 'left'}} variant="subtitle1" color="text.secondary">
                                    You are saving
                                </Typography>
                                <Tooltip title={`Compared to ${multisendRows.length} single transactions`}>
                                    <img style={{ float: 'left', padding: '0', margin: '0', height: '25px'}} src={ToolTipIcon} alt="Tooltip" />
                                </Tooltip>
                                <small><span style={{ color: 'cadetblue', float: 'right'}}>{youAreSaving} CUDOS</span></small>
                            </div>
                            :
                            null
                        }
                    </TableRow>
                </Table>
            </TableContainer>
        </div>
    ) 
}

export {
    SignAndSubmit
}
