import { useAccount } from "../../hooks/useAccount";
import { Table } from 'react-bootstrap'
import { useState, useEffect} from "react";
import './UsersTableComponent.css'
import { UserActionsDropdownButton} from "../DrowpdownButtons/UserActionsDropdownButton";

export const UsersTableComponent = () => {
    const { getAllAccounts } = useAccount();
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const accounts = await getAllAccounts();
            if (Array.isArray(accounts)) {
                setAccounts(accounts);
            } else {
                setAccounts([]);
            }
        };

        fetchAccounts();
    }, []); // Empty dependency array

    return (
        <div>
            <h4>Users Table</h4>
            <div className="table-container">
                <Table striped bordered hover >
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{item.isAccountActivated.toString()}</td>
                            <td><UserActionsDropdownButton userStatus={item.role} accountStatus={item.isAccountActivated} username={item.email}/></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}