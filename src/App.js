import React, { Component } from "react";
import { data } from "./mock.js";
export default class App extends Component {
  state = {
    data: data,
    name: "",
    newName: "",
    status: "",
    newStatus: "",
    selected: null,
    newData: data,
    prop: "",
  };
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
    const onSave = (e) => {
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
      let map = this.state.data.filter((item) => item.id !== e.id);
      this.setState({
        data: map,
      });
    };
    const onAdd = () => {
      if (
        this.state.newName.length !== 0 &&
        this.state.newStatus.length !== 0
      ) {
        let newUser = {
          id: this.state.data[this.state.data.length - 1].id + 1,
          name: this.state.newName,
          status: this.state.newStatus,
        };
        var Pushdata = this.state.data;
        Pushdata.push(newUser);
        this.setState({
          newName: "",
          newStatus: "",
        });
      } else {
        prompt("Are you full these inputs?");
      }
    };
    return (
      <div>
        <table
          border="1"
          style={{
            borderCollapse: "collapse",
            width: "70%",
            margin: " auto",
            marginTop: "100px",
          }}
        >
          <thead>
            <tr>
              <th>
                <input
                  style={{ width: "95%" }}
                  name="newName"
                  onChange={onChange}
                  value={this.state.newName}
                />
              </th>
              <th>
                <input
                  style={{ width: "95%" }}
                  name="newStatus"
                  onChange={onChange}
                  value={this.state.newStatus}
                />
              </th>
              <th>New Status</th>
              <th>
                <button onClick={onAdd}>Add</button>
                <button
                  onClick={() => this.setState({ data: this.state.newData })}
                >
                  Restore
                </button>
              </th>
            </tr>
          </thead>
        </table>
        <table
          border="1"
          style={{
            borderCollapse: "collapse",
            width: "70%",
            margin: "auto",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>STATUS</th>
              <th>ACTION {this.state.data.length}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((value) => {
              return (
                <tr>
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
              );
            })}
          </tbody>
        </table>
        {console.log(this.state.data)}
      </div>
    );
  }
}
