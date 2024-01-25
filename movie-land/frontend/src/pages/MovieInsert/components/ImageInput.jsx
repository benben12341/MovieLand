
import { TextField, Typography, Box } from '@mui/material';

const ImageInput = ({ onChange, initialImage = null }) => {
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
            {!initialImage ? (
                <TextField
                    fullWidth
                    label={'Upload Image'}
                    type={'file'}
                    accept={'image/*'}
                    onChange={handleImageChange}
                    InputLabelProps={{ shrink: true }}
                />)
                :
                (<Typography variant="caption" color="textSecondary">
                    Selected Image: {initialImage}
                </Typography>)}
        </Box>
    );
};

export default ImageInput;