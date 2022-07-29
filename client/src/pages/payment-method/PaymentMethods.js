import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AddPaymentMethodForm } from "../../components/payment-method/AddPaymentMethodForm";
import { PaymentMethodTable } from "../../components/payment-method/PaymentMethodTable";
import { AdminLayout } from "../../layout/AdminLayout";
import { CustomModal } from "../../components/custom-modal/CustomModal";
import { toggleShowModal } from "../system-state/systemSlice";
import { useDispatch } from "react-redux";
const PaymentMethods = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState("");

  const handleOnShowForm = () => {
    setShowForm("add");
    dispatch(toggleShowModal(true));
  };

  return (
    <AdminLayout>
      <h3 className="p-3">Payment Methods</h3>
      <div className="text-end">
        <Button variant="primary" onClick={handleOnShowForm}>
          <i class="fa-solid fa-plus"></i> Add New Payment Method
        </Button>
      </div>

      <PaymentMethodTable showForm={showForm} setShowForm={setShowForm} />
    </AdminLayout>
  );
};

export default PaymentMethods;
