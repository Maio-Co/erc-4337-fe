import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import UserContainer from '@/context/user-context'

const Header = () => {
  const { profile } = UserContainer.useContainer()

  return (
    <header className="fixed w-full h-[56px] top-0 px-3 py-4 select-none z-50 border-b-2 border-[#4c4c4c] bg-[#1d1e25] text-white">
      <section className="m-auto w-full max-w-screen-xl flex items-center">
        <div className="text-xl font-bold">ERC-4337</div>
        { profile.name &&
          <div className="ml-auto px-4 py-1 bg-primary rounded text-text font-bold">
            { profile.name }
          </div>
        }
        { !profile.name &&
          <Button variant="contained" className="!ml-auto">
            <Link to="/login">Login</Link>
          </Button>
        }
      </section>
    </header>
  )
}

export default Header
