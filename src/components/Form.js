import { useState } from "react";
import "../styles/Form.css";

function Form(props) {
   const [inputLink,setInputLink] = useState('');
   const [message,setMessage] = useState('');
   const [error,setError] = useState(false);

   const updateInput = (event)=>{
      setInputLink(event.target.value);
   }

   const submit = function(event){
      event.preventDefault();
      const response = checkError(inputLink);
      response && props.addUrl(inputLink);
      setInputLink("");
   }
   const checkError = function(link){
      if (!link) {
         setMessage("Please add a  link");
         setError(true)
         return false
      }
      return true
   }
   const reset = ()=>{
      setError(false)
   }

	return (
		<form className="container" onSubmit={submit}>
         <div className="flex-grow relative">
			<input
				placeholder="Shorten a link here..."
				className={`p-4 rounded-md w-full ${error?'border-[#f46262] border-[3px]':''}`}
            value={inputLink} onChange={updateInput} onFocus={reset}
			></input>
         <p className={`error ${error?'':'hidden'} text-[13px]`}>{message}</p>
         </div>
			<button type="submit" className="submit-btn">
				Shorten It!
			</button>
		</form>
	);
}

export default Form;
