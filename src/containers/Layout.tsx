/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC, ReactNode } from 'react'
import {
    Box,
    Container,
    Divider,
    Heading,
    Link,
    Stack,
    Image,
    Text,
    Button,
} from '@chakra-ui/react'
import { information } from '../utils/constants'
import aerolabLogo from '../assets/aerolab-logo.svg'
import header from '../assets/header-x1.png'

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => (
    <Box padding={4}>
        <Divider marginY={2} />
        <Container
            backgroundColor="#15DBFF"
            boxShadow="md"
            marginY={5}
            maxWidth="container.xl"
            padding={5}
            borderRadius={15}
        >
            <Stack
                backgroundImage={header}
                backgroundPosition="center top"
                backgroundRepeat="no-repeat"
                bgSize="contain"
                h={300}
                alignItems="center"
                direction={{ base: 'column', sm: 'row' }}
                spacing={{ base: 3, sm: 6 }}
            >
                <Image height={{ base: 35, sm: 40 }} src={aerolabLogo} />

                <Stack textAlign={{ base: 'center', sm: 'left' }}>
                    <Heading>{information.title}</Heading>
                    <Text color="white" fontWeight="600" fontSize={25}>
                        {information.description}
                    </Text>
                    <Stack direction="row" spacing={6}>
                        {information.social.map((social) => (
                            <Link
                                key={social.title}
                                isExternal
                                href={social.link}
                            >
                                <Image
                                    src={`https://icongr.am/fontawesome/${social.title}.svg?size=28&color=ffffff`}
                                />
                            </Link>
                        ))}
                    </Stack>
                    </Stack>
                    </Stack>
    
   
            {children}
        </Container>
    </Box>
)
export default Layout
