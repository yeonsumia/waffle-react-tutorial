import TableRow from './TableRow/TableRow'
import './TableContent.css'

const TableContent = ({ info, setInfo, userList, searchGrade, searchName }) => {
    return (
        userList.length !== 0 ?
        <div className="TableContentWrapper">
            {userList.filter(user => user.name.includes(searchName) && (searchGrade === "" || user.grade === searchGrade)).sort((a,b) => a.id - b.id).map(user => (
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