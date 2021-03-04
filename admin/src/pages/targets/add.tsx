import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const AddTarget = () => {
    const router  = useRouter();

    // Is user signed in?
    const [cookie, setCookie] = useCookies(["token"])
    const [isAuth, setIsAuth] = React.useState(false)
    const [uData, setUData] = React.useState({})

    const [tName, setTName] = React.useState('')
    const [tDisplayName, setTDisplayName] = React.useState('')
    const [showSuccessScreen, setShowSuccessScreen] = React.useState(false)

    const handleTNameChange = (e) => {
        setTName(e.target.value)
    }

    const handleTDisplayNameChange = (e) => {
        setTDisplayName(e.target.value)
    }

    // Errors
    const [tNameE, setTNameE] = React.useState(false)
    const [tDisplayNameE, setTDisplayNameE] = React.useState(false)

    const submitNewTarget = () => {
        if (tName === '') {
            return setTNameE(true)
        }
        if (tDisplayName === '') {
            return setTDisplayNameE(true)
        }
        axios.post('/api/add/target', {
            name: tName,
            displayname: tDisplayName
          })
          .then(function (response) {
            if (response.status === 200) {
                setShowSuccessScreen(true)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  
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
                        <h1>Add a Target</h1>
                    </div>
                </div>
            </Content>
            <Content visible={showSuccessScreen ? true : false}>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <div className={'form-control'}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="tDisplayName"
                                name="tDisplayName"
                                label="Target name (Ex. win64)"
                                onChange={handleTDisplayNameChange}
                                error={tDisplayNameE}
                                helperText={'Target name for use within Admin UI.'}
                            />
                        </div>
                        <div className={'form-control'}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="tName"
                                name="tName"
                                label="Target Advanced name (Ex. WINNT_x86_64-msvc)"
                                onChange={handleTNameChange}
                                error={tNameE}
                                helperText={'Advanced Target Name.'}
                            />
                        </div>
                    </div>
                </div>
            </Content>

            <Content primary visible={showSuccessScreen ? true : false}>
                <div className={'form-grid'}>
                    <p>Add target aliases</p>
                </div>
            </Content>
            <Content primary visible={showSuccessScreen ? true : false}>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <span />
                        <Button color="primary" variant="contained" disableElevation onClick={submitNewTarget}>
                            Add Target
                        </Button>
                    </div>
                </div>
            </Content>

            <Content primary visible={showSuccessScreen ? false : true}>
                <div className={'grid'}>
                    <h3>Target Added Successfully!</h3>
                </div>
            </Content>
        </Layout>
    )
}

export default AddTarget;