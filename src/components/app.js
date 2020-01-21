import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-cobalt";

export class app extends Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }
  //uiuih
  onChange(newValue) {
    console.log("change", newValue);
    // this.setState({
    //   data: newValue
    // })
  }
  sendData() {
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <AceEditor
          mode="java"
          theme="cobalt"
          onChange={this.onChange.bind(this)}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    );
  }
}

export default app;
