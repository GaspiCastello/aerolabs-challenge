/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import HomeContainer from './containers/HomeContainer'

const token =
    // eslint-disable-next-line max-len
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY5OGJjN2FkYzQ1NTAwMWE2Y2JjM2IiLCJpYXQiOjE2NTEwODQyMzF9.z98IN81adDVPCXeVSZHGWBYxlY7tnQeWKQgT_YfkiYA'

const App: React.FC = () => {
    const [res, setRes] = useState<object[]>([
        {
            _id: 'string',
            category: 'string',
            cost: 0,
            description: 'string',
            image: { url: 'string', hdUrl: 'string' },
        },
    ])
    console.log('res in app:', res)
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
                setRes(products)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    let content = <Spinner />
    if (res.length > 0) {
        content = <HomeContainer products={res} />
    }
    return { content }
}

export default App
