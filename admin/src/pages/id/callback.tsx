import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { useRouter } from 'next/router'
import * as cookie from 'cookie'
import { GetServerSideProps } from 'next'

const Callback = (props) => {
    const router  = useRouter();

    React.useEffect(() => {
        if (props.isSuccess === true) {
            typeof window !== 'undefined' && router.push('/')
        } else {
            // Something went wrong yay
        }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie)
    const token = context.query.token
    let isSuccess: boolean = false;

    if (token) {
        context.res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
            path: '/',
            expires: new Date(Date.UTC(9999, 11, 31, 23, 59, 59)),
            sameSite: 'none',
            secure: true
        }));

        isSuccess = true
    }

    return {
        props: {
            cookies,
            token,
            isSuccess
        }
    }
}

export default Callback;