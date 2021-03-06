import './StudentPage.css'
import {useHistory, useParams} from "react-router-dom";
import {Link} from 'react-router-dom'
import Confirm from '../../components/Confirm/Confirm'
import Comment from "../../components/Comment/Comment";
import NumberFormat from 'react-number-format';
import toBackImg from '../../resource/toBack.png';
import lockImg from '../../resource/lock.png'
import unlockImg from '../../resource/unlockImg.png'
import deleteImg from '../../resource/delete.png'
import saveImg from '../../resource/save.png'
import lockProfileImg from '../../resource/lockProfile.png'
import {useState, useEffect} from "react";
import API from "../../api/API";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useUserContext} from "../../context/UserContext";
interface token {
    loginToken : string;
}
interface student {
    profile_img : string;
    email : string | null;
    phone : string;
    major : string;
}
const StudentPage = () => {
    const history = useHistory();
    let params: any = useParams();
    const id = parseInt(params.id);
    const [student, setStudent] = useState<any>({
        profile_img: '',
        email: '',
        phone: '',
        major: '',
        locked: false
    });
    const [event, setEvent] = useState(false);
    let {loginToken} = useUserContext() as unknown as token;

    useEffect(() => {
        if(loginToken === "") {
            const token = localStorage.getItem('loginToken');
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        API.get("/auth/check_token")
            .then(({data}) => {
                if(data.checked) {
                    API.get(`/student/${id}`)
                        .then(({data}) => {
                            setStudent(data)
                        })
                        .catch(() => toast.error("학생을 불러올 수 없습니다."))
                }
            })
            .catch(() => {
                toast.error("세션이 만료되어 자동 로그아웃되었습니다.");
                history.push("/login");
            })
    }, [id])
    const [locked, setLocked] = useState<boolean>(false);
    const [inputs, setInputs] = useState<student>({
        profile_img: '',
        email: '',
        phone: '',
        major: '',
    });
    const {profile_img, email, phone, major} = inputs;
    useEffect(() => {
        setInputs({
            profile_img: student.profile_img,
            email: !!(student.email)? student.email.split('@')[0] : null,
            phone: student.phone,
            major: student.major,
        })
        setLocked(student.locked)
    }, [student]);

    const initialImg ="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-1024.png";

    const [deleteModal,setDeleteModal] = useState(false);

    const lock = () => {
        API.post(`/student/${id}/lock`, {})
            .then(res => res.data)
            .then(data => {
                if(data?.success) {
                    toast.success("계정을 잠그었습니다.");

                    setLocked(true);
                    setEvent(e => !e);
                }
            })
            .catch(error => toast.error(error.response.data.message))
    }
    const unlock = () => {
        API.post(`/student/${id}/unlock`, {})
            .then(res => res.data)
            .then(data => {
                if(data?.success) {
                    // comment 달기
                    // alert("계정을 열었습니다.")
                    setLocked(false);
                    setEvent(e => !e);
                }
            })
            .catch(error => toast.error(error.response.data.message))
    }

    const onChange = (e : any) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
        // auto format 으로 인해 010- 이 추가될 때 커서 맨 뒤로 이동시키기.
        e.target.selectionStart = e.target.value.length;
    }
    const onToggle = () => {
        if(email?.includes("@") || email?.includes(" ")){
            toast.error("이메일 주소의 형식이 올바르지 않습니다.")
            return null;
        }
        if(phone != null && phone.length !== 13){
            toast.error("전화번호의 형식이 올바르지 않습니다.")
            return null;
        }

        API.patch(`/student/${id}`, {
            profile_img: profile_img,
            email: email?.concat("@waffle.hs.kr"),
            phone: phone,
            major: major
        })
            .then(res => res.data)
            .then(data => {
                if(data?.success) {
                    // comment 달기
                    toast.success("수정이 완료되었습니다.")
                    setEvent(e => !e);
                }
            })
            .catch(error => toast.error(error.response.data.message))
    }


    const limit = (val : any) => {
        if(val.length === 1 && val[0] !== '0'){
            return '010' + val;
        }
        if(val.length === 2 && val.substring(0,2) !== '01'){
            return '010' + val;
        }
        if(val.length === 3 && val.substring(0,3) !== '010'){
            return '010' + val;
        }
        return val;
    }

    const phoneFormat = (val : any) => {
        const header = limit(val.substring(0,3));
        const content = val.substring(3,7);
        const footer = val.substring(7,11);
        return header + (content.length ? '-' + content : '') + (footer.length ? '-' + footer : '');
    }
    return (
        <div className="StudentPageWrapper">
                <div className="ToBackWrapper">
                    <div className="ToBackImgWrapper">
                        <Link to="/students">
                            <img src={toBackImg} className="ToBackImg" alt="" />
                        </Link>
                    </div>
                    <div className="ToBackText">학생 목록 페이지로</div>
                </div>
                <div className="StudentImgWrapper">
                    <img className="StudentImg" src={profile_img != null? profile_img: initialImg} alt="" />
                </div>
                <div className="StudentInfoWrapper">
                    <div className="StudentInfoNameWrapper">
                        <div className="StudentInfoNameText">이름</div>
                        <input className="StudentInfoNameInput" value={student.name || ""} name="name" onChange={onChange} disabled/>
                    </div>
                    <div className="StudentInfoGradeWrapper">
                        <div className="StudentInfoGradeText">학년</div>
                        <input className="StudentInfoGradeInput" value={student.grade || ""} name="grade" onChange={onChange} disabled/>
                    </div>
                </div>
                <div className="lockIconWrapper">
                    <div className="lockIcon" onClick={locked? unlock: lock}>
                        <div className="lockIconImgWrapper">
                            <img src={locked? unlockImg:lockImg} className="lockIconImg" alt="" />
                        </div>
                        <div className="lockIconText">{locked? "해제":"잠금"}</div>
                    </div>
                </div>
                <div className="deleteIconWrapper">
                    <div className={locked? "lockedDeleteIcon" : "deleteIcon" } onClick={locked? undefined : () => setDeleteModal(state => !state)}>
                        <div className="deleteIconImgWrapper">
                            <img src={deleteImg} className="deleteIconImg" alt=""/>
                        </div>
                        <div className="deleteIconText">삭제</div>
                    </div>
                </div>
                <div className="saveIconWrapper">
                    <div className={locked? "lockedSaveIcon" : "saveIcon" } onClick={locked? undefined : onToggle}>
                        <div className="saveIconImgWrapper">
                            <img src={saveImg} className="saveIconImg" alt=""/>
                        </div>
                        <div className="saveIconText">저장</div>
                    </div>
                </div>

                <div className="infoBox">
                    <div className="infoBoxText">정보</div>
                </div>
                <div className="infoContent">
                    <div className="infoContentBox">
                        <div className="infoContentPhone">
                            <div className="infoContentPhoneText">전화번호</div>
                            <div className="infoContentPhoneInputBox">
                                <NumberFormat format={phoneFormat} className="infoContentPhoneInput" value={phone || ""} name="phone" onChange={onChange} />
                            </div>
                        </div>
                        <div className="infoContentEmail">
                            <div className="infoContentEmailText">이메일</div>
                            <div className="infoContentEmailInputBox">
                                <input className="infoContentEmailInput" value={email || ""} name="email" onChange={onChange}/>
                                <div className="infoContentEmailInputText">@waffle.hs.kr</div>
                            </div>

                        </div>
                        <div className="infoContentMajor">
                            <div className="infoContentMajorText">전공</div>
                            <div className="infoContentMajorSelectBox">
                                <select className="infoContentMajorSelect" value={major || ""} name="major" onChange={onChange}>
                                    <option value="" hidden> </option>
                                    <option value="frontend">frontend</option>
                                    <option value="backend">backend</option>
                                    <option value="android">android</option>
                                    <option value="iOS">iOS</option>
                                    <option value="design">design</option>
                                </select>
                            </div>
                        </div>
                        <div className="infoContentProfile">
                            <div className="infoContentProfileText">프로필</div>
                            <div className="infoContentProfileInputBox">
                                <input className="infoContentProfileInput" value={profile_img || ""} name="profile_img" onChange={onChange}/>
                            </div>
                        </div>
                    </div>
                    {locked &&
                        <div className="lockedInfoContent">
                            <img src={lockProfileImg} className="lockedInfoImg" alt=""/>
                            <div className="lockedInfoText">수정하려면 잠금을 해제하세요.</div>
                        </div>
                    }
                </div>
                <Comment id={id} event={event} setEvent={setEvent} />
            <Confirm deleteModal={deleteModal} setDeleteModal={setDeleteModal} id={id} />
        </div>
    )
}
export default StudentPage