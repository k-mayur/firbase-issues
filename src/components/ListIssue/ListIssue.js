import React from 'react';
import classes from './ListIssue.css';
import tinycolor from 'tinycolor2';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';

const listIssue = props => {
    if (props.issue) {
        const labels = props.issue.labels.map(label => {
            let color = `#${label.color}`;
            let colorText;
            if (tinycolor(color).isLight()) {
                colorText = 'black';
            } else {
                colorText = 'white';
            }
            let styles = {backgroundColor : color, color : colorText};
            return (
                <span className={classes.label} key={label.id} style={styles}>
                    {label.name} &nbsp;
                </span>
            );
        });
        return (
            <div className={classes.wrap}>
            <div className={classes.issue}>               
                <p className={classes.head}>
                    <Icon className={classes.exclamation}>error_outline</Icon>
                    <strong>
                        <Link to={`/issues/${props.issue.number}`} >
                            {props.issue.title}
                        </Link>
                        &nbsp;<span>{labels}</span>
                    </strong>
                </p>
                <p className={classes.light}>
                    #{props.issue.number} by {props.issue.user.login}, 
                    created {moment(new Date(props.issue.created_at)).fromNow()}, 
                    last updated {moment(new Date(props.issue.updated_at)).fromNow()}
                </p>
            </div>
            <div className={classes.icon}>
                <p><span><Icon fontSize='small'>chat_bubble_outline</Icon></span>&nbsp; {props.issue.comments}</p>
            </div>
            </div>
            
        );
    } else {
        return null;
    }
    
}

export default listIssue;