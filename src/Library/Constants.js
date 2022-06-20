export const requestHeader = { "content-type": "application/json" };
export const access_token = localStorage.getItem("access_token");

export const websocketURL = `wss://ws2.juegogames.com/NOMOS-V3?access_token=${access_token}`;

export const modalInitialState = {
  modalContent: "",
  showModal: false,
};

// API endpoint URL's
export const users = "users/";
export const verifyOTP = "users/verify_otp";
export const communityNearby = "community/list?type=5";
export const joinCommunity = "community/join";
export const community = "community";
export const service = "service";
export const items = "items";
export const experience = "experience";
export const privateChats = "chat?chat_type=1";
export const skills = "master/skills";
export const categories = "master/categories";
export const friends = "friends/";
export const searchUser = "search?filter_type=people&search_text=";
export const friendRequest = "friends/?friendship_type=1";

// Pages endpoint
export const intro = "/";
export const home = "/home";
export const inbox = "/inbox";
export const chat = "/chat";
export const post = "/post";
export const itemPost = "/itempost";
export const comments = "/comments";
export const signIn = "/signin";
export const forgotPassword = "/forgotPassword";
export const signUp = "/signup";
export const userDetails = "/userdetails";
