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
import { Link, Chip } from "@mui/material";

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
  createData("pid_012", "01", 10000, "Credit Card", "Done"),
  createData("pid_013", "02", 90000, "Debit Card", "Done"),
  createData("pid_016", "03", 85400, "Cash On Delivery", "In Progress"),
  createData("pid_018", "04", 65000, "Credit Card", "Done"),
  createData("pid_023", "05", 65000, "Credit Card", "Done"),
  createData("pid_045", "06", 5000, "Cash On Delivery", "Done"),
  createData("pid_010", "07", 9.0, 37, 4.3),
  createData("pid_035", "08", 0.0, 94, 0.0),
  createData("pid_019", "09", 26.0, 65, 7.0),
  createData("pid_011", "10", 0.2, 98, 0.0),
  createData("pid_024", "11", 0, 81, 2.0),
  createData("pid_089", "12", 19.0, 9, 37.0),
  createData("pid_022", "13", 18.0, 63, 4.0),
];

const PaymentsToolbar = (props) => {
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
              variant="standard"
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

export default function Payments() {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchBy, setSearchBy] = React.useState("Payment Id");
  const [headCells, setHeadCells] = React.useState([
    {
      id: "paymentId",
      label: "Payment Id",
      order: "asc",
    },
    {
      id: "orderId",
      label: "Order Id",
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


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <PaymentsToolbar searchBy={searchBy} handleSearchBy={handleSearchBy} searchList={headCells}/>
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
                        {row.name}
                      </TableCell>
                      
                      <TableCell align="right"><Link href="/seller/product" underline="none">{row.calories}</Link></TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right"><Chip variant="outlined" color="info" label={row.protein} size="small" /></TableCell>
                      
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
    </Box>
  );
}
