import React from 'react'

export function NiivuePanel(props) {
  const canvas = React.useRef(null)

  React.useEffect(() => {
    const nv = props.nv
    nv.attachToCanvas(canvas.current)
    nv.loadVolumes(props.volumes)
  }, [canvas, props.nv, props.volumes])

  return <canvas style={{ flexGrow: 1 }} ref={canvas} />
}
