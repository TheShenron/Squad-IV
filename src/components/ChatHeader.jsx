import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import Drower from './Drower';
import MassagePop from './MassagePop';
import UserAvatar from './UserAvatar';

function ChatHeader(props) {
    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='2' border={'1px'} px={['10px']} py={['5px']} borderColor='gray.100'>

                <Box>
                    <Drower />
                </Box>
                <Spacer />
                <Box p='2'>
                    <Heading size='md' fontWeight={'400'}>Chatty-App</Heading>
                </Box>
                <Spacer />
                <Flex alignItems={'center'} gap={['15px']} p='2'>
                    <MassagePop />
                    <UserAvatar />
                </Flex>

            </Flex>
        </>
    );
}

export default ChatHeader;
