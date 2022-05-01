//@ts-nocheck
/* eslint-disable import/prefer-default-export */
import copy from 'copy-to-clipboard'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const copyToClipboard = (value: string): void => {
  copy(value)
}

export const totalAmountDue = () => {
  const { multisendRows } = useSelector((state: RootState) => state.multiRows)
  let totalAmount: number = 0
  multisendRows.forEach((item)=>{
    let amount = +item.cudos
    totalAmount += amount
  })
  return totalAmount
}

export const notEnoughBalance = () => {
  const { balance } = useSelector((state: RootState) => state.profile)
  const amountDue = (totalAmountDue() * 10 ** 18)
  return balance < amountDue
}

export const formatAddress = (text: string, sliceIndex: number): string => {
  if (!text) {
    return ''
  }
  const len = text.length
  if (text === null || text.length < 10) {
    return text
  }
  return `${text.slice(0, sliceIndex)}...${text.slice(len - 4, len)}`
}
