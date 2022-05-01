export interface Product {
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
export interface CartItem {
    id: string
    category: string
    cost: number
    img: { url: string; hdUrl: string }
    title: string
    quantity: number
}
