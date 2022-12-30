import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

function Messages({ pic , msg , align}) {

    return (
        <Flex justifyContent={'flex-' + align} w='100%'>
            {align === 'start' ? (
                <Flex alignItems={'center'} my='1px' gap='10px' p={'10px'} border='1px' borderColor={'gray.100'} w='48%' borderRadius={'0 10px 10px 0'}>
                    <Avatar size={'sm'} src={pic} bg='gray.100' />
                    {msg}
                </Flex>
            ) : (
                <Flex alignItems={'center'} my='1px' justifyContent='end' gap='10px' p={'10px'} border='1px' borderColor={'gray.100'} w='48%' borderRadius={'10px 0  0 10px'}>
                    {msg}
                    <Avatar size={'sm'} src={pic} bg='gray.100' />
                </Flex>
            )
            }
        </Flex>
    );
}

export default Messages;