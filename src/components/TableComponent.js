import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import React from "react";

const TableComponent = ({ lastweekorderData }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "date", label: "Date", minWidth: 170, align: "center" },
    { id: "food", label: "Food", minWidth: 100, align: "center" },
    {
      id: "unit",
      label: "Unit",
      minWidth: 170,
      align: "center",
    },
    {
      id: "amount",
      label: "Amount(g)",
      minWidth: 170,
      align: "center",
    },
  ];
  return (
    <div>
      <p className="lastOrderHeading">
        Your past week's orders (Total orders: 78)
      </p>
      <div className="tableData">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }} className="tableContainer">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {lastweekorderData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow
                      key={i}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{ height: "max-content" }}
                    >
                      <TableCell component="th" scope="row" className="white">
                        {row.time_log.split("G")[0]}
                      </TableCell>
                      <TableCell align="center" className="white">
                        {row.food}
                      </TableCell>
                      <TableCell align="center" className="white">
                        {row.unit}
                      </TableCell>
                      <TableCell align="center" className="white">
                        {row.amount_g.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={lastweekorderData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};
export default TableComponent;
