import React from "react";

function Post() {
  return (
    <>
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
            >
              New Posting
            </button>
          </div>
        </div>
      </div>








      {/* <!-- basic modal --> */}
        <div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Content goes here..
              </div>
              <div class="modal-footer bg-whitesmoke br">
                <button type="button" class="btn btn-primary">Save changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Post;
