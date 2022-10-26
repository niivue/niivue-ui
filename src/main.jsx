import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from '@mui/material'
import {CssBaseline} from '@mui/material'
import './index.css'
import NiiVue from './Niivue'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const volumes = [
  {url: './mni152reallyreallyreallyreallyreallyLongName.nii'},
  {url: './hippo.nii'},
  
]
ReactDOM.render(
  <React.StrictMode>
			<CssBaseline enableColorScheme />
      <NiiVue volumes={volumes}/>
  </React.StrictMode>,
  document.getElementById('root')
)
