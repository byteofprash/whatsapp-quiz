import React from 'react';
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
} from "@twilio-paste/core/data-grid";
import { TableHeaderData, UserScoreData, UserScoreHeader } from "./constants";
import axios from 'axios'

function UserScore({ userPhone }) {

  const [userData, setUserData] = React.useState([]);
  let getData = async () => {
    setUserData([])
    const { data } = await axios.get(`/quiz/userPerformance`, { params:{phone: userPhone[0]}});
    setUserData(data.map((answer) => [answer.question, answer.rightAnswer, answer.yourAnswer]))
  };
  React.useEffect(() => {
    getData();
  }, [userPhone]);
 
  return (
    <DataGrid aria-label="User information table" striped>
      <DataGridHead >
        <DataGridRow >
          <DataGridHeader>{UserScoreHeader[0]}</DataGridHeader>
          <DataGridHeader>{UserScoreHeader[1]}</DataGridHeader>
          <DataGridHeader>{UserScoreHeader[2]}</DataGridHeader>
        </DataGridRow>
      </DataGridHead>
      <DataGridBody>
        {userData.map((row, rowIndex) => (
          <DataGridRow key={"row-" + rowIndex}>
            {row.map((col, colIndex) => (
              <DataGridCell key={"cell-" + rowIndex + "-" + colIndex}>
                {col}
              </DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridBody>
    </DataGrid>
  );
}

export default UserScore;
