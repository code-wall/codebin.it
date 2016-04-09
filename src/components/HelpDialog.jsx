import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Shortcuts from '../util/Shortcuts';

export default class DialogExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    Shortcuts.displayShortcuts(this.handleShow);
  }

  handleShow() {
    if (this.state.open) {
      this.setState({open: false});
    } else {
      this.setState({open: true});
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="Got It"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleShow}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleShow} />
        <Dialog
          title="Keyboard Shortcuts"
          contentClassName="codebin-dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleShow}
        >
          <p>Select language: <span className="keyboard">cmd</span> + <span className="keyboard">L</span></p>
          <p>Save snippet and share: <span className="keyboard">cmd</span> + <span className="keyboard">S</span></p>
        </Dialog>
      </div>
    );
  }
}
