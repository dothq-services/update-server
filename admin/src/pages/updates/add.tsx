import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { TextField, Checkbox, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel, Select, Button, Input } from '@material-ui/core'
import axios from 'axios'
import * as cookie from 'cookie'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useFormik } from 'formik'
import { calculateFileChecksum } from '../../lib/hash'

/**
 * A Formik wrapper for the Material Design Text Field
 * @param label Placeholder label
 * @param formID ID and Name used for Javascript calls
 * @param helperText Label shown under the input. Most likely used for a description
 * @param props Other props to use, such as Value, and onChange
 */
const MaterialTextField = ({ label, formID, helperText, ...props }) => {
    return (
        <div className={'form-control'}>
            <TextField
                fullWidth
                variant={"outlined"}
                id={formID}
                name={formID}
                label={label}
                helperText={helperText}
                {...props}
            />
        </div>
    )
}

/**
 * A Formik wrapper for the Material Design Checkbox
 * @param label Placeholder label
 * @param formID ID and Name used for Javascript calls
 * @param helperText Label shown next to the input. Most likely used for a description
 * @param props Other props to use, such as Checked, and onChange
 */
const MaterialCheckbox = ({ label, formID, helperText, ...props }) => {
    return (
        <div className={'form-control'}>
            <FormControl>
                <FormControlLabel 
                    control={
                        <Checkbox
                            name={formID}
                            color="primary"
                            {...props}
                        />
                    }
                    label={label}/>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </div>
    )
}

/**
 * A Formik wrapper for the Material Design Select
 * @param label Placeholder label
 * @param formID ID and Name used for Javascript calls
 * @param helperText Label shown next to the input. Most likely used for a description
 * @param error Activates red error color
 * @param props Other props to use, such as Checked, and onChange
 */
const MaterialSelect = ({ label, formID, helperText, error, ...props }) => {
    return (
        <div className={'form-control'}>
            <FormControl
                variant="outlined"
                fullWidth
                error={error}>
                <InputLabel>{label}</InputLabel>
                <Select
                    labelId={`${formID}-label`}
                    id={formID}
                    label={label}
                    {...props} >
                        {props.children}
                    </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </div>
    )
}

