import React from 'react'
import { Layout } from '../components/Layout'
import { Content } from '../components/Content'
import * as cookie from 'cookie'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const Index = (props) => {
    const router = useRouter();

    React.useEffect(() => {
        if (props.noAuth) {
            if(typeof window !== 'undefined') {
                if(router.route !== "/noauth") router.push('/noauth')
            } 
        }
    })
    return (
        <Layout uData={props.userData} isAuth={props.isAuth}>
            <Content primary>
                <div className={'grid'}>
                    <div>
                        <h1>Welcome to the Dot HQ Update Server!</h1>
                        <p>Please sign in to continue.</p>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie)
    let userData = {};
    let isAuth: boolean = false;
    let noAuth: boolean = false;


    if (cookies.token !== undefined ) {
        await axios.post(`http://${context.req.headers.host}/api/id/getOrganizations`, {
            token: cookies.token
        }, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }
        }).then((res) => { 
            if (res.data.success === 'userValid') {
                isAuth = true
            }
        })
    }

    if (isAuth) {
        await axios.post(`http://${context.req.headers.host}/api/id/getProfile`, {
            token: cookies.token
        }, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }
        }).then((res) => {
            userData = res.data;
        })
    }

    if (cookies.token === undefined) {
        noAuth = true;
    }

    return {
        props: {
            cookies,
            isAuth,
            userData,
            noAuth
        }
    }
}

export default Index;