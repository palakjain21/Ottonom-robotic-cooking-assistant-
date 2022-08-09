import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from '../src/components/Sidebar/Sidebar';
import { Card, CardContent, CardMedia, Typography } from '@mui/material/';
import TableComponent from './components/TableComponent';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getLastOrder, getlastweekOrder } from './components/query';
import order from './order_data.json';

const TIME_STAMP = 1628865624954;

function App() {
  const [data, setData] = useState({});
  const [lastweekorderData, setLastWeekOrderData] = useState([]);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    getLastOrder(TIME_STAMP);
    lastweek();
    lastOrder();
  }, []);

  const lastweek = async () => {
    const docs = await getlastweekOrder(TIME_STAMP);
    let calories = 0;
    docs.forEach((doc) => {
      calories += doc.amount_g;
    });
    setCalories(calories);
    setLastWeekOrderData(docs);
  };

  const lastOrder = async () => {
    const doc = await getLastOrder(TIME_STAMP);
    setData(doc);
  };

  //script to add json data in firestore

  const addData = async () => {
    console.log('order', Object.values(order)[39]);
    let i = 0;
    for (i = 0; i < Object.keys(order).length; i++) {
      await addDoc(collection(db, 'order'), {
        amount: Object.values(order)[i].amount || 0,
        amount_g: Object.values(order)[i].amount_g || '',
        food: Object.values(order)[i].food || '',
        unit: Object.values(order)[i].unit || '',
        time_log: Object.values(order)[i].time_log || '',
        log_timestamp: Object.values(order)[i].log_timestamp || '',
      });
    }
  };

  return (
    <div className="App">
      <div className="page">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right">
          <div className="logo">
            <h1>OTTONOM</h1>
          </div>
          {/* <button onClick={addData}>Add Data</button> */}
          <p className="lastOrderHeading">Your Last Order</p>
          <div className="lastOrderCard">
            <Card className="lastOrder">
              <CardMedia
                component="img"
                alt="rice"
                height="200"
                image="https://cdn.loveandlemons.com/wp-content/uploads/2020/03/how-to-cook-rice.jpg"
                className="cardImage"
              />
              <CardContent className="cardContent">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="foodName"
                >
                  {data.food}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="summary"
                >
                  <div className="lastDetail">
                    <div>Date: </div>
                    <div>{data.time_log?.split('G')[0]}</div>
                  </div>
                  <div className="lastDetail">
                    <div>Unit: </div>
                    <div>{data.unit}</div>
                  </div>
                  <div className="lastDetail">
                    <div>Amount: </div>
                    <div>{data.amount}</div>
                  </div>
                  <div className="lastDetail">
                    <div>Amount(g): </div>
                    <div>{data.amount_g?.toFixed(2)}</div>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="division">
            <div className="leftPart">
              <TableComponent lastweekorderData={lastweekorderData} />
            </div>
            <div className="rightPart">
              <p className="headingRight">Your last week's calorie count</p>
              <Card sx={{ minWidth: 200 }} className="cardSmall">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="white"
                  >
                    Total amount of grams consumed in the past week:
                  </Typography>
                  <Typography variant="h5" component="div" className="number">
                    {calories}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
