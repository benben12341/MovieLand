import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { getUserDetails, updateUserProfile } from "../../actions/userActions"

import {
  Box,
  TextField,
  Button,
} from "@mui/material";
import {
  container,
  inputContainer,
  submitButton,
} from ".././/../pages/Login/components/styles";

const Profile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password] = useState("")
  const [confirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user.name || user._id !== userInfo.id) {
        dispatch(getUserDetails(userInfo.id))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [navigate, userInfo, dispatch, user])

  useEffect(() => {
    if (userUpdateProfile.userInfo) {
      setName(userUpdateProfile.userInfo.name)
      setEmail(userUpdateProfile.userInfo.email)
    }
  }, [success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(updateUserProfile({ user: { _id: userInfo.id, name, email, password } }))
    }
  }

  return (
    <div className='row' style={{ width: '100%' }}>
      <div className='col-md-3 m-auto pt-5' style={{ marginBottom: '20px' }}>
        {message && <Message variant='alert-danger'>{message}</Message>}
        {error && <Message variant='alert-danger'>{error}</Message>}
        {success && <Message variant='alert-success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Box sx={container} style={{ textAlign: 'center' }}>
          <h2 className='text-center' style={{ color: '#0e5540', marginBottom: '20px' }}>User Profile</h2>
          <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left' }}>
            <label className='form-label' htmlFor='name'>
              Name:
            </label>
            <TextField
              sx={inputContainer}
              placeholder="Enter Name"
              value={name || ''}
              id="name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left', marginTop: '15px' }}>
            <label className='form-label' htmlFor='email'>
              Email:
            </label>
            <TextField
              sx={inputContainer}
              placeholder="Enter Email"
              value={email}
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button sx={{
            ...submitButton, marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '15px',
            backgroundColor: 'rgb(14, 85, 64)'
          }} onClick={submitHandler}>
            {"Update"}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Profile