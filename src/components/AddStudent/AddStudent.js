import './AddStudent.css';

const AddStudent = ({setModalOpen}) => {
    const openModal = () => { setModalOpen(true) };
    return  (
        <div className="AddStudentWrapper">
            <button type="button" className="AddStudentButton" onClick={openModal} >추가</button>
        </div>
    )
}

export default AddStudent