import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '../../components/Button'
import { TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core'
import { FormLocaleSelector } from '../../components/Form/Locale'

const AddTarget = () => {
    return (
        <Layout>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Add a Target</h1>
                    </div>
                </div>
            </Content>
            <Content>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <div className={'form-control'}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="tName"
                                name="tName"
                                label="Target name (Ex. win64)"
                                value={null}
                                onChange={null}
                                error={null}
                                helperText={'Target name for use within Admin UI.'}
                            />
                        </div>
                        <div className={'form-control'}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="tIName"
                                name="tIName"
                                label="Target Advanced name (Ex. WINNT_x86_64-msvc)"
                                value={null}
                                onChange={null}
                                error={null}
                                helperText={'Advanced Target Name.'}
                            />
                        </div>
                    </div>
                </div>
            </Content>

            <Content primary>
                <div className={'form-grid'}>
                    <p>Add target aliases</p>
                </div>
            </Content>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <span />
                        <Button type={'primary'}>
                            Add Target
                        </Button>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default AddTarget;