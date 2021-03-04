import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const Logout = () => {
    const router  = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies(["token"])

    React.useEffect(() => {
        // idk how to logout of oauth, so let's just remove the token
        removeCookie('token')
        router.push('/')
    })

    return (
        <Layout>
            <Content primary>
                <div className={'grid'}>
                    <div>
                        <h1>Please Wait...</h1>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Logout;