/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC } from 'react'
import { Stack, Image, Text } from '@chakra-ui/react'
import placeHolder from '../assets/pngfind.png'
import { useCartContext } from '../store/cart-context'

const UserCard: FC = () => {
    const {
        user: { id, name, points },
    } = useCartContext()
    return (
        <Stack
            backgroundColor="white"
            borderRadius="md"
            padding={4}
            spacing={2}
            key={id}
            boxShadow="xl"
            p="6"
            rounded="md"
        >
            <Stack spacing={1}>
                <Image
                    objectFit="cover"
                    borderRadius="md"
                    h={32}
                    src={placeHolder}
                />
                <Text fontSize={15}>{name}</Text>
                <Text fontSize={15}>{points}</Text>
            </Stack>
        </Stack>
    )
}
export default UserCard
