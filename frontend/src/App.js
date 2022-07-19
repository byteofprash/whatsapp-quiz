import * as React from "react";
import { Box } from "@twilio-paste/core/box";
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderSort,
  DataGridBody,
  DataGridCell,
} from "@twilio-paste/core/data-grid";
import { TableHeaderData, UserScoreHeader } from "./constants";
import axios from 'axios'


// Sorting function
const simpleComparator = (
  a,
  b,
  ascending,
  columnId) => {
  if (a[columnId] === b[columnId]) {
    return 0;
  }
  if (a[columnId] > b[columnId]) {
    return ascending ? 1 : -1;
  }
  return ascending ? -1 : 1;
};

const numColumns = TableHeaderData.length;
const initialHeaderData = [...new Array(numColumns)].map((_, index) =>
  index === 2 ? "descending" : "none"
);

export const SortableColumnsDataGrid = ({handleSelectedUser}) => {
  const [sortedColumns, setSortedColumns] = React.useState(initialHeaderData);
  const [sortedData, setSortedData] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [highScore, setHighScore] = React.useState([]);
  let getData = async () => {
    const { data } = await axios.get(`/user/users`);
    let scoreData = data.map((result) => [result.phone, result.name, result.total_points]).sort((a, b) =>
                      simpleComparator(a, b, false, 2)) 
    setSortedData(scoreData);
    let scores = [...new Set(data.map((result) => result.total_points))].sort((a,b) => {return b-a})
    console.log(scores)
    setHighScore(scores)
    return scoreData
  };
  React.useEffect(() => {
    getData();
  }, []);
  // Handle sorting behavior
  const handleSortingColumn = (columnId) => {
    // Update the state of the sort direction in column headers
    const newSortedColumns = sortedColumns.map(
      () => "none"
    );
    if (sortedColumns[columnId] === "ascending") {
      newSortedColumns[columnId] = "descending";
    } else {
      newSortedColumns[columnId] = "ascending";
    }
    setSortedColumns(newSortedColumns);

    // Update the table data to be sorted correctly
    setSortedData(
      sortedData.sort((a, b) =>
        simpleComparator(
          a,
          b,
          newSortedColumns[columnId] === "ascending",
          columnId
        )
      )
    );
  };
   const getUserScore = (colIndex) =>{
       console.log("This is the user score", colIndex)
       setSortedColumns(UserScoreHeader)
   }
  /* eslint-disable react/no-array-index-key */
  return (
    <DataGrid aria-label="User information table">
      <DataGridHead>
        <DataGridRow>
          <DataGridHeader aria-sort={sortedColumns[0]} data-testid="header">
            <Box display="flex" alignItems="center" columnGap="space20">
              {TableHeaderData[1]}
              <DataGridHeaderSort
                direction={sortedColumns[1]}
                onClick={() => handleSortingColumn(1)}
                data-testid="header-sort"
              />
            </Box>
          </DataGridHeader>
          <DataGridHeader aria-sort={sortedColumns[2]}>
            <Box display="flex" alignItems="center" columnGap="space20">
              {TableHeaderData[2]}
              <DataGridHeaderSort
                direction={sortedColumns[2]}
                onClick={() => handleSortingColumn(2)}
              />
            </Box>
          </DataGridHeader>
        </DataGridRow>
      </DataGridHead>
      <DataGridBody>
        {sortedData.map((row, rowIndex) => (
          <DataGridRow key={`${row[0]}-${row[1]}`}>
            <DataGridCell key={`data${row[0]}-0`} >
              <div onClick={() => handleSelectedUser(row)} style={{cursor: "pointer"}}>
                  {sortedData[rowIndex][1]}
              </div>
            </DataGridCell>
            <DataGridCell key={`data${row[0]}-0`} >
              <div onClick={() => handleSelectedUser(row)} style={{cursor: "pointer"}}>
                {sortedData[rowIndex][2]}
            <span>
                {sortedData[rowIndex][2] == highScore[0]? "🏆": ""}
                {sortedData[rowIndex][2] == highScore[1]? "🥈": ""}
                {sortedData[rowIndex][2] == highScore[2]? "🥉": ""}
            </span>
              </div>
            </DataGridCell>
          </DataGridRow>
        ))}
      </DataGridBody>
    </DataGrid>
  );
};
