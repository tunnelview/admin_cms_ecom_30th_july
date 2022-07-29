import React, { useState } from "react";
import { Form, Toast } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useSelector } from "react-redux";
import { updateAdminPassword } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";

const initialState = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};
export const UpdatePassword = () => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const { user } = useSelector((state) => state.adminUser);

  const hadleOnChage = (e) => {
    let { name, value } = e.target;
    if (name === "password" || name === "confirmPassword") {
      setError("");
      !disableBtn && setDisableBtn(true);
    }

    setForm({
      ...form,
      [name]: value,
    });

    if (name === "confirmPassword") {
      const { password } = form;

      password !== value && setError("Password do not match");
      password.length < 6 &&
        setError("Password must be longer than 6 characters");
      !/[a-z]/.test(password) && setError("Password must contain Lowercase");
      !/[A-Z]/.test(password) && setError("Password must contain Uppercase");
      !/[0-9]/.test(password) && setError("Password must contain number");

      !password && setError("New password must be provided");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const { confirmPassword, ...rest } = form;
    const response = updateAdminPassword({ ...rest, email: user.email });

    toast.promise(response, { pending: "Please wait ..." });
    const { status, message } = await response;
    toast[status](message);
  };

  const btnDisable = () => {
    !error && setDisableBtn(false);
  };

  const inputFields = [
    {
      label: "Current Password",
      name: "currentPassword",
      required: true,
      type: "password",
      value: form.currentPassword,
    },
    {
      label: "Password",
      name: "password",
      required: true,
      type: "password",
      value: form.password,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      required: true,
      type: "password",
      value: form.confirmPassword,
      onBlur: btnDisable,
    },
  ];
  return (
    <div className="mt-5 mb-5">
      <h4>Update your Password</h4>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={hadleOnChage} />
        ))}

        <Form.Group>
          <Form.Text muted>
            New Password should contain atleaset one uppdercase, one lowercase,
            a number and minimun of 6 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Text className="text-danger fs-3 fw-bolder">{error}</Form.Text>
        </Form.Group>

        <Form.Group className="mt-5">
          <Form.Control
            type="submit"
            value="Update Password"
            className="btn btn-danger"
            disabled={disableBtn}
          />
        </Form.Group>
      </Form>
    </div>
  );
};
