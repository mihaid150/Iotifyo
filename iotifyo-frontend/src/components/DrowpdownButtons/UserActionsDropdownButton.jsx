import Dropdown from "react-bootstrap/Dropdown";
import { useState } from 'react'
import { useUser } from "../../hooks/useUser";
import { useAccount } from "../../hooks/useAccount";

export const UserActionsDropdownButton = (props) => {
    const [selectedOption, setSelectedOption] = useState("Select an option");
    const { userStatus, accountStatus, username } = props;
    const { deleteUserByAdmin, assignStaffRole, assignUserRole } = useUser()
    const { activateAccount, deactivateAccount } = useAccount();
    const handleOptionSelect = async (option) => {
        setSelectedOption(option);
        switch (option) {
            case "Give staff role": {
                if(username) {
                    const response = await assignStaffRole(username);
                    if (response.status === 201) {
                        alert("User successfully assigned to Staff role");
                    } else {
                        alert("User rejected assignment of staff role");
                    }
                }
                break;
            }
            case "Remove staff role": {
                if(username) {
                    const response = await assignUserRole(username);
                    if(response.status === 201) {
                        alert("Successfully assigning user role");
                    } else {
                        alert("Rejected assignment of user role");
                    }
                }
                break;
            }
            case "Delete user": {
                if(username) {
                    const response = await deleteUserByAdmin(username);
                    if(response.status === 201) {
                        alert("User successfully deleted");
                    } else {
                        alert("User not deleted");
                    }
                }
                break;
            }
            case "Activate account": {
                if (username) {
                    const response = await activateAccount(username);
                    if(response.status === 201) {
                        alert("Successfully activated account");
                    } else {
                        alert("Rejected activate account");
                    }
                }
                break;
            }
            case "Deactivate account": {
                if (username) {
                    const response = await deactivateAccount(username);
                    if (response.status === 201) {
                        alert("Successfully deactivated account");
                    } else {
                        alert("Rejected deactivate account");
                    }
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    return (
      <div>
          <Dropdown>
              <Dropdown.Toggle variant="secondary">{selectedOption}</Dropdown.Toggle>
              <Dropdown.Menu>
                  {userStatus !== "STAFF" && userStatus !== "ADMIN" &&(<Dropdown.Item onClick={() => { handleOptionSelect("Give staff role")} }>Give staff role</Dropdown.Item>)}
                  {userStatus === "STAFF" && (<Dropdown.Item onClick={() => { handleOptionSelect("Remove staff role")} }>Remove staff role</Dropdown.Item>)}
                  {userStatus !== "ADMIN" && (<Dropdown.Item onClick={() => { handleOptionSelect("Delete user")} }>Delete user</Dropdown.Item>)}
                  {!accountStatus && (<Dropdown.Item onClick={() => { handleOptionSelect("Activate account")} }>Activate account</Dropdown.Item>)}
                  {accountStatus && userStatus !== "ADMIN" &&(<Dropdown.Item onClick={() => { handleOptionSelect("Deactivate account")} }>Deactivate account</Dropdown.Item>)}
              </Dropdown.Menu>
          </Dropdown>
      </div>
    );
}