/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC } from 'react'
import { Button, Stack, Text, Image } from '@chakra-ui/react'
import { Product } from '../types/types'
import { useCartContext } from '../store/cart-context'

const ProductCard: FC<{ product: Product }> = ({
    product,
    product: {
        id,
        category,
        cost,
        img: { url },
        title,
    },
}) => {
    const { onCheckoutPoints, handleEditCart } = useCartContext()
    return (
        <Stack
            backgroundColor="white"
            borderRadius="md"
            padding={4}
            spacing={4}
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
                <Text fontSize="sm">Category: {category}</Text>
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
                    {cost}
                </Text>
            </Stack>
            <Button
                size="lg"
                width="100%"
                bg="black"
                fontWeight="bold"
                color="white"
                boxShadow="xl"
                variant="solid"
                onClick={() => handleEditCart(product, 'increment')}
                disabled={onCheckoutPoints < cost}
            >
                {onCheckoutPoints > cost
                    ? 'Redeem'
                    : `Need ${cost - onCheckoutPoints}+`}
            </Button>
        </Stack>
    )
}
export default ProductCard
