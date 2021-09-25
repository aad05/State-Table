import React, { Component } from "react";
import { data } from "./mock";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      name: "",
      status: "",
      selected: null,
      restore: data,
      newName: "",
      newStatus: "",
    };
  }
  render() {
    const onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
    const onEdit = (e) => {
      this.setState({
        name: e.name,
        status: e.status,
        selected: e.id,
      });
    };
    const onSave = () => {
      let newData = this.state.data.map((value) =>
        value.id === this.state.selected
          ? { ...value, name: this.state.name, status: this.state.status }
          : value
      );
      this.setState({
        data: newData,
        selected: null,
      });
    };
    const onDelete = (e) => {
      let map = this.state.data.filter((value) => value.id !== e.id);
      this.setState({
        data: map,
      });
    };
    const onRestore = () => {
      this.setState({
        data: this.state.restore,
      });
    };
    const onAdd = () => {
      let newBaze = {
        id: this.state.data[this.state.data.length - 1].id + 1,
        name: this.state.newName,
        status: this.state.newStatus,
      };
      let data2 = this.state.data;
      data2.push(newBaze);
      this.setState({
        data: data2,
      });
    };
    const onFilter = (e) => {
      if (e.target.value === "name") {
        this.setState({
          data: this.state.data.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          }),
        });
      } else {
        this.setState({
          data: this.state.data.sort(function (a, b) {
            if (a.status < b.status) {
              return -1;
            }
            if (a.status < b.status) {
              return 1;
            }
            return 0;
          }),
        });
      }
    };
    return (
      <div>
        <table
          border="1"
          style={{ borderCollapse: "collapse", width: "70%", margin: "auto" }}
        >
          <thead>
            <tr>
              <th>
                <input
                  onChange={onChange}
                  name="newName"
                  value={this.state.newName}
                />
              </th>
              <th>
                <input
                  onChange={onChange}
                  name="newStatus"
                  value={this.state.newStatus}
                />
              </th>
              <th>
                <button onClick={onAdd}>Add</button>
                <button onClick={onRestore}>Restore</button>
                <select id="filterStatus" onChange={onFilter}>
                  <option value="name">Name</option>
                  <option value="status">Status</option>
                </select>
              </th>
            </tr>
          </thead>
        </table>
        <table
          border="1"
          style={{ borderCollapse: "collapse", width: "70%", margin: "auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action {this.state.data.length}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>
                  {this.state.selected === value.id ? (
                    <input
                      name="name"
                      onChange={onChange}
                      value={this.state.name}
                    />
                  ) : (
                    value.name
                  )}
                </td>
                <td>
                  {this.state.selected === value.id ? (
                    <input
                      name="status"
                      onChange={onChange}
                      value={this.state.status}
                    />
                  ) : (
                    value.status
                  )}
                </td>
                <td>
                  {this.state.selected === value.id ? (
                    <button onClick={onSave}>Save</button>
                  ) : (
                    <button onClick={() => onEdit(value)}>Edit</button>
                  )}
                  <button onClick={() => onDelete(value)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
