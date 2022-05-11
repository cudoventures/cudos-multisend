//@ts-nocheck
import { Tooltip, Typography, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell
 } from '@mui/material'
import Dialog from '../Dialog'
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { styles } from './styles'
import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import React, { useRef, useEffect } from 'react'
import UploadFromCsv from '../../assets/vectors/csv-upload.svg'
import TrashBinIcon from '../../assets/vectors/trashbin-icon.svg'
import CachedIcon from '@mui/icons-material/Cached'
import { isValidAddress, isValidAmount } from '../../utils/validation'
import { updatemultiRows } from '../../store/multirows'
import { SingleInputRow } from '../SingleInputRow'
import { updateModalsState } from '../../store/modals'

const DynamicTable = () => {

    const initialState = {
        isOpen: false,
        recipientAddress: '',
        recipientAmount: ''
    }

    const autoScroll = useRef()
    const dispatch = useDispatch()
    const { multisendRows } = useSelector((state: RootState) => state.multiRows)

    useEffect(() => {
        setTimeout(() => { autoScroll.current.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' }) }, 200)
    }, [multisendRows])

    const handleCsvClick = () => {
        document.getElementById("csv-file")?.click()
    }

    const handleRemoveSpecificRow = (idx: any) => () => {
        const newRows = [...multisendRows]
        newRows.splice(idx, 1)
        dispatch(updatemultiRows({multisendRows: newRows}))
    }

    let fileReader: any
    let invdalidData: boolean = false

    const handleFileRead = (e) => {
        const content = fileReader.result.split('\n')
        
        let txBatch = []
        for (let line of content) {
            line = line.trim()
            if (line.length === 0) { invdalidData = true; break }

            const columns = line.split(',')
            if (columns.length !== 2) { invdalidData = true; break }
            
            const recipient = columns[0]
            const amount = parseInt(columns[1])
            if (
                recipient === undefined || 
                recipient === '' || 
                !isValidAddress(recipient) ||
                amount === undefined || 
                amount === 0 ||
                !isValidAmount(amount.toString()))
                { 
                    invdalidData = true
                    break 
                }

            const item = {
                recipient: recipient,
                cudos: amount.toString()
            }
            txBatch.push(item)
        }
        
        if (invdalidData) {
            dispatch(updateModalsState({
                failure: true, 
                title: 'File Error', 
                message: 'Uploaded file is in wrong format or contains invalid data'
            }))
        } else {
            const newRows = [...multisendRows, ...txBatch]
            dispatch(updatemultiRows({multisendRows: newRows}))
        }
        
    }
    
    const handleFileChosen = (e) => {
        let file = e.target.files[0]
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
        e.target.value = ''
    }

    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 'max-content',
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
        }))

        const clearState = () => {
            dispatch(updatemultiRows({multisendRows: []}))
            setState({...initialState})
            document.getElementById('singleAddressTab').value = ''
            document.getElementById('singleAmountTab').value = ''
        }

        
    return (
        <div id='component-holder' style={{opacity: '1', transition: 'opacity 0.5s'}}>
            <Dialog />
            <SingleInputRow />
                <TableContainer id='table-container' style={styles.tableContainer}>
                    <h4 style={{marginBottom: '10px', float: "left"}}>List of recipients</h4>
                    <HtmlTooltip
                        style={{marginTop: '20px'}}
                        title={
                            <React.Fragment>
                            <Typography color="inherit">CSV file format</Typography>
                            <em>{"<address>"}</em><b>{','}</b> <em>{"<amount>"}</em><br/> 
                            <em>{"<address>"}</em><b>{','}</b> <em>{"<amount>"}</em><br/> 
                            <small>{'*Each pair should be comma separated and on a new line.'}</small>
                            </React.Fragment>}
                    >
                        <div className='tooltip-base'>
                            <Button 
                                disableRipple 
                                style = {{ height: '30px', paddingRight: '0', marginBottom: '5px', float: 'right', background: 'none'}} 
                                onClick={handleCsvClick}>
                                <img src={UploadFromCsv} alt="Upload from CSV file" />
                            </Button>
                        </div>
                    </HtmlTooltip>
                    <input
                    name="multiSendCsv"
                    type='file'
                    id='csv-file'
                    accept='.csv'
                    onChange={e => handleFileChosen(e)}
                    hidden
                    />
                <Table id='table'>
                    {/* TABLE HEADER */}
                    <TableHead style={{borderRadius: '10px', width: '100%', display: 'block'}}>
                        <TableRow style={{...styles.resultRow, display: 'flex', background: 'rgba(99, 109, 143, 0.2)'}}>
                            <TableCell style={{...styles.headerCells, padding: '10px 10px 10px 24px'}}>#</TableCell>
                            <TableCell style={{...styles.headerCells, padding: '10px', width: '410px'}}>Address</TableCell>
                            <TableCell></TableCell>
                            <TableCell style={{...styles.headerCells, padding: '0px 0px 0px 55px', textAlign: 'left', width: '250px'}}>Amount</TableCell>
                            <TableCell style={styles.headerCells}>
                                <Tooltip title={'Clear table'}>
                                    <Button
                                        disableRipple
                                        onClick={clearState}
                                        style = {multisendRows.length > 0?
                                            {padding: '0 0 0 5px', margin: '0', float: 'right', background: 'none'}:
                                            {visibility: 'hidden', padding: '0 0 0 5px', margin: '0', float: 'right', background: 'none'}}>
                                        <CachedIcon sx={{ color: 'rgba(82, 166, 248, 0.5)' }} />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {/* TABLE BODY */}
                    <TableBody style={{background: '#28314E', display: 'block', height: '150px', overflow: 'scroll', padding: '5px'}}>
                        {multisendRows.map((item, idx) => (
                            <TableRow id='auto-scrolling-table' style={{...styles.resultRow}} key={idx} ref={autoScroll}>
                                <TableCell style={{...styles.headerCells, width: '50px', textAlign: 'center' }} >{idx+1}</TableCell>
                                <TableCell style={{...styles.resultCells, width: '410px', color: '#52A6F8'}}>
                                    {item.recipient}
                                </TableCell>
                                <TableCell style={{...styles.resultCells, display: 'inline-flex', width: '300px'}}>
                                    
                                    <div style={{marginRight: '5px', textAlign: 'left', width: '100px'}}>
                                        {item.cudos.length < 13?
                                        item.cudos:
                                        <Tooltip title={item.cudos}>
                                            <div>
                                            {item.cudos.slice(0, 4 ) + '.....' + item.cudos.slice(-4)}
                                            </div>
                                        </Tooltip>
                                        }
                                    </div>
                                    <span>
                                        {'CUDOS'}
                                    </span>
                                </TableCell>
                                <TableCell style={{...styles.resultCells}}>
                                    <Button 
                                    disableRipple 
                                    style = {{ paddingRight: '0', marginBottom: '5px', float: 'right', background: 'none'}} 
                                    onClick={handleRemoveSpecificRow(idx)}>
                                    <img src={TrashBinIcon} alt="remove row icon" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export {
    DynamicTable
}
