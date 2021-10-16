import React, { Component } from "react";
import { SERVER_URL } from "../constants.js";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { CSVLink } from "react-csv";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import carService from '../services/car.service';

class Carlist extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [] };
  }

  componentDidMount() {
    this.fetchCars();
  }

  fetchCars = () => {
    // Read the token from the session storage
    // and include it to Authorization header
      console.log("fetchCars metoduna girdi***")
      carService.getAll()
      .then((responseData) => {
        console.log("responseData",responseData)
        this.setState({
          cars: responseData.cars,
        });
      })
      .catch((err) => console.error(err));

  };

  onDelClick = (link) => {
    if (window.confirm("Are you sure to delete?")) {
      const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL, { method: "DELETE",
      headers: {'Authorization': token}})
        .then((res) => {
          toast.success("Car deleted", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          this.fetchCars();
        })
        .catch((err) => {
          toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error(err);
        });
    }
  };

  // Add new car
  addCar(car) {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
      body: JSON.stringify(car),
    })
      .then((res) => this.fetchCars())
      .catch((err) => console.error(err));
  }

  // Update car
  updateCar(car, link) {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
      body: JSON.stringify(car),
    })
      .then((res) => {
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        this.fetchCars();
      })
      .catch((err) =>
        toast.error("Error when saving", {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      );
  }

  render() {
    const columns = [
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Price €",
        accessor: "price",
      },
      {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value, row }) => (
          <EditCar
            car={row}
            link={value}
            updateCar={this.updateCar}
            fetchCars={this.fetchCars}
          />
        ),
      },
      {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value }) => (
          <Button
            color="secondary"
            onClick={() => {
              this.onDelClick(value);
            }}
          >
            Delete
          </Button>
        ),
      },
    ];

    return (
      <div className="App">
        <Grid container>
          <Grid item>
            <AddCar addCar={this.addCar} fetchCars={this.fetchCars} />
          </Grid>
          <Grid item style={{ padding: 15 }}>
            <CSVLink data={this.state.cars} separator=";">
              Export CSV
            </CSVLink>
          </Grid>
        </Grid>
        <ReactTable
          data={this.state.cars}
          columns={columns}
          filterable={true}
        />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
export default Carlist;
