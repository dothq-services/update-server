import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { useRouter } from 'next/router'

const Index = () => {
    const router = useRouter();
    
    React.useEffect(() => {
        router.push({
            pathname: '/api/id/login'
        })
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

export default Index;