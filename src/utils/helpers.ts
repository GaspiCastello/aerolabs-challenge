/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
import { CartItem, Product, ProductDb } from '../types/types'

export const cartToPost = (cart: CartItem[]) =>
    cart
        // .map((id, quantity) => ({ id, quantity }))
        .reduce(
            (acc: { id: string }[], cur: { id: any; quantity: any }) =>
                acc.concat(new Array(cur.quantity).fill({ id: cur.id })),
            []
        )

export const transformRes = (data: ProductDb[]) =>
    data.map((product) => ({
        id: product._id,
        category: product.category,
        cost: product.cost ? product.cost : Math.floor(Math.random() * 15 + 5),
        title: product.name,
        img: product.img,
    }))

export function editCart(
    product: Product,
    action: 'increment' | 'decrement' | 'delete'
) {
    return (cart: CartItem[]): CartItem[] => {
        const isInCart = cart.some(
            (item: { id: string }) => item.id === product.id
        )

        if (!isInCart) {
            return cart.concat({ ...product, quantity: 1 })
        }

        return cart.reduce((acc: CartItem[], _product: CartItem) => {
            if (product.id !== _product.id) {
                return acc.concat(_product)
            }

            switch (action) {
                case 'decrement': {
                    if (_product.quantity === 1) {
                        return acc
                    }

                    return acc.concat({
                        ..._product,
                        quantity: _product.quantity - 1,
                    })
                }

                case 'increment': {
                    return acc.concat({
                        ..._product,
                        quantity: _product.quantity + 1,
                    })
                }
                case 'delete': {
                    return acc
                }

                default: {
                    return acc.concat(_product)
                }
            }
        }, [])
    }
}
