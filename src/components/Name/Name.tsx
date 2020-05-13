import React from "react";
import stores from "../../stores/Stores";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
export default class Name extends React.Component {
  @observable name: string = "";

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.name = event.target.value;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    stores.client.sendMessage(`hi from ${this.name}`);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>would you like to change your name?</h2>
        <label>
          Name:
          <input
            type="text"
            value={this.name}
            onChange={this.handleChange}
          ></input>
        </label>
      </form>
    );
  }
}
