import React from 'react'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { Fade} from '@mui/material'
import { Popper } from '@mui/material'
import { Paper } from '@mui/material'
import { Niivue, NVImage} from '@niivue/niivue'
import Toolbar from './components/Toolbar.jsx'
import {SettingsPanel} from './components/SettingsPanel.jsx'
import {ColorPicker} from './components/ColorPicker.jsx'
import {NumberPicker} from './components/NumberPicker.jsx'
import { LayersPanel } from './components/LayersPanel.jsx'
import { NiivuePanel } from './components/NiivuePanel.jsx'
import NVSwitch from './components/Switch.jsx'
import LocationTable from './components/LocationTable.jsx'
import Layer from './components/Layer.jsx'
import './Niivue.css'

const nv = new Niivue({
  loadingText: 'loading...'
})

// The NiiVue component wraps all other components in the UI. 
// It is exported so that it can be used in other projects easily
export default function NiiVue(props) {
  const [openSettings, setOpenSettings] = React.useState(false)
  const [openLayers, setOpenLayers] = React.useState(false)
  const [crosshairColor, setCrosshairColor] = React.useState(nv.opts.crosshairColor)
  const [selectionBoxColor, setSelectionBoxColor] = React.useState(nv.opts.selectionBoxColor)
  const [backColor, setBackColor] = React.useState(nv.opts.backColor)
  const [clipPlaneColor, setClipPlaneColor] = React.useState(nv.opts.clipPlaneColor)
  const [layers, setLayers] = React.useState(nv.volumes)
  const [cornerText, setCornerText] = React.useState(false)
  const [radiological, setRadiological] = React.useState(false)
  const [crosshair3D, setCrosshair3D] = React.useState(false)
  const [textSize, setTextSize] = React.useState(nv.opts.textHeight)
  const [colorBar, setColorBar] = React.useState(nv.opts.isColorbar)
  const [worldSpace, setWorldSpace] = React.useState(nv.opts.isSliceMM)
  const [clipPlane, setClipPlane] = React.useState(nv.currentClipPlaneIndex > 0 ? true : false)
  // TODO: add crosshair size state and setter
  const [crosshairOpacity, setCrosshairOpacity] = React.useState(nv.opts.crosshairColor[3])
  const [clipPlaneOpacity, setClipPlaneOpacity] = React.useState(nv.opts.clipPlaneColor[3])
  const [locationTableVisible, setLocationTableVisible] = React.useState(false)
  const [locationData, setLocationData] = React.useState([])
  const [decimalPrecision, setDecimalPrecision] = React.useState(2)

  // only run this when the component is mounted on the page
  // or else it will be recursive and continuously add all
  // initial images supplied to the NiiVue component
  //
  // All subsequent imgaes should be added via a
  // button or drag and drop
  React.useEffect(()=>{
    props.volumes.map(async (vol)=>{
      let image = await NVImage.loadFromUrl({url:vol.url})
      nv.addVolume(image)
      setLayers([...nv.volumes])
    })
  }, [])

  nv.opts.onImageLoaded = ()=>{
    setLayers([...nv.volumes])
  }

  nv.opts.onLocationChange = (data)=>{
    setLocationData(data.values)
  }
  // construct an array of <Layer> components. Each layer is a NVImage or NVMesh 
  const layerList = layers.map((layer) => {
    return (
      <Layer 
        key={layer.name} 
        image={layer}
        onColorMapChange={nvUpdateColorMap}
        onRemoveLayer={nvRemoveLayer}
      />
    )
  })

  async function addLayer(file){
    const nvimage = await NVImage.loadFromFile({
      file: file
    })
    nv.addVolume(nvimage)
    setLayers([...nv.volumes])
  }

  function toggleSettings(){
    setOpenSettings(!openSettings)
  }

  function toggleLayers(){
    setOpenLayers(!openLayers)
  }

  function toggleLocationTable(){
    setLocationTableVisible(!locationTableVisible)
  }

  function nvUpdateCrosshairColor(rgb01, a=1){
    setCrosshairColor([...rgb01, a])
    nv.setCrosshairColor([...rgb01, a])
  }

  function nvUpdateBackColor(rgb01, a=1){
    setBackColor([...rgb01, a])
    nv.opts.backColor = [...rgb01, a]
    nv.drawScene()
  }

  function nvUpdateClipPlaneColor(rgb01, a=1){
    setClipPlaneColor([...rgb01, a])
    nv.opts.clipPlaneColor = [...rgb01, a]
    setClipPlane(true)
    nv.setClipPlane([0, 270, 0]) //left
    nv.updateGLVolume()
  }

  function nvUpdateClipPlane(){
    if (!clipPlane){
      setClipPlane(true)
      nv.setClipPlane([0, 270, 0]) //left
    } else {
      setClipPlane(false)
      nv.setClipPlane([2, 0, 0]) //none
    }
  }

  function nvUpdateColorBar(){
    setColorBar(!colorBar)
    nv.opts.isColorbar = !colorBar
    nv.drawScene()
  }

  function nvUpdateTextSize(v) {
    setTextSize(v)
    nv.opts.textHeight = v
    nv.drawScene()
  }

  function updateDecimalPrecision(v){
    setDecimalPrecision(v)
  }

  function nvUpdateWorldSpace(){
    nvUpdateCrosshair3D(!worldSpace)
    setWorldSpace(!worldSpace)
    nv.setSliceMM(!worldSpace)
  }

  function nvUpdateCornerText(){
    nv.setCornerOrientationText(!cornerText)
    setCornerText(!cornerText)
  }

  function nvUpdateCrosshair3D(){
    nv.opts.show3Dcrosshair = !crosshair3D
    nv.updateGLVolume()
    setCrosshair3D(!crosshair3D)
  }

  function nvUpdateRadiological(){
    nv.setRadiologicalConvention(!radiological)
    setRadiological(!radiological)
  }

  function nvUpdateCrosshairOpacity(a){
    nv.setCrosshairColor([
      crosshairColor[0],
      crosshairColor[1],
      crosshairColor[2],
      a
    ])
    setCrosshairOpacity(a)
  }

  function nvUpdateClipPlaneOpacity(a){
    nv.opts.clipPlaneColor = [
      clipPlaneColor[0],
      clipPlaneColor[1],
      clipPlaneColor[2],
      a
    ]
    setClipPlaneOpacity(a)
    nv.updateGLVolume()
  }

  function nvUpdateCrosshairSize(w){
    nv.opts.crosshairWidth = w
    nv.drawScene()
  }

  function nvUpdateSelectionBoxColor(rgb01){
    setSelectionBoxColor([...rgb01, 0.5])
    nv.setSelectionBoxColor([...rgb01, 0.5])
  }

  function nvUpdateSliceType(newSliceType) {
    if (newSliceType === 'axial'){
      nv.setSliceType(nv.sliceTypeAxial)    
    } else if (newSliceType === 'coronal'){
      nv.setSliceType(nv.sliceTypeCoronal)
    } else if (newSliceType === 'sagittal'){
      nv.setSliceType(nv.sliceTypeSagittal)
    } else if (newSliceType === 'multi'){
      nv.setSliceType(nv.sliceTypeMultiplanar)
    } else if (newSliceType === '3d'){
      nv.setSliceType(nv.sliceTypeRender)
    }
  }

  function nvUpdateColorMap(id, clr){
    nv.volumes[nv.getVolumeIndexByID(id)].setColorMap(clr)
    nv.updateGLVolume()
  }

  function nvRemoveLayer(imageToRemove){
    nv.removeVolume(imageToRemove)
    setLayers([...nv.volumes])
  }

	nv.on('intensityRange', (nvimage) => {
		//setIntensityRange(nvimage)
	})

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: 'black'
      }}
    >	
      <SettingsPanel 
        open={openSettings}
        width={300}
        toggleMenu={toggleSettings}
      >
        <ColorPicker
          colorRGB01={backColor}
          onSetColor={nvUpdateBackColor}
          title={'Background color'}
        >
        </ColorPicker>
        <ColorPicker
          colorRGB01={clipPlaneColor}
          onSetColor={nvUpdateClipPlaneColor}
          title={'Clip plane color'}
        >
        </ColorPicker>
        <NumberPicker
          value={clipPlaneOpacity}
          onChange={nvUpdateClipPlaneOpacity}
          title={'Clip plane opacity'}
          min={0}
          max={1}
          step={0.1}
        >
        </NumberPicker>
        <ColorPicker
          colorRGB01={crosshairColor}
          onSetColor={nvUpdateCrosshairColor}
          title={'Crosshair color'}
        >
        </ColorPicker>
        <NumberPicker
          value={crosshairOpacity}
          onChange={nvUpdateCrosshairOpacity}
          title={'Crosshair opacity'}
          min={0}
          max={1}
          step={0.1}
        >
        </NumberPicker>
        <ColorPicker
          colorRGB01={selectionBoxColor}
          onSetColor={nvUpdateSelectionBoxColor}
          title={'Selection box color'}
        >
        </ColorPicker>
        <NumberPicker
          value={nv.opts.crosshairWidth}
          onChange={nvUpdateCrosshairSize}
          title={'Crosshair size'}
          min={0}
          max={10}
          step={1}
        >
        </NumberPicker>
        <NumberPicker
          value={textSize}
          onChange={nvUpdateTextSize}
          title={'Text size'}
          min={0}
          max={0.2}
          step={0.01}
        >
        </NumberPicker>
        <NVSwitch
          checked={locationTableVisible}
          title={'Location table'}
          onChange={toggleLocationTable}
        >
        </NVSwitch>
        <NVSwitch
          checked={clipPlane}
          title={'Clip plane'}
          onChange={nvUpdateClipPlane}
        >
        </NVSwitch>
        <NVSwitch
          checked={cornerText}
          title={'Corner text'}
          onChange={nvUpdateCornerText}
        >
        </NVSwitch>
        <NVSwitch
          checked={radiological}
          title={'radiological'}
          onChange={nvUpdateRadiological}
        >
        </NVSwitch>
        <NVSwitch
          checked={crosshair3D}
          title={'3D crosshair'}
          onChange={nvUpdateCrosshair3D}
        >
        </NVSwitch>
        <NVSwitch
          checked={colorBar}
          title={'Show color bar'}
          onChange={nvUpdateColorBar}
        >
        </NVSwitch>
        <NVSwitch
          checked={worldSpace}
          title={'World space'}
          onChange={nvUpdateWorldSpace}
        >
        </NVSwitch>
        <NumberPicker
          value={decimalPrecision}
          onChange={updateDecimalPrecision}
          title={'Decimal precision'}
          min={0}
          max={8}
          step={1}
        >
        </NumberPicker>
      </SettingsPanel>
      <LayersPanel
        open={openLayers}
        width={320}
        onToggleMenu={toggleLayers}
        onAddLayer={addLayer}
      >
        {layerList} 
      </LayersPanel>
      <Toolbar
        nvUpdateSliceType={nvUpdateSliceType}
        toggleSettings={toggleSettings}
        toggleLayers={toggleLayers}
      >
      </Toolbar>
      <NiivuePanel
        nv={nv}
        volumes={layers}
      >
      </NiivuePanel>
      <LocationTable 
        tableData={locationData} 
        isVisible={locationTableVisible}
        decimalPrecision={decimalPrecision}
      />
    </Box>
  )
}
