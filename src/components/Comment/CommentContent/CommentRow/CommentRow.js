import './CommentRow.css';
import {DateTime} from "luxon/build/es6/luxon";

const CommentRow = ({comment}) => {
    const {content, datetime} = comment;
    const datetimeLuxon = DateTime.fromISO(datetime);
    const datetimeFormatted = datetimeLuxon.c.month + "월 " + datetimeLuxon.c.day + "일 " + datetimeLuxon.c.hour + "시 " + datetimeLuxon.c.minute + "분";

    return (
        <div className="commentRowWrapper">
            <div className="commentRowText">{content}</div>
            <div className="commentRowTime">{datetimeFormatted}</div>
        </div>
    )
}

export default CommentRow