/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC } from 'react'
import { Button, Stack, Text, Image } from '@chakra-ui/react'
import { Product } from '../types/types'

interface ProductCardProps {
    product: Product
    onAdd: (product: Product) => void
}

const ProductCard: FC<ProductCardProps> = ({
    product,
    product: {
        id,
        category,
        cost,
        img: { url },
        title,
    },
    onAdd,
}) => (
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
                maxHeight={300}
                objectFit="cover"
                borderRadius="md"
                src={url}
            />
            <Text marginY={10} color="primary.800" fontWeight={500}>
                {title}
            </Text>
            <Text fontSize="sm">
                {title} Category: {category}
            </Text>
        </Stack>

        <Stack
            alignItems="flex-end"
            direction="row"
            justifyContent="space-between"
        >
            <Text
                backgroundColor="#F49E4C"
                rounded="2rem"
                color="white"
                fontSize="md"
                fontWeight="500"
                p=".5rem"
            >
                {cost} points
            </Text>
            <Button
                size="md"
                bg="black"
                fontWeight="bold"
                color="white"
                boxShadow="xl"
                variant="solid"
                onClick={() => onAdd(product)}
            >
                REDEEM
            </Button>
        </Stack>
    </Stack>
)
export default ProductCard
