import { IoMdArrowBack } from "react-icons/io";

interface PublishFormProps {
    onBack: () => void
}
const PublishForm = ({onBack}: PublishFormProps) => {
    return ( 
        <div>
            <div>
                <IoMdArrowBack onClick={onBack}/>
            </div>
            Publish form
        </div>
     );
}
 
export default PublishForm;