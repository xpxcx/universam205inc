import React from "react";
import { useNavigate } from "react-router";
import { useEditUserRoomMutation, useGetCurrentUserQuery } from "../../redux/userApiSlice";
import styles from './styles.module.scss';
export const User = () => {
    const { data: user } = useGetCurrentUserQuery();
    const [editRoom] = useEditUserRoomMutation();
    const [clickEdit, setClickEdit] = React.useState(false);
    const [inputRoom, setInputRoom] = React.useState('');
    const navigate = useNavigate();
    const onChangeRoom = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRoom(e.target.value);
    } 
    const onClickSaveRoom = async () => {

        if(clickEdit) {
            await editRoom({
                room: inputRoom
    
            });
        }
        setClickEdit(false);
    }

    const onClickExit = () => {
        localStorage.removeItem('token');
        navigate('/authorization')
        window.location.reload();
    }
    return (
        <div className={styles.container}>
            <h1>Профиль</h1>
            <div className={styles.dataBlock}>
                <p>{user?.login}</p>
                <div className={styles.roomSetting}>
                    {clickEdit ?
                    <> 
                        <input type='text' placeholder="Ваша Комната..." value={inputRoom} onChange={(e) => onChangeRoom(e)}></input>
                        <img className={styles.checkMark} src="/img/check-mark.svg" alt="check-mark" width={17} height={17} onClick={onClickSaveRoom}/>
                    </>
                    : 
                    <>
                        <p> Ваша Комната: {user?.room}</p>
                        <img className={styles.settingButton}src="/img/edit-button.svg" alt="edit" width={17} height={17} onClick={() => setClickEdit(true)}/>
                    </>
                    }
                   
               
                </div>
                <button className={styles.exitBtn} onClick={onClickExit} >Выйти</button>

            </div>
            
        </div>
    );
}