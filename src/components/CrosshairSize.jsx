import { Box} from "@mui/material"
import { Typography } from "@mui/material"
import { Input } from "@mui/material"
import { useState, useEffect } from "react"

export function CrosshairSize(props){
	const [size, setSize] = useState(props.size)

	function handleCrosshairSize(event){
    let w = event.target.value
		if (w < 0) {
			w = 0
		}
		setSize(w)
		props.onCrosshairSizeChange(w)
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
        Crosshair size
      </Typography>
      <Input 
        disableUnderline={true}
        type='number'
        style={{width:'50px', height:'20px'}}
        onInput={handleCrosshairSize}
        value={size}
      />
	</Box>
	)
}
