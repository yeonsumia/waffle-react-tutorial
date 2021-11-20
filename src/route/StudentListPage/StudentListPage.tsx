import './StudentListPage.css'
import {useState, useEffect} from "react";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import ControlBar from "../../components/ControlBar/ControlBar";
import Table from "../../components/Table/Table";
import SeparateBar from "../../components/SeparateBar/SeparateBar";
import Detail from "../../components/Detail/Detail";
import Modal from "../../components/Modal/Modal";
import API from "../../api/API";
import {toast} from "react-toastify";
import PopUp from "../../components/PopUp/PopUp";
import {useUserContext} from "../../context/UserContext";
import {useHistory, useParams} from "react-router-dom";
import AddStudent from "../../components/AddStudent/AddStudent";
interface token {
    loginToken : string;
}
const StudentListPage = () => {
    const [info, setInfo] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchGrade, setSearchGrade] = useState("");
    const {loginToken} = useUserContext() as unknown as token;
    const history = useHistory();

    const checkParams = (location : any) => {
        const params : any = new URLSearchParams(location.search);
        if(params.has("name") && params.has("grade")) {
            setSearchName(params.get("name"));
            // @ts-ignore
            setSearchGrade(parseInt(params.get("grade")));
        }
        else if(!params.has("name") && params.has("grade")){
            setSearchName("");
            // @ts-ignore
            setSearchGrade(parseInt(params.get("grade")));
        }
        else if(params.has("name") && !params.has("grade")){
            setSearchName(params.get("name"));
            setSearchGrade("");
        }
        else {
            setSearchName("");
            setSearchGrade("");
        }
    }

    useEffect(() => {
        // 새로고침 시에는 state 변수가 모두 초기화되므로 여기선 storage 에 직접 접근해야함.
        if(loginToken === "") {
            const token = localStorage.getItem('loginToken');
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        API.get("/auth/check_token")
            .then(({data}) => {
                if(data.checked) {
                    API.get("/student")
                        .then(({data}) => {
                            setUserList(data);
                            checkParams(history.location);
                            toast.success("환영합니다!");
                        })
                        .catch(() => toast.error("명단을 불러올 수 없습니다."))
                }
            })
            .catch(() => toast.error("세션이 만료되어 자동 로그아웃되었습니다."))

    }, []);

    useEffect(() => {
        return history.listen((location) => {
            checkParams(location);
        })
    }, [history]);

    return (
        <div className="StudentListPageWrapper">
            <Header />
            <Dashboard />
            <ControlBar />
            <Table info={info} setInfo={setInfo} userList={userList} searchName={searchName} searchGrade={searchGrade} />
            <AddStudent setModalOpen={setModalOpen} />
            <SeparateBar />
            <Detail info={info} userList={userList} />
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} setInfo={setInfo}/>
            <PopUp />
        </div>
    )
}

export default StudentListPage