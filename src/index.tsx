import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { theme } from './styles/theme'
import { CartProvider } from './store/cart-context'

const root = createRoot(document.getElementById('root')!)
// createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <CartProvider>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </CartProvider>
    </React.StrictMode>
)
