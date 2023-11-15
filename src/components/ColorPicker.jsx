import { Typography, Input, Box } from '@mui/material'
import React from 'react'

export function ColorPicker(props) {
  const [hexColor, setHexColor] = React.useState('#ff0000')
  React.useEffect(() => {
    function rgb2Hex(rgb255) {
      return '#' + componentToHex(rgb255[0]) + componentToHex(rgb255[1]) + componentToHex(rgb255[2])
    }

    const rgb255 = rgb01Torgb255(props.colorRGB01)
    const hex = rgb2Hex(rgb255)
    console.log(props.title)
    console.log(rgb255)
    console.log(hex)
    console.log('end use effect')
    setHexColor(hex)
  }, [props.colorRGB01, props.title])

  function rgb01Torgb255(rgb01) {
    return [Math.round(rgb01[0] * 255), Math.round(rgb01[1] * 255), Math.round(rgb01[2] * 255)]
  }

  function componentToHex(c) {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  function hex2rgb(h) {
    return [parseInt(h.substring(1, 3), 16), parseInt(h.substring(3, 5), 16), parseInt(h.substring(5), 16)]
  }

  function updateColor(event) {
    const hex = event.target.value
    console.log(hex)
    setHexColor(hex)
    const rgb = hex2rgb(hex)
    const rgb01 = rgb.map((val) => val / 255)
    props.onSetColor(rgb01)
  }

  return (
    <Box
      sx={{
        display: 'flex'
      }}
      m={1}
    >
      <Typography
        style={{
          marginRight: 'auto'
        }}
      >
        {props.title}
      </Typography>
      <Input
        disableUnderline={false}
        autoFocus={false}
        type="color"
        style={{
          width: '50px',
          height: '20px'
        }}
        onInput={updateColor}
        value={hexColor}
      />
    </Box>
  )
}
