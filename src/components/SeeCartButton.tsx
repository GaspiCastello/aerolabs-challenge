/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC } from 'react'
import { Stack, Text, Button, Flex, ButtonProps } from '@chakra-ui/react'

interface Props extends Omit<ButtonProps, 'children'> {
    total: string
    quantity: number
}

const SeeCartButton: FC<Props> = ({ onClick, total, quantity }) => (
    <Flex
        alignItems="center"
        justifyContent="center"
        bottom={4}
        position="sticky"
        w={200}
    >
        <Button
            size="lg"
            width="100%"
            margin="auto"
            padding={2}
            backgroundColor="green.400"
            boxShadow="2xl"
            color="white"
            onClick={onClick}
        >
            <Stack alignItems="center" direction="row" spacing={8}>
                <Stack alignItems="center" direction="row" spacing={8}>
                    <Text fontSize="md" lineHeight={6}>
                        Ver Carrito
                    </Text>
                    <Text
                        backgroundColor="rgba(0,0,0,0.25)"
                        borderRadius="xs"
                        color="gray.100"
                        fontSize="s"
                        fontWeight="500"
                        paddingX={2}
                        paddingY={1}
                    >
                        {quantity} items
                    </Text>
                </Stack>
                <Text fontSize="md" lineHeight={6}>
                    {total}
                </Text>
            </Stack>
        </Button>
    </Flex>
)
export default SeeCartButton
