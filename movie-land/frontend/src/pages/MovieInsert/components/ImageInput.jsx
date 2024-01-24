
import { TextField, Box } from '@mui/material';

const ImageInput = ({ onChange }) => {
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            onChange(file);
        } else {
            alert('Please select a valid image file.');
            onChange(null);
        }

    };

    return (
        <Box>
            <TextField
                fullWidth
                label={'Upload Image'}
                type={'file'}
                accept={'image/*'}
                onChange={handleImageChange}
                InputLabelProps={{ shrink: true }}
            />
        </Box>
    );
};

export default ImageInput;