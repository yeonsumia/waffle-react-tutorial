import TableRow from './TableRow/TableRow'
import './TableList.css'
import {useUserContext} from '../../../context/UserContext'
const TableList = ({ info, setInfo, search }) => {
    const {tableList} = useUserContext();
    // console.log(tableList)
    return (
        tableList.length !== 0 ?
        <div className="TableListWrapper">
            {tableList.filter(user => user.name.includes(search)).map(user => (
                <TableRow key={user.id} user={user} info={info} setInfo={setInfo} />
            ))}
        </div> 
            : <div className="TableListWrapper">
                <div className="TableListText">학교에 학생이 없어요. :(</div>
            </div>

    )
}
export default TableList