import { Box, Divider, MenuItem } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

export default function Layer(props){
  const image = props.image
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [color, setColor] = React.useState(image.colorMap)
  let ArrowIcon = detailsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> 
  let allColors = image.colorMaps().map((colorName) => {
    return (<MenuItem value={colorName} key={colorName}>{colorName}</MenuItem>)
  })
  
  function handleDetails(){
    setDetailsOpen(!detailsOpen)
  }

  function handleColorChange(event){
    let clr = event.target.value
    let id = image.id
    console.log(clr)
    props.onColorMapChange(id, clr)
    setColor(clr)
  }

  function handleDelete(){
    props.onRemoveLayer(image)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper 
        elevation={2}
        sx={{
          marginTop: 0.5,
          marginBottom: 0.5
        }}
      >
        <Box 
          sx={{
            margin: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Typography>
            {image.name}
          </Typography>
          <IconButton 
            onClick={handleDetails}
            style={{marginLeft:'auto'}}
          >
            {ArrowIcon}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: detailsOpen ? 'flex' : 'none'
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection:'row',
              justifyContent: 'space-between',
              width: '100%'
            }}
            m={1}
          >
            <FormControl>
              <InputLabel>Color</InputLabel>
              <Select
                style={{width: '200px'}}
                value={color}
                label='Color'
                size='small'
                onChange={handleColorChange}
              >
                {allColors}
              </Select>
            </FormControl>
            <IconButton
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
