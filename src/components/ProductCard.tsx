/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC } from 'react'
import { Button, Stack, Text, Image } from '@chakra-ui/react'

import { Product } from '../types/types'
import { parseCurrency } from '../utils/helpers'

interface ProductCardProps {
    product: Product
    onAdd: (product: Product) => void
}

const ProductCard: FC<ProductCardProps> = ({
    product,
    product: {
        _id,
        category,
        cost,
        img: { hdUrl },
        title,
    },
    onAdd,
}) => (
    <Stack
        backgroundColor="primary.100"
        borderRadius="md"
        padding={4}
        spacing={4}
        key={_id}
        boxShadow="xl"
        p="6"
        rounded="md"
    >
        <Stack spacing={1}>
            <Image
                maxHeight={128}
                objectFit="cover"
                borderRadius="md"
                src={hdUrl}
            />
            <Text color="primary.800" fontWeight={500}>
                {title}
            </Text>
            <Text fontSize="sm">{category}</Text>
        </Stack>

        <Stack
            alignItems="flex-end"
            direction="row"
            justifyContent="space-between"
        >
            <Text color="green.500" fontSize="sm" fontWeight="500">
                {parseCurrency(cost)}
            </Text>
            <Button
                size="sm"
                bg="primary.400"
                fontWeight="bold"
                color="white"
                boxShadow="xl"
                variant="solid"
                onClick={() => onAdd(product)}
            >
                Add
            </Button>
        </Stack>
    </Stack>
)
export default ProductCard
