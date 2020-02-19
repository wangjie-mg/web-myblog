import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { jsx, javascript, c,cpp, } from "react-syntax-highlighter/dist/esm/languages/prism";

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  componentWillMount() {
    SyntaxHighlighter.registerLanguage("c", c);
    SyntaxHighlighter.registerLanguage("cpp", cpp);
    SyntaxHighlighter.registerLanguage("jsx", jsx);
    SyntaxHighlighter.registerLanguage("javascript", javascript);
  }

  render() {
    const { language, value } = this.props;
    return (
      <figure className="highlight">
        <SyntaxHighlighter language={language} style={duotoneLight}>
          {value}
        </SyntaxHighlighter>
      </figure>
    );
  }
}
export default CodeBlock;
