import { updateAdminProfile } from "../../helpers/axiosHelper";
import { setUser } from "../login-registration/loginRegisterSlice";
import { toast } from "react-toastify";

export const updateAdminProfileAction = (obj) => async (disptach) => {
  const resultPromise = updateAdminProfile(obj);

  toast.promise(resultPromise, { pending: "Please wait... " });

  const { status, message, user } = await resultPromise;
  console.log(status, message);
  toast[status](message);

  status === "success" && setUser(user);
};
