import React, {Component} from 'react';
import {split as SplitEditor} from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import {JSHINT} from "jshint";

const defaultText = "let x = {};\n" +
  "function isEmpty(obj) {\n" +
  "  for(let prop in obj) {\n" +
  "    if(obj.hasOwnProperty(prop)) {\n" +
  "      return false;\n" +
  "    }\n" +
  "  }\n" +
  "\n" +
  "  return JSON.stringify(obj) === JSON.stringify({});\n" +
  "}\n" +
  "isEmpty(x);";

class Split extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.x = this.editor.current;
    this.data = "";
    this.results = {};
  }

  handleChange(input) {
    console.log(this.editor.current);
    this.data = input[0];
    this.sendData();
  };

  componentDidMount() {
    this.sendData();
  }

  sendData() {
    let source = this.data;
    let options = {
      esversion: 7,
      eqeqeq: true,
      maxdepth: 3,
      maxcomplexity: 3,
      maxparams: 3,
      undef: true,
      unused: true,
      strict: false,
      varstmt: true,
      node: true
    };
    let predef = {};

    JSHINT(source, options, predef);
    this.results = JSHINT.data();

    if (Object.entries(this.results).length !== 0) {
      if (this.results.errors === undefined) {
        this.editor.current.refEditor.children[7].innerText = "This code is perfect!!!";
      } else {
        let totalErrors = this.results.errors.length;
        let errors = "";
        this.results.errors.forEach(er => {
          errors += ` Error: ${er.reason} Line:${er.line}\n`;
        });
        if (this.editor.current) {
          this.editor.current.refEditor.children[7].innerText = `Total Errors:${totalErrors}`;
          this.editor.current.refEditor.children[7].innerText += `\n${errors}`;
        }
      }
    }
  }

  render() {
    return (
      <div>
        <SplitEditor
          ref={this.editor}
          mode="javascript"
          isDark={true}
          theme="github"
          splits={2}
          orientation="beside"
          width={"1000px"}
          value={["let code = {'quality': 'perfect'};", " "]}
          name="UNIQUE_ID_OF_DIV"
          onChange={this.handleChange.bind(this)}
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
}

export default Split;
