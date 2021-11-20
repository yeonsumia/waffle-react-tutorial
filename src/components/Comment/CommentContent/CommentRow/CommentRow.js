import styles from './CommentRow.module.scss';
import {DateTime} from "luxon/build/es6/luxon";

const CommentRow = ({comment}) => {
    const {content, datetime} = comment;
    const datetimeFormatted = DateTime.fromISO(datetime).toFormat('L월 d일 h시 m분');

    return (
        <div className={styles.commentRowWrapper}>
            <div className={styles.commentRowText}>{content}</div>
            <div className={styles.commentRowTime}>{datetimeFormatted}</div>
        </div>
    )
}

export default CommentRow