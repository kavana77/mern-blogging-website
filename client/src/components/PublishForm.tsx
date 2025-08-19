import { IoMdArrowBack } from "react-icons/io";

interface PublishFormProps {
    onBack: () => void
}
const PublishForm = ({onBack}: PublishFormProps) => {
    return ( 
        <section>
            <button onClick={onBack} className="w-12 h-12 absolute left-[5vw] z-10 top-[5%] lg:top-[10%]">
                <IoMdArrowBack />
            </button>
            Publish form
        </section>
     );
}
 
export default PublishForm;