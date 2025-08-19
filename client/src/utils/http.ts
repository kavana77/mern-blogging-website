
export const signUpUser = async (data:{fullname: string, email: string, password: string})=>{
    const response = await fetch("/api/signup", 
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const resdata = await response.json()
    if(!response.ok){
        throw new Error(resdata.message || "Failed to sign up")
    }
    return resdata
}

export const signInUser = async (data:{email: string, password: string})=>{
    const response = await fetch("/api/signin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const resdata = await response.json()
    if(!response.ok){
        throw new Error(resdata.message || "Failed to sign in")
    }
    return resdata
}

export const fetchBlogs = async (page: number, limit: number) => {
  const response = await fetch(
    `/api/bloglist?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch blogs");
  }

  return response.json(); 
};



export const fetchBlogById = async (id: string) => {
    const response = await fetch(
        `/api/blogs/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch blog")
    }
    return response.json()
}


export const createPost = async (formData: FormData) => {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create post");
  }

  return response.json();
};




