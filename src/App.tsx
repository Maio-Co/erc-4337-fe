import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import UserContainer from '@/context/user-context'
import ProviderContainer from '@/context/provider-context'
import { theme } from './styles/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserContainer.Provider>
        <ProviderContainer.Provider>
          <Router />
        </ProviderContainer.Provider>
      </UserContainer.Provider>
    </ThemeProvider>
  )
}

export default App
