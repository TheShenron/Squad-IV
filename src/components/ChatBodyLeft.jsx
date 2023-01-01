import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import GroupChat from './GroupChat';
import { useSelector, useDispatch } from 'react-redux'
import { getSender } from '../../config/getSender';
import { chatIndex } from '../redux/authReducer/action'




export function UserChat({ user, chat, ind, HandleGetChat, selectedChat }) {


    const { name, pic } = chat.isGroupChat ? { name: chat.chatName, pic: "" } : getSender(user, chat.users)

    return (
        <Flex
            cursor={'pointer'}
            _hover={{ backgroundColor: 'gray.100' }}
            border={'1px'}
            borderColor={selectedChat === ind ? 'gray.400' : 'gray.100'}
            flexDirection={'row'}
            gap='15px'
            px={['10px']}
            py={['5px']}
            borderRadius='5px'
            onClick={() => { HandleGetChat(chat, ind) }}
        >
            <Avatar src={pic} bg='gray.100' />
            <Box>
                <Text fontSize={'lg'}>{name}</Text>
                <Text fontSize={'xs'}><b> {name}</b> {`: ${chat.latestMassage ? chat.latestMassage.content : "Start chat"}`  }</Text>
            </Box>
        </Flex>
    )
}


function ChatBodyLeft(props) {

    const dispatch = useDispatch()

    const { user, massages, currentChatInd } = useSelector(state => state.AuthReducer)

    const HandleGetChat = (_, ind) => {
        dispatch(chatIndex(ind))
    }

    return (
        <Flex
            display={['none', 'none', 'flex', 'flex']}
            w={['70%', '60%', '40%', '30%']}
            border='1px'
            h={'100%'}
            maxH={'91vh'}
            borderColor='gray.100'
            flexDirection={'column'}
            p={['15px']}>

            <Flex justifyContent={'space-between'} w={'100%'} mt={['10px']} mb={['20px']} >
                <Text fontSize={'xl'} display={['none', 'block']}>My Chats</Text>
                <GroupChat />
            </Flex>

            <div style={{ overflowY: "scroll", height: "100%" }}>
                <Flex flexDirection={'column'} gap='10px'>

                    {massages && massages.map((el, ind) => {
                        return <UserChat
                            key={ind + "CT"}
                            user={user}
                            chat={el}
                            ind={ind}
                            HandleGetChat={(a, b) => HandleGetChat(a, b)}
                            selectedChat={currentChatInd}
                        />
                    })}

                </Flex>
            </div>
        </Flex >
    );
}

export default ChatBodyLeft;