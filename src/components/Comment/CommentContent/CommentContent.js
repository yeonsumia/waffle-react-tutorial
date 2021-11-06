import styles from './CommentContent.module.css';
import API from "../../../api/API";
import {useEffect, useRef, useState} from "react";
import CommentRow from "./CommentRow/CommentRow";
import {toast} from "react-toastify";
import {useUserContext} from "../../../context/UserContext";
import {useHistory} from "react-router-dom";

const CommentContent = ({id, event}) => {
    const [commentList, setCommentList] = useState([]);
    const [commentPage, setCommentPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const {loginToken} = useUserContext();
    const scrollRef = useRef();
    const history = useHistory();
    const scrollToBottom = () => {
        const {scrollHeight, clientHeight} = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    }

    useEffect(() => {
        console.log(scrollRef.current.scrollTop);
        if(!fetched) scrollToBottom();
        else {
            scrollRef.current.scrollTop = commentCount * 70;
        }
    }, [commentList]);


    useEffect(() => {
        if(loginToken === "") {
            const token = localStorage.getItem('loginToken');
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        API.get("/auth/check_token")
            .then(async ({data}) => {
                if (data.checked) {
                    await fetchComments();
                }
            })
            .catch(() => {
                toast.error("세션이 만료되어 자동 로그아웃되었습니다.");
                history.push("/login");
            })
    }, [id, event]);
    const fetchComments = async () => {
        if(commentPage != null) {
            setFetching(true);
            const {data} = await API.get(`/student/${id}/comment?page=${commentPage}`);
            try {
                const fetchedData = data.data;
                const mergedCommentList = commentList.concat(...fetchedData);
                setCommentPage(data.next);
                setCommentList(mergedCommentList);
                setFetched(true);
                setCommentCount(data.count - (commentPage+1) * 20 >= 0 ? 20 :data.count -  commentPage * 20 - 1);
            } catch(e) {
                toast.error("댓글을 불러올 수 없습니다.");
            }
            setFetching(false);
        }
    }

    const handleScroll = async () => {
        const scrollTop = scrollRef.current.scrollTop;
        if(scrollTop === 0 && fetching === false) {
            await fetchComments();
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return (() => {
            window.removeEventListener("scroll", handleScroll);
        })
    });
    console.log(commentList)

    return (
        <div className={styles.commentContent}>
            <div className={styles.commentRowsWrapper} ref={scrollRef}>
                {
                    commentList.sort((a,b) => a.id - b.id).map(comment => <CommentRow key={comment.id} comment={comment} />)
                }
            </div>
        </div>
    )

}

export default CommentContent