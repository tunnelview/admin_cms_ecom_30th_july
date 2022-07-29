import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { updateAdminProfileAction } from "../../pages/admin-profile/adminAction";

const initialState = {
  fName: "",
  lName: "",
  phone: "",
  email: "",
  dob: "",
  address: "",
  currentPassword: "",
};
export const UserProfile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { user } = useSelector((state) => state.adminUser);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const hadleOnChage = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { fName, lName, email, phone, address, currentPassword, dob } = form;
    dispatch(
      updateAdminProfileAction({
        fName,
        lName,
        email,
        phone,
        address,
        currentPassword,
        dob,
      })
    );
  };

  const inputFields = [
    {
      label: "First Name",
      name: "fName",
      placeholder: "Sam",
      required: true,
      type: "text",
      value: form.fName,
    },
    {
      label: "Last Name",
      name: "lName",
      placeholder: "Smith",
      required: true,
      type: "text",
      value: form.lName,
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "0411111111",
      required: false,
      type: "numnber",
      value: form.phone,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "your@email.com",
      required: true,
      disabled: true,
      type: "email",
      value: form.email,
    },
    {
      label: "DOB",
      name: "dob",
      type: "date",
      value: form.dob,
    },
    {
      label: "Address",
      name: "address",
      placeholder: "3 Sydney",
      type: "text",
      value: form.address,
    },
    {
      label: "Current Password",
      name: "currentPassword",
      type: "password",
      value: form.currentPassword,
      required: true,
    },
    {
      className: "btn btn-warning",
      type: "submit",
      value: "Update Profile",
    },
  ];
  return (
    <div>
      <h4>Update your profile</h4>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={hadleOnChage} />
        ))}
      </Form>
    </div>
  );
};
