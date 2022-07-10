import { Typography } from "@mui/material"
import { Input } from "@mui/material"
import { Box } from "@mui/material"
import React from 'react'

export function ColorPicker(props){
  console.log(props)
  const [hexColor, setHexColor] = React.useState('#ff0000')
  React.useEffect(()=>{
    setHexColor(rgb2Hex(rgb01Torgb255(props.colorRGB01)))
  }, [])

  function rgb01Torgb255(rgb01){
    return [
      Math.round(rgb01[0]) * 255,
      Math.round(rgb01[1]) * 255,
      Math.round(rgb01[2]) * 255,
    ]
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

  function rgb2Hex(rgb255) {
    return "#" + componentToHex(rgb255[0]) + componentToHex(rgb255[1]) + componentToHex(rgb255[2]);
  }

  function hex2rgb(h) {
    return [
      parseInt(h.substring(1,3), 16),
      parseInt(h.substring(3, 5), 16),
      parseInt(h.substring(5), 16)
    ]
  }

  function updateColor(hex){
    setHexColor(hex)
    let rgb = hex2rgb(hex)
    let rgb01 = rgb.map(val=>(val/255))
    props.setColor(rgb01)
  }

  return (
    <Box
      sx={{
        display:'flex',
      }}
      m={1}
    >
        <Typography 
          style={{
           marginRight: 'auto'
          }}>
          {props.title}
        </Typography>
        <Input 
          disableUnderline={true}
          type='color'
          style={{width:'50px', height:'20px'}}
          onInput={(e)=>{updateColor(e.target.value);}}
          value={hexColor}
        />
    </Box>
  )
}
