// Image list Panel is a component that shows all loaded
// NVimages and NVmeshes. It contains one ImageListItem per row in the list
function ImageListPanel({imageList, setImageList, crosshairValues}) {
	let listItems = []
	for (let i=imageList.length-1; i>=0; i--) {
		listItems.push(<ImageListItem image={imageList[i]} key={i} setImageList={setImageList} crosshairValue={crosshairValues[i]}/>)
	}
	return (
		<Grid container item xs={12} sm={12} md={4} lg={4} >
			<List sx={{width:'100%', bgcolor: 'background.paper'}} component='div'>
				{listItems}
			</List>
		</Grid>
	)
}
