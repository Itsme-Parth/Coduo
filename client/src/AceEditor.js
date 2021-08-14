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

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    console.log("change", newValue);
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="python"
          theme="monokai"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
            $blockScrolling: true,
          }}
        />
      </div>
    );
  }
}
