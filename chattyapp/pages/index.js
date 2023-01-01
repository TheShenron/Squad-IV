import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

import React from 'react';
import Login from '../src/components/Login';
import Signup from '../src/components/Signup';

function home(props) {




    return (
        <Flex justifyContent='center' alignItems='center' flexDirection={'column'}>


            <Box w={['95%', '60%', '50%', '35%']}>

                <Text
                    fontSize={['2xl']}
                    fontWeight='500'
                    textAlign='center'
                    my={['30px']}
                    border='1px'
                    borderColor='gray.100'
                    borderRadius='3px'
                    p={['10px']}
                >Chat-App
                </Text>

                <Tabs align='end' variant='enclosed'>
                    <TabList>
                        <Tab>Login</Tab>
                        <Tab>SignUp</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p='0'>
                            <Login />
                        </TabPanel>
                        <TabPanel p='0'>
                            <Signup/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </Flex>
    );
}

export default home;