import TableRow from './TableRow/TableRow'
import './TableContent.css'

const TableContent = ({ info, setInfo, search, userList }) => {

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