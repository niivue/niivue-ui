import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function LocationTable(props) {
  let display = 'none'
  if (props.isVisible){
    display = ''
  } else {
    display = 'none'
  }
  return (
    <TableContainer 
      sx={{
        display: display,
        marginTop: 'auto',
        maxHeight: '30%',
        flexGrow: 1
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">MM</TableCell>
            <TableCell align="right">Vox</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData.map((data) => (
            <TableRow
              key={data.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0} }}
            >
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="right">{data.value.toFixed(props.decimalPrecision)}</TableCell>
              <TableCell align="right">
                {`${data.mm[0].toFixed(props.decimalPrecision)} ${data.mm[1].toFixed(props.decimalPrecision)} ${data.mm[2].toFixed(props.decimalPrecision)}`}
              </TableCell>
              <TableCell align="right">
                {`${data.vox[0]} ${data.vox[1]} ${data.vox[2]}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
