import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/authReducer/action'


function Signup(props) {

    const router = useRouter()

    const [isSubmited, setIsSubmited] = useState(false)

    const file = useRef()

    const toast = useToast()

    const [user, setUser] = useState({ email: '', password: '', name: '' })

    const [loding, setLoding] = useState(false)

    const dispatch = useDispatch()


    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const HandleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const HandleAvatar = (val) => {

        if (val === 'avatar') {
            file.current.click()
        } else {
            setLoding(true)
            const img = val.target.files[0]
            if (img === undefined) {
                toast({
                    title: 'Image not found',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
                setLoding(false)
                return
            }

            const data = new FormData()
            data.append('file', img)
            data.append('upload_preset', 'chatapp')
            data.append('cloud_name', 'shenron')
            fetch('https://api.cloudinary.com/v1_1/shenron/image/upload', {
                method: 'post',
                body: data
            })
            .then((d) => {
                return d.json()
            })
            .then((a)=>{
                setUser({...user , pic : a.url})
                setLoding(false)
            })
            .catch((err) => {
                toast({
                    title: 'Image upload failed',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
                setLoding(false)
            })

        }
    }


    const HandleSubmit = (event) => {
        setLoding(true)
        if (user.email == "" || user.password == "") {
            setIsSubmited(true)
            setLoding(false)
            return
        }

        try {
            axios.post('http://localhost:8080/api/user/register', user )
            .then(({data})=>{
                setLoding(false)
                localStorage.setItem('userInfo' , JSON.stringify(data))
                dispatch(loginSuccess(data))
                toast({
                    title: 'User successfully register',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                router.push('/chat')
            })
            .catch(err=>{
                console.log(err)
                setLoding(false)
                toast({
                    title: 'Error while creating user / post',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })

        } catch (error) {
            console.log("Error while uploading user details")
            toast({
                title: 'Error while creating user',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }

    }


    useEffect(()=>{
        
        const dataFound = localStorage.getItem('userInfo')
        if(dataFound){
            dispatch(loginSuccess(JSON.parse(dataFound)))
            router.push('/chat')
        }

    } , [])


    return (
        <Flex w={['100%']} p={['20px']} flexDirection={'column'} gap={['20px']} border='1px' borderColor={'gray.100'}>

            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder='name' name='name' value={user.name} onChange={(e) => { HandleUser(e) }} />
            </FormControl>

            <FormControl isRequired isInvalid={user.email == "" && isSubmited ? true : false}>
                <FormLabel>Email</FormLabel>
                <Input placeholder='email adderss' name='email' value={user.email} onChange={(e) => { HandleUser(e) }} />
                <FormErrorMessage>Email is required</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={user.password == "" && isSubmited ? true : false}>
                <FormLabel>Password</FormLabel>

                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        name='password'
                        value={user.password}
                        onChange={(e) => { HandleUser(e) }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>Password is required</FormErrorMessage>

            </FormControl>

            <Flex gap={['10px']} alignItems='center' justifyContent={'end'}>
                <Text textDecoration={'underline'}>Avatar</Text>
                <Flex >
                    <Avatar onClick={() => { HandleAvatar('avatar') }} name='' src='' bg='gray.200' />
                    <Input display={'none'} type={'file'} ref={file} onChange={(e) => { HandleAvatar(e) }} accept="image/png, image/jpeg" />
                </Flex>
            </Flex>


            <Stack spacing={3} direction='row' align='center'>
                <Button colorScheme='blue' size='sm' onClick={HandleSubmit} isLoading={loding}>
                    Signup
                </Button>
            </Stack>

        </Flex>
    );
}

export default Signup;