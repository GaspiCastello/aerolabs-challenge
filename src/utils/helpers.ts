/* eslint-disable no-underscore-dangle */
import { CartItem, Product } from '../types/types'

export function parseCurrency(value: number): string {
    return value.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
    })
}

export function editCart(
    product: Product,
    action: 'increment' | 'decrement' | 'delete'
) {
    return (cart: CartItem[]): CartItem[] => {
        const isInCart = cart.some(
            (item: { _id: string }) => item._id === product._id
        )

        if (!isInCart) {
            return cart.concat({ ...product, quantity: 1 })
        }

        return cart.reduce((acc: CartItem[], _product: CartItem) => {
            if (product._id !== _product._id) {
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
