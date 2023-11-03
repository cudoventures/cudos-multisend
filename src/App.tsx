//@ts-nocheck
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { CssBaseline, Container } from '@mui/material'
import { Routes, Route, useLocation } from 'react-router-dom'

import Layout from './components/Layout'
import RequireKeplr from './components/RequireKeplr/RequireKeplr'
import ConnectWallet from './containers/ConnectWallet/ConnectWallet'
import Welcome from './containers/Welcome'
import Multisend from './containers/Multisend'
import theme from './theme'
import { RootState } from './store'
import { useCallback, useEffect } from 'react'
import { ConnectLedger } from './ledgers/KeplrLedger'

import '@fontsource/poppins'
import { updateUser } from './store/profile'
import { GetAccountBalance } from './utils/apiMethods'

const App = () => {

  const dispatch = useDispatch()

  const connectAccount = useCallback(async () => {
    try {
      const { address } = await ConnectLedger()
      const { accountBalance } = await GetAccountBalance(address)
      dispatch(updateUser({ address, balance: accountBalance }))
    } catch (e) {
      throw new Error("Failed to connect!");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", async () => {
      connectAccount();
    });
  }, [connectAccount]);
  
  const location = useLocation()
  const themeColor = useSelector((state: RootState) => state.settings.theme)

  return (
    <Container maxWidth='xl' style={{display: 'contents', height: '100vh', width: '100vw', overflow: 'auto'}}>
      <ThemeProvider theme={theme[themeColor]}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ConnectWallet />} />
        </Routes>
        {location.pathname !== '/' && (
          <Layout>
            <Routes>
              <Route element={<RequireKeplr />}>
                <Route path="welcome">
                  <Route index element={<Welcome />} />
                </Route>
                <Route path="multisend">
                  <Route index element={<Multisend />} />
                </Route>
              </Route>
            </Routes>
          </Layout>
        )}
      </ThemeProvider>
    </Container>
  )
}

export default App
