import React from 'react';
import Switch from '@material-ui/core/Switch';

class Switches extends React.Component {
    render() {
        return (
        <div>
            <Switch
            checked={this.props.checked}
            onChange={(e) => this.props.change(e.target.checked)}
            color="primary"
            />
        </div>
        );
    }
}

export default Switches;