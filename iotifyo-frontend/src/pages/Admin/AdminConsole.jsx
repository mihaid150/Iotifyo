import { UsersTableComponent} from "../../components/AdminPageComponents/UsersTableComponent";
import { SensorsTableComponent} from "../../components/AdminPageComponents/SensorsTableComponent";

export const AdminConsole = () => {

    return (
        <div>
            <h1>Admin Page</h1>
            <br></br>
           <UsersTableComponent />
            <br></br>
            <SensorsTableComponent />
        </div>
    );
}
