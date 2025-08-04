
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

export const fetchBlogs = async (limit: number, skip: number)=> {
    const response = await fetch(
        `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch blogs")
    }
    return response.json()
}


export const fetchBlogById = async (id: number) => {
    const response = await fetch(
        `https://dummyjson.com/posts/${id}`,
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
}