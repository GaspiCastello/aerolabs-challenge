import { extendTheme } from '@chakra-ui/react'
import { information } from '../utils/constants'

const colors = {
    brand: {
        900: `${information.color.primary}`,
        800: `${information.color.secondary}`,
        700: `${information.color.terciary}`,
    },
}

export const theme = extendTheme({ colors })
