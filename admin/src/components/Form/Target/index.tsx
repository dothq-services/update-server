import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'

export const FormTargetSelector = () => {
    const [target, setTarget] = React.useState('');

    const handleTargetChange = (event) => {
        setTarget(event.target.value);
    };

    return (
        <FormControl 
            variant="outlined"
            fullWidth>
            <InputLabel>Target</InputLabel>
            <Select
                labelId="rTarget-label"
                id="rTarget"
                value={target}
                onChange={handleTargetChange}
                label="Target">
                <MenuItem value={'Darwin_x86_64-gcc3-u-i386-x86_64'}>Darwin_x86_64-gcc3-u-i386-x86_64</MenuItem>
                <MenuItem value={'Linux_x86-gcc3'}>Linux_x86-gcc3</MenuItem>
                <MenuItem value={'Linux_x86_64-gcc3'}>Linux_x86_64-gcc3</MenuItem>
                <MenuItem value={'WINNT_x86-msvc'}>WINNT_x86-msvc</MenuItem>
                <MenuItem value={'WINNT_x86_64-msvc'}>WINNT_x86_64-msvc</MenuItem>
            </Select>
            <FormHelperText>Target for a release</FormHelperText>
        </FormControl>
    )
}