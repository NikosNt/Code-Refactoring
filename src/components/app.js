import React, { Component } from "react";
import AceEditor from "react-ace";
import { Button } from "react-bootstrap";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-cobalt";
import "bootstrap/dist/css/bootstrap.min.css";

export class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }
  onChange(newValue) {
    console.log(newValue);
  }
  sendData() {
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="cobalt"
          onChange={this.onChange.bind(this)}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
        <Button variant={"outline-primary"} size={"sm"}>
          Click
        </Button>
      </div>
    );
  }
}

export default app;
