import ProviderContainer from '@/context/provider-context'
import UserContainer from '@/context/user-context'
import { ethers } from 'ethers'
import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { AccountAbi } from '@/global/contract/account-abi'
import { Erc20Abi } from '@/global/contract/erc20-abi'

const Home = () => {
  // user profile
  const { profile, sendTransaction } = UserContainer.useContainer()

  // balance
  const [balance, setBalance] = useState('-')
  const { provider } = ProviderContainer.useContainer()
  useEffect(() => {
    if (!profile.address) return
    provider.getBalance(profile.address).then(res => setBalance(ethers.formatEther(res)))


  }, [profile.address])


  // send transaction
  const [form, setForm] = useState({
    to: '',
    amount: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const transfer = async () => {
    const AccountInterface = new ethers.Interface(AccountAbi)
    const wrapTransferCallData = AccountInterface.encodeFunctionData('execute', [form.to,  ethers.parseEther(form.amount), '0x'])

    const userOperation = {
      nonce: '0x0',
      initCode: '',
      callData: wrapTransferCallData,
      callGasLimit: '0x0',
      verificationGasLimit: '0x0',
      preVerificationGas: '0x0',
      maxFeePerGas: '0x0',
      maxPriorityFeePerGas: '0x0',
      paymasterAndData: '0x0',
      signature: '0x0',
    }

    await sendTransaction(userOperation)
  }

  // ERC20
  const [erc20Balance, setErc20Balance] = useState('-')
  useEffect(() => {
    if (!profile.address) return

    getErc20Balance()
    async function getErc20Balance () {
      const erc20Contract = new ethers.Contract('0x0bA3a7DCd19731F50C0081d17e7Ad48006A480b5', Erc20Abi, provider)
      const decimals = await erc20Contract.decimals()
      erc20Contract.balanceOf(profile.address).then(res => setErc20Balance(ethers.formatUnits(res, decimals)))
    }

  }, [profile.address])
  const mint = async () => {
    const AccountInterface = new ethers.Interface(AccountAbi)
    const erc20Contract = new ethers.Contract('0x0bA3a7DCd19731F50C0081d17e7Ad48006A480b5', Erc20Abi, provider)

    const rawTransferCallData = erc20Contract.interface.encodeFunctionData('mint')
    const wrapTransferCallData = AccountInterface.encodeFunctionData('execute', ['0x0bA3a7DCd19731F50C0081d17e7Ad48006A480b5', '0', rawTransferCallData])

    const userOperation = {
      nonce: '0x0',
      initCode: '',
      callData: wrapTransferCallData,
      callGasLimit: '0x0',
      verificationGasLimit: '0x0',
      preVerificationGas: '0x0',
      maxFeePerGas: '0x0',
      maxPriorityFeePerGas: '0x0',
      paymasterAndData: '0x0',
      signature: '0x0',
    }

    await sendTransaction(userOperation)
  }

  return (
    <div className="px-10 py-5">
      <div className="flex items-center gap-4">
        <span>Wallet Address</span>
        <span className="font-bold text-lg text-primary">{ profile.address }</span>
      </div>

      <div className="flex gap-4">
        <span>Balance</span>
        <span className="font-bold text-lg text-primary">{ balance }</span>
      </div>

      <br />
      <br />
      <br />


      <div className="flex items-center gap-4">
        <span>Transfer To</span>
        <input name="to" type="text" className="p-2" onChange={handleChange} />
      </div>

      <br />

      <div className="flex items-center gap-4">
        <span>Transfer Amount</span>
        <input name="amount" type="text" className="p-2" onChange={handleChange} />
      </div>

      <br />

      <Button variant="contained" size="large" onClick={transfer}>Send</Button>

      <br />
      <br />

      <hr />

      <br />
      <br />

      <div className="flex items-center gap-4">
        <span>ERC20 Contract</span>
        <span className="font-bold text-lg text-primary">0x0bA3a7DCd19731F50C0081d17e7Ad48006A480b5</span>
      </div>

      <div className="flex items-center gap-4">
        <span>Balance</span>
        <span className="font-bold text-lg text-primary">{erc20Balance}</span>
      </div>

      <br />

      <Button variant="contained" size="large" onClick={mint}>Mint</Button>
    </div>
  )
}

export default Home
