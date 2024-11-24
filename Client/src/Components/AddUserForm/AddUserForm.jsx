import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./AddUserForm.css";

const AddUserForm = (props) => {
  let [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    permission: [],
  });

  const handleInputs = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (event) => {
    const options = event.target.options;
    const selectedPermissions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedPermissions.push(options[i].value);
      }
    }
    setUser({ ...user, permission: selectedPermissions });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.loading(
        "Waiting for confirmation, please wait...",
        {
          position: "top-center",
        }
      );
      const response = await axios.post(`${props.api}/form`, user);
      if (response.status === 201) {
        toast.update(toastId, {
          render: "User add Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user. Please try again.");
    }

    setUser({ name: "",
      email: "",
      role: "",
      status: "",
      permission: [],})
  };

  const navigate = useNavigate();

  return (
    <div className="form-container">
      <div className="form">
        <div className="main-head">Fill Form to Add new User</div>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Name:
            </label>
            <input
              type="name"
              name="name"
              placeholder="Enter name"
              class="form-control form1"
              id="exampleFormControlInput1"
              autoComplete="off"
              value={user.name}
              onChange={handleInputs}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput2" class="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              class="form-control form1"
              id="exampleFormControlInput2"
              autoComplete="off"
              value={user.email}
              onChange={handleInputs}
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput4" class="form-label">
              Role
            </label>
            <select
              type="text"
              name="role"
              placeholder="Select one"
              class="form-control form1"
              id="exampleFormControlInput4"
              autoComplete="off"
              value={user.role}
              onChange={handleInputs}
              required
            >
              <option>Choose one..</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
              <option value="Developer">Developer</option>
            </select>
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput3" class="form-label">
              Status:
            </label>
            <select
              type="text"
              name="status"
              placeholder="Select one"
              class="form-control form1"
              id="exampleFormControlInput3"
              autoComplete="off"
              value={user.status}
              onChange={handleInputs}
              required
            >
              <option>Choose one..</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="permission" className="form-label">
              Permission: For multiple select use shift
            </label>
            <select
              name="permission"
              id="permission"
              className="form-control form1"
              multiple
              value={user.permission}
              onChange={handlePermissionChange}
              required
            >
              <option value="Read">Read</option>
              <option value="Write">Write</option>
              <option value="Delete">Delete</option>
            </select>
            <input
              type="text"
              className="form-control mt-2"
              value={user.permission.join(", ")}
              readOnly
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
