import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import Theme from '../constants/theme';

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
        const snippet = this.props.snippet;
        return (
            <div>
                <Dialog
                    title={snippet.saving ? 'Saving Snippet' : 'Snippet Saved'}
                    contentClassName="codebin-dialog"
                    actions={actions}
                    modal={true}
                    open={this.props.saveDialogState}
                >
                    {this._renderModalContent()}
                </Dialog>
            </div>
        );
    }

    _renderModalContent() {
        if (this.props.snippet.saving) {
            return (
                <div style={{textAlign:"center"}}>
                    <CircularProgress color={Theme.palette.primary1Color} 
                                    size={0.5} thickness={7} />
                </div>
            )
        } 
        else {
            return (
                <p>Saved link: 
                    <span>
                        {this.props.snippet.currentLink}
                    </span>
                </p>
            );
        }
    }
}

SaveDialog.propTypes = {
    saveDialogState: React.PropTypes.bool.isRequired,
    setSavedDialogStateShowing: React.PropTypes.func.isRequired,
    snippet: React.PropTypes.object.isRequired
};

export default SaveDialog
