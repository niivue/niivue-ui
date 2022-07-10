import { Drawer } from "@mui/material"
import { Box } from "@mui/material"
import { IconButton } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function SettingsPanel(props){
	return (
		<Drawer
      open={props.open}
			variant="temporary"
      anchor="right"
      sx={{
        width: props.width,
      }}
    >
		<Box sx={{
			width:props.width,
			role: 'presentation',
			display: 'flex',
			flexDirection:'column',
			justifyContent:'flex-start',
			}}
		>
			<Box
				sx={{
					display:'flex',
          marginBottom: '10px'
				}}>
        <IconButton 
          onClick={props.toggleMenu}
          style={{marginRight:'auto'}}
        >
          <ArrowForwardIcon />
        </IconButton>
			</Box>
      {props.children}
		</Box>
    </Drawer>
	)
}



