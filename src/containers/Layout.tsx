/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC, ReactNode } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Header from '../components/Header'
import { User } from '../types/types'

interface Props {
    children: ReactNode
    user: User
}

const Layout: FC<Props> = ({ children, user }) => (
    <Box padding={4}>
        <Container
            backgroundColor="#15DBFF"
            boxShadow="md"
            marginY={5}
            maxWidth="container.xl"
            padding={5}
            borderRadius={15}
        >
            <Header user={user} />
            {children}
        </Container>
    </Box>
)
export default Layout
