import React from "react";

export default class InputField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      id: (props.idBase ?? "") + "_" + (Math.ceil(Math.random() * 100000)).toString(),
    };
    this.setValue = this.setValue.bind(this);
  }

  setValue(val) {
    //console.log(val);
    this.props.changehandler(val);
  }

  render() {
      return (
        <>
          <label 
            className="form-label"
            htmlFor={this.state.id}
          >
            {this.props.label}
          </label>
          <input 
            id={this.state.id}
            className={"form-control" + (this.props.size ? (" " + this.props.size) : "")}
            onChange={(e) => this.setValue(e.currentTarget.value)}
            name={this.props.name}
          />
        </>
      );
  }
}