/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC } from 'react'
import { Stack, Text, Image } from '@chakra-ui/react'
import { User } from '../types/types'
import placeHolder from '../assets/pngfind.png'

const ProductCard: FC<User> = ({ id, name, points }) => (
    <Stack
        backgroundColor="white"
        borderRadius="md"
        padding={4}
        spacing={4}
        key={id}
        boxShadow="xl"
        p="6"
        rounded="md"
    >
        <Stack spacing={1}>
            <Image
                // maxHeight={350}
                objectFit="cover"
                borderRadius="md"
                src={placeHolder}
            />
            <Text color="primary.800" fontWeight={500}>
                {name}
            </Text>
            <Text fontSize="sm">Category: {points}</Text>
        </Stack>
    </Stack>
)
export default ProductCard
