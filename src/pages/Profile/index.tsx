import { Authorization } from "../../components/Authorization";
import { User } from "../../components/User";

export const Profile = () => {

    return (
        <div>
            {localStorage.getItem('token') === null  ? <Authorization/> : <User/>}
        </div>
    );
}