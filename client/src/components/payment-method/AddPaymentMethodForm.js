import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postPaymentMethodAction } from "../../pages/payment-method/paymentMethodAction";

import { CustomInput } from "../custom-input/CustomInput";
import { CustomModal } from "../custom-modal/CustomModal";

const initialState = {
  status: "inactive",
  name: "",
  description: "",
};

export const AddPaymentMethodForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    let { name, value, checked } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    console.log(name, value, checked);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(postPaymentMethodAction(form));
    setForm(initialState);
  };

  const inputFields = [
    {
      label: "Payment method Name",
      name: "name",
      placeholder: "i.e. Pay by credit card",
      required: true,
      type: "text",
      value: form.name,
    },
    {
      label: "Description",
      name: "description",
      required: true,
      type: "text",
      as: "textarea",
      placeholder: "Write more details about the payment method",
      value: form.description,
    },
    {
      type: "submit",
      className: "btn btn-primary",
      value: "Add payment method",
    },
  ];

  return (
    <div>
      <CustomModal title="Add payment method">
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="formGridState">
            <Form.Check
              name="status"
              label="status"
              type="switch"
              onChange={handleOnChange}
              checked={form.status === "active"}
            />
          </Form.Group>
          {inputFields.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}
        </Form>
      </CustomModal>
    </div>
  );
};
