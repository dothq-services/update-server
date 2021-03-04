import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { TextField, Checkbox, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel, Select, Button } from '@material-ui/core'
import { FormLocaleSelector } from '../../components/Form/Locale'
import { FormTargetSelector } from '../../components/Form/Target'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const AddUpdate = () => {
    const router  = useRouter();

    // Is user signed in?
    const [cookie, setCookie] = useCookies(["token"])
    const [isAuth, setIsAuth] = React.useState(false)
    const [uData, setUData] = React.useState({})

    // Form
    const [availableProducts, setAProducts] = React.useState([]);
    const [currentUploadedFile, setCurrentUploadedFile] = React.useState('')
    const [advancedMode, setAdvancedMode] = React.useState(false);
    const [productKey, setProductKey] = React.useState('');
    const [product, setProduct] = React.useState(({} as any));
    const [locale, setLocale] = React.useState('');
    const [releaseFileCheckbox, setReleaseFileCheckbox] = React.useState(true)
    const [releaseTypeCheckbox, setReleaseTypeCheckbox] = React.useState(true)

    const handleProductChange = (event) => {
        if(availableProducts.find(i => i.id == event.target.value)) {
            const product = availableProducts.find(i => i.id == event.target.value);

            console.log(product);

            setProductKey(event.target.value);
            setProduct(product);

            if(product.availableLocales) setLocale(product.availableLocales[0])
        }
    };

    const handleReleaseFileCheckboxChange = (event) => {
        setReleaseFileCheckbox(event.target.checked)
    }
    const handleReleaseTypeCheckboxChange = (event) => {
        setReleaseTypeCheckbox(event.target.checked)
    }

    const getFileName = (path) => {
        if (path.substr(0, 12) == "C:\\fakepath\\")
        return path.substr(12);
    }

    React.useEffect(() => {
        if(availableProducts.length !== 0) return;

        axios.get("/api/get/products") 
            .then(({ data }) => {
                setAProducts(data.products);
            })
        
        // stupidly weird way to verify user is in dothq org
        if (cookie.token !== undefined && axios.post('/api/id/getOrganizations', {
            token: cookie.token  
        }).then((res) => {
            res.data.success === 'dothq'
        })) {
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
    }, [availableProducts])

    return (
        <Layout uData={uData} isAuth={isAuth}>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Create new release</h1>
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
                                id="rName"
                                name="rName"
                                label="Release name (Ex. Dot-1.0-build1)"
                                value={""}
                                onChange={null}
                                error={null}
                                helperText={'Release name for use within Admin UI.'}
                            />
                        </div>
                        <div className={'form-control'}>
                            <FormControl 
                            variant="outlined"
                            fullWidth>
                                <InputLabel>Product</InputLabel>
                                <Select
                                    labelId="rProduct-label"
                                    id="rProduct"
                                    value={productKey}
                                    onChange={handleProductChange}
                                    label="Product"
                                >
                                    {availableProducts && availableProducts.map(product => (
                                        <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Product to tag release under</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </Content>
            {/**
             * SIMPLE MODE
             * This mode uses the fun dialog boxes and stuff. It's hard to do large releases with, due to the fact that it requires you to specify custom files for each language
             */}
            <Content primary visible={advancedMode}>
                <div className={'flex-grid'}>
                    <div className={'form-control'}>
                        <FormLocaleSelector locales={!!product ? product.availableLocales : []} />
                    </div>
                    <div className={'form-control'}>
                        <FormTargetSelector />
                    </div>
                </div>
                <div style={{ margin: 20 }} />
                <div className={'flex-grid'}>
                    <div className={'form-control'}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="rVersion"
                            name="rVersion"
                            label="Version Number (Ex. 1.0)"
                            value={""}
                            onChange={null}
                            error={null}
                            helperText={'Update Version'}
                            />
                    </div>
                    <div className={'form-control'}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="rVersionPretty"
                            name="rVersionPretty"
                            label="Display Version Number (Ex. 1.0 Beta 1)"
                            value={""}
                            onChange={null}
                            error={null}
                            helperText={'Displayed version number'}
                            />
                    </div>
                </div>
                <div style={{ margin: 20 }} />
                <div className={'flex-grid'}>
                    <div className={'form-control'}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="rBuildID"
                            name="rBuildID"
                            label="Build ID (Ex. 20210225185804)"
                            value={""}
                            onChange={null}
                            error={null}
                            helperText={'Version Build ID'}
                            />
                    </div>
                    <div className={'form-control'}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="rWhatsnew"
                            name="rWhatsnew"
                            label="What's New URL (Ex. https://whatsnew.dothq.co/1.0)"
                            value={""}
                            onChange={null}
                            error={null}
                            helperText={'URL that opens on start (can feature %OLD_VERSION% parameter)'}
                            />
                    </div>
                </div>
                <div style={{ margin: 20 }} />
                <div className={'flex-grid'}>
                    <div className={'form-control'}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="rReleasenotes"
                            name="rReleasenotes"
                            label="Release Notes URL (Ex. https://releasenotes.dothq.co/1.0)"
                            value={""}
                            onChange={null}
                            error={null}
                            helperText={'Release Notes URL'}
                            />
                    </div>
                    <div className={'form-control'}>
                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={releaseFileCheckbox}
                                        onChange={handleReleaseFileCheckboxChange}
                                        name="rUploadFile"
                                        color="primary"
                                    />
                                }
                                label="Upload Release Files"
                            />
                            <FormHelperText>Upload release files, or specify a custom URL</FormHelperText>
                        </FormControl>
                    </div>
                </div>
                <div style={{ margin: 20 }} />
                <div className={'flex-grid'} style={{ display: releaseFileCheckbox === true ? 'flex' : 'none' }}>
                    <div className={'form-control'}
                    style={{ display: 'flex', alignItems: 'center' }}>
                        <label className={'btn btn-primary'} htmlFor={"rReleaseFile"} style={{ marginRight: 10 }}>Upload Release File</label>
                        <input 
                            type={'file'} 
                            id={"rReleaseFile"} 
                            multiple={false}
                            onChange={e => setCurrentUploadedFile(e.target.value)}/>
                        <p>{getFileName(currentUploadedFile)}</p>
                    </div>
                    <div className={'form-control'}>
                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={releaseTypeCheckbox}
                                        onChange={handleReleaseTypeCheckboxChange}
                                        name="rReleaseType"
                                        color="primary"
                                    />
                                }
                                label="Major Release"
                            />
                            <FormHelperText>Set whether the release is a major or minor release</FormHelperText>
                        </FormControl>
                    </div>
                </div>
                <div className={'flex-grid'} style={{ display: releaseFileCheckbox === false ? 'flex' : 'none' }}>
                    <div className={'form-control'}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="rReleaseFileURL"
                            name="rReleaseFileURL"
                            label="Release File URL (Ex. https://cdn.dothq.co/%OS%/%LANG%/dot_1.0.mar)"
                            value={""}
                            onChange={null}
                            error={null}
                            helperText={'URL to Release File'}
                            />
                    </div>
                    <div className={'form-control'}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="rReleaseFileURLSize"
                            name="rReleaseFileURLSize"
                            label="Release File URL Size (Ex. 80088440)"
                            value={""}
                            onChange={null}
                            error={null}
                            helperText={'Size of Release File in Bytes'}
                            />
                    </div>
                </div>
                <div style={{ margin: 20, display: releaseFileCheckbox === false ? 'flex' : 'none' }} />
                <div className={'flex-grid'} style={{ display: releaseFileCheckbox === false ? 'flex' : 'none' }}>
                    <div className={'form-control'}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="rReleaseFileURLSha"
                            name="rReleaseFileURLSha"
                            label="Release File SHA512 Checksum"
                            value={""}
                            onChange={null}
                            error={null}
                            helperText={'The SHA512 Checksum for the Release File'}
                            />
                    </div>
                    <div className={'form-control'}>
                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={releaseTypeCheckbox}
                                        onChange={handleReleaseTypeCheckboxChange}
                                        name="rReleaseType"
                                        color="primary"
                                    />
                                }
                                label="Major Release"
                            />
                            <FormHelperText>Set whether the release is a major or minor release</FormHelperText>
                        </FormControl>
                    </div>
                </div>
            </Content>
            {/**
             * ADVANCED MODE
             * This mode uses a large text field that allows you to submit releases with JSON. No fancy, simple dialog boxes, but easier for large releases
             */}
            <Content primary visible={!advancedMode}>
                <p>Advanced Mode is Currently Unfinished! Sorry</p>
            </Content>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <Button
                            onClick={() => {setAdvancedMode(!advancedMode)}}
                            color="secondary" 
                            variant="contained" 
                            disableElevation
                        >
                            {advancedMode === true ? 'Simple' : 'Advanced'} Mode
                        </Button>
                        <div>
                            <Button variant="contained" color="primary" disableElevation>
                                Add Release
                            </Button>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default AddUpdate;