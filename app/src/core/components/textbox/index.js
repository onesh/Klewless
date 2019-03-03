import React from "react";
import style from "./style.css";
import Button from "@material-ui/core/Button";

class Textbox extends React.Component {
  constructor(props) {
    super(props);
  }

  mouseEnter(e) {
    let { value } = e.target;
  }

  mouseLeave(e) {
    let { value } = e.target;
  }
  updateModel(model, e) {
    model.value = e.target.value;
    this.forceUpdate();
  }

  render() {
    const {
      value,
      width,
      placeholder,
      right,
      style,
      block,
      model,
      editable
    } = this.props;
    if (editable) {
      if (block) {
        // full length textbox, long-one usually for question text
        return (
          <span>
            <input
              className={"placeholder"}
              type="text"
              style={style}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
              class={
                model.errorText
                  ? "core_textbox_error core_textbox_parent"
                  : "core_textbox"
              }
              value={model.value}
              onChange={this.updateModel.bind(this, model)}
              contenteditable="true"
              placeholder={"type here.."}
            />
          </span>
        );
      } else {
        return (
          <span>
            <input
              className={"placeholder"}
              type="text"
              style={style}
              value={model.value}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
              class={
                model.errorText
                  ? "core_textbox_error core_textbox_parent"
                  : "core_textbox"
              }
              onChange={this.updateModel.bind(this, model)}
              contenteditable="true"
              placeholder={"type here.."}
            />
          </span>
        );
      }
    } else {
      return <span>{model.value}</span>;
    }
  }
}

export default Textbox;
