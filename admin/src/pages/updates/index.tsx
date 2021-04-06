import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '../../components/Button'
import axios from 'axios'
import * as cookie from 'cookie'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'


const Updates = (props) => {
    const router = useRouter();
    
    React.useEffect(() => {
        if (props.noAuth) {
            typeof window !== 'undefined' && router.push('/noauth')
        }
    })
    return (
        <Layout uData={props.userData} isAuth={props.isAuth}>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Currently Available Updates</h1>
                        <Button type={'primary'} href={'/updates/add'}>
                            Add Update
                        </Button>
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


export default Updates;