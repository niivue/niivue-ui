import { Drawer } from "@mui/material"
import { Box } from "@mui/material"
import { CrosshairColorPicker } from "./CrosshairColorPicker"
import { Button } from "@mui/material"

export function SettingsPanel({nv, open, setOpen, width=300}){
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
			<Box
				sx={{
					display:'flex'
				}}>
				<CrosshairColorPicker nv={nv}/>
			</Box>
		</Box>
    </Drawer>
	)
}



