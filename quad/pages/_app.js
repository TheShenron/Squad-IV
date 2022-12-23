import '../styles/styles.css'
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "../Context/ChatProvider";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </ChakraProvider>

  )
}
