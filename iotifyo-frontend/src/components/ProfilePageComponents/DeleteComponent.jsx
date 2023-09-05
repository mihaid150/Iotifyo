import { SimpleButton} from "../Buttons/SimpleButton";
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom";
export const DeleteComponent = () => {

    const { deleteUser } = useUser();
    const sessionStorageWindow = window.sessionStorage;
    const navigate = useNavigate();
    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await deleteUser();
        if(response.status === 201) {
            sessionStorageWindow.removeItem('token');
            alert('User deleted successfully');
            navigate('/');
        } else {
            alert('User cannot be deleted successfully');
        }
    }

    return (
        <><SimpleButton variant='medium' label='Delete Account' handleSubmit={handleDelete}/></>
    )
}