import { Box, Divider, MenuItem } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import React from 'react'
import { display } from "@mui/system";

function makeColorGradients(colorMapValues) {
  let gradients = ''
  let c = colorMapValues
  let n = c.R.length
  gradients += `rgba(${c.R[n - 1]},${c.G[n - 1]},${c.B[n - 1]},${1})`
  gradients += `linear-gradient(90deg,`
  for (let j = 0; j < n; j++) {
    gradients += `rgba(${c.R[j]},${c.G[j]},${c.B[j]},${1}) ${(j / (n - 1)) * 100}%,`
  }
  gradients = gradients.slice(0, -1)
  gradients += ')'
  return gradients
}

export default function Layer(props) {
  const image = props.image
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [color, setColor] = React.useState(image.colorMap)
  let ArrowIcon = detailsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
  console.log(props.colorMapValues)
  let allColors = image.colorMaps().map((colorName) => {
    return (
      <MenuItem value={colorName} key={colorName}>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {colorName}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '20%',
              ml: 'auto'
            }}
            style={{
              background: makeColorGradients(props.getColorMapValues(colorName))
            }}
          >
          </Box>

        </Box>
      </MenuItem>
    )
  })

  function handleDetails() {
    setDetailsOpen(!detailsOpen)
  }

  function handleColorChange(event) {
    let clr = event.target.value
    let id = image.id
    console.log(clr)
    console.log(id)
    props.onColorMapChange(id, clr)
    setColor(clr)
  }

  function handleDelete() {
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
            alignItems: 'center',
            flexWrap: 'wrap', // useful for handling long file names
          }}
        >
          <Typography
            sx={{
              wordBreak: 'break-word', // wrap long names
              flexBasis: '75%' // allow for name wrapping for long names and alignment to the button
            }}
          >
            {image.name}
          </Typography>

          <IconButton
            onClick={handleDetails}
            style={{ marginLeft: 'auto' }}
          >
            {ArrowIcon}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: detailsOpen ? 'flex' : 'none',
            flexDirection: 'column'
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}
            m={1}
          >
            <IconButton
            >
              <KeyboardDoubleArrowUpIcon />
            </IconButton>

            <IconButton
            >
              <KeyboardArrowUpIcon />
            </IconButton>

            <IconButton
            >
              <KeyboardArrowDownIcon />
            </IconButton>

            <IconButton
            >
              <KeyboardDoubleArrowDownIcon />
            </IconButton>

          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}
            m={1}
          >
            <FormControl>
              <InputLabel>Color</InputLabel>
              <Select
                style={{ width: '200px' }}
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
