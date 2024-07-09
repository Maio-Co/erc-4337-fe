import { useEffect, useMemo, useState } from 'react'
import { createContainer } from 'unstated-next'
import { setAuth, GetUserProfile, GetWalletCheck, DeployWalletContract, SendUserOperation } from '@/service/api-request'

function parseJwt (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

function useUser() {
  useEffect(() => {
    const jwt = localStorage.getItem('jwt') || ''
    setToken(jwt)
  }, [])


  // token
  const [token, setToken] = useState('')

  const userPayload: UserPayload = useMemo(() => {
    if (!token) return { displayName: '' }

    localStorage.setItem('jwt', token)
    const decodedToken = parseJwt(token)
    return decodedToken
  }, [token])


  // profile
  const [profile, setProfile] = useState({ name: '', address: '' })

  useEffect(() => {
    if (!token) return

    getUser(token)
    async function getUser (token: string) {
      setAuth(token)
      const { isError, value } = await GetUserProfile()
      if (!isError) setProfile(value)
    }
  }, [token])

  // send useroperation
  const sendTransaction = async (userOperation: UserOperation) => {
    // 1. check
    const { isError: isErrorCheck, value } = await GetWalletCheck()
    if (isErrorCheck) return console.log('Check address error.')

    // 2. deploy
    if (!value.deployed) {
      const { isError: isErrorDeploy, value } = await DeployWalletContract()
      if (isErrorDeploy || !value.deployed) return console.log('Deploy contract failed.')
    }

    // 3. send Tx
    const { isError: isErrorSend } = await SendUserOperation(userOperation)
    if (isErrorSend) return console.log('Send Transaction error.')
  }

  return {
    profile,
    token,
    setToken,
    userPayload,
    sendTransaction,
  }
}

const UserContainer = createContainer(useUser)

export default UserContainer

