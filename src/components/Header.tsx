/* eslint-disable react/function-component-definition */
/* eslint-disable max-len */
import React, { FC, Fragment } from 'react'
import { Heading, Link, Stack, Image, Text, Divider } from '@chakra-ui/react'
import { information } from '../utils/constants'
import header from '../assets/header-x1.png'
import UserCard from './UserCard'
import { User } from '../types/types'

interface HeaderProps {
    user: User
}

const Header: FC<HeaderProps> = ({
    user: { id, name, points, redeemHistory },
}) => (
    <>
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
            <UserCard
                id={id}
                name={name}
                points={points}
                redeemHistory={redeemHistory}
                createDate={`${new Date().toString()}`}
            />

            <Stack textAlign={{ base: 'center', sm: 'left' }}>
                <Heading>{information.title}</Heading>
                <Text color="white" fontWeight="600" fontSize={25}>
                    {information.description}
                </Text>
                <Stack direction="row" spacing={6}>
                    {information.social.map((social) => (
                        <Link key={social.title} isExternal href={social.link}>
                            <Image
                                src={`https://icongr.am/fontawesome/${social.title}.svg?size=28&color=ffffff`}
                            />
                        </Link>
                    ))}
                </Stack>
            </Stack>
        </Stack>
        <Divider marginTop={3} />
    </>
)
export default Header
