import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

class SaveDialog extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const actions = [
            <FlatButton
                label="close"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.props.setSavedDialogStateShowing(false)}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Snippet saved"
                    contentClassName="codebin-dialog"
                    actions={actions}
                    modal={true}
                    open={this.props.saveDialogState}
                >
                    <p>Link: <span>S</span></p>
                </Dialog>
            </div>
        );
    }
}

SaveDialog.propTypes = {
    saveDialogState: React.PropTypes.bool.isRequired,
    setSavedDialogStateShowing: React.PropTypes.func.isRequired
};

export default SaveDialog
