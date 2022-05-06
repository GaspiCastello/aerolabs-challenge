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
    Spinner,
} from '@chakra-ui/react'

import { CartItem, Product } from '../types/types'
import ProductCard from '../components/ProductCard'
import DrawerCart from '../components/DrawerCart'
import { editCart } from '../utils/helpers'
import { useSortableData } from '../hooks/useSorting'
import CheckoutButton from '../components/CheckoutButton'

interface Props {
    products: Product[]
}

const HomeContainer: FC<Props> = ({ products }) => {
    const [cart, setCart] = useState<CartItem[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { sortedItems, requestSort, sortConfig } = useSortableData(products)
    // console.log('sorted:', sortedItems)

    const total = useMemo(
        () =>
            cart.reduce(
                (acc, product) => acc + product.cost * product.quantity,
                0
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
                <Stack>
                    <Spinner />
                    <Text>No products</Text>
                </Stack>
            )}
            {Boolean(cart.length) && (
                <CheckoutButton
                    onClick={onOpen}
                    quantity={quantity}
                    total={total}
                />
            )}
            <DrawerCart
                total={total}
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
