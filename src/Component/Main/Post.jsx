import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import Footer from "../Footer";
import { ref, push, onValue, update, remove } from "firebase/database";
import { db, storage } from "../../Config/firebase";
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import $ from "jquery";
import Swal from "sweetalert2";


const ItemsPerPage = 7;

function Post() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [downloadurl, setDownloadurl] = useState("");

  const [Description, setDescription] = useState("");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [dangerAlertMessage, setDangerAlertMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);

      // Upload image to Firebase Storage
      const storageRef = sRef(storage, `PostingImg/${file.name}`);

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          // Retrieve download URL and set it in the state
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setDownloadurl(url);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleAdd = () => {
    setSelectedFile(null);
    setSelectedImage(null);
    setDescription("");
    sethdnImg("");
  };
  const [hdnID, sethdnID] = useState("");
  const handleSave = async () => {
    try {
      const currentDate = new Date(); // Get the current date and time
      const formattedDate = currentDate.toLocaleDateString(); // Get only the date portion
      const currentTime = currentDate.toLocaleTimeString();

      if (hdnID !== "" && hdnID !== null) {
        if (Description.trim() === "") {
          setDangerAlertMessage("Description can't be empty");
          setShowDangerAlert(true);
        } else {
          if (selectedFile !== "" && selectedFile !== null) {
            const PostingRef = ref(db, `Posting/${hdnID}`);
            const newPosting = {
              img: downloadurl,
              description: Description,
              createdDate: formattedDate,
              uploadTime: currentTime,
            };
            await update(PostingRef, newPosting);
          } else {
            const PostingRef = ref(db, `Posting/${hdnID}`);
            const newPosting = {
              img: hdnimg,
              description: Description,
              createdDate: formattedDate,
              uploadTime: currentTime,
            };
            await update(PostingRef, newPosting);
          }

          // Show the success alert
          setShowSuccessAlert(true);

          setTimeout(() => {
            modalclose();
            setSelectedFile(null);
            setSelectedImage(null);
            setDescription("");
          }, 1000);
        }
      } else {
        if (Description.trim() === "") {
          setDangerAlertMessage("Description can't be empty");
          setShowDangerAlert(true);
        } else if (!selectedFile) {
          setDangerAlertMessage("img can't be empty");
          setShowDangerAlert(true);
        } else if (Description !== "" && selectedFile !== "") {
          const PostingRef = ref(db, "Posting");
          const newPosting = {
            img: downloadurl,
            description: Description,
            createdDate: formattedDate,
            uploadTime: currentTime,
          };
          await push(PostingRef, newPosting);

          // Show the success alert
          setShowSuccessAlert(true);

          setTimeout(() => {
            modalclose();
            setSelectedFile(null);
            setSelectedImage(null);
            setDescription("");
          }, 1000);
        } else {
          setDangerAlertMessage("Data Not Insert");
          setShowDangerAlert(true);
        }
      }
    } catch (e) {
      console.log("Error adding Posting:", e);
      setDangerAlertMessage("Error adding Posting:", e);
      setShowDangerAlert(true);
    }
  };

  // Use useEffect to automatically hide the success alert after 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [showSuccessAlert]);

  // Use useEffect to automatically hide the success alert after 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDangerAlert(false);
    }, 3000);

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [showDangerAlert]);

  const modalclose = () => {
    $(".close").click();
  };

  // get data

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Reference to the 'Posting' node in Firebase Realtime Database
    const tasksRef = ref(db, "Posting");

    // Attach an event listener for data changes
    const fetchData = () => {
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the object of tasks into an array
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTableData(dataArray);
        }
      });
    };

    fetchData();
  }, []);

  const [expandedRows, setExpandedRows] = useState({});

  const toggleShowMore = (id) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id],
    }));
  };

  const sortedTableData = tableData.sort((a, b) => b.id - a.id);

  // Delete

  // const handleDeleteClick = () => {};

  const handleDeleteClick = (itemId) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked OK, show success modal
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your item has been deleted.",
          confirmButtonColor: "#28a745",
        });

        // Perform additional actions if needed
        console.log("OK button clicked");
        deleteItem(itemId);
      }
      
      else {
        console.log("Cancel button clicked");
      }
    });
  };

  const deleteItem = async (itemId) => {
    try {
      // Specify the path to the item you want to delete
      const itemRef = ref(db, `Posting/${itemId}`);

      // Remove the item from the database
      await remove(itemRef);

      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const [hdnimg, sethdnImg] = useState("");

  // Edit Data
  const handleEditClick = (itemId) => {
    // console.log("Edit clicked for item with ID:", itemId);
    // Add your editing logic here
    sethdnID(itemId.id);
    setDescription(itemId.description);
    setSelectedFile(null);
    setSelectedImage(itemId.img);
    sethdnImg(itemId.img);
    sethdnImg("");
    sethdnImg(itemId.img);
  };




  //   Pagination

const [currentPage, setCurrentPage] = useState(1);

const totalItems = sortedTableData.length;
const totalPages = Math.ceil(totalItems / ItemsPerPage);

const startIndex = (currentPage - 1) * ItemsPerPage;
const endIndex = startIndex + ItemsPerPage;

const visibleItems = sortedTableData.slice(startIndex, endIndex);

  return (
    <>
      <Nav />

      <div className="main-content">
        {/* Main */}
        <input type="hidden" name="yourHiddenFieldName" value={hdnimg} />
        <input type="hidden" name="yourHiddenFieldName" value={hdnID} />

        <div className="card">
          <div className="card-header">
            <div className="container">
              <div className="row" style={{ alignItems: "center" }}>
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
          <div className="card-body p-0">
            <div className="container">
              <div class="table-responsive" style={{ paddingTop: "60px" }}>
                <table class="table table-striped">
                  <thead style={{ background: "green" }}>
                    <tr>
                      <th
                        style={{
                          color: "white",
                          border: "1px solid white",
                          width: "100px",
                        }}
                      >
                        Action
                      </th>
                      <th
                        style={{
                          color: "white",
                          border: "1px solid white",
                          width: "100px",
                        }}
                      >
                        Post Img
                      </th>
                      <th style={{ color: "white", border: "1px solid white" }}>
                        Description
                      </th>
                      <th
                        style={{
                          color: "white",
                          border: "1px solid white",
                          width: "120px",
                        }}
                      >
                        Created Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleItems.map((item) => (
                      <tr>
                        <td style={{ border: "1px solid green" }}>
                          <div style={{ display: "flex" }}>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEditClick(item)}
                              data-toggle="modal"
                              data-target="#basicModal"
                            >
                              Edit
                            </button>
                            <button
                              style={{ marginLeft: "10px" }}
                              onClick={() => handleDeleteClick(item.id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                        <td style={{ border: "1px solid green" }}>
                          <img
                            alt=""
                            src={item.img}
                            className="rounded-circle"
                            width="35"
                            data-toggle="tooltip"
                            title={item.name}
                            style={{ display: "block", margin: "0 auto" }}
                          />
                        </td>
                        <td style={{ border: "1px solid green" }}>
                          {item.description &&
                          item.description.length > 80 &&
                          !expandedRows[item.id] ? (
                            <>
                              {`${item.description.substring(0, 80)}... `}
                              <span
                                style={{
                                  color: "green",
                                  fontWeight: "700",
                                  cursor: "pointer",
                                }}
                                onClick={() => toggleShowMore(item.id)}
                              >
                                See More
                              </span>
                            </>
                          ) : (
                            <>
                              {item.description}
                              {item.description &&
                                item.description.length > 100 &&
                                expandedRows[item.id] && (
                                  <span
                                    style={{
                                      color: "green",
                                      fontWeight: "700",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => toggleShowMore(item.id)}
                                  >
                                    See Less
                                  </span>
                                )}
                            </>
                          )}
                        </td>
                        <td style={{ border: "1px solid green" }}>
                          {item.createdDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <nav aria-label="Page navigation example" style={{ float: "right" }}>
        <ul class="pagination">
          <li class={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a class="page-link" href="/#" onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} class={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <a class="page-link" href="/#" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
          <li class={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a class="page-link" href="/#" onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
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
                  <div class="section-title">
                    Img Upload: <span className="Validation">*</span>
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handleFileChange(e)}
                    />
                    <label class="custom-file-label" for="customFile">
                      {selectedFile
                        ? selectedFile.name.length > 20
                          ? `${selectedFile.name.substring(0, 20)}...`
                          : selectedFile.name
                        : "Choose File"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12">
                  <div class="form-group" style={{ paddingTop: "20px" }}>
                    <label>
                      Description: <span className="Validation">*</span>
                    </label>
                    <textarea
                      class="form-control"
                      placeholder="What's your mind?"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer bg-whitesmoke br">
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSave}
              >
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

      {/* Notify */}
      {/* Success Alert */}
      {showSuccessAlert && (
        <div
          className="alert alert-success alert-dismissible show fade"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          <div className="alert-body">
            <button
              className="close"
              onClick={() => setShowSuccessAlert(false)}
            >
              <span>×</span>
            </button>
            <span>Data in Successfully</span>
          </div>
        </div>
      )}

      {/* Danger Alert */}
      {showDangerAlert && (
        <div
          className="alert alert-danger alert-dismissible show fade"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          <div className="alert-body">
            <button className="close" onClick={() => setShowDangerAlert(false)}>
              <span>×</span>
            </button>
            <span>{dangerAlertMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
