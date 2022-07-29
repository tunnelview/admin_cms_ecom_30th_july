import { configureStore } from "@reduxjs/toolkit";
import loginRecucer from "./pages/login-registration/loginRegisterSlice";
import systemReducer from "./pages/system-state/systemSlice";
import categoryReducer from "./pages/categories/catSlice";
import paymentMethodReducer from "./pages/payment-method/paymentMethodSlice";

const store = configureStore({
  reducer: {
    adminUser: loginRecucer,
    system: systemReducer,
    categories: categoryReducer,
    paymentMethod: paymentMethodReducer,
  },
});

export default store;
