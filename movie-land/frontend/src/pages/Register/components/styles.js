const container = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '20px',
};

const centeredContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const loginTitle = {
  alignSelf: 'start',
};

const inputContainer = {
  margin: '5px 0px',
  width: '375px',
};

const submitButton = {
  backgroundColor: '#5d7afd',
  color: 'white',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#274bef',
  },
};

const textFieldLabel = {
  '& .MuiInputBase-root': { '& input': { textAlign: 'right' } },
};

const text = {
  margin: '0px 5px',
};

export {
  container,
  centeredContainer,
  loginTitle,
  inputContainer,
  submitButton,
  textFieldLabel,
  text,
};
