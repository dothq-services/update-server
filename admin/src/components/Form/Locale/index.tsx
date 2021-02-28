import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'

export const FormLocaleSelector = ({ locales }: { locales: string[] }) => {
    const [locale, setLocale] = React.useState('');

    React.useEffect(() => {
        if(typeof(locales) == "undefined") return;

        setLocale(locales[0])
    })

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
                label="Locale"
            >
                {locales && locales.map((l, key) => (
                    <MenuItem key={l} value={l}>{l}</MenuItem>
                ))}  
            </Select>
            <FormHelperText>Locale for a release</FormHelperText>
        </FormControl>
    )
}