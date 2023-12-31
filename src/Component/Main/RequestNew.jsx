import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import Footer from "../Footer";
import { ref, onValue } from "firebase/database";
import { db } from "../../Config/firebase";

const ItemsPerPage = 7;

function New() {
  // get data

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Reference to the 'Posting' node in Firebase Realtime Database
    const tasksRef = ref(db, "Request");

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
      <div className="card">
          <div className="card-header">
            <div className="container">
              <div className="row" style={{ alignItems: "center" }}>
                <div className="col-md-6 col-sm-6 col-lg-6">
                  <h1>Approved Request</h1>
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
                        Name
                      </th>

                      <th
                        style={{
                          color: "white",
                          border: "1px solid white",
                          width: "200px",
                        }}
                      >
                        Description
                      </th>
                     
                      <th
                        style={{
                          color: "white",
                          border: "1px solid white",
                          width: "200px",
                        }}
                      >
                        Time
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>

                      {visibleItems.map((item) => (
                        item.RequestType == true && (
                          <tr>
                           

                            <td style={{ border: "1px solid green" }}>
                              {item.name}
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
                              {item.uploadTime}
                            </td>

                          
                          </tr>
                        )
                        ))}
                
                  </tbody>
                  
                </table>
              </div>


              <nav aria-label="Page navigation example" style={{ float: "right" }}>
        <ul class="pagination">
          <li class={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a class="page-link" href="#" onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} class={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <a class="page-link" href="#" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
          <li class={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a class="page-link" href="#" onClick={() => setCurrentPage(currentPage + 1)}>
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
    </>
  );
}

export default New;
