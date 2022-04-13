import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_VEHICLES } from "../../queries";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#051367",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Vehicles() {
  const [searchInput, setSearchInput] = useState("");
  const { error, loading, data } = useQuery(GET_VEHICLES, { variables: { bike_id: searchInput } });
  const [bikes, setBikes] = useState([]);
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setSearchInput(value);
  };

  useEffect(() => {
    if (data) {
      setBikes(data.vehicle);
    }
  }, [data]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Item>
            <TextField 
              id="bikeId" 
              label="bike id" 
              placeholder={"Search..."}
              variant="outlined" 
              value={searchInput} 
              onChange={handleFilterChange} />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">Bike Id</StyledTableCell>
                    <StyledTableCell align="center">Lat</StyledTableCell>
                    <StyledTableCell align="center">Lon</StyledTableCell>
                    <StyledTableCell align="center">Is Reserved</StyledTableCell>
                    <StyledTableCell align="center">Is Disabled</StyledTableCell>
                    <StyledTableCell align="center">Vehicle Type</StyledTableCell>
                    <StyledTableCell align="center">Android</StyledTableCell>
                    <StyledTableCell align="center">IOS</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {bikes.map((row) => (
                    <StyledTableRow
                      key={row.bike_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.bike_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.lat}</StyledTableCell>
                      <StyledTableCell align="center">{row.lon}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Switch checked={row.is_reserved == 0 ? false : true} />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Switch checked={row.is_disabled == 0 ? false : true} />
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.vehicle_type}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Link target="_blank" href={`${row.android}`} underline="none">
                          <AndroidIcon />
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link target="_blank" href={`${row.ios}`} underline="none">
                          <AppleIcon />
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Vehicles;