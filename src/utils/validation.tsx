export const isValidAddress = (addr: string) => {
    if (addr === '' || addr === undefined) return false
    // const { tempAddress } = useSelector((state: RootState) => state.singleRow)
    const addressCheck = addr.replace(/^cudos[0-9a-z]{39}$/gm, 'OK');
    return addressCheck === 'OK'
}

export const isValidAmount = (amount: string) => {
    if (amount === '' || amount === undefined) return false
    // const { tempAmount } = useSelector((state: RootState) => state.singleRow)
    const amountCheck = amount.replace(/^[1-9]{1}[0-9]*$/gm, 'OK')
    return amountCheck === 'OK'
} 