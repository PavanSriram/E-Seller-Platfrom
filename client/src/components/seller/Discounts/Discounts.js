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
// import { Link } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; 
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import SearchBy from "../searchBy";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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


export default function Discounts() {
  const navigate = useNavigate();
  const [sellerId, setUserId] = React.useState(localStorage.getItem("sellerId"));

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchBy, setSearchBy] = React.useState("discountId");
  const [searchText, setSearchText] = React.useState();
  const [searchedText, setSearchedText] = React.useState('');
  const [deleteDiscount, setDeleteDiscount] = React.useState();
  const [headCells, setHeadCells] = React.useState([
    {
      id: "discountId",
      label: "Discount Id",
      order: "asc",
    },
    {
      id: "expiryDate",
      label: "Expiry Date",
      order: "asc",
    },
    {
      id: "percent",
      label: "Percent",
      order: "asc",
    },
  ]);
  const [discounts, setDiscounts] = React.useState([{
    sellerId: sellerId,
    discountId: "",
    expiryDate: "",
    percent: ""}]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3308/discounts/'${sellerId}'`).then((res) => {
        setDiscounts(res.data);
      });
    }
    fetchData();
  }, []);

  const handleSearchBy = (searchby) => {
    if (searchby) setSearchBy(searchby);
  };

  const handleSortClick = async (id) => {
    let order = "asc";
    let cells = headCells.map((cell) => {
      if (cell.id === id) {
        if (cell.order === "asc") {cell.order = "desc"; order='desc'}
        else cell.order = "asc";
      }
      return cell;
    });
    
    setHeadCells(cells);

    if(searchedText.length !== 0){
      await axios.get(`http://localhost:3308/discounts/sort/${sellerId}/${searchBy}/${searchedText}/${id}/${order}`).then((res) => {
        setDiscounts(res.data);
        // console.log("data1", res);
      });
    }
    else{
      await axios.get(`http://localhost:3308/discounts/sort/${sellerId}/${id}/${order}`).then((res) => {
        setDiscounts(res.data);
        // console.log("data2", res);
      });
    }
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
    navigate("/seller/editdiscount");
  };

  // Delete dialog code
  const [deleteOpen, setdeleteOpen] = React.useState(false);

  const handleDeleteClose = () => {
    setdeleteOpen(false);
    setSnackOpen(true);
  };

  const handleDeleteDiscount = async () => {
    // remove product from cart when a product is deleted
    console.log("dr", deleteDiscount);
    let flag = false;
    if(deleteDiscount){
      await axios
        .delete(`http://localhost:3308/seller/deleteDiscount/${deleteDiscount.discountId}`)
        .then((res) => {
          if (res.data.length !== 0) {
            setdeleteOpen(false);
            flag = true;
          }
        });
    }    
    if(flag){
      await axios.get(`http://localhost:3308/discounts/'${sellerId}'`).then((res) => {
        setDiscounts(res.data);
      });
    }
    
  };

  const handleDeleteButton = (discount) => {
    // console.log("hr", discount);
    setDeleteDiscount(discount);
    setdeleteOpen(true);
  };

  // delete successfull snackbar at bottom
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleDeleteSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const handleSearchText = (event) =>{
    setSearchText(event.target.value);
  }
  const handleSearch = async (event) =>{
    console.log("text", searchText.length);
    setSearchedText(searchText);
    if(searchText.length !== 0){
      await axios.get(`http://localhost:3308/discounts/search/${sellerId}/${searchBy}/${searchText}`).then((res) => {
        setDiscounts(res.data);
        // console.log("data1", res);
      });
    }
    else{
      await axios.get(`http://localhost:3308/discounts/'${sellerId}'`).then((res) => {
        setDiscounts(res.data);
        // console.log("data2", res);
      });
    }
    
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - discounts.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* <DiscountsToolbar searchBy={searchBy} handleSearchBy={handleSearchBy} searchList={headCells}/> */}
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
                  className="searchBar"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button color="primary" onClick={handleSearch}>
                          <SvgIcon fontSize="small" color="action">
                            <Search />
                          </SvgIcon>
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearchText}
                  placeholder={searchBy}
                  variant="standard"
                />
              </Box>
              <Box sx={{ ml: 2 }}>
                <SearchBy
                  searchBy={searchBy}
                  handleSearchBy={handleSearchBy}
                  searchList={headCells}
                />
              </Box>
            </Stack>
            {/* </CardContent>
            </Card> */}
          </Box>
        </Toolbar>
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
                      align={headCell.id === "discountId" ? "left" : "right"}
                      padding={
                        headCell.id === "discountId" ? "none" : "normal"
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
              {discounts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((discount, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={discount.discountId}>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {discount.discountId}
                      </TableCell>
                      
                      <TableCell align="right">{discount.expiryDate}</TableCell>
                      <TableCell align="right">{discount.percent}</TableCell>
                      {/* <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell> */}
                      <TableCell align="right">
                        <Link to="/seller/editdiscount" style={{color: "gray"}} state={{discount: discount}}><EditIcon /></Link>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          size="small"
                          onClick={() => handleDeleteButton(discount)}
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
          count={discounts.length}
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
        onClick={() => navigate("/seller/adddiscount")}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add new Discount
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
            {"Do you really want to delete the Discount?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">This will remove discounts for all associated products</DialogContentText>
          </DialogContent>
          <DialogActions> 
            <Button onClick={handleDeleteClose}>NO</Button>
            <Button onClick={handleDeleteDiscount} autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleDeleteSnackClose}>
        <Alert onClose={handleDeleteSnackClose} severity="info" sx={{ width: '100%' }}>
          Discount Removed...!
        </Alert>
      </Snackbar>
    </Box>
  );
}
