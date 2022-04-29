// @ts-nocheck
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { CssBaseline, Container } from '@mui/material'
import { Routes, Route, useLocation } from 'react-router-dom'

import Layout from './components/Layout'
import Footer from './components/Layout/Footer'
import RequireKeplr from './components/RequireKeplr/RequireKeplr'
import ConnectWallet from './containers/ConnectWallet/ConnectWallet'
import Welcome from './containers/Welcome'
import Multisend from './containers/Multisend'
import Settings from './containers/Settings'
import theme from './theme'
import { RootState } from './store'

import '@fontsource/poppins'

const App = () => {
  const location = useLocation()
  const themeColor = useSelector((state: RootState) => state.settings.theme)

  return (
    <Container maxWidth='xl' style={{height: '100vh', overflow: 'scroll'}}>
      <ThemeProvider theme={theme[themeColor]}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ConnectWallet />} />
        </Routes>
        {location.pathname === '/' ? null : (
          <Layout>
            <Routes>
              <Route element={<RequireKeplr />}>
                <Route path="welcome">
                  <Route index element={<Welcome />} />
                </Route>
                <Route path="multisend">
                  <Route index element={<Multisend />} />
                </Route>
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
            {/* <Footer /> */}
          </Layout>
        )}
      </ThemeProvider>
    </Container>
  )
}

export default App
