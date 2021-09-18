import './Confirm.css'
import deleteModalImg from "../../resource/deleteModal.png";
import cancelImg from "../../resource/cancel.png";
import deleteClearImg from "../../resource/deleteClear.png";
import {useUserContext} from "../../context/UserContext";
import {useParams, Link} from "react-router-dom";
const Confirm = ({deleteModal, setDeleteModal}) => {
    const {tableList, setTableList} = useUserContext();
    const {id} = useParams();
    const onRemove = () => {
        setTableList(
            tableList.filter(user => user.id !== parseInt(id))
        );
        setDeleteModal(value => !value);

    }
    return (
        deleteModal ?
            <div className="DeleteModalWrapper">
                <div className="DeleteModal">
                    <div className="DeleteModalIconWrapper">
                        <img className="DeleteModalIcon" src={deleteModalImg}/>
                    </div>
                    <div className="DeleteModalText">학생을 삭제합니다.</div>
                    <div className="DeleteModalContentText">이 작업은 되돌릴 수 없습니다.</div>
                    <div className="DeleteModalCancelWrapper">
                        <div className="DeleteModalCancel" onClick={() => setDeleteModal(value => !value)}>
                            <div className="DeleteModalCancelIconWrapper">
                                <img className="DeleteModalCancelIcon" src={cancelImg}/>
                            </div>
                            <div className="DeleteModalCancelText">취소</div>
                        </div>
                    </div>
                    <div className="DeleteModalDeleteWrapper">
                        <Link to="/students" onClick={onRemove}>
                            <div className="DeleteModalDelete">
                                <div className="DeleteModalDeleteIconWrapper">
                                    <img className="DeleteModalDeleteIcon" src={deleteClearImg}/>
                                </div>
                                <div className="DeleteModalDeleteText">삭제</div>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
            :
            null

    )
}

export default Confirm