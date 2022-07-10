import { Box} from "@mui/material"
import { Typography } from "@mui/material"
import { Input } from "@mui/material"
import React from "react"

export function NumberPicker(props){
	const [value, setValue] = React.useState(props.value)
  React.useEffect(()=>{
    setValue(props.value)
  },[])

	function handleNumberInput(event){
    let v = event.target.value
		if (v < props.min) {
			v = props.min
		}
    if (v > props.max) {
      v = props.max
    }
		setValue(v)
		props.onChange(v)
	}

	return (
	<Box
		sx={{
			display:'flex'
		}}
    m={1}
  >
      <Typography
        style={{
          marginRight: 'auto'
        }}
      >
        {props.title}
      </Typography>
      <Input 
        disableUnderline={true}
        type='number'
        style={{width:'50px', height:'20px'}}
        onInput={handleNumberInput}
        value={value}
        inputProps={{
          step: props.step
        }}
      />
	</Box>
	)
}
