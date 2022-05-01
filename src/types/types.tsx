export interface Product {
    _id: string
    category: string
    cost: number
    img: { url: string; hdUrl: string }
    name: string
}
export interface CartItem {
    _id: string
    category: string
    cost: number
    img: { url: string; hdUrl: string }
    name: string
    quantity: number
}
