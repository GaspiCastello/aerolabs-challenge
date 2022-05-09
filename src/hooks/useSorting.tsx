/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useMemo } from 'react'
import { Product } from '../types/types'

type Config = {
    key: string
    direction: string
} | null

export const useSortableData = (items: Product[], config: Config = null) => {
    const [sortConfig, setSortConfig] = useState<Config>(config)

    const sortedItems = useMemo(() => {
        const sortableItems = [...items]
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortableItems
    }, [items, sortConfig])

    const requestSort = (key: string) => {
        let direction = 'ascending'
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    return { sortedItems, requestSort, sortConfig }
}
