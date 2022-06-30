export const getUploadData = (data, type) => {
  let uploadData = null;
  if (type === "service") {
    uploadData = {
      dealing_type: data.dealing_type,
      is_gift: data.is_gift,
      items_service_name: data.title,
      items_service_desc: data.description,
      items_service_image: data.image.length > 0 ? data.image[0] : "",
      skills_required: data.skills_required,
      category_required: data.category_required,
      location:
        '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    };
  } else if (type === "items") {
    uploadData = {
      dealing_type: data.dealing_type,
      is_gift: data.is_gift,
      items_service_name: data.title,
      items_service_desc: data.description,
      items_service_image: data.image.length > 0 ? data.image[0] : "",
      community_id: "",
      category_required: data.category_required,
      start_time: new Date(data.start_date).getTime(),
      location:
        '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    };
  } else if (type === "experience") {
    uploadData = {
      experience_name: data.title,
      experience_desc: data.description,
      experience_image: data.image.length > 0 ? data.image[0] : "",
      community_id: "",
      skills_required: data.skills_required,
      start_time: new Date(data.start_date).getTime(),
      location:
        '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
      required_hours: "",
      moderator_user_id: data.participants_id,
      max_participants: data.max_participants,
    };
  } else if (type === "community") {
    uploadData = {
      community_name: data.title,
      community_description: data.description,
      display_picture: data.image.length > 0 ? data.image[0] : "",
      cover_picture: "",
      administrator_id: data.administrator_id,
      participants_id: data.participants_id,
      community_location_center:
        '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    };
  } else if (type === "info") {
    uploadData = {
      info_name: data.title,
      info_desc: data.description,
      photo_urls:
        data.image.length > 0
          ? JSON.stringify(
              data.image.map((data) => ({
                id: data,
              }))
            )
          : "",
      location:
        '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    };
  }
  return uploadData;
};
