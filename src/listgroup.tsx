import React, { useState, useCallback } from "react";
import ".//App.css";
import "@aws-amplify/ui-react/styles.css";
import { uploadData, remove } from 'aws-amplify/storage';
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import { createNote as createNoteMutation } from "E:/dishaguard/src/graphql/mutations";
import { Amplify } from 'aws-amplify';
import awsExports from 'E:/dishaguard/src/aws-exports.js';
import { generateClient } from 'aws-amplify/api';

Amplify.configure(awsExports);

const client = generateClient();

const RegisterVisitor = ({ signOut }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = useCallback((event) => {
    const fileInput = event.target.files?.[0];
    if (fileInput) {
      setPreviewVisible(true);
      setSelectedFile(fileInput);
    }
  }, []);

  const createNote = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("Name"),
      mobileNumber: form.get("mobileNumber"),
      purposeOfVisit: form.get("purposeOfVisit"),
      image: image?.name || null // Check if image exists before accessing name
    };

    if (image) {
      await uploadData(data.name, image);
    }

    await client.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });

    // Reset the form or perform any other necessary actions
    event.target.reset();
    setPreviewVisible(false);
    setSelectedFile(null);
  };
  

  return (
    <div className="login-container">
      <h2>Register Visitor</h2>
      <form onSubmit={createNote}>
        <div className="input-group">
          <input type="text" placeholder="Name" id="Name" name="Name" required />
        </div>
        <div className="input-group">
          <input type="tel" id="mobileNumber" name="mobileNumber" pattern="[0-9]{10}" placeholder="Enter your mobile number" required />
        </div>
        <div className="input-group">
          <input type="text" list="PurposeOfVisit" placeholder="Purpose of Visit" name="purposeOfVisit" required />
          <datalist id="PurposeOfVisit">
            <option value="Professor Ashok Jhunjhunwala,IITMRP,9898989898">Professor Ashok Jhunjhunwala,IITMRP,9898989898</option>
            <option value="PANOCULONLABS,E303,IITMRP">PANOCULONLABS,E303,IITMRP</option>
            <option value="Build Club,E-Block,IITMRP">Build Club,E-Block,IITMRP</option>
            <option value="Sreeraj,E303,Panoculonlabs,8056554477">Sreeraj,E303,Panoculonlabs,8056554477</option>
          </datalist>
        </div>
        <div className="input-group">
          <input type="file" id="imageInput" accept="image/*" onChange={handleFileInputChange} />
          {previewVisible && selectedFile && (
            <div id="previewContainer">
              <img id="imagePreview" src={URL.createObjectURL(selectedFile)} alt="Selected Photo" />
            </div>
          )}
        </div>
        <div className="input-group">
          <input type="text" placeholder="Vehicle Number" id="VehicleNumber" name="VehicleNumber" required />
        </div>
        <div className="input-group">
          <button type="submit">Send OTP</button>
        </div>
      </form>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
};

export default withAuthenticator(RegisterVisitor);
