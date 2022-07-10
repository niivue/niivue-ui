// Image list items components that show UI elements related to 
// NiiVue volumes and meshes.
// The UI elements in an Image list item can update NVImage properties
function ImageListItem({image, setImageList, crosshairValue=null, precision=4}) {
	const [visibilityIcon, setVisibilityIcon] = useState(<Visibility />)
	const [openMore, setOpenMore] = useState(false);
	const [minMax, setMinMax] = useState([image.global_min, image.global_max])
	const [color, setColor] = useState(image.colorMap ? image.colorMap : 'gray')
	useEffect(() => {
		setMinMax([image.global_min, image.global_max])
	}, [image])

	function visibilityToggle() {
		let idx = nv.getVolumeIndexByID(image.id)
		let currentOpacity = nv.volumes[idx].opacity
		let newOpacity = currentOpacity > 0 ? 0 : 1
		nv.setOpacity(idx, newOpacity)
		if (newOpacity == 0) {
			setVisibilityIcon(<VisibilityOff />)
		} else if (newOpacity == 1) {
			setVisibilityIcon(<Visibility />)
		}
	}

	const handleOpenMore = () => {
		setOpenMore(!openMore);
  };

	function handleSliderChange (event, newValue) {
		setMinMax(newValue); 
		//nv.volumes[nv.getVolumeIndexByID(image.id)].cal_min = newValue[0]; 
		//nv.volumes[nv.getVolumeIndexByID(image.id)].cal_max = newValue[1]; 
		//nv.updateGLVolume()
	}

	function handleSliderCommitted (event, newValue) {
		setMinMax(newValue); 
		nv.volumes[nv.getVolumeIndexByID(image.id)].cal_min = newValue[0]; 
		nv.volumes[nv.getVolumeIndexByID(image.id)].cal_max = newValue[1]; 
		nv.updateGLVolume()
	}


	function handleMinNumberInput (event) {
		setMinMax([Number(event.target.value), minMax[1]])
		nv.volumes[nv.getVolumeIndexByID(image.id)].cal_min = Number(event.target.value); 
		nv.updateGLVolume()
	}

	function handleMaxNumberInput (event) {
		setMinMax([minMax[0], Number(event.target.value)])
		nv.volumes[nv.getVolumeIndexByID(image.id)].cal_max = Number(event.target.value); 
		nv.updateGLVolume()
	}

	function handleIntensityReset(event) {
		setMinMax([image.global_min, image.global_max])
		nv.volumes[nv.getVolumeIndexByID(image.id)].cal_min = image.global_min; 
		nv.volumes[nv.getVolumeIndexByID(image.id)].cal_max = image.global_max; 
		nv.updateGLVolume()
	}

	function handleColorChange(event) {
		let color = event.target.value
		let id = nv.volumes[nv.getVolumeIndexByID(image.id)].setColorMap(color)
		nv.updateGLVolume()
		setColor(color)
	}

	function handleRemoveImage() {
		nv.removeVolume(image)
		setImageList([...nv.volumes])
	}

	return (
		<Box>
			<ListItemButton onClick={() => {/*set active image*/}}>
					<ListItemIcon onClick={(e) => { e.stopPropagation(); visibilityToggle(image)}}>
						{visibilityIcon}
					</ListItemIcon>
					<ListItemText>
						{image.name}
					</ListItemText>
					<Typography style={{marginLeft:'auto'}}>
						{crosshairValue === null ? '' : crosshairValue.toFixed(precision)}
					</Typography>
					{openMore ? <ExpandLess onClick={handleOpenMore}/> : <ExpandMore onClick={handleOpenMore} />}
			</ListItemButton>
			<Collapse in={openMore} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<ListItem>
						<Input
							size='small'
							style={{marginRight:'4px', marginLeft: '4px'}}
							value={Number(minMax[0])}
							inputProps={{
								step: 1.0,
								min: image.global_min || 0,
								max: image.global_max || 999,
								type: 'number'
							}}
							onInput={handleMinNumberInput}
						>
						</Input>
						<Slider 
							style={{
								marginLeft: '12px',
								marginRight: '12px'
							}}
							min={image.global_min || 0}
							max={image.global_max || 999} 
							size='small'
							value={minMax} 
							valueLabelDisplay="auto" 
							onChange={handleSliderChange}
							onChangeCommitted={handleSliderCommitted}
						>
						</Slider>
						<Input
							size='small'
							style={{marginLeft:'4px', marginRight: '4px'}}
							value={Number(minMax[1])}
							inputProps={{
								step: 1.0,
								min: image.global_min || 0,
								max: image.global_max || 999,
								type: 'number'
							}}
							onInput={handleMaxNumberInput}
						>
						</Input>
						<IconButton style={{marginRight: '0px', marginLeft:'auto'}} onClick={handleIntensityReset}>
							<Replay />
						</IconButton>
					</ListItem>
					<ListItem>	
					<FormControl fullWidth>
						<InputLabel>Color</InputLabel>
						<Select
							style={{marginRight: 'auto', width: '100%'}}
							value={color}
							label="Color"
							size="small"
							onChange={handleColorChange}
						>
						{
							nv.colorMaps().map(c => {
								return (
										<MenuItem value={c} key={c}>{c}</MenuItem>
								)
							})
						}
						</Select>
					</FormControl>
						<IconButton style={{marginRight: '0px', marginLeft:'auto'}} onClick={handleRemoveImage}>
							<Delete />
						</IconButton>
					</ListItem>
				</List>
			</Collapse>
		</Box>
	)

}
