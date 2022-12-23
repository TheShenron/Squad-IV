import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) router.push("/chats");
  }, [router]);


  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          textAlign='center'
        >
          <Text fontSize="4xl">
            Masai Chat
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant='enclosed' >
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  )
}
