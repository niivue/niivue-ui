import { Grid } from "@mui/material"
import { Typography } from "@mui/material"
import { Input } from "@mui/material"
import { Box } from "@mui/material"
import { useState } from "react"

export function ColorPicker({setColor, prop, title, initialAlpha=1}){
	const [colorHex, setColorHex] = useState('#ff0000')
	const [colorAlpha, setColorAlpha] = useState(initialAlpha)
	function hex2rgb(h) {
		return [
			parseInt(h.substring(1,3), 16),
			parseInt(h.substring(3, 5), 16),
			parseInt(h.substring(5), 16)
		]
	}

	function updateColor(hex, a){
		a = Number(a)
		let rgb = hex2rgb(hex)
		let rgba01 = rgb.map(val=>(val/255))
		rgba01.push(a)
		setColorHex(hex)
		setColorAlpha(a)
		setColor(prop, rgba01)
	}

	return (
		<Box
			sx={{
				display:'flex'
			}}>
			<Grid container m={2}>
				<Grid item marginRight='auto'>
					<Typography>
						{title}
					</Typography>
				</Grid>
				<Grid item>
					<Input 
						disableUnderline={true}
						type='color'
						style={{width:'50px', height:'20px'}}
						onInput={(e)=>{updateColor(e.target.value, colorAlpha);}}
						value={colorHex}
					/>
				</Grid>
				<Grid item>
					<Input
						size='small'
						style={{marginLeft:4}}
						value={colorAlpha}
						inputProps={{
							step: 0.1,
							min: 0,
							max: 1,
							type: 'number'
						}}
						onInput={(e)=>{updateColor(colorHex, e.target.value);}}
					/>
				</Grid>
			</Grid>
		</Box>
	)
}