const AddUpdate = (props) => {
    const router  = useRouter();

    const [advancedMode, activateAdvancedMode] = React.useState(true)
    const [isUploadingFiles, setUploadingFiles] = React.useState(true)
    const [uploadedFile, setUploadedFile] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const fileUploader = React.createRef<HTMLInputElement>()

    const getFileName = (path) => {
        if (path.substr(0, 12) == "C:\\fakepath\\")
        return path.substr(12);
    }

    if (props.noAuth) {
        router.push('/noauth')
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            product: '',
            channel: '',
            target: '',
            locale: '',
            version: '',
            displayVersion: '',
            buildID: '',
            whatsNewURL: '',
            releaseNotesURL: '',
            releaseFileURL: '',
            releaseFileSize: 0,
            releaseFileChecksum: ''
        },
        validate: values => {
            const errors = {};
            for (let i = 0; i < Object.keys(values).length; i++) {
                if (!Object.values(values)[i]) {
                    errors[Object.keys(values)[i]] = 'Required Field'
                }
            }
            return errors
        },
        onSubmit: async values => {
            if (isUploadingFiles) {
                if (values.releaseFileURL === 'TEMPURLVALUESNOTFILLED') {
                    // The Release File URL was temporary, so we need to change it to the actual URL
                    values.releaseFileURL = formik.values.releaseFileURL = process.env.NEXT_PUBLIC_FILE_SERVER_URL + `/pub/${formik.values.product}/${formik.values.version}/${formik.values.target}/${getFileName(fileUploader.current.files[0].name)}`
                }
    
                // Upload Release File
                let fileUploadData = new FormData();
                // Set file location
                fileUploadData.append('fileLocation', `${formik.values.product}/${formik.values.version}/${formik.values.target}`)
                // Set Auth Token
                fileUploadData.append('token', props.cookies.token)
                // Set File
                fileUploadData.append('releaseFile', fileUploader.current.files[0])
                setIsSubmitting(true)
                // Upload File
                await axios.post(process.env.NEXT_PUBLIC_FILE_SERVER_URL + '/upload', fileUploadData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {
                    alert(JSON.stringify(values, null, 2))
                    setIsSubmitting(false)
                })
            } else {
                // The file is not being uploaded, so just submit the form
                alert(JSON.stringify(values, null, 2))
                setIsSubmitting(false)
            }
            
        }
    })
    

    const uploadFile = (e) => {
        setUploadedFile(e.target.value)
        // Set Uploaded File Size
        formik.values.releaseFileSize = fileUploader.current.files[0].size;
        formik.handleChange('releaseFileSize')
        // Set Uploaded File Hash
        calculateFileChecksum(fileUploader.current.files[0], (hash) => formik.values.releaseFileChecksum = hash)
        formik.handleChange('releaseFileChecksum')
        // Set Uploaded File URL
        // First, make sure the values exist (if not, set the URL to a temporary URL and fix it on submit)
        if (formik.values.product === '' || formik.values.version === '' || formik.values.target === '') {
            formik.values.releaseFileURL = 'TEMPURLVALUESNOTFILLED'
        } else {
            // All values submitted, we can set the URL properly
            formik.values.releaseFileURL = process.env.NEXT_PUBLIC_FILE_SERVER_URL + `/pub/${formik.values.product}/${formik.values.version}/${formik.values.target}/${getFileName(e.target.value)}`
        }
        formik.handleChange('releaseFileURL')
    }
    return (
        <Layout uData={props.userData} isAuth={props.isAuth}>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Create new release</h1>
                    </div>
                </div>
            </Content>
            <form onSubmit={formik.handleSubmit}>
                <Content>
                    <div className={'flex-grid'}>
                        <MaterialTextField
                            label={"Release Name"} 
                            formID={"name"}
                            helperText={formik.errors.name ? formik.errors.name : `Release name for use within the Admin UI`}
                            onChange={formik.handleChange('name')}
                            value={formik.values.name} 
                            error={formik.errors.name ? true : false}
                            disabled={isSubmitting} />

                        <MaterialSelect
                            label={"Product"} 
                            formID={"product"}
                            helperText={formik.errors.product ? formik.errors.product : `Product to tag release under`}
                            onChange={formik.handleChange('product')}
                            value={formik.values.product} 
                            error={formik.errors.product ? true : false}
                            disabled={isSubmitting} >
                            <MenuItem value={'dot'}>Dot Browser</MenuItem>
                        </MaterialSelect>
                    </div>
                </Content>
                <Content primary visible={!advancedMode}>
                    <div className={'flex-grid'}>
                        <MaterialSelect
                            label={"Channel"} 
                            formID={"channel"}
                            helperText={formik.errors.channel ? formik.errors.channel : `Release Channel`}
                            onChange={formik.handleChange('channel')}
                            value={formik.values.channel} 
                            error={formik.errors.channel ? true : false}
                            disabled={isSubmitting} >
                            <MenuItem value={'release'}>Release</MenuItem>
                        </MaterialSelect>

                        <MaterialSelect
                            label={"Target"} 
                            formID={"target"}
                            helperText={formik.errors.target ? formik.errors.target : `Build Target`}
                            onChange={formik.handleChange('target')}
                            value={formik.values.target} 
                            error={formik.errors.target ? true : false}
                            disabled={isSubmitting} >
                            <MenuItem value={'Linux_x86_64-gcc3'}>Linux_x86_64-gcc3</MenuItem>
                        </MaterialSelect>
                    </div>
                    <div style={{ margin: 20 }} />
                    <div className={'flex-grid'}>
                        <MaterialSelect
                            label={"Locale"} 
                            formID={"locale"}
                            helperText={formik.errors.locale ? formik.errors.locale : `Locale for the release`}
                            onChange={formik.handleChange('locale')}
                            value={formik.values.locale} 
                            error={formik.errors.locale ? true : false}
                            disabled={isSubmitting} >
                            <MenuItem value={'en-GB'}>en-GB</MenuItem>
                        </MaterialSelect>

                        <MaterialTextField
                            label={"Version Number"} 
                            formID={"version"}
                            helperText={formik.errors.version ? formik.errors.version : `Version (Ex. 1.0)`}
                            onChange={formik.handleChange('version')}
                            value={formik.values.version} 
                            error={formik.errors.version ? true : false}
                            disabled={isSubmitting} />
                    </div>
                    <div style={{ margin: 20 }} />
                    <div className={'flex-grid'}>
                        <MaterialTextField
                            label={"Display Version Number"} 
                            formID={"displayversion"}
                            helperText={formik.errors.displayVersion ? formik.errors.displayVersion : `Version (Ex. 1.0 Beta 1)`}
                            onChange={formik.handleChange('displayVersion')}
                            value={formik.values.displayVersion} 
                            error={formik.errors.displayVersion ? true : false}
                            disabled={isSubmitting} />

                        <MaterialTextField
                            label={"Build ID"} 
                            formID={"buildID"}
                            helperText={formik.errors.buildID ? formik.errors.buildID : `Build ID (Ex. 20210225185804)`}
                            onChange={formik.handleChange('buildID')}
                            value={formik.values.buildID} 
                            error={formik.errors.buildID ? true : false}
                            disabled={isSubmitting} />
                    </div>
                    <div style={{ margin: 20 }} />
                    <div className={'flex-grid'}>
                        <MaterialTextField
                            label={"What's New URL"} 
                            formID={"whatsNewURL"}
                            helperText={formik.errors.whatsNewURL ? formik.errors.whatsNewURL : `URL that opens on start. Can feature %OLD_VERSION% (Ex. https://dothq.co/whatsnew/%OLD_VERSION%)`}
                            onChange={formik.handleChange('whatsNewURL')}
                            value={formik.values.whatsNewURL} 
                            error={formik.errors.whatsNewURL ? true : false}
                            disabled={isSubmitting} />

                        <MaterialTextField
                            label={"Release Notes URL"} 
                            formID={"releaseNotesURL"}
                            helperText={formik.errors.releaseNotesURL ? formik.errors.releaseNotesURL : `Release Notes URL (Ex. https://dothq.co/release/1.0)`}
                            onChange={formik.handleChange('releaseNotesURL')}
                            value={formik.values.releaseNotesURL} 
                            error={formik.errors.releaseNotesURL ? true : false}
                            disabled={isSubmitting} />
                    </div>
                    <div style={{ margin: 20 }} />
                    <div className={'flex-grid'}>
                        <MaterialCheckbox 
                            label={"Upload Release Files"}
                            formID={"fUploadCheckbox"}
                            helperText={'Upload release files, or specify a custom URL'}
                            onChange={() => setUploadingFiles(!isUploadingFiles)}
                            checked={isUploadingFiles} 
                            disabled={isSubmitting} />

                        <div style={{ display: isUploadingFiles ? 'initial' : 'none' }}>
                            <label className={'btn btn-primary'} htmlFor={"uploadFile"} style={{ marginRight: 10 }}>Upload Release File</label>
                                <input 
                                    type={'file'} 
                                    id={"uploadFile"} 
                                    multiple={false}
                                    onChange={e => uploadFile(e)}
                                    ref={fileUploader} 
                                    disabled={isSubmitting} />
                                <p>{getFileName(uploadedFile)}</p>
                        </div>

                        <div style={{ display: !isUploadingFiles ? 'initial' : 'none' }}>
                            <MaterialTextField
                                label={"Release File URL"} 
                                formID={"releaseFileURL"}
                                helperText={formik.errors.releaseFileURL ? formik.errors.releaseFileURL : `URL for Release File (Ex. https://cdn.dothq.co/%OS%/%LANG%/release.mar)`}
                                onChange={formik.handleChange('releaseFileURL')}
                                value={formik.values.releaseFileURL} 
                                error={formik.errors.releaseFileURL ? true : false}
                                disabled={isSubmitting} />
                        </div>
                    </div>
                    <div style={{ display: !isUploadingFiles ? 'initial' : 'none' }}>
                        <div style={{ margin: 20 }} />
                        <div className={'flex-grid'}>
                            <MaterialTextField
                                label={"Release File Size"} 
                                formID={"releaseFileSize"}
                                helperText={formik.errors.releaseFileSize ? formik.errors.releaseFileSize : `Size of Release File in Bytes`}
                                onChange={formik.handleChange('releaseFileSize')}
                                value={formik.values.releaseFileSize} 
                                error={formik.errors.releaseFileSize ? true : false}
                                disabled={isSubmitting} />

                            <MaterialTextField
                                label={"Release File SHA512 Checksum"} 
                                formID={"releaseFileChecksum"}
                                helperText={formik.errors.releaseFileChecksum ? formik.errors.releaseFileChecksum : `SHA512 Checksum for Release File`}
                                onChange={formik.handleChange('releaseFileChecksum')}
                                value={formik.values.releaseFileChecksum} 
                                error={formik.errors.releaseFileChecksum ? true : false}
                                disabled={isSubmitting} />
                        </div>
                    </div>
                </Content>
                <Content primary visible={advancedMode}>
                    <p>Advanced Mode is a work in progress!</p>
                </Content>
                <Content>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <Button
                            onClick={() => {activateAdvancedMode(!advancedMode)}}
                            color="secondary" 
                            variant="contained" 
                            disableElevation
                        >
                            {!advancedMode ? 'Simple' : 'Advanced'} Mode
                        </Button>
                        <div>
                            <Button variant="contained" color="primary" disabled={isSubmitting} disableElevation type={"submit"}>
                                Add Release
                            </Button>
                        </div>
                    </div>
                </div>
                </Content>
            </form>
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
        }).then((res) => { 
            if (res.data.success === 'userValid') {
                isAuth = true
            }
        })
    }

    if (isAuth) {
        await axios.post(`http://${context.req.headers.host}/api/id/getProfile`, {
            token: cookies.token
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


export default AddUpdate;