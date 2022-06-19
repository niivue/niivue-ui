import { Box, Grid } from "@mui/material"
import { Typography } from "@mui/material"
import { Input } from "@mui/material"
import { useState, useEffect } from "react"

export function CrosshairSize({setCrosshairSize}){
	const [size, setSize] = useState(2)

	useEffect(()=> {
		updateCrosshairSize(size)
	}, [])

	function updateCrosshairSize(w){
		if (w < 0) {
			w = 0
		}
		setSize(w)
		setCrosshairSize(w)
	}

	return (
	<Box
		sx={{
			display:'flex'
		}}>
		<Grid container m={2}>
			<Grid item marginRight='auto'>
				<Typography>
					Crosshair size
				</Typography>
			</Grid>
			<Grid item>
				<Input 
					disableUnderline={true}
					type='number'
					style={{width:'50px', height:'20px'}}
					onInput={(e)=>{updateCrosshairSize(e.target.value);}}
					value={size}
				/>
			</Grid>
		</Grid>
	</Box>
	)
}
