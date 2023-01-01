import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { FcPrevious } from 'react-icons/fc'
import GroupChat from './GroupChat';
import { UserChat } from './ChatBodyLeft';
import { useSelector , useDispatch } from 'react-redux'
import { chatIndex } from '../redux/authReducer/action'


function Previous(props) {

    const dispatch = useDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const { user, massages , currentChatInd } = useSelector(state => state.AuthReducer)

     const HandleGetChat = (_, ind) => {
        dispatch(chatIndex(ind))
        onClose()
    }


    return (
        
        <>
            <Icon as={FcPrevious} fontSize='20px' cursor={'pointer'} display={['block', 'block', 'none', 'none']} onClick={onOpen} />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Text fontSize={'xl'} display={['none', 'block']}>Chats</Text>

                    </DrawerHeader>

                    <DrawerBody>
                        <Flex
                            display={'flex'}
                            w='100%'
                            h={'100%'}
                            maxH={'91vh'}
                            borderColor='gray.100'
                            flexDirection={'column'}
                        >

                            <Flex flexDirection={'column'} gap='10px' mt={['10px']} mb={['20px']} >
                                <GroupChat />
                            </Flex>

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

                        </Flex>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>

        </>
    );
}

export default Previous;