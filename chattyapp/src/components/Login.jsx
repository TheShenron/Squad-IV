import React, { useEffect, useState } from 'react';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/authReducer/action'


function Login(props) {

    const router = useRouter()

    const [isSubmited , setIsSubmited] = useState(false)

    const [user, setUser] = useState({ email: '', password: '' })

    const [loding, setLoding] = useState(false)

    const toast = useToast()

    const dispatch = useDispatch()


    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const HandleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const HandleGuest = () => {
        setUser({
            ...user,
            email: "guest@gmail.com",
            password: "1234"
        })
    }


    const HandleSubmit = (event)=>{
       
        if( user.email == "" || user.password == ""){
            setIsSubmited(true)
            return
        } 

        setLoding(true)

        try {
            axios.post('http://localhost:8080/api/user/login' , user)
            .then(({data})=>{
                setLoding(false)
                localStorage.setItem('userInfo' , JSON.stringify(data))
                dispatch(loginSuccess(data))
                toast({
                    title: 'Login successfully',
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
                    title: 'incorrect email or password',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })

        } catch (error) {
            console.log(error)
            toast({
                title: 'Error while login user',
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

            <FormControl isRequired isInvalid={user.email=="" && isSubmited ? true : false}>
                <FormLabel>Email</FormLabel>
                <Input placeholder='email adderss' name='email' value={user.email} onChange={(e) => { HandleUser(e) }} />
                <FormErrorMessage>Email is required</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={user.password=="" && isSubmited ? true : false}>
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
            

            <Stack spacing={3} direction='row' align='center'>
                <Button colorScheme='blue' size='sm' onClick={HandleSubmit} isLoading={loding}>
                    Login
                </Button>
                <Button colorScheme='red' size='sm' onClick={HandleGuest}>
                    Login as Guest
                </Button>
            </Stack>

        </Flex>
    );
}

export default Login;