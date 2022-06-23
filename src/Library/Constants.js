export const requestHeader = { "content-type": "application/json" };
export const access_token = localStorage.getItem("access_token");

export const websocketURL = `wss://websocket.nomos.net/V4?access_token=${access_token}`;

export const modalInitialState = {
  modalContent: "",
  showModal: false,
};

export const waitingMessage = "Please Wait..";
export const errorMessage = "Something went wrong!!";

// API endpoint URL's
export const users = "users/";
export const verifyOTP = "users/verify_otp";
export const communityNearby = "community/list?type=5";
export const joinCommunity = "community/join";
export const community = "/community";
export const service = "service";
export const items = "items";
export const experience = "/experience";
export const privateChats = "chat?chat_type=1";
export const skills = "master/skills";
export const categories = "master/categories";
export const friends = "friends/";
export const searchUser = "search?filter_type=people&search_text=";
export const friendRequest = "friends/?friendship_type=1";
export const signInEndPoint = "users/sign_in";
export const postsEndPoint = "posts/?type=3";
export const likeEndPoint = "posts/like/";
export const viewEndPoint = "posts/view/";
export const logOutEndPoint = "users/logout";
export const ResetPasswordEndPoint = "users/reset_password";
export const confirmOTPEndPoint = "users/confirm_otp";
export const joinExperienceEndPoint = "experience/join";

// Pages endpoint
export const intro = "/";
export const home = "/home";
export const inbox = "/inbox";
export const chat = "/chat";
export const post = "/post";
export const itemPost = "/itempost";
export const comments = "/comments";
export const signIn = "/signin";
export const forgotPassword = "/forgotpassword";
export const signUp = "/signup";
export const userDetails = "/userdetails";
