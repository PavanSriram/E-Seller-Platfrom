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
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { TextField, InputAdornment, SvgIcon } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import { Link, Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

import SearchBy from "./searchBy";

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

export default function Payments() {
  const navigate = useNavigate();
  const [sellerId, setUserId] = React.useState(localStorage.getItem("sellerId"));

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchBy, setSearchBy] = React.useState("paymentId");
  const [searchText, setSearchText] = React.useState();
  const [searchedText, setSearchedText] = React.useState('');
  const [headCells, setHeadCells] = React.useState([
    {
      id: "paymentId",
      label: "Payment Id",
      order: "asc",
    },
    {
      id: "amount",
      label: "Amount",
      order: "asc",
    },
    {
      id: "paymentMode",
      label: "Payment Mode",
      order: "asc",
    },
    {
      id: "paymentStatus",
      label: "Payment Status",
      order: "asc",
    },
  ]);

  const [payments, setPayments] = React.useState([{
    paymentId: "",
    amount: "",
    paymentMode: "",
    paymentStatus: "",
  }]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(`http://localhost:3308/payments/'${sellerId}'`).then((res) => {
        setPayments(res.data);
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

    // console.log("text", searchedText.length);
    if(searchedText.length !== 0){
      await axios.get(`http://localhost:3308/payments/sort/${sellerId}/${searchBy}/${searchedText}/${id}/${order}`).then((res) => {
        setPayments(res.data);
      });
    }
    else{
      await axios.get(`http://localhost:3308/payments/sort/${sellerId}/${id}/${order}`).then((res) => {
        setPayments(res.data);
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

  // search
  const handleSearchText = (event) =>{
    setSearchText(event.target.value);
  }
  const handleSearch = async (event) =>{
    // console.log("text", searchText.length);
    setSearchedText(searchText);
    if(searchText.length !== 0){
      await axios.get(`http://localhost:3308/payments/search/${sellerId}/${searchBy}/${searchText}`).then((res) => {
        setPayments(res.data);
      });
    }
    else{
      await axios.get(`http://localhost:3308/payments/'${sellerId}'`).then((res) => {
        setPayments(res.data);
      });
    }
    
  }


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payments.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
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
                      align={headCell.id === "paymentId" ? "left" : "right"}
                      padding={
                        headCell.id === "paymentId" ? "none" : "normal"
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
              </TableRow>
            </TableHead>
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {payments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((payment, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={payment.paymentId}>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {payment.paymentId}
                      </TableCell>
                      
                      <TableCell align="right">{payment.amount}</TableCell>
                      <TableCell align="right">{payment.paymentMode}</TableCell>
                      <TableCell align="right"><Chip variant="outlined" color="info" label={payment.paymentStatus} size="small" /></TableCell>
                      
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
          count={payments.length}
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
    </Box>
  );
}
