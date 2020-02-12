import React, {Component} from 'react';
import {split as SplitEditor} from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import {JSHINT} from "jshint";
import {Button, Col, Row} from "react-bootstrap";

import "../styles/split.css"

class Split extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      options: {
        esversion: 7,
        eqeqeq: true,
        maxdepth: 3,
        maxcomplexity: 3,
        maxparams: 3,
        undef: true,
        unused: true,
        strict: false,
        varstmt: true,// vale auto
        node: true,
        browser: true,
        jquery: true 
      },
      data:
        "//My solution before research\n" +
        "function digital_root(n) {\n" +
        "    while (n > 9) {// while n is greater than 9\n" +
        "        let sum = 0;// place to store the sum\n" +
        "        while (n > 0) { // while n is greater than 0\n" +
        "            const lastDigit = n % 10;// mod the number by 10 to get last digit\n" +
        "            n = Math.floor(n / 10);// take math.floor of number divided by 10 to drop off last digit\n" +
        "            sum += lastDigit;// add last digit to sum\n" +
        "        }\n" +
        "        n = sum;// re-assign sum to n\n" +
        "    }\n" +
        "    return n;\n" +
        "}"
    };
    this.editor = React.createRef();
    this.x = this.editor.current;
    this.data = "";
    this.results = {};
  }

  handleChange(input) {
    console.log(this.editor.current);
    this.data = input[0];
    this.setState({data: this.data});
    this.sendData();
  };

  componentDidMount() {
    this.sendData();
  }

  sendData() {
    let source = this.data;
    let predef = {};

    JSHINT(source, this.state.options, predef);
    this.results = JSHINT.data();
    console.log(this.results);
    if (Object.entries(this.results).length !== 0) {
      if (this.results.errors === undefined) {
        this.editor.current.refEditor.children[7].innerText = `Metrics:`;
        if(this.results.functions.length !== 0){          
          this.editor.current.refEditor.children[7].innerText += `\nNumber of functions:${this.results.functions.length}`;
          this.editor.current.refEditor.children[7].innerText += `\nMax function complexity:${this.maxComplexity(this.results)}`;
          this.editor.current.refEditor.children[7].innerText += `\nMax function parameters:${this.maxParams(this.results)}`;
          this.editor.current.refEditor.children[7].innerText += `\nMax function statements:${this.maxStatements(this.results)}`;
        }
        this.editor.current.refEditor.children[7].innerText += "\nThis code is perfect!!!";
      } else {
        let totalErrors = this.results.errors.length;
        let errors = "";
        this.results.errors.forEach(er => {
          errors += ` Error: ${er.reason} Line:${er.line}\n`;
        });
        if (this.editor.current) {
          // To panel me ta errors
          this.editor.current.refEditor.children[7].innerText = `Metrics:`;
          if(this.results.functions.length !== 0){
            this.editor.current.refEditor.children[7].innerText += `\nNumber of functions:${this.results.functions.length}`;
            this.editor.current.refEditor.children[7].innerText += `\nMax function complexity:${this.maxComplexity(this.results)}`;
            this.editor.current.refEditor.children[7].innerText += `\nMax function parameters:${this.maxParams(this.results)}`;
          }
          this.editor.current.refEditor.children[7].innerText += `\nTotal Errors:${totalErrors}`;
          this.editor.current.refEditor.children[7].innerText += `\n${errors}`;
        }
      }
    }
  }

  maxComplexity(results){
    let array = results.functions.map(el => {
      return el.metrics.complexity;
    });
    return Math.max.apply(null, array);
  }

  maxParams(results){
    let array = results.functions.map(el => {
      return el.metrics.parameters;
    });
    return Math.max.apply(null, array);
  }

  maxStatements(results){
    let array = results.functions.map(el => {
      return el.metrics.statements;
    });
    return Math.max.apply(null, array);
  }
  
  handleEqeqeq(){
    let options = this.state.options;
    options.eqeqeq = !options.eqeqeq;
    this.setState({
      options: options
    });
    this.sendData();
  }
  
  handleStrict(){
    let options = this.state.options;
    options.strict = !options.strict;
    this.setState({
      options: options
    });
    this.sendData();
  }

  handleNode(){
    let options = this.state.options;
    options.node = !options.node;
    this.setState({
      options: options
    });
    this.sendData();
  }

  handleBrowser(){
    let options = this.state.options;
    options.browser = !options.browser;
    this.setState({
      options: options
    });
    this.sendData();
  }

  handleJQuery(){
    let options = this.state.options;
    options.jquery = !options.jquery;
    this.setState({
      options: options
    });
    this.sendData();
  }
  
  handleVarstmt(){
    let options = this.state.options;
    options.varstmt = !options.varstmt;
    this.setState({
      options: options
    });
    this.sendData();
  }
  render() {
    return (
      <div>
        <Row >

          <Col>
            <Col  md={2}>
              <Button    onClick={this.handleEqeqeq.bind(this)} >=== : {this.state.options.eqeqeq.toString()}</Button>
            </Col>
            <Col>
              <a onClick={this.handleStrict.bind(this)}>strict : {this.state.options.strict.toString()}</a>
            </Col>
            <Col>
              <a onClick={this.handleNode.bind(this)}>node : {this.state.options.node.toString()}</a>
            </Col>
            <Col>
              <a onClick={this.handleBrowser.bind(this)}>browser : {this.state.options.browser.toString()}</a>
            </Col>
            <Col>
              <a onClick={this.handleJQuery.bind(this)}>jquery : {this.state.options.jquery.toString()}</a>
            </Col>
            <Col>
              <a onClick={this.handleVarstmt.bind(this)}>varstmt : {this.state.options.varstmt.toString()}</a>
            </Col>
          </Col>
          <Col   md={10}>
            <SplitEditor
              ref={this.editor}
              mode="javascript"
              isDark={true}
              theme="github"
              splits={2}
              orientation="beside"
              width={"100%"}
              height={window.innerHeight - 30}
              value={[this.state.data, " "]}
              name="UNIQUE_ID_OF_DIV"
              onChange={this.handleChange.bind(this)}
              editorProps={{$blockScrolling: true}}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Split;