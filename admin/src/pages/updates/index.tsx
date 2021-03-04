import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '../../components/Button'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'


const Updates = () => {
    const router  = useRouter();

    // Is user signed in?
    const [cookie, setCookie] = useCookies(["token"])
    const [isAuth, setIsAuth] = React.useState(false)
    const [uData, setUData] = React.useState({})
  
    React.useEffect(() => {
        if (cookie.token !== undefined) {
            setIsAuth(true)
        }

        if (isAuth) {
            axios.post('/api/id/getProfile', {
                token: cookie.token
            }).then((res) => {
                setUData(res.data)
            })
        }

        if (cookie.token === undefined) {
            router.push(`/noauth`)
        }
    })
    
    return (
        <Layout uData={uData} isAuth={isAuth}>
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