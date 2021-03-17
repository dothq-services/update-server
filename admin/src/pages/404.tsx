import React from 'react'
import { Layout } from '../components/Layout'
import { Content } from '../components/Content'

const Index = () => {
    return (
        <Layout>
            <Content primary>
                <div className={'grid'}>
                    <div>
                        <h1>Page Not Found</h1>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Index;