import GoogleIcon from '@/assets/images/provider/google.png'
import { isDevelopmentMode } from '@/utils'

const StageGoogle = 'https://accounts.google.com/signin/oauth?client_id=824407725480-evnkf5pi6mc3ub5jfjcvcnbbnonobguh.apps.googleusercontent.com&redirect_uri=https://oauth.api.maio.co/callback&scope=profile+email&response_type=code&state=P2NsaWVudF9pZD01MDI5MmM4ZTdlZTRiMmYyZjU1NCZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHBzOi8vNDMzNy5hcGkubWFpby5jby9sb2dpbi1jYWxsYmFjayZzY29wZT1yZWFkJnN0YXRlPWNhc2Rvb3ImYXBwbGljYXRpb249YXBwbGljYXRpb25fdWpyeXc4JnByb3ZpZGVyPXByb3ZpZGVyXzdzendiZyZtZXRob2Q9c2lnbnVw'
const DevGoogle = 'https://accounts.google.com/signin/oauth?client_id=824407725480-evnkf5pi6mc3ub5jfjcvcnbbnonobguh.apps.googleusercontent.com&redirect_uri=https://oauth.api.maio.co/callback&scope=profile+email&response_type=code&state=P2NsaWVudF9pZD0yNjQwMWRjNjMyMjE2MTlkMDE2MiZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHA6Ly9sb2NhbGhvc3Q6OTAwMC9jYWxsYmFjayZzY29wZT1yZWFkJnN0YXRlPWNhc2Rvb3ImYXBwbGljYXRpb249YXBwbGljYXRpb25fdWk2aGljX2xvY2FsJnByb3ZpZGVyPXByb3ZpZGVyXzdzendiZyZtZXRob2Q9c2lnbnVw'
const googleUrl = isDevelopmentMode() ? DevGoogle : StageGoogle
const Login = () => {

  const providers = [
    {
      id: 'google',
      iconUrl: GoogleIcon,
      href: googleUrl,
    }
  ]

  return (
    <div>
      <article className="mt-14 mx-auto p-4 w-80 bg-gray-1 rounded-xl">
        <div className="mb-4 text-white text-center font-bold text-2xl">LOGIN</div>
        <div className="mb-4 text-gray-border">Providers :</div>
        <div className="mb-2 flex items-center flex-wrap gap-4">
          {providers.map(item =>
            <a href={item.href} key={item.id}>
              <img src={item.iconUrl} className="w-10 h-10 cursor-pointer" />
            </a>
          )}
        </div>
      </article>
    </div>
  )
}

export default Login
