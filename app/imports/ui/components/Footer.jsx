import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
            Beyond the Library<br />
            &quot; Hit the books in these hit places &quot;<br />
            University of Hawaii at Manoa<br />
            <a href="https://beyond-the-library.github.io/">GitHub Project Documentation</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
