/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC, ReactNode } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Header from '../components/Header'

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => (
    <Box padding={4}>
        <Container
            backgroundColor="#15DBFF"
            boxShadow="md"
            marginY={5}
            maxWidth="container.xl"
            padding={5}
            borderRadius={15}
        >
            <Header />
            {children}
        </Container>
    </Box>
)
export default Layout
