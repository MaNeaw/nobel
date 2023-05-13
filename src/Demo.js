import React, { useState } from "react";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./App.css";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import { Grid } from "@mui/material";

const drawerWidth = 220;

const Demoz = () => {
  const Swal = require("sweetalert2");
  const [value_year, setValueYear] = React.useState(dayjs("2022-04-07"));
  const [value_year_2, setValueYear2] = React.useState(dayjs("2022-04-08"));

  const [data, setData] = useState([]);
  const options_Cat = [
    { value: "", text: "none" },
    { value: "che", text: "Chemistry" },
    { value: "eco", text: "English" },
    { value: "lit", text: "Literature" },
    { value: "pea", text: "Peace" },
    { value: "phy", text: "Physics" },
    { value: "med", text: "Medicine" },
  ];
  const [selected_Cat, setSelected] = useState(options_Cat[0].value);
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  function handle_bt_save() {
    const fetchData = () => {
      if (selected_Cat !== "") {
        if (selected_Cat === "eco") {
          if (value_year.$y <= value_year_2.$y) {
            fetch(
              `https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeYear=${value_year.$y}&yearTo=${value_year_2.$y}&nobelPrizeCategory=${selected_Cat}`
            )
              .then((response) => response.json())
              .then((actualData) => {
                console.log(actualData);
                setData(actualData.nobelPrizes);
                console.log(data);
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            Swal.fire({
              icon: "error",
              title: `To must be more than Select year`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          if (value_year.$y <= value_year_2.$y) {
            if(value_year.$y > 1900 && value_year_2.$y < 2023){

              fetch(
                `https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeYear=${value_year.$y}&yearTo=${value_year_2.$y}&nobelPrizeCategory=${selected_Cat}`
              )
                .then((response) => response.json())
                .then((actualData) => {
                  console.log(actualData);
                  setData(actualData.nobelPrizes);
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err.message);
                });
            }else{
              Swal.fire({
                icon: "error",
                title: `Please choose between 1901 - 2022`,
                showConfirmButton: false,
                timer: 1500,
              });
            }

            
          } else {
            Swal.fire({
              icon: "error",
              title: `To must be more than Select year`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      } 
      //Cat ว่าง 
      else {
        if (value_year.$y === value_year_2.$y && selected_Cat ==="") {
          if (value_year.$y < 2023 && value_year.$y > 1900) {
            if (value_year_2.$y < 2023 && value_year_2.$y > 1900) {
              fetch(
                `https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeYear=${value_year.$y}`
              )
                .then((response) => response.json())
                .then((actualData) => {
                  console.log(actualData);
                  setData(actualData.nobelPrizes);
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err.message);
                });
            } else {
              Swal.fire({
                icon: "error",
                title: `Please choose between 1901 - 2022`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: `Please choose between 1901 - 2022`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else if (value_year.$y <= value_year_2.$y) {
          if (value_year.$y < 2023 && value_year.$y > 1900) {
            if (value_year_2.$y < 2023 && value_year_2.$y > 1900) {
              fetch(
                `https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeYear=${value_year.$y}&yearTo=${value_year_2.$y}`
              )
                .then((response) => response.json())
                .then((actualData) => {
                  console.log(actualData);
                  setData(actualData.nobelPrizes);
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err.message);
                });
            } else {
              Swal.fire({
                icon: "error",
                title: `Please choose between 1901 - 2022`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: `Please choose between 1901 - 2022`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: `To must be more than Select year`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    };

    fetchData();
  }

  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Nobel Prize
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,

            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", mt: 2 }}>
            <List>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  label="Select Year"
                  value={value_year}
                  onChange={(newValue) => {
                    setValueYear(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                  sx={{ width: 200 }}
                />

                <DatePicker
                  sx={{ mt: 2, width: 200 }}
                  views={["year"]}
                  label="To"
                  value={value_year_2}
                  onChange={(newValue) => {
                    setValueYear2(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>

              <div class="box_s">
                <p className="select_label">Select category</p>
                <select value={selected_Cat} onChange={handleChange}>
                  {options_Cat.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <Grid container justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={handle_bt_save}
                  sx={{ width: 200 }}
                >
                  Apply Filter
                </Button>
              </Grid>
            </List>
          </Box>
        </Drawer>

        <Box
          sx={{
            display: "flex",
            alignItems: "top",
            minHeight: "100vh",
            minWidth: "85%",
          }}
          className="Bg"
        >
          <Typography paragraph sx={{ mt: 15, maxWidth: "98%" }}>
            <table>
              <tbody>
                <tr>
                  <th className="th_h">Award</th>
                  <th className="th_h">Year</th>
                  <th className="th_h">Laureates</th>
                  <th className="th_h">Motivation</th>
                </tr>
                {data.map((item, index) => (
                  <tr key={index} className="tr_d">
                    <td className="td_c">{item.categoryFullName.en}</td>
                    <td className="td_c">{item.awardYear}</td>
                    <td className="td_detail">
                      {item.laureates.map((data_L) => (
                        <div key={data_L.id} className="test_1">
                          {data_L.fullName
                            ? data_L.fullName.en
                            : data_L.orgName.en}
                        </div>
                      ))}
                    </td>
                    <td className="td_detail">
                      {item.laureates.map((data_L) => (
                        <div key={data_L.id} className="test_1">
                          {data_L.motivation.en}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Demoz;
