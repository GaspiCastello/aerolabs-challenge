/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */
import React, { FC, useState, useMemo } from 'react'
import {
    Text,
    Grid,
    Stack,
    Button,
    Flex,
    useDisclosure,
} from '@chakra-ui/react'

import { CartItem, Product } from '../types/types'
import ProductCard from '../components/ProductCard'
import DrawerCart from '../components/DrawerCart'
import { editCart, parseCurrency } from '../utils/helpers'
import { useSortableData } from '../hooks/useSorting'

interface Props {
    products: Product[]
}

const HomeContainer: FC<Props> = ({ products }) => {
    const [cart, setCart] = useState<CartItem[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { sortedItems, requestSort, sortConfig } = useSortableData(products)
    console.log('sorted:', sortedItems)
    const total = useMemo(
        () =>
            parseCurrency(
                cart.reduce(
                    (acc, product) => acc + product.cost * product.quantity,
                    0
                )
            ),
        [cart]
    )
    const quantity = useMemo(
        () => cart.reduce((acc, item) => acc + item.quantity, 0),
        [cart]
    )

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleEditCart = (
        product: Product,
        action: 'increment' | 'decrement' | 'delete'
    ) => {
        setCart(editCart(product, action))
    }
    let productsOnSort
    if (sortedItems.length) {
        productsOnSort = sortedItems
    } else {
        productsOnSort = [...products]
    }
    return (
        <Stack>
            <Flex
                alignItems="center"
                justifyContent="center"
                bottom={4}
                position="sticky"
            >
                <Button margin={6} onClick={() => requestSort('cost')}>
                    Sort by cost{' '}
                </Button>
                <Button margin={6} onClick={() => requestSort('title')}>
                    Sort by title{' '}
                </Button>
                <Button margin={6} onClick={() => requestSort('category')}>
                    Sort by category{' '}
                </Button>
            </Flex>
            {productsOnSort.length ? (
                <Grid
                    gridGap={8}
                    templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
                >
                    {productsOnSort.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={(product) =>
                                handleEditCart(product, 'increment')
                            }
                        />
                    ))}
                </Grid>
            ) : (
                <Text>No products</Text>
            )}
            {Boolean(cart.length) && (
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    bottom={4}
                    position="sticky"
                >
                    <Button
                        size="lg"
                        width="100%"
                        margin="auto"
                        padding={2}
                        backgroundColor="green.400"
                        boxShadow="2xl"
                        color="white"
                        onClick={onOpen}
                    >
                        <Stack alignItems="center" direction="row" spacing={8}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={8}
                            >
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
            )}
            <DrawerCart
                items={cart}
                isOpen={isOpen}
                onClose={onClose}
                onDecrement={(product) => handleEditCart(product, 'decrement')}
                onIncrement={(product) => handleEditCart(product, 'increment')}
                onDelete={(product) => handleEditCart(product, 'delete')}
            />
        </Stack>
    )
}
export default HomeContainer
