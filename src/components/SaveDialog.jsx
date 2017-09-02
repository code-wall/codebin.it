import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import TextField from 'material-ui/lib/text-field';
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
                <div> <p>Saved link:</p> 
                    <TextField 
                    id="snippet-link"
                    style={{width:((this.props.snippet.currentLink.length + 1) * 8) + 'px'}}
                    value={this.props.snippet.currentLink} 
                    readOnly/>

                    <button onClick={() => this.copyLink()} aria-label="Copy to clipboard" data-copied-hint="Copied!" type="button">
                        <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg>
                    </button>
                </div>
            );
        }
    }

    copyLink() {
        console.log('Copying LINK!');
        document.getElementById("snippet-link").select()
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }
}

SaveDialog.propTypes = {
    saveDialogState: React.PropTypes.bool.isRequired,
    setSavedDialogStateShowing: React.PropTypes.func.isRequired,
    snippet: React.PropTypes.object.isRequired
};

export default SaveDialog
