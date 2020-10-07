import { toast } from "react-toastify";

export const ToastAlerts = (data) => {
  let { success, message } = data;
  console.log(data);
  console.log(success);
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
