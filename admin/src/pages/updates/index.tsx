import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '../../components/Button'

const Updates = () => {
    return (
        <Layout>
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

export default Updates;