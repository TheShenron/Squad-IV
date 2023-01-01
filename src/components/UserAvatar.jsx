import { Avatar, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';

import React from 'react';
import { useSelector } from 'react-redux'

function UserAvatar(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user: { email, name, pic } } = useSelector(state => state.AuthReducer)

    return (
        < >
            <Avatar src={pic === undefined ? '' : pic} bg='gray.200' size={'sm'} onClick={onOpen} cursor='pointer' />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>My Info:</ModalHeader>
                    <ModalCloseButton />

                    {email && (
                        <>
                            <ModalBody>
                                <Flex flexDirection={'column'} justifyContent='center' alignItems={'center'} gap='10px' pb='20px'>
                                    <Avatar src={pic} size={'xl'} bg='gray.100' />
                                    <Text> <b>Name:</b> {name} </Text>
                                    <Text> <b>Email:</b> {email} </Text>
                                </Flex>
                            </ModalBody>
                        </>
                    )}

                    {/* <ModalFooter>
                        <Button colorScheme={'messenger'}>Create</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserAvatar;