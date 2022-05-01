/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
// eslint-disable-next-line max-len
const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY5OGJjN2FkYzQ1NTAwMWE2Y2JjM2IiLCJpYXQiOjE2NTEwODQyMzF9.z98IN81adDVPCXeVSZHGWBYxlY7tnQeWKQgT_YfkiYA'

const Pr: React.FC = () => {
    const [res, setRes] = useState<object[]>([])
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
    return <Button>I just consumed some ⚡️Chakra!</Button>
}

export default Pr
