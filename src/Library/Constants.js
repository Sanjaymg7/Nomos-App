export const requestHeader = { "content-type": "application/json" };

const getAccessToken = () => localStorage.getItem("access_token");

const getWebsocketEndpoint = () =>
  `wss://ws2.juegogames.com/NOMOS-V3?access_token=${localStorage.getItem(
    "access_token"
  )}`;

// export const webSocketEndpoint = `wss://websocket.nomos.net/V4?access_token=${localStorage.getItem(
//   "access_token"
// )}`;

export const access_token = getAccessToken();
export const webSocketEndpoint = getWebsocketEndpoint();

export const modalInitialState = {
  modalContent: "",
  showModal: false,
};

//API Constants
export const apiRetries = 3;
export const successStatusCode = 200;

//Message Constants
export const waitingMessage = "Please Wait..";
export const errorMessage = "Something went wrong!!";
export const invalidAccessToken = "Invalid access token";
export const fileUploadFail = "Failed to upload file";

//WebSocket Constants
export const chatMessageReceived = "chat_message_received";
export const chatTyping = "chat_typing";
export const userOnline = "user_online_status";
export const sendChatMessage = "send_chat_message";
export const sendUserTyping = "send_typing";
export const sendUserRead = "send_chat_read";

export const userDefaultImage = "./user.png";

// API endpoint URL's
export const users = "users/";
export const verifyOTP = "users/verify_otp";
export const communityNearby = "community/list?type=5";
export const joinCommunity = "community/join";
export const community = "/community";
export const service = "/service";
export const items = "/items";
export const info = "/info";
export const experience = "/experience";
export const privateChats = "chat?chat_type=1";
export const skills = "master/skills";
export const categories = "master/categories";
export const friends = "friends/";
export const getFriend = "friends/?friendship_type=3";
export const searchUser = "search?filter_type=people&search_text=";
export const friendRequest = "friends/?friendship_type=1";
export const signInEndPoint = "users/sign_in";
export const postsEndPoint =
  "posts/?type=3&limit=20&is_same_country_flag_required=1";
export const likeEndPoint = "posts/like/";
export const viewEndPoint = "posts/view/";
export const logOutEndPoint = "users/logout";
export const ResetPasswordEndPoint = "users/reset_password";
export const confirmOTPEndPoint = "users/confirm_otp";
export const joinExperienceEndPoint = "experience/join";
export const friendDetails = "users?other_user_id=";
export const userChat = "chat/messages?limit=30&user_id=";
export const experienceRespondEndPoint = "experience/respond";
export const deletePostEndPoint = "posts/delete";
export const postDetailsEndpoint = "posts/details?post_id=";

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
export const infoPost = "/infopost";

//Button labels
export const submit = "Submit";
export const close = "Close";
export const confirm = "Confirm";
export const finish = "Finish";
export const search = "Search";
export const next = "Next";
export const accept = "Accept";
export const reject = "Reject";
export const send = "Send";
export const comment = "Comment";
export const loading = "Loading...";
export const createPost = "Create Post";
export const signInName = "Sign In";
export const signUpName = "Sign Up";
