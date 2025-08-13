import { useState } from "react";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";

const Editor = () => {
    const [editorState, setEditorState] = useState<"editor" | "publish">('editor')
    return ( 
        <>
               { editorState === 'editor' ?( <BlogEditor onNext={() => setEditorState("publish")}/>) 
               : (<PublishForm onBack={() => setEditorState("editor")}/>)}

        </>
      
     );
}
 
export default Editor;