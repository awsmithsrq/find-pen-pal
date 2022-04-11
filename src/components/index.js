import "../styles.css"
import { useReducer, useEffect } from "react"
import { Button } from "@mui/material"
import {
  TextField,
  RadioGroup,
  Checkbox,
  FormControl,
  Radio,
  FormControlLabel,
  Grid,
  Switch,
  FormLabel
} from "@mui/material"

const reducer = (state, newState) => ({ ...state, ...newState })
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "female",
  toggleMore: false,
  tellUsAboutYou: "",
  agreeToTerms: false,
  resetButtonDisabled: true,
  submitButtonDisabled: true,
  pristine: true
}
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
    pristine
  } = state

  useEffect(() => {
    if (firstName && lastName && email && agreeToTerms) {
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
      setState({ resetButtonDisabled: false, pristine: false })
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
    resetButtonDisabled
  ])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid container xl={6} style={{ background: "#efefef", padding: 20 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Sign up for your Secret Penpal!</h1>
        </Grid>
        <Grid item xs={3}>
          <TextField
            required
            error={!pristine && !firstName}
            helperText="Please Enter First Name"
            id="standard-basic"
            label="First Name"
            variant="standard"
            onChange={(e) => {
              setState({ firstName: e.target.value })
            }}
            value={firstName}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            required
            error={!pristine && !lastName}
            helperText="Please Enter Last Name"
            id="standard-basic"
            label="Last Name"
            variant="standard"
            onChange={(e) => {
              setState({ lastName: e.target.value })
            }}
            value={lastName}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            error={!pristine && !email}
            helperText="Please Enter Email"
            required
            id="outlined-basic"
            label="Email"
            variant="standard"
            onChange={(e) => {
              setState({ email: e.target.value })
            }}
            value={email}
          />
        </Grid>

        <Grid item xs={12}>
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
        <Grid container>
          <FormControlLabel
            onChange={() => {
              setState({ toggleMore: !toggleMore })
            }}
            control={<Switch />}
            checked={toggleMore}
            label="Would you like to share your personal information for us to sell?"
          />
        </Grid>
        <Grid>
          {toggleMore && (
            <TextField xs={12} multiline label="Enter your Personal Info!" />
          )}
        </Grid>
        <Grid xs={12}>
          <FormControlLabel
            error
            helperText="You Must Agree To Harvest"
            required
            onChange={() => {
              setState({ agreeToTerms: !agreeToTerms })
            }}
            checked={agreeToTerms}
            control={<Checkbox />}
            label="Do you agree for us to harvest you?"
          />
        </Grid>
        <Grid>
          <Button
            onClick={() => {
              setState({ ...initialState })
            }}
            disabled={resetButtonDisabled}
            variant="outlined"
            style={{ color: resetButtonDisabled ? "grey" : "red" }}
          >
            Reset
          </Button>
        </Grid>
        <Grid xs>
          <Button disabled={submitButtonDisabled} variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
