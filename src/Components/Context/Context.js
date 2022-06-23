import { createContext } from "react";

const location =
  '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}';

export const servicePostInitData = {
  dealing_type: 1,
  is_gift: false,
  items_service_name: "",
  items_service_desc: "",
  items_service_image: "",
  skills_required: "",
  category_required: "",
  skills_array: [],
  categories_array: [],
  location,
  image_url: "",
};

export const itemPostInitData = {
  dealing_type: 1,
  is_gift: false,
  items_service_name: "",
  items_service_desc: "",
  items_service_image: "",
  community_id: "",
  category_required: "",
  start_time: "",
  categories_array: [],
  location,
  image_url: "",
};

export const communityPostInitData = {
  community_name: "",
  community_description: "",
  display_picture: "",
  cover_picture: "",
  administrator_id: "",
  participants_id: "",
  administrator_names: [],
  participants_names: [],
  community_location_center: location,
  display_image_url: "",
  cover_image_url: "",
};

export const experiencePostInitData = {
  experience_name: "",
  experience_desc: "",
  experience_image: "",
  community_id: "",
  skills_required: "",
  skills_array: [],
  start_time: "",
  location,
  image_url: "",
  required_hours: "",
  moderator_user_id: "",
  moderator_user_name: [],
  max_participants: "",
};

export const ModalContext = createContext();
export const PostContext = createContext();
