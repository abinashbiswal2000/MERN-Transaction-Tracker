import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectList() {
  return (
    <>
      <div className="display-1 text-center mb-5">My Projects</div>
      <hr />
      <Link to='/Project/Project1_TransactionTracker' className='btn btn-primary'>Transactions Tracker</Link>
      <hr />


      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Project Description
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">

          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Project Description</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <h1>Project Description</h1>
              <hr />
              <h2>Project Features</h2>
              <ul class="list-group">
                <li class="list-group-item">User Login Authentication System</li>
                <li class="list-group-item">User Authorisation using JWT</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
                <li class="list-group-item">User Login Authentication System</li>
                <li class="list-group-item">User Authorisation using JWT</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
                <li class="list-group-item">User Login Authentication System</li>
                <li class="list-group-item">User Authorisation using JWT</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
                <li class="list-group-item">User Login Authentication System</li>
                <li class="list-group-item">User Authorisation using JWT</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
              </ul>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>

          </div>

        </div>
      </div>

    </>
  )
}
