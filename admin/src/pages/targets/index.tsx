import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const Targets = () => {
    const [targets, setTargets] = React.useState({})
    const router  = useRouter();

    // Is user signed in?
    const [cookie, setCookie] = useCookies(["token"])
    const [isAuth, setIsAuth] = React.useState(false)
    const [uData, setUData] = React.useState({})

    React.useEffect(() => {
        axios.post("/api/get/target").then(res => setTargets(res.data)).catch(e => {
            console.error(e)
        })

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
                        <h1>Currently Available Targets</h1>
                        <Button color="primary" variant="contained" disableElevation href={'/targets/add'}>
                            Add Target
                        </Button>
                    </div>
                </div>
            </Content>
            <Content>
                {(targets as any)[0] && (
                    <>
                        {(targets as any).map((t) => (<p>{t.displayname}</p>))}
                    </>
                )}
            </Content>
        </Layout>
    )
}

export default Targets;