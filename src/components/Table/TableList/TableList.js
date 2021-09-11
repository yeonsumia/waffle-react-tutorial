import TableRow from './TableRow/TableRow'
import './TableList.css'
const TableList = ({ tableList, info, setInfo, search }) => {

    return (
        <div className="TableListWrapper">
            {tableList.filter(user => user.name.includes(search)).map(user => (
                <TableRow key={user.id} user={user} info={info} setInfo={setInfo} />
            ))}
        </div>

    )
}
export default TableList