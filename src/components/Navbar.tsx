import { Input } from "./ui/input";

const Navbar = () => {
    return ( 
        <nav className=" z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white">
            <img src="/public/blog-logo.png" className="object-cover w-28 md:w-34"/>
            <div className=" bg-white  left-0 top">
                <Input placeholder="Search.."/>
            </div>
        </nav>
     );
}
 
export default Navbar;