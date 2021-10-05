export const createEducation = education => (
  $.ajax({
    url: `/api/educations`,
    method: "POST",
    data: { education }
  })
);

export const fetchEducations = () => (
  $.ajax({
    url: `/api/educations`,
    method: "GET"
  })
);

export const updateEducation = education => (
  $.ajax({
    url: `/api/educations/${education.id}`,
    method: "PATCH",
    data: { education }
  })
);

export const deleteEducation = educationId => (
  $.ajax({
    url: `/api/educations/${educationId}`,
    method: "DELETE"
  })
);