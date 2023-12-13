import { createSlice } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: []
  },
  reducers: {
    bulkUpdateInvoices: (state, action) => {
      // const updatedInvoices = action.payload;
      console.log(state.invoices, action);
      action.payload.map(actionInvoice => {
        const index = state.invoices.findIndex(
          (invoice) => invoice.id === actionInvoice.id
        );
        console.log(index);
        if (index !== -1) {
          state.invoices[index] = actionInvoice.updatedInvoice;
        }
      })
      // const index = state.invoices.findIndex(
      //   (invoice) => invoice.id === action.payload.id
      // );
      // console.log(index);
      // if (index !== -1) {
      //   state[index] = action.payload.updatedInvoice;
      // }
      // state.invoices = action.payload;
    },
    updateSelectedInvoicesAction: (state, action) => {
      const updatedInvoices = action.payload;
      state.invoices = state.invoices.map((invoice) => {
        if (updatedInvoices.some((updatedInvoice) => updatedInvoice.id === invoice.id)) {
          const updatedFields = updatedInvoices.find((updatedInvoice) => updatedInvoice.id === invoice.id);
          return {
            ...invoice,
            ...updatedFields,
          };
        }
        return invoice;
      });
    },
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      console.log(state, action);
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    bulkEdit: (state, action) => {
      const updatedInvoices = action.payload;
      updatedInvoices.forEach((updatedInvoice) => {
        const index = state.findIndex(
          (invoice) => invoice.id === updatedInvoice.id
        );
        if (index !== -1) {
          state[index] = updatedInvoice;
        }
      });
    }
 
    }
  });

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  bulkEdit
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices.invoices;
export const { updateSelectedInvoicesAction } = invoicesSlice.actions;
export const { bulkUpdateInvoices } = invoicesSlice.actions;

export default invoicesSlice.reducer;
