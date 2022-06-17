import { Grid } from "@mui/material"
import { Typography } from "@mui/material"
import { Input } from "@mui/material"
import { useState } from "react"

export function CrosshairColorPicker({nv}){
	const [crosshairColor, setCrosshairColor] = useState('#ff0000')
	function hex2rgb(h) {
		return [
			parseInt(h.substring(1,3), 16),
			parseInt(h.substring(3, 5), 16),
			parseInt(h.substring(5), 16)
		]
	}

	function updateCrosshairColor(hex){
		let rgb = hex2rgb(hex)
		let rgba01 = rgb.map(val=>(val/255))
		rgba01.push(1)
		setCrosshairColor(hex)
		nv.setCrosshairColor(rgba01)
	}

	return (
	<Grid container m={2}>
		<Grid item marginRight='auto'>
			<Typography>
				Crosshair color
			</Typography>
		</Grid>
		<Grid item>
			<Input 
				disableUnderline={true}
				type='color'
				style={{width:'50px', height:'20px'}}
				onInput={(e)=>{updateCrosshairColor(e.target.value);}}
				value={crosshairColor}
			/>
		</Grid>
	</Grid>
	)
}
