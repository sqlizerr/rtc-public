export const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
export const RegRoute = `${host}/api/auth/register`;
export const LoginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getUsersRoute = `${host}/api/auth/getUsers`;
export const sendMsgRoute = `${host}/api/messages/addMsg`;
export const getAllMsgsRoute = `${host}/api/messages/getmsg`;
export const getSavedChatsRoute = `${host}/api/messages/savedchats`;
