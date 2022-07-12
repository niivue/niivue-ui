import { Box} from "@mui/material"
import { Typography } from "@mui/material"
import { Switch } from "@mui/material"
import React from "react"

export default function NVSwitch(props){

  function handleChange(){
    props.onChange()
  }

  return (
    <Box
      sx={{
        display:'flex',
        alignItems: 'center'
      }}
      m={1}
    >
        <Typography
          onClick={handleChange}
          style={{
            marginRight: 'auto'
          }}
        >
          {props.title}
        </Typography>
        <Switch
          checked={props.checked}
          onChange={handleChange}
        >
        </Switch>
    </Box>
	)  
}
