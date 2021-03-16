import axios from "axios";
import { toast } from 'react-toastify';

export function sendRequest(request, showAlertSuccess = false, showAlertFailed = false, messageSuccess, messageFailed) {
    return axios(request).then((res) => {
        showAlertSuccess &&
            toast.success(messageSuccess, { containerId: 'toast-notification' });
        return Promise.resolve(res);
    }).catch((err) => {
        showAlertFailed && toast.error(messageFailed, { containerId: 'toast-notification' });
        return Promise.reject(err);
    })
}