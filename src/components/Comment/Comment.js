import './Comment.css';
import CommentContent from "./CommentContent/CommentContent";
import {useState} from "react";
import API from "../../api/API";
import {toast} from "react-toastify";

const Comment = ({id, event, setEvent}) => {
    const [content, setContent] = useState('');
    const onChange = (e) => {
        setContent(e.target.value);
    }
    const onClick = () => {
        if(content === "") toast.error("댓글 내용을 입력해주세요.")
        else {
            API.post(`/student/${id}/comment`, {content: content})
                .then(({data}) => {
                    if(data.success){
                        setContent('');
                        setEvent(e => !e);
                    }
                })
                .catch(() => toast.error("Unauthorized Access"))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="commentBox">
                <div className="commentBoxText">코멘트</div>
            </div>
            <CommentContent id={id} event={event} />

            <form onSubmit={onSubmit}>
                <input type="text" className="commentInput" value={content} onChange={onChange} placeholder="댓글을 작성하세요."/>
                <button className="commentButton" onClick={onClick}>
                    <div className="commentButtonText">작성</div>
                </button>
            </form>
        </>
    )
}

export default Comment