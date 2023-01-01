import { Box, Flex, FormControl, Input, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChatUserInfo from './ChatUserInfo';
import Messages from './Messages';
import Previous from './Previous';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { setChats , setNotification } from '../redux/authReducer/action'
import io from 'socket.io-client'

const socket = io('http://localhost:8080')
var selectedChatComp;

function ChatBodyRight(props) {

    const dispatch = useDispatch()

    const { user, currentChatInd, massages, chats , notification } = useSelector(state => state.AuthReducer)

    const [newMsg, setNewMsg] = useState('')

    const [loading, setLoading] = useState(false)

    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [socketConnected, setSocketConnected] = useState(false)


    useEffect(() => {
        socket.on('message-receved', (newRecevedMessage) => {

            // console.log(newRecevedMessage, "Msg receved")

            if (
                !selectedChatComp ||
                selectedChatComp._id !== newRecevedMessage.chat._id
            ) {
                //give notification
                if( !notification.includes(newRecevedMessage)){
                    dispatch( setNotification([newRecevedMessage , ...notification]) )
                }

            } else {
                dispatch(setChats([...chats, newRecevedMessage]))
            }
        })
    })

    const HandleGetMsg = (event) => {
        if (event.key == 'Enter' && newMsg) {

            socket.emit("stop-typing", (massages[currentChatInd]._id))

            try {

                const config = {
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${user.token}`
                    }
                }

                axios.post('http://localhost:8080/api/message', {
                    content: newMsg,
                    chatId: massages[currentChatInd]._id
                }, config)
                    .then(({ data }) => {
                        setNewMsg('')
                        chats.push(data)
                        socket.emit('new-message', data)
                    })
                    .catch(err => {
                        console.log(err)
                    })

            } catch (error) {
                console.log(error)
            }
        }
    }

    const HandleSetMsg = (e) => {
        setNewMsg(e.target.value)
    
        if (!socketConnected) return

        if (!typing) {
            setTyping(true)
            socket.emit('typing', massages[currentChatInd]._id)
        }

        let lastTypingTime = new Date().getTime()
        var timerLen = 2000;

        setTimeout(() => {
            var timeNow = new Date().getTime()
            var timeDiff = timeNow - lastTypingTime

            if (timeDiff >= timerLen && typing) {
                socket.emit('stop-typing', massages[currentChatInd]._id)
                setTyping(false)
            }

        }, timerLen)
        //typeing indincater


    }

    useEffect(() => {

        if (massages.length > 0) {

            setLoading(true)

            if (massages[currentChatInd] == undefined) return

            try {

                const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }

                axios.get('http://localhost:8080/api/message/' + massages[currentChatInd]._id, config)
                    .then(({ data }) => {
                        dispatch(setChats(data))
                        // console.log(data)
                        setLoading(false)
                        socket.emit('join-chat', massages[currentChatInd]._id)

                        selectedChatComp = massages[currentChatInd]
                    })
                    .catch(err => {
                        console.log(err)
                        setLoading(false)
                    })

            } catch (error) {
                console.log(error)
                setLoading(false)
            }

        }



    }, [currentChatInd])

    //socket io
    useEffect(() => {
        console.log("Socket")

        socket.emit("setup", user);
        socket.on('Connected', () => setSocketConnected(true))
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop-typing', () => setIsTyping(false))

        socket.on('connection', () => {
            console.log("connected to socket!")
        })


    }, [])

    return (
        <Box position={'relative'} w={['100%', '100%', '70%', '70%']} bg='white'>

            <Flex justifyContent={'space-between'} alignItems='center' borderBottom={'1px'} borderColor='gray.100' py='5px' px='10px'>
                <Previous />
                {currentChatInd >= 0 && <ChatUserInfo />}

            </Flex>


            {currentChatInd >= 0 && (
                <>

                    {loading ? (
                        <Flex h={'85%'} justifyContent={'center'} alignItems='center' p='10px'>
                            {loading && (
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl'

                                />
                            )}

                        </Flex>
                    ) : (
                        <Flex flexDirection={'column'} h={'85%'} justifyContent={'flex-end'} p='10px'>
                            <div style={{ overflowY: "scroll", height: "min-content" }}>
                                {/* <Messages align='start' />
                        <Messages align='end' />
                        <Messages align='start' /> */}

                                {chats.length > 0 && (
                                    chats.map(({ content, sender: { pic, _id } }, ind) => {
                                        if (user._id === _id) {
                                            return <Messages key={ind + "CTS"} pic={pic} msg={content} align='end' />
                                        }
                                        return <Messages key={ind + "CTS"} pic={pic} msg={content} align='start' />
                                    })
                                )}
                            </div>
                        </Flex>
                    )}


                    <Box position='absolute' bottom={'0'} w='100%' p='10px'>
                        <FormControl isRequired onKeyDown={HandleGetMsg}>
                            {isTyping ? "Typing..." : <></>}
                            <Input
                                placeholder="Send Message.."
                                size="md"
                                type="text"
                                value={newMsg}
                                onInput={(e) => HandleSetMsg(e)}
                            />
                        </FormControl>
                    </Box>
                </>
            )}

            {currentChatInd < 0 && (
                <Box textAlign={'center'} mt='100px'>
                    <Text fontSize={['sm', 'lg']}>Select anyone to start chat</Text>
                </Box>
            )}

        </Box>
    );
}

export default ChatBodyRight;