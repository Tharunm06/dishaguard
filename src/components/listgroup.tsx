import React, { useCallback } from 'react';

const RegisterVisitor = () => {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files?.[0]; // Use optional chaining
    if (fileInput) {
      setPreviewVisible(true);
      setSelectedFile(fileInput);
    }
  }, []); 

  const navigateToNextPage = useCallback(() => {
    // Navigate to the next HTML page (replace 'mobile-verification.html' with your actual file name)
    window.location.href = 'Mobile_Verification.html';
  }, []);

  return (
    <div className="login-container">
      <h2>Register Visitor</h2>
      <form>
        <div className="input-group">
          <input type="text" placeholder="Name" id="Name" name="Name" required />
        </div>
        <div className="input-group">
          <input type="tel" id="mobileNumber" name="mobileNumber" pattern="[0-9]{10}" placeholder="Enter your mobile number" required />
        </div>
        <div className="input-group">
          <input type="text" list="PurposeOfVisit" placeholder="Purpose of Visit" required />
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
          <button type="button" onClick={navigateToNextPage}>Send OTP</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterVisitor;