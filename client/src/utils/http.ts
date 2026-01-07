export const signUpUser = async (data: {
  fullname: string;
  email: string;
  password: string;
}) => {
  const response = await fetch("https://mern-blogging-website-1.onrender.com/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to sign up");
  }
  return response.json();
};

export const signInUser = async (data: { email: string; password: string }) => {
  const response = await fetch("https://mern-blogging-website-1.onrender.com/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to sign in");
  }
  return response.json();
};

export const fetchPublicBlogs = async () => {
  const response = await fetch("https://mern-blogging-website-1.onrender.com/api/blog/public", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blogs Data");
  }
  return response.json();
};

export const fetchBlogs = async (page: number, limit: number) => {
  const token = localStorage.getItem("token") 
  const response = await fetch(
    `https://mern-blogging-website-1.onrender.com/api/bloglist?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
};

export const fetchBlogById = async (id?: string) => {
  const response = await fetch(`https://mern-blogging-website-1.onrender.com/api/blogs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
};

export const createPost = async (formData: FormData) => {
  const response = await fetch("https://mern-blogging-website-1.onrender.com/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export const searchBlogs = async (search: string) => {
  const response = await fetch(
    `https://mern-blogging-website-1.onrender.com/api/searching?q=${encodeURIComponent(search)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const updateBlog = async (id: string, formData: FormData) => {
  const response = await fetch(`https://mern-blogging-website-1.onrender.com/api/updateblog/${id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Failed to update blog data `);
  }
  console.log("update response:", response);
  return response.json();
};

export const logout = async () => {
  const response = await fetch("https://mern-blogging-website-1.onrender.com/api/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to logout");
  }
  return response.json();
};
