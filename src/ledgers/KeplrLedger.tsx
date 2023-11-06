
//@ts-nocheck
/* eslint-disable import/prefer-default-export */
import {
  API_ADDRESS,
  RPC_ADDRESS,
  CHAIN_NAME,
  CHAIN_ID,
  GAS_PRICE,
  GAS_PRICE_DENOM,
  STAKING_URL
} from '../utils/constants'
import { DEFAULT_GAS_MULTIPLIER, KeplrWallet, estimateFee as cudosJsEstimateFee } from 'cudosjs';
import { MsgMultiSend, MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"
import { assertIsDeliverTxSuccess, SigningStargateClient, defaultRegistryTypes } from "@cosmjs/stargate"
import { EncodeObject, Registry } from "@cosmjs/proto-signing"
import { coins } from "@cosmjs/amino"
import { Uint53 } from "@cosmjs/math"
import { GasPrice } from '@cosmjs/launchpad'
import BigNumber from 'bignumber.js'
import { SeparateFractions, SeparateDecimals } from '../utils/regexFormatting'
import { CudosSigningStargateClient } from 'cudosjs/build/stargate/cudos-signingstargateclient';
import { CudosStargateClient } from 'cudosjs/build/stargate/cudos-stargateclient';
declare global {
  interface Window {
    keplr: any
    getOfflineSigner: any
    getOfflineSignerOnlyAmino: any
    meta: any
  }
}

let keplrWallet: KeplrWallet | null = null;

export const DisconnectLedger = () => {
    keplrWallet?.disconnect();
}

export const ConnectLedger = async () => {
  if (keplrWallet === null) {
    keplrWallet = new KeplrWallet({
        CHAIN_ID: CHAIN_ID,
        CHAIN_NAME: CHAIN_NAME,
        RPC: RPC_ADDRESS,
        API: API_ADDRESS,
        STAKING: STAKING_URL,
        GAS_PRICE: GAS_PRICE,
    });

    await keplrWallet.connect();
  }

  return { address: keplrWallet.accountAddress };
}

export const getClient = async (options?: SigningStargateClientOptions): Promise < CudosStargateClient > => {
  return CudosStargateClient.connect(RPC_ADDRESS, options);
}

export const getSigningClient = async (options?: SigningStargateClientOptions): Promise < CudosSigningStargateClient > => {
  return CudosSigningStargateClient.connectWithSigner(RPC_ADDRESS, keplrWallet.offlineSigner, options);
}

export const getSimulatedMsgsCost = async (listOfRecipients: Array<{}>, address: string) => {
  const multiplier = listOfRecipients.length
  const singleSendMsg = getSingleSendMsg(listOfRecipients, address)
  const multiSendMsg = getTxMsg(listOfRecipients, address)

  const myRegistry = new Registry([
    ...defaultRegistryTypes
  ])

  const offlineSigner = keplrWallet.offlineSigner;

  const client = await getSigningClient({
    registry: myRegistry,
  });

  const account = (await offlineSigner.getAccounts())[0]

  const approxForSingleSend = await estimateFee(
    client,
    GasPrice.fromString(GAS_PRICE + GAS_PRICE_DENOM),
    account.address,
    singleSendMsg.msgAny,
    'simulated message'
  )

  const approxFeeForMultiSend = await estimateFee(
    client,
    GasPrice.fromString(GAS_PRICE + GAS_PRICE_DENOM),
    account.address,
    multiSendMsg.msgAny,
    'simulated message'
  )
  const singleCost = approxForSingleSend.amount[0] ? approxForSingleSend.amount[0].amount : '0'
  const multiCost = approxFeeForMultiSend.amount[0] ? approxFeeForMultiSend.amount[0].amount : '0'

  const tempSingleCost = new BigNumber(singleCost).multipliedBy(multiplier)
  const tempMultiCost = new BigNumber(multiCost)

  const approxCostForThisMultiSend = SeparateDecimals(SeparateFractions(tempMultiCost.valueOf()))
  let youAreSaving: string = ''
  if (tempSingleCost.isGreaterThan(tempMultiCost)) {
    youAreSaving = SeparateDecimals(SeparateFractions(tempSingleCost.minus(tempMultiCost).valueOf()))
  }

  return [approxCostForThisMultiSend, youAreSaving]
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
        amount: (amount * 10 ** 18).toLocaleString('fullwide', { useGrouping: false }),
        denom: "acudos",
      }],
    }),
  }]
  return { msgAny, memo: 'Sent with CUDOS MultiSend' }
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
            amount: (totalAmountDue * 10 ** 18).toLocaleString('fullwide', { useGrouping: false })
          }]
        }
      ],
      outputs: listOfRecipients.map((item) => ({
        address: item.recipient,
        coins: [{
          denom: "acudos",
          amount: (item.cudos * 10 ** 18).toLocaleString('fullwide', { useGrouping: false })
        }]
      })),
    }),
  }];

  return { msgAny, memo: 'Sent with CUDOS MultiSend' }
}

const calculateFee = (gasLimit: number, { denom, amount: gasPriceAmount }) => {
  const amount = Math.ceil(gasPriceAmount.multiply(new Uint53(gasLimit)).toFloatApproximation());
  return {
    amount: (0, coins)(amount.toString(), denom),
    gas: gasLimit.toString(),
  }
}

const estimateFee = async (client: SigningStargateClient, gasPrice: GasPrice, signerAddress: string, messages: readonly EncodeObject[], memo = "") => {
  return cudosJsEstimateFee(client, signerAddress, messages, gasPrice, DEFAULT_GAS_MULTIPLIER, memo);
  // const multiplier = 1.5
  // const gasEstimation = await client.simulate(signerAddress, messages, memo)
  // return (0, calculateFee)(Math.round(gasEstimation * multiplier), gasPrice)
}

export const sign = async (txMsg: Object) => {
  const myRegistry = new Registry([
    ...defaultRegistryTypes
  ]);

  try {
    const offlineSigner = keplrWallet.offlineSigner;

    const client = await getSigningClient({
      registry: myRegistry,
    });

    const account = (await offlineSigner.getAccounts())[0];

    const fee = await estimateFee(
      client,
      GasPrice.fromString(GAS_PRICE + GAS_PRICE_DENOM),
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
    return [true, result]

  } catch (e: any) {
    return [false, e]
  }
}
