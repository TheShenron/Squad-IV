import { Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

function Loading(props) {
    return (
        <>
            <Stack>
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
            </Stack>
        </>
    );
}

export default Loading;