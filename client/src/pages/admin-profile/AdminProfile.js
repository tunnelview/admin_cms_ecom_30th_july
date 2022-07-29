import React from "react";
import { UpdatePassword } from "../../components/user-profile/UpdatePassword";
import { UserProfile } from "../../components/user-profile/UserProfile";
import { AdminLayout } from "../../layout/AdminLayout";

const AdminProfile = () => {
  return (
    <AdminLayout>
      <h3 className="p-4">Admin Profile</h3>

      {/* userpforile form */}
      <UserProfile />

      <hr />

      {/* user password update form */}

      <UpdatePassword />
    </AdminLayout>
  );
};

export default AdminProfile;
