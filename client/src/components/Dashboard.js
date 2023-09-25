import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import ChartComponent from './ChartComponent';
import Sidebar from './Sidebar';

function UserPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/get-population');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
         <Sidebar />
         <Typography sx={{margin:'0 2% 0 17%'}}>
      <h1>User Page</h1>
      <div>
        <h2>Population Data</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>State</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.city_name}</TableCell>
                  <TableCell>{item.population}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ChartComponent data={data} />
      </Typography>
    </div>
  );
}

export default UserPage;
