import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import NiiVue from './Niivue'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <NiiVue 
			images={[
				{url: 'mni152.nii'},
				{url: 'hippo.nii', colorMap: 'winter'},
				
			]}
			meshes={[
				{url: 'dpsv.trx', rgba255 : [138, 255, 142, 255]}
			]}
		/>
  </React.StrictMode>,
  document.getElementById('root')
)
