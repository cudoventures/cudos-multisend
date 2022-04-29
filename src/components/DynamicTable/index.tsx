//@ts-nocheck
import { Tooltip, Box, Typography, Input, Button, TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell
 } from '@mui/material'
 import Dialog from '../Dialog';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { styles } from './styles'
import { RootState } from '../../store'
import { updateSingleRow } from '../../store/singlerow'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, Component } from 'react'
import PlusIcon from '../../assets/vectors/plus-icon.svg'
import UploadFromCsv from '../../assets/vectors/csv-upload.svg'
import TrashBinIcon from '../../assets/vectors/trashbin-icon.svg'
import CachedIcon from '@mui/icons-material/Cached';
import { isValidAddress, isValidAmount } from '../../utils/validation'

class DynamicTable extends React.Component <any, any> {
    
    constructor(props: any) {
        super(props)
    
        this.state = {
            isOpen: false,
            recipientAddress: '',
            recipientAmount: '',
            multisendRows: []
        }

        this.initialState = { ...this.state } 
      }

    renderError = (errorMessage: string) => {
        
        const handleClose = () => {
            this.setState({ isOpen: false })
        }


        return (
            <Dialog open={this.state.isOpen} handleClose={handleClose}>
                <span>{errorMessage}</span>
            </Dialog>
        )
    }

    handleCsvClick = () => {
        document.getElementById("csv-file")?.click()
    }

    handleRemoveSpecificRow = (idx: any) => () => {
        const multisendRows = [...this.state.multisendRows]
        multisendRows.splice(idx, 1)
        this.setState({ multisendRows })
    }

    handleAddRow = () => {
        const item = {
            recipient: this.state.recipientAddress[0],
            cudos: this.state.recipientAmount[0]
        }
        const multisendRows = [...this.state.multisendRows, item]
        this.setState({ multisendRows })
        setTimeout(() => { this.scr.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' }) }, 200)
        document.getElementById('singleAddressTab').value = ''
        document.getElementById('singleAmountTab').value = ''
        this.setState({
            recipientAddress: '',
            recipientAmount: ''
        })
    }

    handleChange = (e: any) => {
        const { name, value } = e.target
        this.setState({
            [e.target.name]:[value]
        })
    }

    render(){
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
                if (recipient === undefined || recipient === '' || amount === undefined || amount === 0) { invdalidData = true; break }
     
                const item = {
                    recipient: recipient,
                    cudos: amount.toString()
                }
                txBatch.push(item)
            }
            
            if (invdalidData) {
                alert('There is something wrong with the data in your file')
            } else {
                const multisendRows = [...this.state.multisendRows, ...txBatch]
                this.setState({ multisendRows })
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

        const invalidInput = !isValidAddress(...this.state.recipientAddress) || !isValidAmount(...this.state.recipientAmount)
        return (
            <div id='component-holder'>
                <div lassName='input-group' style={styles.inputGroup}>
                    <div id='wallet-address-group' style={{display: 'grid', justifyItems: 'start'}}>
                        <span style={{margin: '20px 0 10px 0'}}>Wallet address</span>
                        <Input
                        disableUnderline
                        style={styles.walletInput}
                        type="text"
                        name="recipientAddress"
                        id='singleAddressTab'
                        placeholder="e.g cudos1nkf0flyugd2ut40cg4tn48sp70p2e65wse8abc"
                        onChange={this.handleChange}
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
                        onKeyDown={event => {if (['e', 'E', '+', "-", ".", ","].includes(event.key)) {event.preventDefault()}}}
                        onPaste={(e)=>{e.preventDefault()}} 
                        onChange={this.handleChange}
                        />
                    </div>
                    <Tooltip title={invalidInput?"Please provide valid address and amount":'Add address and amount to list'}>
                        <div className='tooltip-base'>
                            <Button
                            disabled={invalidInput}
                            style={styles.addToListButton} 
                            onClick={this.handleAddRow}
                            >
                            {invalidInput?null:<img style={{marginRight: '10px'}} src={PlusIcon} alt="Keplr Logo" />}
                            Add to list
                            </Button>
                        </div>
                    </Tooltip>
                </div>
                <div id='lower-table-container' style={styles.tableContainer}>
                    <TableContainer style={{padding: '0 20px'}}>
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
                                    onClick={this.handleCsvClick}>
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
                    <Table>
                        {/* TABLE HEADER */}
                        <TableHead style={{borderRadius: '10px', width: '100%', display: 'block'}}>
                            <TableRow style={{...styles.resultRow, display: 'flex', background: 'rgba(99, 109, 143, 0.2)'}}>
                                <TableCell style={{...styles.headerCells, padding: '10px 10px 10px 24px'}}>#</TableCell>
                                <TableCell style={{...styles.headerCells, padding: '10px 10px 10px 30px', width: '410px'}}>Address</TableCell>
                                <TableCell></TableCell>
                                <TableCell style={{...styles.headerCells, padding: '0px 0px 0px 55px', textAlign: 'left', width: '250px'}}>Amount</TableCell>
                                <TableCell style={styles.headerCells}>
                                    <Tooltip title={'Clear table'}>
                                        <Button
                                            disableRipple
                                            onClick={() => {this.setState(this.initialState)}}
                                            style = {this.state.multisendRows.length > 0?
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
                            {this.state.multisendRows.map((item, idx) => (
                                <TableRow style={{...styles.resultRow}} key={idx} ref={e => this.scr = e}>
                                    <TableCell style={{...styles.headerCells, width: '50px', textAlign: 'center' }} >{idx+1}</TableCell>
                                    <TableCell style={{...styles.resultCells, width: '410px', color: '#52A6F8'}}>
                                        {item.recipient}
                                    </TableCell>
                                    <TableCell style={{...styles.resultCells, display: 'inline-flex', width: '300px'}}>
                                        <div style={{marginRight: '5px', textAlign: 'right', width: '100px'}}>
                                            {item.cudos}
                                        </div>
                                        <span>
                                            {'CUDOS'}
                                        </span>
                                    </TableCell>
                                    <TableCell style={{...styles.resultCells}}>
                                        <Button 
                                        disableRipple 
                                        style = {{ paddingRight: '0', marginBottom: '5px', float: 'right', background: 'none'}} 
                                        onClick={this.handleRemoveSpecificRow(idx)}>
                                        <img src={TrashBinIcon} alt="remove row icon" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                
                            ))}
                        </TableBody>
                        
                        {/* TABLE FOOTER */}
                        {/* <TableFooter>

                        </TableFooter> */}
                    </Table>
                </TableContainer>
                </div>
            </div>
        )
    }
}

export {
    DynamicTable
}