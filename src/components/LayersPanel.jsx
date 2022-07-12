import { Drawer } from "@mui/material"
import { Box } from "@mui/material"
import { Typography } from "@mui/material"
import { IconButton } from "@mui/material"
import { Button } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GestureIcon from "@mui/icons-material/Gesture"
import LayersIcon from "@mui/icons-material/Layers"
import AddIcon from '@mui/icons-material/Add'

export function LayersPanel(props){
  function handleAddLayer(){
    let input = document.createElement('input')
    input.type = 'file'
    input.onchange = async function (){
      props.onAddLayer(input.files[0])
    }
    input.click()
  }

	return (
		<Drawer
      open={props.open}
			variant="temporary"
      anchor="left"
      sx={{
        width: props.width,
      }}
    >
      <Box
        sx={{
          width: props.width,
          display: 'flex',
          flexDirection: 'row',
          height: '100%'
        }}
      >
        <Box
          sx={{
            width: 48,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F8F8F8',
            height: '100%',
            alignItems: 'center'
          }}
        >
          <IconButton
            style={{
              marginTop: '36px'
            }}
          >
            <LayersIcon color='primary' />
          </IconButton>
          <IconButton
            style={{
              marginTop: '8px'
            }}
          >
            <GestureIcon />
          </IconButton>
        </Box>
        <Box sx={{
          width:props.width,
          role: 'presentation',
          display: 'flex',
          height: '100%',
          flexDirection:'column',
          justifyContent:'flex-start',
          ml: 1,
          mr: 1
          }}
        >
          <Box
            sx={{
              display:'flex'
            }}>
            <IconButton 
              onClick={props.onToggleMenu}
              style={{marginLeft:'auto'}}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display:'flex',
            }}   
          >
            <Button
              onClick={handleAddLayer}
              endIcon={<AddIcon />}
              size='small'
            >
              Add Layer
            </Button>
          </Box>
          {props.children}
        </Box>

      </Box>

      
    </Drawer>
	)
}



