import { Avatar, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Input, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FcSearch } from 'react-icons/fc'
import Loading from './Loading';
import {  setMassages , chatIndex } from '../redux/authReducer/action'


const UserCard = ({ el, HandleCardUsers }) => {
    return (
        <Flex alignItems={'center'} gap='10px' p='5px 10px' my='5px' borderRadius={'5px'} border='1px' borderColor={'gray.100'} _hover={{ borderColor: 'gray' }} cursor="pointer" onClick={HandleCardUsers}>
            <Avatar size={'sm'} src={el.pic} />
            <Box>
                {el.name}
                <Text fontSize={'xs'}> <b>Email:</b> {el.email} </Text>
            </Box>
        </Flex>
    )
}



function Drower(props) {

    const dispatch = useDispatch()

    const { user , massages , currentChatInd } = useSelector(state => state.AuthReducer)


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const searchUser = useRef('')

    const [loading, setLoading] = useState(false)

    const [userList, setUserList] = useState([])

    const HandleOpen = () => {
        onOpen()
    }

    const HandleUser = () => {

        setLoading(true)

        if (event.target.value === '') {
            setUserList([])
            setLoading(false)
            return
        }

        try {

            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }

            axios.get('http://localhost:8080/api/user?search=' + event.target.value, config)

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


    const HandleCardUsers = (el) => {

        setLoading(true)

        try {

            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            }

            axios.post('http://localhost:8080/api/chat', { userId: el._id }, config)
                .then(({ data }) => {
                    const newData = [ ...massages , data]
                    for (let x = 0; x < massages.length; x++) {
                        if (massages[x]._id === data._id) {
                            onClose()
                            setLoading(false)
                            return
                        }
                    }
                    dispatch(setMassages(newData))
                    dispatch(chatIndex(newData.length - 1))
                    onClose()
                    setLoading(false)
                    setUserList([])
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


    return (
        <>
            <Flex
                alignItems={'center'}
                p={['5px 15px']}
                gap='8px'
                cursor={'pointer'}
                ref={btnRef}
                onClick={HandleOpen}>
                <Icon as={FcSearch} />
                Search
            </Flex>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader border='1px' borderColor='gray.100'>Search User</DrawerHeader>

                    <DrawerBody mt='10px'>
                        <Input placeholder='Type here...' ref={searchUser} onChange={HandleUser} />

                        <Flex flexDirection={'column'} mt='20px'>
                            {loading && <Loading />}
                            {userList.length > 0 && !loading && (
                                userList.map((el, ind) => {
                                    return <UserCard key={ind + "UD"} el={el} HandleCardUsers={() => HandleCardUsers(el)} />
                                })
                            )}
                        </Flex>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Drower;