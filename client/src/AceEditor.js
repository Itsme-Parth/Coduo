import React from "react";

// Import Brace and the AceEditor Component
import brace from "brace";
import AceEditor from "react-ace";

// Import a Mode (language)
import "brace/mode/java";
import "brace/mode/python";

// Import a Theme (okadia, github, xcode etc)
import "brace/theme/github";
import "brace/theme/monokai";
import "brace/theme/twilight";

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.props.setCode(newValue);
    console.log("change", newValue);
  }

  render() {
    return (
      <div>
        <AceEditor
          mode={this.props.language}
          theme="twilight"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          value={this.props.code}
          editorProps={{
            $blockScrolling: true,
          }}
        />
      </div>
    );
  }
}
