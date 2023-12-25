import React, { useState } from "react";
import Nav from "../Nav";
import Footer from "../Footer";

function Post() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
      setSelectedFile(null);
      setSelectedImage(null);
  };

  return (
    <>
      <Nav />

      <div className="main-content">
        {/* Main */}

        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <h1>Posting</h1>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <button
                className="btn btn-primary"
                style={{ float: "right" }}
                data-toggle="modal"
                data-target="#basicModal"
                onClick={handleAdd}
              >
                New Posting
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* <!-- basic modal --> */}
      <div
        class="modal fade"
        id="basicModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Posting
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="close-btn">
                  &times;
                </span>
              </button>
            </div>
            <div class="modal-body">
              {/* img Upload */}
              <div className="row">
                <div className="col-md-3 col-lg-3 col-sm-3">
                  {selectedImage && (
                    <div>
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100px",
                          borderRadius: "60%",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="col-md-9 col-lg-9 col-sm-9">
                  <div class="section-title">Img Upload</div>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileChange}
                    />
                    <label class="custom-file-label" for="customFile">
                      {selectedFile ? `${selectedFile.name}` : "Choose File"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12">
                  <div class="form-group" style={{ paddingTop: "20px" }}>
                    <label>Description</label>
                    <textarea
                      class="form-control"
                      placeholder="What's your mind?"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer bg-whitesmoke br">
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
