import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'; //for getting user ip
import { deviceDetect, mobileModel } from "react-device-detect" //for getting use device info
function App() {
  const [timestamp, setTimeStamp] = useState('')
  const [deviceInfo, setDeviceInfo] = useState('')
  const [batteryHealth, setBatteryHealth] = useState('')
  const [ip, setIp] = useState('')

  //find  user IP address
  const findIp = async () => {
    try {
      const res = await axios.get("https://geolocation-db.com/json/");
      // console.log(res.data); 
      setIp(res.data.IPv4)
      setTimeStamp(new Date())
    }
    catch (error) {
      // console.log("Network error");
    }
  }

  // find battery health of the user
  async function checkBattery() {
    if (navigator.getBattery) {
      // if battery API is working

      await navigator.getBattery()
        .then(function (battery) {

          // if Get current battery level .
          var batteryLevel = battery.level * 100;
          console.log(batteryLevel);
          setBatteryHealth(batteryLevel)
        })
        .catch(function (e) {
          console.error(e);
        });
    }
    else {
      // if battery API is not working
      console.log("battery api not working on your device");
    }
  }


  // find user device details
  // NB: some browser may not support this api
  async function userDeviceInfo() {
    let userInfom = await deviceDetect().ua // gives object shown in image below
    console.log("devicedata browserName", mobileModel) // gives "iphone"
    // console.log(userInfom);

    setDeviceInfo(userInfom)
  }


  useEffect(() => {
    userDeviceInfo()
    findIp()
    checkBattery()
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <div style={{ textAlign: 'center' }}>
        <h1> Your IP Address :  {!ip ? <span style={{ color: 'orange', fontSize: '23px' }}>finding Ip...</span> : <span style={{ color: 'green' }}>{ip}</span>} </h1>
        <h2>Your battery Health :  {!batteryHealth ? <span style={{ color: 'orange', fontSize: '23px' }}>finding Battery Health...</span> : <span style={{ color: 'green' }}>{batteryHealth}% </span>} </h2>
        <h2>Device details : {!deviceInfo ? <span style={{ color: 'orange', fontSize: '23px' }}> Finding device details </span> : <span style={{ color: 'green' }}> {deviceInfo} </span>} </h2>
      </div>

    </div>
  );
}

export default App;
