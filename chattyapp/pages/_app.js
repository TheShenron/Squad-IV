import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from '../src/redux/store'


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
