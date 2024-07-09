import { ethers } from 'ethers'
import { createContainer } from 'unstated-next'

const provider = new ethers.JsonRpcProvider('https://rpc.4337.api.maio.co:8545/')

const useProvider = () => {
  return { provider }
}


const ProviderContainer = createContainer(useProvider)

export default ProviderContainer
