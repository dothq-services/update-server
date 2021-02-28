import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '../../components/Button'

const Targets = () => {
    return (
        <Layout>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Currently Available Targets</h1>
                        <Button type={'primary'} href={'/targets/add'}>
                            Add Target
                        </Button>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Targets;