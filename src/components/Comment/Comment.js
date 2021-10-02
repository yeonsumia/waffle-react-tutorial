import './Comment.css';
import CommentContent from "./CommentContent/CommentContent";
import {useState} from "react";
import API from "../../api/API";
import {useUserContext} from "../../context/UserContext";
import {toast, ToastContainer} from "react-toastify";

const Comment = ({id, event, setEvent}) => {
    const {loginToken} = useUserContext();
    const config = {
        headers: { Authorization: `Bearer ${loginToken}` }
    };
    const [content, setContent] = useState('');
    const onChange = (e) => {
        setContent(e.target.value);
    }
    const onClick = () => {
        API.post(`/student/${id}/comment`, {content: content}, config)
            .then(({data}) => {
                if(data.success){
                    setContent('');
                    setEvent(e => !e);
                }
            })
            .catch(({data}) => toast.error(data.message))
    }
    const onKeyPress = (e) => {
        if(e.key === 'Enter') onClick();
    }
    return (
        <>
            <div className="commentBox">
                <div className="commentBoxText">코멘트</div>
            </div>
            <CommentContent id={id} event={event} />

            <input type="text" className="commentInput" value={content} onChange={onChange} onKeyPress={onKeyPress} placeholder="댓글을 작성하세요."/>

            <div className="commentButton" onClick={onClick}>
                <div className="commentButtonText">작성</div>
            </div>
            <ToastContainer autoClose={2500} position="top-right" />
        </>
    )
}

export default Comment