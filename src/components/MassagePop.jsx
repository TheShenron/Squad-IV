import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Badge, Box, Button, Flex, Icon, useDisclosure } from '@chakra-ui/react';

import React, { useRef } from 'react';

import { FcSms } from 'react-icons/fc'
import { useSelector, useDispatch} from 'react-redux'
import { getSender } from '../../config/getSender'
import { chatIndex , setNotification } from '../redux/authReducer/action'

function retInd (chats , notf){
   
    let ind = -1
    for(let x = 0 ; x < chats.length ; x++){
        
        if(chats[x]._id === notf.chat._id){  
           
            ind = x
            break;
        }
    }

    return ind

}


function MassagePop(props) {

    const dispatch = useDispatch()

    const { user , massages , currentChatInd ,  notification } = useSelector(state => state.AuthReducer)
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    return (
        <>

            <Flex alignItems={'center'}>
                <Badge position={'relative'} bottom='10px' left={'10px'} colorScheme='red'>{notification.length}</Badge>
                <Icon as={FcSms} onClick={onOpen} fontSize='25px' cursor='pointer' />
            </Flex>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Notification:-
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {notification.length == 0 ? "No New Notification" : (
                                notification.map((notiff, ind) => {
                                    
                                    return <Box cursor='pointer' key={ind+"MSG"} onClick={() => {
                                        let newInd = retInd(massages , notiff)
                                        dispatch(chatIndex(newInd))
                                        notification.splice(ind,1)
                                        dispatch(setNotification(notification))
                                        onClose()
                                    }}>
                                        {notiff.chat.isGroupChat ? `New Message from ${notiff.chat.chatName}` :
                                            `New Message from ${getSender(user, notiff.chat.users).name}`}
                                    </Box>
                                })
                            )}

                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default MassagePop;