import { TextField, MenuItem } from '@mui/material';

import Genres from '../GenresEnum';

const GenresSelect = ({ value, onChange }) => {
    return (
        <TextField
            select
            fullWidth
            label={'Genre'}
            value={value}
            onChange={onChange}
            variant={'outlined'}
        >
            <MenuItem value=''>Not Set Yet</MenuItem>
            {Object.values(Genres).map((genre, index) => (
                <MenuItem key={index} value={genre}>
                    {genre}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default GenresSelect;