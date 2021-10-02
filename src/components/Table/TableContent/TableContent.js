import {useEffect, useState} from "react";
import {useUserContext} from '../../../context/UserContext'
import TableRow from './TableRow/TableRow'
import './TableContent.css'
import API from "../../../api/API";

const TableContent = ({ info, setInfo, search }) => {
    const loginToken = localStorage.getItem('loginToken');
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        async function getUsers() {
            await API.get("/student", {
                headers: { Authorization: `Bearer ${loginToken}` }
            })
                .then(({data}) => {
                    setUserList(data)
                })
        }
        getUsers();
    }, [loginToken, info])
    return (
        userList.length !== 0 ?
        <div className="TableContentWrapper">
            {userList.filter(user => user.name.includes(search)).map(user => (
                <TableRow key={user.id} user={user} info={info} setInfo={setInfo} />
            ))}
        </div>
        :
            <div className="TableContentWrapper">
                <div className="TableContentText">학교에 학생이 없어요. :(</div>
            </div>
    )
}
export default TableContent