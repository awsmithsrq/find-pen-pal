import '../styles.css'
import { useReducer, useEffect } from 'react'
import reaper from '../images/reaper.jpeg'
import { Button } from '@mui/material'
import {
  TextField,
  RadioGroup,
  Checkbox,
  FormControl,
  Radio,
  FormControlLabel,
  Grid,
  Switch,
  FormLabel,
} from '@mui/material'

const reducer = (state, newState) => ({ ...state, ...newState })
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  gender: 'female',
  toggleMore: false,
  tellUsAboutYou: '',
  agreeToTerms: false,
  resetButtonDisabled: true,
  submitButtonDisabled: true,
  pristine: true,
  emailError: false,
}
const expression = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
const App = () => {
  const [state, setState] = useReducer(reducer, initialState)
  const {
    resetButtonDisabled,
    firstName,
    lastName,
    email,
    gender,
    toggleMore,
    tellUsAboutYou,
    agreeToTerms,
    submitButtonDisabled,
    pristine,
    emailError,
  } = state

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      email &&
      agreeToTerms &&
      !emailError &&
      !pristine
    ) {
      setState({ submitButtonDisabled: false })
    } else if (
      firstName ||
      lastName ||
      email ||
      agreeToTerms ||
      tellUsAboutYou ||
      toggleMore ||
      gender !== initialState.gender
    ) {
      setState({
        resetButtonDisabled: false,
        pristine: false,
        submitButtonDisabled: true,
      })
    } else {
      setState({ submitButtonDisabled: true, resetButtonDisabled: true })
    }
  }, [
    firstName,
    lastName,
    email,
    gender,
    toggleMore,
    tellUsAboutYou,
    agreeToTerms,
    submitButtonDisabled,
    resetButtonDisabled,
    emailError,
    pristine,
  ])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid container xl={6} style={{ background: '#efefef', padding: 20 }}>
        <img src={reaper} style={{ margin: '0 auto' }} alt="Reaper" />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Sign Up To Have Your Data Harvested!</h1>
        </Grid>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <TextField
              helperText={!pristine && !firstName && 'Please enter first name.'}
              required
              fullWidth
              error={!pristine && !firstName}
              id="standard-basic"
              label="First Name"
              variant="standard"
              onChange={(e) => {
                setState({ firstName: e.target.value })
              }}
              value={firstName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              helperText={!pristine && !lastName && 'Please enter last name.'}
              error={!pristine && !lastName}
              id="standard-basic"
              label="Last Name"
              variant="standard"
              onChange={(e) => {
                setState({ lastName: e.target.value })
              }}
              value={lastName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              onBlur={() => {
                const result = expression.test(email)
                if (!result) {
                  setState({ emailError: true })
                } else {
                  setState({ emailError: false })
                }
              }}
              error={(!pristine && !email) || emailError}
              helperText={
                ((!pristine && !email) || emailError) &&
                'Please enter your email address.'
              }
              required
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="standard"
              onChange={(e) => {
                setState({ email: e.target.value })
              }}
              value={email}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className="itemMargin">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={gender}
              onChange={(e) => {
                setState({ gender: e.target.value })
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container className="itemMargin">
          <FormControlLabel
            onChange={() => {
              setState({ toggleMore: !toggleMore })
            }}
            control={<Switch />}
            checked={toggleMore}
            label="Would you like to share your personal information for us to sell?"
          />
        </Grid>
        <Grid item xs={12} className="itemMargin">
          {toggleMore && (
            <TextField fullWidth multiline label="Enter your Personal Info!" />
          )}
        </Grid>
        <Grid container className="itemMargin">
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setState({ ...initialState })
              }}
              disabled={resetButtonDisabled}
              variant="outlined"
              style={{ color: resetButtonDisabled ? 'grey' : 'red' }}
            >
              Reset
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            container
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <FormControlLabel
              required
              onChange={() => {
                setState({ agreeToTerms: !agreeToTerms })
              }}
              checked={agreeToTerms}
              control={<Checkbox />}
              label="Do you agree for us to harvest you?"
            />
            <Button disabled={submitButtonDisabled} variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
