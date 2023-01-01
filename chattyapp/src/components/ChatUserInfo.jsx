import { Avatar, Box, Button, Flex, Icon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { FcPortraitMode } from 'react-icons/fc'
import React from 'react';
import { useSelector , useDispatch } from 'react-redux'
import axios from 'axios';
import { setMassages } from '../redux/authReducer/action'


const ChatUser = ({ name, email, pic, you, admin }) => {

    return (
        <Flex gap={'15px'}>
            <Avatar src={pic} bg='gray.100' />
            <Box>
                <Text> <b>Name:</b> {name} {you && "(You)"} {admin && "(Admin)"} </Text>
                <Text fontSize={'xs'}> <b>Email:</b> {email} </Text>
            </Box>
        </Flex>
    )
}


function ChatUserInfo(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch()

    const { massages, currentChatInd, user } = useSelector(state => state.AuthReducer)
    const userList = massages[currentChatInd].users
    const isGroupChat = massages[currentChatInd].isGroupChat ?
        massages[currentChatInd].groupAdmin
        : false


    const HandleLeaveGroup = ()=>{


        try {
            
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }

            axios.put('https://quadapi.onrender.com/api/chat/groupremove', { 
                chatId : massages[currentChatInd]._id,
                userId: user._id
             }, config)
                .then(({ data }) => {
                    const newList = massages.filter((_,ind)=>{
                        return ind != currentChatInd
                    })
                    // console.log(data)
                    dispatch(setMassages(newList))
                    onClose()
                })
                .catch(err => {
                    console.log(err)
                   
                })



        } catch (error) {
            console.log(error)
        }
    }

    return (
        < >
            <Icon as={FcPortraitMode} onClick={onOpen} cursor='pointer' fontSize={'25px'} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Chat User Info:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex alignItems={'flex-start'} flexDirection='column' gap='10px' pb='20px'>

                            {
                                isGroupChat
                                &&
                                <Text> <b>Group Name:</b> {massages[currentChatInd].chatName}  </Text>
                            }

                            {userList?.map((el, ind) => {

                                if (isGroupChat) {

                                    if (el._id == isGroupChat._id) {
                                        return <ChatUser key={ind + "CR"} name={el.name} email={el.email} pic={el.pic} admin={true} />
                                    }
                                    return <ChatUser key={ind + "CR"} name={el.name} email={el.email} pic={el.pic} admin={false}/>

                                } else {
                                    if (el._id == user._id) {
                                        return <ChatUser key={ind + "CR"} name={el.name} email={el.email} pic={el.pic} you={true} />
                                    }
                                    return <ChatUser key={ind + "CR"} name={el.name} email={el.email} pic={el.pic} you={false} />

                                }
                            })}

                            { isGroupChat && <Button size={'xs'} onClick={HandleLeaveGroup}>Leave Group</Button> }
                        </Flex>

                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme={'messenger'}>Create</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ChatUserInfo;