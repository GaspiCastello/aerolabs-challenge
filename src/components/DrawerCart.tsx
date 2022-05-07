/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC } from 'react'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Stack,
    Text,
    CloseButton,
    Divider,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react'
import { BsPatchMinus, BsCloudMinus, BsPlusCircle } from 'react-icons/bs'
import { useCartContext } from '../store/cart-context'
import { useAxios } from '../hooks/use-axios'
import CheckoutButton from './CheckoutButton'

const DrawerCart: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { cart, onCheckoutPoints, total, handleEditCart, onCheckoutHandler } =
        useCartContext()
    // console.log('cart in drawer', cart)
    const { fetchData } = useAxios()
    const onCheckOut = async () => {
        const arrayOfPromises = cart.map(({ id }) =>
            fetchData({
                url: 'redeem',
                method: 'POST',
                data: {
                    productId: `${id}`,
                },
            })
        )
        const res = await Promise.all(arrayOfPromises)
        console.log('Response of promise.all', res)
        console.log('Array of prom', arrayOfPromises)
        onCheckoutHandler()
    }

    return (
        <>
            {cart.length && <CheckoutButton onClick={onOpen} />}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text fontSize="3xl"> Cart</Text>
                            <CloseButton onClick={onClose} />
                        </Stack>
                    </DrawerHeader>

                    <DrawerBody data-testid="cart" paddingX={4}>
                        <Stack>
                            {cart.length ? (
                                cart.map((product) => (
                                    <Stack
                                        key={product.id}
                                        data-testid="cart-item"
                                        boxShadow="md"
                                        p="6"
                                        rounded="md"
                                    >
                                        <Stack width="100%" marginBottom={5}>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                fontWeight="500"
                                                justifyContent="space-between"
                                            >
                                                <Text fontSize="lg">
                                                    {product.title}
                                                </Text>
                                                <Text color="green.500">
                                                    {product.cost *
                                                        product.quantity}
                                                </Text>
                                            </Stack>
                                        </Stack>
                                        <Divider />

                                        <Stack
                                            direction="row"
                                            margin="auto"
                                            justifyContent="space-between"
                                            spacing={4}
                                        >
                                            <Text>Unidades</Text>
                                            <Stack
                                                direction="row"
                                                margin="auto"
                                            >
                                                <IconButton
                                                    data-testid="decrement"
                                                    colorScheme="teal"
                                                    aria-label="Decrement units"
                                                    size="xs"
                                                    icon={<BsCloudMinus />}
                                                    onClick={() =>
                                                        handleEditCart(
                                                            product,
                                                            'decrement'
                                                        )
                                                    }
                                                />

                                                <Text
                                                    data-testid="quantity"
                                                    fontWeight="500"
                                                >
                                                    {product.quantity}
                                                </Text>

                                                <IconButton
                                                    data-testid="increment"
                                                    colorScheme="teal"
                                                    aria-label="Increment units"
                                                    size="xs"
                                                    icon={<BsPlusCircle />}
                                                    disabled={
                                                        onCheckoutPoints <
                                                        product.cost
                                                    }
                                                    onClick={() =>
                                                        handleEditCart(
                                                            product,
                                                            'increment'
                                                        )
                                                    }
                                                />
                                                <IconButton
                                                    data-testid="delete"
                                                    colorScheme="red"
                                                    aria-label="Call Segun"
                                                    size="xs"
                                                    icon={<BsPatchMinus />}
                                                    onClick={() =>
                                                        handleEditCart(
                                                            product,
                                                            'delete'
                                                        )
                                                    }
                                                />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                ))
                            ) : (
                                <Text>No product redeemed</Text>
                            )}
                        </Stack>
                    </DrawerBody>

                    {cart.length && (
                        <DrawerFooter>
                            <Stack width="100%">
                                <Stack
                                    direction="row"
                                    fontWeight="500"
                                    justifyContent="space-between"
                                >
                                    <Text fontSize="xl">Total:</Text>
                                    <Text fontSize="xl">{total} Points</Text>
                                </Stack>
                                <Button
                                    size="lg"
                                    width="100%"
                                    onClick={onCheckOut}
                                >
                                    Check Out
                                </Button>
                            </Stack>
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default DrawerCart
