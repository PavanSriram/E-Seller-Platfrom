import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { TextField, InputAdornment, SvgIcon } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "@mui/material";

import SearchBy from "../searchBy";

const Search = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>,
  "Search"
);

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Smart LED TV", "TCL", "Electronics", "10000", "30"),
  createData("Pen Drive", "SanDisk", "Electronics", "599", "29"),
  createData("School Bag", "Lunar", "Fashion", "9000", "400"),
  createData("Harry Porter Box Set", "Bloom's Surry", "Hobbies", "50007", "15"),
  createData("boAt Airdopes", "BOAT", "Electronics", "6000", "50"),
  createData("Mi Power Bank", "Mi", "Electronics", "2000", "15"),
  createData("Smart LED TV", "TCL", "Electronics", "10000", "30"),
];

const MyProductToolbar = (props) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Box sx={{ mt: 5, mb: 3 }}>
        {/* <Card>
          <CardContent> */}
        <Stack direction={"row"}>
          <Box sx={{ maxWidth: 800, minWidth: 400 }}>
            <TextField
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <Search />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder={props.searchBy}
              variant="outlined"
            />
          </Box>
          <Box sx={{ ml: 2 }}>
            <SearchBy
              searchBy={props.searchBy}
              handleSearchBy={props.handleSearchBy}
              searchList={props.searchList}
            />
          </Box>
        </Stack>
        {/* </CardContent>
        </Card> */}
      </Box>
    </Toolbar>
  );
};

export default function MyProduct() {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchBy, setSearchBy] = React.useState("Product Name");
  const [headCells, setHeadCells] = React.useState([
    {
      id: "productName",
      label: "Product Name",
      order: "asc",
    },
    {
      id: "brand",
      label: "Brand",
      order: "asc",
    },
    {
      id: "category",
      label: "Category",
      order: "asc",
    },
    {
      id: "price",
      label: "Price",
      order: "asc",
    },
    {
      id: "count",
      label: "Count",
      order: "asc",
    },
  ]);

  const handleSearchBy = (searchby) => {
    if (searchby) setSearchBy(searchby);
  };

  const handleSortClick = (id) => {
    let cells = headCells.map((cell) => {
      if (cell.id === id) {
        if (cell.order === "asc") cell.order = "desc";
        else cell.order = "asc";
      }
      return cell;
    });
    // console.log(cells);
    setHeadCells(cells);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // add primary key of product to the path
  const handleEditButton = () => {
    navigate("/seller/editproduct");
  };

  // Delete dialog code
  const [deleteOpen, setdeleteOpen] = React.useState(false);

  const handleDeleteClose = () => {
    setdeleteOpen(false);
  };

  const handleDeleteButton = () => {
    setdeleteOpen(true);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <MyProductToolbar searchBy={searchBy} handleSearchBy={handleSearchBy} searchList={headCells}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.id === "productName" ? "left" : "right"}
                      padding={
                        headCell.id === "productName" ? "none" : "normal"
                      }
                    >
                      <TableSortLabel
                        direction={headCell.order}
                        active="true"
                        onClick={() => handleSortClick(headCell.id)}
                      >
                        <Typography fontSize={"15px"} fontWeight="600">
                          {headCell.label}
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={row.name}>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Link href="/seller/product" underline="none">{row.name}</Link>
                      </TableCell>
                      
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          size="small"
                          onClick={handleEditButton}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          size="small"
                          onClick={handleDeleteButton}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        sx={{ ml: 5 }}
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Fab
        sx={{ position: "absolute", bottom: 50, right: 45 }}
        color="primary"
        variant="extended"
        aria-label="add"
        onClick={() => navigate("/seller/addproduct")}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Product
      </Fab>

      {/*Delete dialog box */}
      <div>
        <Dialog
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you really want to delete the product?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>NO</Button>
            <Button onClick={handleDeleteClose} autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
