
export const signUpUser = async (data:{fullname: string, email: string, password: string})=>{
    const response = await fetch("/api/signup", 
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error( "Failed to sign up")
    }
    return response.json()
}

export const signInUser = async (data:{email: string, password: string})=>{
    const response = await fetch("/api/signin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error( "Failed to sign in")
    }
    return response.json()
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
    throw new Error( "Failed to fetch blogs");
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
        throw new Error( "Failed to fetch blog")
    }
    return response.json()
}


export const createPost = async (formData: FormData) => {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export const searchBlogs = async (search: string

) =>{
    const response = await fetch(`/api/search?q=${search}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    })
    if(!response.ok){
        throw new Error("Failed to fetch data")
    }
    return response.json()
}

export const updateBlog= async (id: string, formData: FormData)=>{
    const response = await fetch(`http://localhost:5000/api/updateblog/${id}`,{
        method: "PUT",
       body: formData,
    })
    if(!response.ok){
        const errorText = await response.text()
        throw new Error(`Failed to update blog data ${errorText}`)
    }
    console.log("update response:", response)
    return response.json()
}




