import React from 'react'
import { Box, Menu } from "@mui/material"
import { IconButton } from "@mui/material"
import {FormControl} from "@mui/material"
import {Select} from "@mui/material"
import {MenuItem} from "@mui/material"
import {InputLabel} from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu'
import LayersIcon from '@mui/icons-material/Layers'

export default function Toolbar(props){
  const [sliceType, setSliceType] = React.useState('multi')
  
  function handleSliceTypeChange(e){
    let newSliceType = e.target.value
    let nvUpdateSliceType = props.nvUpdateSliceType
    setSliceType(newSliceType)
    nvUpdateSliceType(newSliceType)
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        width: '100%',
        height: '64px',
        flexDirection: 'row',
        justifyItems: 'left',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      
      <IconButton 
        onClick={props.toggleLayers}
      >
        <MenuIcon />
      </IconButton>
  
      <FormControl 
        size='small'
        sx={{
          m:2,
          minWidth: 120
        }}>
        <InputLabel id="slice-type-label">Display mode</InputLabel>
        <Select
          labelId="slice-type-label"
          id="slice-type"
          value={sliceType}
          label="Display mode"
          onChange={handleSliceTypeChange}
        >
          <MenuItem value={'axial'}>Axial</MenuItem>
          <MenuItem value={'coronal'}>Coronal</MenuItem>
          <MenuItem value={'sagittal'}>Sagittal</MenuItem>
          <MenuItem value={'multi'}>Multi</MenuItem>
          <MenuItem value={'3d'}>3D</MenuItem>
        </Select>
</FormControl>

      <IconButton 
        onClick={props.toggleSettings}
        style={{
          marginLeft:'auto'
        }}
      >
        <SettingsIcon />
      </IconButton>
    </Box>
  )
}

