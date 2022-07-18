import React from 'react';
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
} from "@twilio-paste/core/data-grid";
import { UserScoreHeader } from "./constants";
import axios from 'axios'

function UserScore({ userPhone }) {

  const [userData, setUserData] = React.useState([]);
  let getData = async () => {
    setUserData([])
    const { data } = await axios.get(`https://waquiz-9106-dev.twil.io/quiz/userPerformance`, { params:{phone: userPhone[0]}});
    setUserData(data.map((answer) => [answer.question, answer.rightAnswer, answer.yourAnswer, answer.correct]))
    console.log(data)
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
          <DataGridHeader>{UserScoreHeader[3]}</DataGridHeader>
        </DataGridRow>
      </DataGridHead>
      <DataGridBody>
        {userData.map((row, rowIndex) => (
          <DataGridRow key={"row-" + rowIndex}>
              <DataGridCell key={"cell-" + rowIndex + "-0"}>
                {userData[rowIndex][0]}
              </DataGridCell>
              <DataGridCell key={"cell-" + rowIndex + "-0"}>
                {userData[rowIndex][1]}
              </DataGridCell>
              <DataGridCell key={"cell-" + rowIndex + "-0"}>
                {userData[rowIndex][2]}
              </DataGridCell>
              <DataGridCell key={"cell-" + rowIndex + "-0"}>
                {userData[rowIndex][3]? "✅" : "❌"}
              </DataGridCell>
          </DataGridRow>
        ))}
      </DataGridBody>
    </DataGrid>
  );
}

export default UserScore;
/*
 {row.map((col, colIndex) => (
              <DataGridCell key={"cell-" + rowIndex + "-" + colIndex}>
                <div style={{color:row[1]!=row[2]? "red": ""}}>
                    {col}
                </div>
              </DataGridCell>
            ))}
  
 */
