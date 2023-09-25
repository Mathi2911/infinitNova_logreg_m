import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from '@mui/material';

function AdminPage() {
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        city_name: '',
        population: '',
        country: '',
        year: 2021,
    });

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/get-population');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({
            city_name: '',
            population: '',
            country: '',
            year: 2021,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/add-population', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchData();
                handleCloseDialog();
            } else {
                console.error('Error adding data:', response.status);
            }
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/update-population/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchData();
                handleCloseDialog();
            } else {
                console.error('Error updating data:', response.status);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/delete-population/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchData();
            } else {
                console.error('Error deleting data:', response.status);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div>
            <Typography sx={{padding:"0 10px 0 10px"}}>
            <h1>Admin Page</h1>
            <Button variant="outlined" onClick={handleOpenDialog} sx={{float:"right", margin:"0 20px 20px"}}>
                Add Data
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>State</TableCell>
                            <TableCell>Population</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.city_name}</TableCell>
                                <TableCell>{item.population}</TableCell>
                                <TableCell>{item.country}</TableCell>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            setFormData({ ...item });
                                            handleOpenDialog();
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        sx={{ marginLeft: '20px' }}
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => {
                                            handleDelete(item._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{formData._id ? 'Edit Data' : 'Add Data'}</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ marginTop: '20px' }}
                        label="City Name"
                        fullWidth
                        value={formData.city_name}
                        onChange={(e) =>
                            setFormData({ ...formData, city_name: e.target.value })
                        }
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        label="Population"
                        fullWidth
                        value={formData.population}
                        onChange={(e) =>
                            setFormData({ ...formData, population: e.target.value })
                        }
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        label="Country"
                        fullWidth
                        value={formData.country}
                        onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                        }
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        label="Year"
                        fullWidth
                        type="number"
                        value={formData.year}
                        onChange={(e) =>
                            setFormData({ ...formData, year: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={formData._id ? () => handleUpdate(formData._id) : handleSubmit}
                        color="primary"
                    >
                        {formData._id ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
            </Typography>
        </div>
    );
}

export default AdminPage;
