export const fetchBlogs = async (limit: number, skip: number)=> {
    // await new Promise((res) => setTimeout(res, 1000));
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