import './CommentRow.css';
import {DateTime} from "luxon/build/es6/luxon";

const CommentRow = ({comment}) => {
    const {content, datetime} = comment;
    const datetimeFormatted = DateTime.fromISO(datetime).toFormat('L월 d일 h시 m분');

    return (
        <div className="commentRowWrapper">
            <div className="commentRowText">{content}</div>
            <div className="commentRowTime">{datetimeFormatted}</div>
        </div>
    )
}

export default CommentRow