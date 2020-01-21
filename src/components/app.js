import React, {Component} from "react";
import AceEditor from "react-ace";
import {Button, Col, Row} from "react-bootstrap";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import 'ace-builds/src-noconflict/ext-searchbox';

export class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  onChange(newValue) {
    console.log(newValue);
    // this.setState(prevState => ({
    //   data: newValue
    // }))
  }

  sendData() {
  }

  render() {
    return (
      <Row>
        <Col>
          <AceEditor
            mode="javascript"
            theme="terminal"
            onChange={this.onChange.bind(this)}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
          />
        </Col>
        <Col>
          <Button variant={"outline-primary"} onClick={this.sendData.bind(this)} size={"sm"}>
            Click
          </Button>
        </Col>
      </Row>
    );
  }
}

export default app;
