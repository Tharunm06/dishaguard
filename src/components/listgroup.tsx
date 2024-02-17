import React, { useState, useCallback } from "react";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import { createNote as createNoteMutation } from "../graphql/mutations";
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports.js';
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
    };

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
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
          }

          #previewContainer {
            width: 100%;
            height: auto;
            overflow: hidden;
            display: none;
            margin-top: 10px;
          }

          #imagePreview {
            width: 100%;
            height: auto;
            object-fit: contain;
            border-radius: 4px;
          }

          #previewButtons {
            margin-top: 10px;
            display: none;
          }

          #retakeButton, #confirmButton {
            padding: 8px;
            margin-right: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
          }

          .login-container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            align-items: center;
            width: 80%;
            max-width: 400px;
            text-align: center;
            margin-left: 40px;
            margin-top: 10%;
            margin-bottom: 10%;
          }

          .login-container h2 {
            margin-bottom: 20px;
          }

          .input-group {
            margin-bottom: 20px;
          }

          .input-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .input-group input {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .input-group button {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: #F6BF6D;
            color: black;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .OTP-button {
            text-decoration: none;
            flex: 1;
            color: black;
            padding: 10px;
            margin: 0 5px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: #F6BF6D;
            border: none;
          }

          .back-btn {
            text-decoration: none;
            color: black;
            padding: 10px;
            margin: 0 5px;
            border: none;
            align-content: center;
            width: 100px;
            border-radius: 4px;
            cursor: pointer;
            background-color: #F6BF6D;
            border: none;
          }

          @media (max-width: 768px) {
            .logo-container {
              top: 30px;
              width: 80px;
              height: 80px;
            }
          }
        `}
      </style>

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
