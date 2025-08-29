
export const signUpUser = async (data:{fullname: string, email: string, password: string})=>{
    const response = await fetch("http://localhost:5000/api/signup", 
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
    const response = await fetch("http://localhost:5000/api/signin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error( "Failed to sign in")
    }
    return response.json()
}

export const fetchPublicBlogs = async ()=>{
    const response = await fetch('http://localhost:500/api/blogs/public',{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(!response.ok){
        throw new Error("Failed to fetch blogs Data")
    }
    return response.json()
}

export const fetchBlogs = async (page: number, limit: number) => {
  const response = await fetch(
    `http://localhost:5000/api/bloglist?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error( "Failed to fetch blogs");
  }

  return response.json(); 
};



export const fetchBlogById = async (id: string) => {
    const response = await fetch(
        `http://localhost:5000/api/blogs/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }
    )
    if(!response.ok){
        throw new Error( "Failed to fetch blog")
    }
    return response.json()
}


export const createPost = async (formData: FormData) => {
  const response = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include"
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
        throw new Error(`Failed to update blog data `)
    }
    console.log("update response:", response)
    return response.json()
}

export const logout = async ()=>{
    const response = await fetch('http://localhost:5000/api/logout',{
        method: 'POST',
        credentials: "include"
    })
    if(!response){
        throw new Error("Failed to logout")
    }
    return response.json()
}




