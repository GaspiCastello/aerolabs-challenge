/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/function-component-definition */
import React, { FC, useEffect, useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import HomeContainer from './containers/HomeContainer'
import { Product, ProductDb } from './types/types'

const token =
    // eslint-disable-next-line max-len
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY5OGJjN2FkYzQ1NTAwMWE2Y2JjM2IiLCJpYXQiOjE2NTEwODQyMzF9.z98IN81adDVPCXeVSZHGWBYxlY7tnQeWKQgT_YfkiYA'

const App: FC = () => {
    const [res, setRes] = useState<Product[]>([
        {
            id: 'id',
            category: 'category',
            cost: 10,
            title: 'title',
            img: { url: 'url', hdUrl: 'hdUrl' },
        },
    ])
    console.log('Rs in app:', res)
    useEffect(() => {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        headers.append('Authorization', `${token}`)
        fetch('https://coding-challenge-api.aerolab.co/products', {
            method: 'GET',
            headers,
        })
            .then((response) => response.json())
            .then((products) => {
                const transformed = products.map((product: ProductDb) => ({
                    id: product._id,
                    category: product.category,
                    cost: products.cost
                        ? product.cost
                        : Math.floor(Math.random() * 15 + 5),
                    title: product.name,
                    img: product.img,
                }))
                setRes(transformed)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    let content = <Spinner />
    if (res.length > 0) {
        content = <HomeContainer products={res} />
    }
    return content
}

export default App
