import './CommentContent.css';
import API from "../../../api/API";
import {useEffect, useRef, useState} from "react";
import CommentRow from "./CommentRow/CommentRow";
import {toast, ToastContainer} from "react-toastify";

const CommentContent = ({id, event}) => {
    const loginToken = localStorage.getItem('loginToken');
    const config = {
        headers: { Authorization: `Bearer ${loginToken}` }
    };
    const [commentList, setCommentList] = useState([]);
    const scrollRef = useRef();
    const scrollToBottom = () => {
        const {scrollHeight, clientHeight} = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    }


    useEffect(() => {
       scrollToBottom();
    }, [commentList]);

    useEffect(() => {
        async function getComments () {
            await API.get(`/student/${id}/comment`, config)
                .then(({data}) => {
                    setCommentList(data);
                })
                .catch(({data}) => {
                    toast.error(data.message)
                })

        }
        getComments();
    }, [id, event]);



    return (
        <div className="commentContent">
            <div className="commentRowsWrapper" ref={scrollRef}>
                {
                    commentList.map(comment => <CommentRow comment={comment} />)
                }
            </div>
            <ToastContainer autoClose={2500} position="top-right" />
        </div>
    )

}

export default CommentContent