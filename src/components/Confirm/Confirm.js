import './Confirm.css'
import deleteModalImg from "../../resource/deleteModal.png";
import cancelImg from "../../resource/cancel.png";
import deleteClearImg from "../../resource/deleteClear.png";
import {useUserContext} from "../../context/UserContext";
import {Link} from "react-router-dom";
import API from '../../api/API';
import {toast, ToastContainer} from "react-toastify";

const Confirm = ({deleteModal, setDeleteModal, id}) => {
    const {loginToken} = useUserContext();
    const config = {
        headers: { Authorization: `Bearer ${loginToken}` }
    };
    const onRemove = async () => {
        await API.delete(`/student/${id}`, config)
            .then(({data}) => {
                if(data.success) {
                    toast.success("삭제가 완료되었습니다.")
                    setDeleteModal(value => !value);
                }
            })
            .catch(({data}) => {
                toast.error(data.message)
            })
    }
    return (
        deleteModal &&
            <div className="DeleteModalWrapper">
                <div className="DeleteModal">
                    <div className="DeleteModalIconWrapper">
                        <img className="DeleteModalIcon" src={deleteModalImg} alt="" />
                    </div>
                    <div className="DeleteModalText">학생을 삭제합니다.</div>
                    <div className="DeleteModalContentText">이 작업은 되돌릴 수 없습니다.</div>
                    <div className="DeleteModalCancelWrapper">
                        <div className="DeleteModalCancel" onClick={() => setDeleteModal(value => !value)}>
                            <div className="DeleteModalCancelIconWrapper">
                                <img className="DeleteModalCancelIcon" src={cancelImg} alt="" />
                            </div>
                            <div className="DeleteModalCancelText">취소</div>
                        </div>
                    </div>
                    <div className="DeleteModalDeleteWrapper">
                        <Link to="/students" onClick={onRemove}>
                            <div className="DeleteModalDelete">
                                <div className="DeleteModalDeleteIconWrapper">
                                    <img className="DeleteModalDeleteIcon" src={deleteClearImg} alt="" />
                                </div>
                                <div className="DeleteModalDeleteText">삭제</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <ToastContainer autoClose={2500} position="top-right" />
            </div>
    )
}

export default Confirm