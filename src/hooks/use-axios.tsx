/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'
import { useState, useCallback } from 'react'
import swal from 'sweetalert'
import { token } from '../utils/constants'

axios.defaults.baseURL = 'https://coding-challenge-api.aerolab.co/'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common.Authorization = token

export const useAxios = () => {
    const [response, setResponse] = useState()

    const fetchData = useCallback(
        (config: object, transformerData?: (data: any) => any) => {
            axios
                .request(config)
                .then((res) => {
                    console.log(res, 'res on use-axios')
                    if (transformerData) {
                        const transformedData = transformerData(res.data)
                        setResponse(transformedData)
                    } else {
                        setResponse(res.data)
                    }
                })
                .catch((error) => {
                    console.log(error.response, error.message)
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                        return swal(
                            error.response.data.message,
                            'from aerolabs api',
                            'warning'
                        )
                    }
                    if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        return swal(error.message, '', 'warning')
                    }
                    //
                    return swal(
                        'Something happened in setting up the request that triggered an Error',
                        error.message
                    )
                })
        },
        []
    )

    return { response, fetchData }
}
