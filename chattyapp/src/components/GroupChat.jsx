import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Flex, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { FcNext } from 'react-icons/fc'
import { FiX } from 'react-icons/fi'
import { useSelector , useDispatch} from 'react-redux'
import axios from 'axios';
import { setMassages } from '../redux/authReducer/action'

function UserList({ name, email, pic, HandleSelect }) {
    return (
        <Flex alignItems={'center'} gap='10px' border={'1px'} px='5px' borderColor={'gray.100'} onClick={HandleSelect} cursor='pointer'>
            <Avatar src={pic} bg='gray.100' size={'sm'} />
            <Box>
                <Text fontSize={'sm'}> {name} </Text>
                <Text fontSize={'xs'}> {email} </Text>
            </Box>

        </Flex>
    )
}

function FinalUser({ name, UpdateFinalList }) {
    return (
        <Flex alignItems={'center'} gap='2px'>
            <Text fontSize={'sm'}> {name} </Text>
            <Icon as={FiX} position='relative' top='2px' onClick={UpdateFinalList} cursor='pointer' />

        </Flex>
    )
}



function GroupChat(props) {

    const toast = useToast()
    const dispatch = useDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState('')
    const [searchUser, setSearchUser] = useState('')
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedList, setSelectedList] = useState([])

    const { user , massages } = useSelector(state => state.AuthReducer)

    const HandleSearchUser = () => {
        setSearchUser(event.target.value)

        if (event.target.value === '') {
            setUserList([])
            return
        }
        setLoading(true)
        try {

            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }

            axios.get('https://quadapi.onrender.com/api/user?search=' + event.target.value, config)

                .then(d => {
                    setUserList(d.data)
                    setLoading(false)


                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })


        } catch (error) {
            console.log(error)
        }
    }


    const HandleSelect = (id, name) => {

        for (let x = 0; x < selectedList.length; x++) {
            if (selectedList[x].id === id) {
                setLoading(false)
                setUserList([])
                setSearchUser('')
                return
            }
        }

        setSelectedList([...selectedList, { id, name }])
        setUserList([])
        setSearchUser('')
    }


    const UpdateFinalList = (index) => {
        const newList = selectedList.filter((_, ind) => {
            return ind != index
        })
        setSelectedList(newList)
    }

    const CreateGroupChat = () => {

        if (selectedList.length === 0 || !name) {
            toast({
                title: 'Fill all the fields',
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
            return
        }

        try {

            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const usersId = selectedList.map((el) => {
                return el.id
            })

            axios.post('https://quadapi.onrender.com/api/chat/group', {
                name,
                users: JSON.stringify(usersId)
            }, config)

                .then(({data}) => {
                    dispatch(setMassages([data , ...massages]))
                    setLoading(false)
                    onClose()

                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })


        } catch (error) {
            console.log(error)
        }


    }


    return (
        <>
            <Flex gap={'5px'} alignItems='center' px='5px' border={'1px'} cursor='pointer' borderColor={'gray.100'} onClick={onOpen} >New Group Chat <Icon as={FcNext} /> </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel> Name:</FormLabel>
                        <Input type={'text'} placeholder='Enter Group Name' value={name} onChange={(e) => { setName(e.target.value) }} />

                        <FormLabel mt='10px'>Add Member:</FormLabel>
                        <Input type={'text'} placeholder='Type name...' value={searchUser} onChange={HandleSearchUser} />


                        <Flex mt='15px' gap={'10px'} flexWrap={'wrap'}>
                            {selectedList.length > 0 && (
                                selectedList.map(({ name }, ind) => {
                                    return <FinalUser key={ind + "ASDF"} name={name} UpdateFinalList={() => UpdateFinalList(ind)} />
                                })

                            )}
                        </Flex>

                        <Flex mt='15px' gap={'10px'} flexWrap={'wrap'}>

                            {loading ? 'Loading' : (
                                userList.map(({ name, email, pic, _id }, ind) => {
                                    return <UserList key={ind + "CUS"} name={name} email={email} pic={pic} HandleSelect={() => HandleSelect(_id, name)} />
                                })
                            )}

                        </Flex>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={'messenger'} onClick={CreateGroupChat}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}

export default GroupChat;