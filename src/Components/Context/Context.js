import { createContext } from "react";

export const postInitData = {
  dealing_type: 1,
  is_gift: false,
  title: "",
  description: "",
  image: [],
  image_extension: [],
  image_names: [],
  skills_required: "",
  skills_array: [],
  category_required: "",
  categories_array: [],
  start_date: "",
  max_participants: "",
  participants_id: "",
  participants_names: [],
  administrator_id: "",
  administrator_names: [],
  location:
    '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
};

export const ModalContext = createContext();
export const PostContext = createContext();
export const WebSocketContext = createContext(false, null, () => {});
