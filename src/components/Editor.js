import React, {Component} from 'react';
import AceEditor from "react-ace";
import {JSHINT} from "jshint";
import {Col, Row} from "react-bootstrap";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-searchbox";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.resultInput = React.createRef();
    this.data = "";
    this.results = {};
  }

  onChange(newValue) {
    this.data = newValue;
    this.sendData();
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
      varstmt: true
    };
    let predef = {};

    JSHINT(source, options, predef);
    this.results = JSHINT.data();
    console.log(this.results);
    console.log(this.results.errors);

    let totalErrors = this.results.errors.length;
    let errors = "";
    this.results.errors.forEach(er => {
      errors += ` Error: ${er.reason} Line:${er.line}\n`;
    });

    this.resultInput.current.refEditor.innerText = `Total Errors:${totalErrors}`;
    this.resultInput.current.refEditor.innerText += `\n${errors}`;

  }

  render() {
    return (
      <Row className={"app"}>
        <Col>
          <AceEditor
            ref={this.textInput}
            mode="javascript"
            theme="monokai"
            onChange={this.onChange.bind(this)}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
          />
        </Col>
        <Col>
          <AceEditor
            ref={this.resultInput}
            mode="javascript"
            theme="monokai"
            defaultValue={"//hello"}
            showGutter={false}
            readOnly={true}
            name="RESULTS"
            editorProps={{$blockScrolling: true}}
          />
        </Col>
      </Row>
    );
  }
}

export default Editor;
