import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'

export const FormLocaleSelector = () => {
    const [locale, setLocale] = React.useState('');

    const handleLocaleChange = (event) => {
        setLocale(event.target.value);
    };

    return (
        <FormControl 
            variant="outlined"
            fullWidth>
            <InputLabel>Locale</InputLabel>
            <Select
                labelId="rLocale-label"
                id="rLocale"
                value={locale}
                onChange={handleLocaleChange}
                label="Locale">
                <MenuItem value={'en-US'}>en-US</MenuItem>
                <MenuItem value={'en-GB'}>en-GB</MenuItem>
                <MenuItem value={'en-AU'}>en-AU</MenuItem>
            </Select>
            <FormHelperText>Locale for a release</FormHelperText>
        </FormControl>
    )
}