import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveUser,
  onAddNewUser,
  onDeleteActiveUser,
  User,
} from "../store";

export const useUserStore = () => {
  const dispatch = useDispatch();
  const { activeUser, userList } = useSelector((state) => state.user);

  const setActiveUser = (activeUser: User) => {
    dispatch(onSetActiveUser(activeUser));
  };

  const startSavingUser = async (userList: User[]) => {
    dispatch(onAddNewUser({ ...userList, _id: new Date().getTime() }));
  };

  const startDeletingActiveUser = async () => {
    dispatch(onDeleteActiveUser());
  };

  return {
    activeUser,
    userList,
    setActiveUser,
    startSavingUser,
    startDeletingActiveUser,
  };
};
