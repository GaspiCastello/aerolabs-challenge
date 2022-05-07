/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    FC,
} from 'react'
import { useAxios } from '../hooks/use-axios'
import { CartItem, Product, User } from '../types/types'
import { editCart } from '../utils/helpers'

const CartContext = createContext<{
    cart: CartItem[]
    user: User
    total: number
    quantity: number
    onCheckoutPoints: number
    handleEditCart: (
        product: Product,
        action: 'increment' | 'decrement' | 'delete'
    ) => void
    onCheckoutHandler: () => void
}>({
    cart: [],
    user: { id: '', name: '', points: 0, redeemHistory: [], createDate: '' },
    total: 0,
    quantity: 0,
    onCheckoutPoints: 0,
    handleEditCart: () => {},
    onCheckoutHandler: () => {},
})

export const useCartContext = () => useContext(CartContext)

type Props = {
    children: ReactNode
}
export const CartProvider: FC<Props> = ({ children }) => {
    const {
        fetchData,
        response: user = {
            id: '',
            name: '',
            points: 0,
            redeemHistory: [],
            createDate: '',
        },
    } = useAxios()
    const [cart, setCart] = useState<CartItem[]>([])
    const total = useMemo(
        () =>
            // parseCurrency(
            // ),
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

    const handleEditCart = (
        product: Product,
        action: 'increment' | 'decrement' | 'delete'
    ) => {
        setCart(editCart(product, action))
    }
    const onCheckoutHandler = () => {
        fetchData({ url: 'user/me' })
        setCart([])
    }

    useEffect(() => {
        fetchData({ url: 'user/me' })
    }, [])

    const values = {
        cart,
        user,
        total,
        quantity,
        onCheckoutPoints: user.points - total,
        handleEditCart,
        onCheckoutHandler,
    }
    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    )
}
