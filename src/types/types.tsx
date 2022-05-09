export interface Product {
    [index: string]: any
    id: string
    category: string
    cost: number
    img: { url: string; hdUrl: string }
    title: string
}
export interface ProductDb {
    _id: string
    category: string
    cost: number
    img: { url: string; hdUrl: string }
    name: string
}
export interface CartItem extends Product {
    quantity: number
}
export interface User {
    id: string
    name: string
    points: number
    redeemHistory: object[]
    createDate: string
}
