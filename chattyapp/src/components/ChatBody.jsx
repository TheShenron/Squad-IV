import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChatBodyLeft from './ChatBodyLeft';
import ChatBodyRight from './ChatBodyRight';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useRouter } from 'next/router'

function ChatBody(props) {

    const dispatch = useDispatch()

    const route = useRouter()

    const { user } = useSelector(state => state.AuthReducer)

    return (
        <Flex w={'100%'} h={['92vh']}>

            <ChatBodyLeft />
            <ChatBodyRight />
        </Flex>
    );
}

export default ChatBody;