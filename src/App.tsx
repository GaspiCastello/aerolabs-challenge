/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */

import React, { FC, useEffect } from 'react'
import HomeContainer from './containers/HomeContainer'
import Layout from './containers/Layout'
import { useAxios } from './hooks/use-axios'
import { transformRes } from './utils/helpers'

const App: FC = () => {
    const { fetchData, response = [] } = useAxios()
    // console.log('Response in app:', response)

    useEffect(() => fetchData({ url: '/products' }, transformRes), [fetchData])

    return (
        <Layout>
            <HomeContainer products={response} />
        </Layout>
    )
}

export default App
