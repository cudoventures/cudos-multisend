//@ts-nocheck
import { Typography, TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell } from '@mui/material'
import { styles } from './styles'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { totalAmountDue } from '../../utils/projectUtils'

const OverviewTable = () => {

    const { multisendRows } = useSelector((state: RootState) => state.multiRows)
    return (
        <div id='component-holder'>
                    <TableContainer id='table-container' style={styles.tableContainer}>
                        <h4 style={{marginBottom: '10px', float: "left"}}>List of recipients</h4>
                    <Table id='table'>
                        {/* TABLE HEADER */}
                        <TableHead style={{borderRadius: '10px', width: '100%', display: 'block'}}>
                            <TableRow style={{...styles.resultRow, display: 'flex', background: 'rgba(99, 109, 143, 0.2)'}}>
                                <TableCell style={{...styles.headerCells, padding: '10px 10px 10px 24px'}}>#</TableCell>
                                <TableCell style={{...styles.headerCells, padding: '10px 10px 10px 30px', width: '400px'}}>Address</TableCell>
                                <TableCell style={{...styles.headerCells, padding: '0px 0px 0px 55px', textAlign: 'left', marginRight: "40px"}}>Amount</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* TABLE BODY */}
                        <TableBody style={{background: '#28314E', display: 'block', height: '202px', overflow: 'scroll', padding: '5px'}}>
                            {multisendRows.map((item, idx) => (
                                <TableRow id='auto-scrolling-table' style={{...styles.resultRow}} key={idx}>
                                    <TableCell style={{...styles.headerCells, width: '50px', textAlign: 'center' }} >{idx+1}</TableCell>
                                    <TableCell style={{...styles.resultCells, width: '410px', color: '#52A6F8'}}>
                                        {item.recipient}
                                    </TableCell>
                                    <TableCell style={{...styles.resultCells, display: 'inline-flex', marginRight: "10px"}}>
                                        <div style={{marginRight: '5px', textAlign: 'right', width: '100px'}}>
                                            {item.cudos}
                                        </div>
                                        <span>
                                            {'CUDOS'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        
                        {/* TABLE FOOTER */}
                        <TableFooter>
                                <TableRow id='footer-summary' style={styles.footerSummary}>
                                    <Typography variant="subtitle1" color="text.secondary" style={styles.footerSummaryLeft}>
                                        Total Recipients <span style={{marginLeft:'10px', color: 'white'}}>{multisendRows.length}</span>
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" style={styles.footerSummaryRight}>
                                        Total Amount <span style={{marginLeft:'10px', color: 'white'}}>{totalAmountDue()} CUDOS</span>
                                    </Typography>
                                </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
    ) 
}

export {
    OverviewTable
}
