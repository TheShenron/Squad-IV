import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Box, Flex, Spinner } from '@chakra-ui/react';
import ChatHeader from '../src/components/ChatHeader';
import ChatBody from '../src/components/ChatBody'
import { useDispatch, useSelector } from 'react-redux'
import { setMassages } from '../src/redux/authReducer/action'
import axios from 'axios';

function chat(props) {

    const dispatch = useDispatch()

    const router = useRouter()

    const { user } = useSelector(state => state.AuthReducer)

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (!user) {
            router.push('/')
        }

        setLoading(true)

        try {
            const config = {
                headers: {
                    'authorization': `Bearer ${user.token}`
                }
            }

            if (!user) {
                return
            }

            axios.get('https://quadapi.onrender.com/api/chat', config)
                .then(({ data }) => {
                    dispatch(setMassages(data))
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })

        } catch (error) {
            console.log(error)
            setLoading(false)
        }


    }, [])

    return (
        <Box>
            {loading && (
                <Flex
                    justifyContent={'center'}
                    alignItems='center'
                    height={'100vh'}
                    width='100vw'
                    bg='rgba(0,0,0,.5)'
                    position={'absolute'}
                    top='0'
                    zIndex={1}
                >
                    <Spinner
                        thickness='1px'
                        speed='0.45s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Flex>
            )}

            {!loading && (
                <>
                    <ChatHeader />
                    <ChatBody />
                </>
            )}
        </Box>
    );
}

export default chat;