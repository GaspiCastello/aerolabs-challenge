/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC } from 'react'
import { Stack, Text, Image } from '@chakra-ui/react'
import placeHolder from '../assets/pngfind.png'
import { useCartContext } from '../store/cart-context'

const UserCard: FC = () => {
    const {
        user: { id, name, points },
        onCheckoutPoints,
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
                <Text color="primary.800" fontWeight={500}>
                    {name}
                </Text>
                <Text fontSize="sm">
                    Points:
                    {points}
                </Text>
                <Text fontSize="sm">
                    Points if confirme:
                    {onCheckoutPoints}
                </Text>
            </Stack>
        </Stack>
    )
}
export default UserCard
