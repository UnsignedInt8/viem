import { expect, test } from 'vitest'
import type { TransactionReceipt } from '~viem/types/transaction.js'
import { getL2HashFromPriorityOp } from '~viem/zksync/utils/bridge/getL2HashFromPriorityOp.js'

const receipt: TransactionReceipt = {
  transactionHash:
    '0x6c3aeae96e8c012362b93e67f9cfddb28a51f4cb48c0e34fdd58357a6e69327e',
  transactionIndex: 0,
  blockHash:
    '0x52fbb8532d0d219ee53f74d548a56cc531c8ebcd02e6578ec41f86af6416abb4',
  blockNumber: 47023n,
  cumulativeGasUsed: 179414n,
  gasUsed: 179414n,
  effectiveGasPrice: 1500000001n,
  from: '0x36615cf349d7f6344891b1e7ca7c72883f5dc049',
  to: '0x43020e6e11cef7dce8e37baa09d9a996ac722057',
  contractAddress: null,
  logs: [
    {
      address: '0x7f6879032310d4e5174d3012474338ae9cacee73',
      topics: [
        '0x249bc8a55d0c4a0034b9aaa6be739bec2d4466e5d859bec9566a8553c405c838',
        '0x000000000000000000000000000000000000000000000000000000000000010e',
        '0x00000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc049',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000dbfd8ab00400',
      blockHash:
        '0x52fbb8532d0d219ee53f74d548a56cc531c8ebcd02e6578ec41f86af6416abb4',
      blockNumber: 47023n,
      transactionHash:
        '0x6c3aeae96e8c012362b93e67f9cfddb28a51f4cb48c0e34fdd58357a6e69327e',
      transactionIndex: 0,
      logIndex: 0,
      removed: false,
    },
    {
      address: '0x14b947814912c71bdbc3275c143a065d2ecafaba',
      topics: [
        '0x4531cd5795773d7101c17bdeb9f5ab7f47d7056017506f937083be5d6e77a382',
      ],
      data: '0x000000000000000000000000000000000000000000000000000000000000002018509644075c198320cce3589a34eeb513ca6f053235788117192b391b1e39f2000000000000000000000000000000000000000000000000000000006769fa5f00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000003a000000000000000000000000000000000000000000000000000000000000000ff00000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc04900000000000000000000000043020e6e11cef7dce8e37baa09d9a996ac72205700000000000000000000000000000000000000000000000000000000000dbba00000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000001004ccb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000001a13b86000000000000000000000000000000000000000000000000000000dbfd8ab0040000000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc049000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000260000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockHash:
        '0x644a83cedf7b27650d86da3282bf69ed94d725f62aca24f6830b38969efa4342',
      blockNumber: 53492n,
      transactionHash:
        '0xace84d78b639ed62045d9af32137a60b0eeaa4e22cd7e22818c3d0ae92c15282',
      transactionIndex: 0,
      logIndex: 1,
      removed: false,
    },
  ],
  logsBloom:
    '0x00000004040000000000000000000020000000000000000000000000000000000000000000000000000080000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000400000010000000000800000000000000000000000000000000000000000000000000000200000000000000000000000000080000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000010000000000080020010000000000000000080000000',
  status: 'success',
  type: 'eip1559',
}

test('default', async () => {
  expect(
    getL2HashFromPriorityOp(
      receipt,
      '0x14b947814912c71bdbc3275c143a065d2ecafaba',
    ),
  ).toBeDefined()
})

test('errors: transaction has not found in logs', async () => {
  const { ...truncatedReceipt } = receipt
  truncatedReceipt.logs = []
  expect(() =>
    getL2HashFromPriorityOp(
      truncatedReceipt,
      '0x14b947814912c71bdbc3275c143a065d2ecafaba',
    ),
  ).toThrowErrorMatchingInlineSnapshot(`
      [TxHashNotFoundInLogsError: The transaction hash not found in event logs.

      Version: viem@x.y.z]
  `)
})
