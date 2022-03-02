import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import { Container } from '@mui/material'
import { List } from '@mui/material'
import { ListItemButton } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { ListItemText } from '@mui/material'
import { Collapse } from '@mui/material'
import { Slider } from '@mui/material'
import { ExpandLess, ExpandMore, Delete } from '@mui/icons-material'
import { Visibility } from '@mui/icons-material'
import { VisibilityOff } from '@mui/icons-material'
import { Niivue } from '@niivue/niivue'
import './Niivue.css'

const nv = new Niivue()

function NiivueDisplay ({imageList}) {
	const canvas = useRef(null)
	useEffect(async () => {
    nv.attachToCanvas(canvas.current)
		await nv.loadVolumes(imageList)
		//await nv.loadVolumes([{url: 'mni152.nii'}, {url: 'hippo.nii', colorMap: 'winter'}]) // press the "v" key to cycle through volumes
		//setImageList(nv.volumes)
	}, [])

	return (
		<Grid item xs={12} sm={12} md={8} lg={8}>
			<canvas ref={canvas} height={480} width={640} />
		</Grid>
	)
}

function ImageListItem({image}) {
		const visibilityToggle = (image) => {
			let idx = nv.getVolumeIndexByID(image.id)
			let currentOpacity = nv.volumes[idx].opacity
			nv.setOpacity(idx, currentOpacity > 0 ? 0 : 1)
		}
		const [openMore, setOpenMore] = useState(false);
		const [minMax, setMinMax] = useState([image.cal_min, image.cal_max])
		const handleOpenMore = () => {
			setOpenMore(!openMore);
  };

	function handleSliderChange (event, newValue) {
		console.log(newValue)
		setMinMax(newValue); 
		nv.volumes[nv.getVolumeIndexByID(image.id)].cal_min = newValue[0]; 
		nv.volumes[nv.getVolumeIndexByID(image.id)].cal_max = newValue[1]; 
		nv.updateGLVolume()
	}

	return (
			<div>
			<ListItemButton onClick={() => {props.activeImageCallback(image)}}>
					<ListItemIcon onClick={(e) => { e.stopPropagation(); visibilityToggle(image)}}>
						{image.opacity > 0 ? <Visibility /> : <VisibilityOff />}
					</ListItemIcon>
					<ListItemText>
						{image.name}
					</ListItemText>
					{openMore ? <ExpandLess onClick={handleOpenMore}/> : <ExpandMore onClick={handleOpenMore} />}
			</ListItemButton>
			<Collapse in={openMore} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<ListItem>
						<Slider 
							min={0}
							max={image.global_max} 
							size='small'
							value={minMax} 
							valueLabelDisplay="auto" 
							onChange={handleSliderChange}
						>
						</Slider>
					</ListItem>
					<ListItem>
						<IconButton style={{marginRight: '0px', marginLeft:'auto'}}>
							<Delete />
						</IconButton>
					</ListItem>
				</List>
			</Collapse>
			</div>
	)

}

function ImageListPanel({imageList}) {
	console.log('imageList', imageList)
	return (
		<List sx={{width: '100%', bgcolor: 'background.paper'}} component='nav'>
			{
				imageList.map((image, i) => {
					return (
						<ImageListItem
							image={image} 
							key={image.id}>
						</ImageListItem>
					)
				})
			}
		</List>
	)
}

export default function NiiVue({images=[]}) {
	const [imageList, setImageList] = useState(images)
	const [activeImage, setActiveImage] = useState(0) // the index of the active image (the layer with focus)

  return (
		<Container maxWidth={false} disableGutters={true} xs={{margin: 0, padding:0}}>
			<Grid container>
				<Grid container item xs={12} sm={12} md={4} lg={4} >
					<Grid item>
						<ImageListPanel imageList={imageList} /> 
					</Grid>
				</Grid>
				<NiivueDisplay imageList={imageList} setImageList={setImageList}/>	
			</Grid>
		</Container>
  )
}
