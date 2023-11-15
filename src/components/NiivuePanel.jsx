import React from 'react'
import { Box } from '@mui/material'

export function NiivuePanel(props) {
  const canvas = React.useRef(null)
  React.useEffect(() => {
    function handleResize() {
      const rect = canvas.current.parentNode.getBoundingClientRect()
      canvas.current.width = rect.width
      canvas.current.height = rect.height
      console.log(canvas.current.width, canvas.current.height)
    }
    const nv = props.nv
    const rect = canvas.current.parentNode.getBoundingClientRect()
    canvas.current.width = rect.width
    canvas.current.height = rect.height
    nv.attachToCanvas(canvas.current)
    nv.loadVolumes(props.volumes).then(() => {
      window.addEventListener('resize', handleResize)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [canvas, props.nv, props.volumes])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start'
      }}
    >
      <canvas ref={canvas} width={640} />
    </Box>
  )
}
