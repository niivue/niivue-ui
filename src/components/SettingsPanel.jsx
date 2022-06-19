import { Drawer } from "@mui/material"
import { Box } from "@mui/material"
import { Button } from "@mui/material"
import { ColorPicker } from "./ColorPicker.jsx"
import {CrosshairSize} from "./CrosshairSize.jsx"

export function SettingsPanel({setColor, setCrosshairSize, open, setOpen, width=300}){
	function closeDrawer(){
		setOpen(false)		
	}
	return (
		<Drawer
      open={open}
			variant="persistent"
      anchor="left"
    >
		<Box sx={{
			width:width,
			role: 'presentation',
			display: 'flex',
			flexDirection:'column',
			justifyContent:'flex-start',
			}}
		>
			<Box
				sx={{
					display:'flex'
				}}>
				<Button onClick={closeDrawer}>
					close
				</Button>
			</Box>
			<ColorPicker setColor={setColor} title='Crosshair color' prop={'crosshairColor'}/>
			<ColorPicker setColor={setColor} title='Background color' prop={'backColor'}/>
			<ColorPicker setColor={setColor} title='Clip plane color' prop={'clipPlaneColor'}/>
			<ColorPicker setColor={setColor} title='Selection box color' prop={'selectionBoxColor'} initialAlpha={0.3}/>
			<CrosshairSize setCrosshairSize={setCrosshairSize} />
		</Box>
    </Drawer>
	)
}



