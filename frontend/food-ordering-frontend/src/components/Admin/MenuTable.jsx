import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const orders = [1, 1, 1]; // Zosh dùng mảng tạm này để lặp ra 3 dòng dữ liệu giả

export const MenuTable = () => {
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                    title={"Menu"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Ingredients</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Availability</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Avatar src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" />
                                    </TableCell>
                                    <TableCell align="right">{"Pizza"}</TableCell>
                                    <TableCell align="right">{"Bacon, cheese"}</TableCell>
                                    <TableCell align="right">{"$50"}</TableCell>
                                    <TableCell align="right">{"In Stock"}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};