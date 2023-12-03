import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";


const BulkEditModal = ({ showModal, closeModal, selectedInvoicesData ,onSubmit}) => {
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [fields, setFields] = useState({}); 

  const handleSubmit = () => {
    const updatedInvoices = selectedInvoicesData.map((invoice) => ({
      id: invoice.id,
      billTo: invoice.billTo,
      billFrom: invoice.billFrom, 
      itemName: invoice.itemName, 

    }));

    onSubmit(updatedInvoices);

    closeModal();
  };

  const handleCheckboxChange = (invoiceId) => {
    if (selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices(selectedInvoices.filter((id) => id !== invoiceId));
      const updatedFields = { ...fields };
      delete updatedFields[invoiceId];
      setFields(updatedFields);
    } else {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
      setFields({
        ...fields,
        [invoiceId]: {
          billTo: '',
          billFrom: '',
          itemName: ''
        }
      });
    }
  };

  const handleFieldChange = (invoiceId, field, value) => {
    setFields({
      ...fields,
      [invoiceId]: {
        ...fields[invoiceId],
        [field]: value
      }
    });
  };

  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        {/* Modal content */}
        <Modal.Body>
          <Table striped bordered hover>
            {/* Table header */}
            <tbody>
              {selectedInvoicesData.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => handleCheckboxChange(invoice.id)}
                    />
                  </td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.totalAmt}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {selectedInvoices.map((invoiceId) => {
            const invoiceFields = fields[invoiceId] || { billTo: '', billFrom: '', itemName: '' };
            return (
              <div key={invoiceId}>
                <h5>Invoice ID: {invoiceId}</h5>
                <div>
                  <label htmlFor={`billTo_${invoiceId}`}>Bill To:</label>
                  <input
                    type="text"
                    id={`billTo_${invoiceId}`}
                    value={invoiceFields.billTo}
                    onChange={(e) => handleFieldChange(invoiceId, 'billTo', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`billFrom_${invoiceId}`}>Bill From:</label>
                  <input
                    type="text"
                    id={`billFrom_${invoiceId}`}
                    value={invoiceFields.billFrom}
                    onChange={(e) => handleFieldChange(invoiceId, 'billFrom', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`itemName_${invoiceId}`}>Item Name:</label>
                  <input
                    type="text"
                    id={`itemName_${invoiceId}`}
                    value={invoiceFields.itemName}
                    onChange={(e) => handleFieldChange(invoiceId, 'itemName', e.target.value)}
                  />
                </div>
                <hr />
              </div>
            );
          })}
        </Modal.Body>
        {/* Modal footer */}
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Bulk Edit
          </button>
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <hr className="mt-4 mb-3" />
    </div>
  );
};


export default BulkEditModal;


