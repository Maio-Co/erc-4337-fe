import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { GetLoginCallback } from '@/service/api-request'
import UserContainer from '@/context/user-context'

const LoginCallback = () => {
  const navigate = useNavigate()
  const { setToken } = UserContainer.useContainer()

  const location = useLocation()
  const routerParams = new URLSearchParams(location.search)
  const code = routerParams.get('code')

  useEffect(() => {
    getCallback()
    async function getCallback () {
      if (!code) return

      const { isError, value } = await GetLoginCallback({ code })
      if (!isError) setToken(value.jwt)
      navigate('/')
    }
  }, [code])

  return (
    <div className="flex">
      <div className="mx-auto pt-20 text-4xl font-bold">Logging...</div>

    </div>
  )
}

export default LoginCallback
