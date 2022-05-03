
//@ts-nocheck
/* eslint-disable import/prefer-default-export */
import { 
  API_ADDRESS, 
  RPC_ADDRESS, 
  CHAIN_NAME, 
  CHAIN_ID, 
  GAS_PRICE, 
  GAS_PRICE_DENOM 
} from '../utils/constants'
import { MsgMultiSend, MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"
import { assertIsDeliverTxSuccess, SigningStargateClient, defaultRegistryTypes } from "@cosmjs/stargate"
import { EncodeObject, Registry } from "@cosmjs/proto-signing"
import { coins } from "@cosmjs/amino"
import { Uint53 } from "@cosmjs/math"
import { GasPrice } from '@cosmjs/launchpad'
import BigNumber from 'bignumber.js'
import { SeparateFractions, SeparateDecimals } from '../utils/regexFormatting'
declare global {
  interface Window {
    keplr: any
    getOfflineSigner: any
    getOfflineSignerOnlyAmino: any
    meta: any
  }
}

const config = {
  rpc: RPC_ADDRESS,
  rest: API_ADDRESS,
  chainName: CHAIN_NAME,
  chainId: CHAIN_ID,
  currencies: [
    {
      coinDenom: 'CUDOS',
      coinMinimalDenom: 'acudos',
      coinDecimals: 18,
      coinGeckoId: 'cudos'
    }
  ],
  stakeCurrency: {
    coinDenom: 'CUDOS',
    coinMinimalDenom: 'acudos',
    coinDecimals: 18,
    coinGeckoId: 'cudos'
  },
  feeCurrencies: [
    {
      coinDenom: 'CUDOS',
      coinMinimalDenom: 'acudos',
      coinDecimals: 18,
      coinGeckoId: 'cudos'
    }
  ],
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: 'cudos',
    bech32PrefixAccPub: 'cudospub',
    bech32PrefixValAddr: 'cudosvaloper',
    bech32PrefixValPub: 'cudosvaloperpub',
    bech32PrefixConsAddr: 'cudosvalcons',
    bech32PrefixConsPub: 'cudosvalconspub'
  },
  coinType: 118,
  gasPriceStep: {
    low: GAS_PRICE,
    average: GAS_PRICE * 2,
    high: GAS_PRICE * 4
  }
}

export const ConnectLedger = async () => {

  await window.keplr.experimentalSuggestChain(config)
  await window.keplr.enable(CHAIN_ID)

  const offlineSigner = await window.getOfflineSigner(config.chainId)
  const accounts = await offlineSigner.getAccounts()

  const { address } = accounts[0]

  return { address }
}

export const getSimulatedMsgsCost = async (listOfRecipients: Array<{}>, address: string) => {
  const multiplier = listOfRecipients.length
  const singleSendMsg = getSingleSendMsg(listOfRecipients, address)
  const multiSendMsg = getTxMsg(listOfRecipients, address)

  const myRegistry = new Registry([
    ...defaultRegistryTypes
  ])

  const chainId = CHAIN_ID
  const offlineSigner = window.getOfflineSigner(chainId)

  const rpcEndpoint = RPC_ADDRESS
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner, {
      registry: myRegistry,
  })

  const account = (await offlineSigner.getAccounts())[0]

  const approxForSingleSend = await estimateFee(
    client,
    GasPrice.fromString(GAS_PRICE+GAS_PRICE_DENOM),
    account.address, 
    singleSendMsg.msgAny, 
    'simulated message'
  )

  const approxFeeForMultiSend = await estimateFee(
    client,
    GasPrice.fromString(GAS_PRICE+GAS_PRICE_DENOM),
    account.address, 
    multiSendMsg.msgAny, 
    'simulated message'
  )
  const singleCost = approxForSingleSend.amount[0]?approxForSingleSend.amount[0].amount:'0'
  const multiCost = approxFeeForMultiSend.amount[0]?approxFeeForMultiSend.amount[0].amount:'0'

  const tempSingleCost = new BigNumber(singleCost).multipliedBy(multiplier)
  const tempMultiCost = new BigNumber(multiCost)

  const approxCostForThisMultiSend = SeparateDecimals(SeparateFractions(tempMultiCost.valueOf()))
  let youAreSaving: string = ''
  if (tempSingleCost.isGreaterThan(tempMultiCost)) {
    youAreSaving = SeparateDecimals(SeparateFractions(tempSingleCost.minus(tempMultiCost).valueOf())) 
  }

  return [ approxCostForThisMultiSend, youAreSaving ]
}

export const getSingleSendMsg = (listOfRecipients: Array<{}>, sender: string) => {
  const firstRecipient = listOfRecipients[0]
  const recipientAddress = firstRecipient.recipient
  const amount = firstRecipient.cudos

  const msgAny = [{    
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: MsgSend.fromPartial({
        fromAddress: sender,
        toAddress: recipientAddress,
        amount: [{
            amount: (amount * 10 ** 18).toLocaleString('fullwide', {useGrouping:false}),
            denom: "acudos",
        }],
    }),
  }]
  return {msgAny, memo: 'Sent with CUDOS MultiSend'}
}

export const getTxMsg = (listOfRecipients: Array<{}>, sender: string) => {

  let totalAmountDue = 0;
  listOfRecipients.forEach((recipient) => {
      totalAmountDue += parseInt(recipient.cudos)
  })
  const msgAny = [{    
      typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
      value: MsgMultiSend.fromPartial({
          inputs: [
            {
              address: sender,
              coins: [{
                  denom: "acudos",
                  amount: (totalAmountDue * 10 ** 18).toLocaleString('fullwide', {useGrouping:false})
              }]
            }
          ],
          outputs: listOfRecipients.map((item) => ({
              address: item.recipient,
              coins: [{
                  denom: "acudos",
                  amount: (item.cudos * 10 ** 18).toLocaleString('fullwide', {useGrouping:false})
              }]
          })),
      }),
  }];

  return {msgAny, memo: 'Sent with CUDOS MultiSend'}
}

const calculateFee = (gasLimit: number, { denom, amount: gasPriceAmount }) => {
  const amount = Math.ceil(gasPriceAmount.multiply(new Uint53(gasLimit)).toFloatApproximation());
  return {
      amount: (0, coins)(amount.toString(), denom),
      gas: gasLimit.toString(),
  }
}

const estimateFee = async (client: SigningStargateClient, gasPrice: GasPrice, signerAddress: string, messages: readonly EncodeObject[], memo = "") => {
  const multiplier = 1.3
  const gasEstimation = await client.simulate(signerAddress, messages, memo)
  return (0, calculateFee)(Math.round(gasEstimation * multiplier), gasPrice)
}

export const sign = async (txMsg: Object) => {

  window.keplr.defaultOptions = {
    sign: {
        preferNoSetFee: true,
    }
  }

  const myRegistry = new Registry([
      ...defaultRegistryTypes
  ]);
  
  try {
      const chainId = CHAIN_ID

      const offlineSigner = window.getOfflineSigner(chainId)

      const rpcEndpoint = RPC_ADDRESS
      const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner, {
          registry: myRegistry,
      });

      const account = (await offlineSigner.getAccounts())[0];

      const fee = await estimateFee(
        client,
        GasPrice.fromString(GAS_PRICE+GAS_PRICE_DENOM),
        account.address, 
        txMsg.msgAny, 
        txMsg.memo
      )

      const result = await client.signAndBroadcast(
          account.address,
          txMsg.msgAny,
          fee,
          txMsg.memo,
      );
      
      assertIsDeliverTxSuccess(result)
      return [ true, result ]
      
  } catch (e: any){
    return [ false, e ]
  }
}