import React, { Component } from "react";
import AceEditor from "react-ace";
import { Button, Col, Row } from "react-bootstrap";

import { JSHINT } from "jshint";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-searchbox";

class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
    this.data = "";
  }

  onChange(newValue) {
    // console.log(newValue);
    this.data = newValue;
    // this.setState(prevState => ({
    //   data: newValue
    // }))
  }

  sendData() {
    var source = this.data;
    var options = {
      undef: true,
      esversion: 7
    };
    var predef = {
      foo: false
    };

    JSHINT(source, options, predef);

    console.log(JSHINT.data());
  }

  render() {
    return (
      <Row>
        <Col>
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={this.onChange.bind(this)}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
        </Col>
        <Col>
          <Button
            variant={"outline-primary"}
            onClick={this.sendData.bind(this)}
            size={"sm"}
          >
            Click
          </Button>
        </Col>
        <Col>{}</Col>
      </Row>
    );
  }
}

export default app;
