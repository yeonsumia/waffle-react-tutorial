import './CommentContent.css';
import API from "../../../api/API";
import {useEffect, useRef, useState} from "react";
import CommentRow from "./CommentRow/CommentRow";
import {toast} from "react-toastify";
import {useUserContext} from "../../../context/UserContext";

const CommentContent = ({id, event}) => {
    const [commentList, setCommentList] = useState([]);
    const {loginToken} = useUserContext();
    const scrollRef = useRef();
    const scrollToBottom = () => {
        const {scrollHeight, clientHeight} = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    }


    useEffect(() => {
       scrollToBottom();
    }, [commentList]);

    useEffect(() => {
        if(loginToken === "") {
            const token = localStorage.getItem('loginToken');
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            API.get(`/student/${id}/comment`)
                .then(({data}) => {
                    setCommentList(data);
                })
                .catch(() => {
                    toast.error("error!")
                })
        } else {
            API.get(`/student/${id}/comment`)
                .then(({data}) => {
                    setCommentList(data);
                })
                .catch(() => {
                    toast.error("error!")
                })
        }
    }, [id, event]);



    return (
        <div className="commentContent">
            <div className="commentRowsWrapper" ref={scrollRef}>
                {
                    commentList.sort((a,b) => a.id - b.id).map(comment => <CommentRow key={comment.id} comment={comment} />)
                }
            </div>
        </div>
    )

}

export default CommentContent