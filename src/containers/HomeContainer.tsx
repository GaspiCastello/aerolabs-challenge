/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */
import React, { FC } from 'react'
import { Text, Grid, Stack, Button, Flex, Spinner } from '@chakra-ui/react'

import { Product } from '../types/types'
import ProductCard from '../components/ProductCard'
import DrawerCart from '../components/DrawerCart'
import { useSortableData } from '../hooks/useSorting'

interface Props {
    products: Product[]
}

const HomeContainer: FC<Props> = ({ products }) => {
    const { sortedItems, requestSort } = useSortableData(products)

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
            {sortedItems.length ? (
                <Grid
                    gridGap={8}
                    templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
                >
                    {sortedItems.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </Grid>
            ) : (
                <Stack>
                    <Flex>
                        <Spinner />
                        <Text>Loading</Text>
                    </Flex>
                </Stack>
            )}
            <DrawerCart />
        </Stack>
    )
}
export default HomeContainer
