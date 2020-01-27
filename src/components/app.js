import React, {Component} from "react";
import AceEditor from "react-ace";
import {Button, Col, Row} from "react-bootstrap";

import {JSHINT} from "jshint";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-searchbox";

class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
    this.data = "";
    this.results = {}
  }

  onChange(newValue) {
    this.data = newValue;
  }

  sendData() {
    let source = this.data;
    let options = {
      esversion: 7,
      eqeqeq: true,
      maxdepth: 4,
      maxcomplexity: 3,
      maxparams: 3,
      undef: true,
      unused: true,
      strict: true,
      varstmt: true,
    };
    let predef = {};

    JSHINT(source, options, predef);
    this.results = JSON.stringify(JSHINT.data());
    console.log(JSHINT.data());
    this.setState({auth: true});
  }

  render() {
    return (
      <Row>
        <Col>

        </Col>
        <Col>
          <AceEditor
            mode="javascript"
            theme="monokai"
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
        <Col className={"alert-primary"}>
          {this.state.auth === true ? (
            this.results
          ) : null}
        </Col>
      </Row>
    );
  }
}

export default app;
