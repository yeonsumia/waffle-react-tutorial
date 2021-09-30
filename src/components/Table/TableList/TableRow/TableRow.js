import './TableRow.css'
const TableRow = ({ user, info, setInfo }) => {

    const changeInfo = key => setInfo(key)

    return (
        user.id===info?
                <div className="TableRowWrapper Selected">
                    <span className="TableRowName">{user.name}</span>
                    <span className="TableRowGrade">{user.grade}</span>
                    <span className="TableRowDetailSelected" onClick={() => changeInfo(0)}><div className="pointLeft"></div></span>
                </div>
                :
                <div className="TableRowWrapper">
                    <span className="TableRowName">{user.name}</span>
                    <span className="TableRowGrade">{user.grade}</span>
                    <span className="TableRowDetail" onClick={() => changeInfo(user.id)}><div className="pointRight"></div></span>
                </div>
    )
}




export default TableRow