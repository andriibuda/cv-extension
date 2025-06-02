import React from "react";
import { useState } from "react";

const Popup: React.FC = () => {
  const [toggle, useToggle] = useState<boolean>(true);
 
  return (
    <>
    <div className="popup">
      <h1>Generate Resume</h1>
      <form 
      action={`${process.env.REACT_APP_API_URL}/api/generate-cv`}
      method="POST"
      encType="multipart/form-data"
      >
        <label 
          htmlFor="file" 
          className={toggle ? "file-btn" : "file-btn-submited"}
        >
          {toggle ? 'Choose File' : 'File Chosen'}
        </label>
        <input
          placeholder="Upload File" 
          type="file" 
          id="file" 
          name="resume" 
          accept=".pdf,.doc,.docx" 
          onChange={() => useToggle(!toggle)}
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Popup;
