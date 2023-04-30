import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { WordCounter } from "../../components";
import { Message } from "../../components";
import { AdminMenu } from "../../components";
import { getOurGreatestNeeds, updateOurGreatestNeeds } from "../../database";

const AdminManageOgn = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [ourGreatestNeeds, setOurGreatestNeeds] = useState([]);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    getOurGreatestNeeds(setOurGreatestNeeds);
  }, []);

  useEffect(() => {
    // Set default values of input fields to values in ourGreatestNeeds
    const defaultValues = ourGreatestNeeds.reduce(
      (acc, ogn) => ({
        ...acc,
        [ogn.id]: {
          name: ogn.name,
          content: ogn.content,
          usd_price: ogn.usd_price,
          kes_price: ogn.kes_price,
        },
      }),
      {}
    );
    setUpdatedData(defaultValues);
  }, [ourGreatestNeeds]);

  const handleSave = async (id, name, content, usd_price, kes_price) => {
    const updatedValues = {
      name,
      content,
      usd_price,
      kes_price,
    };

    try {
      await updateOurGreatestNeeds(updatedValues, id);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="admin">
      <h1>Admin Manage Our Greatest Needs</h1>
      <AdminMenu />
      <Message
        text={showSuccessMessage ? "Item updated successfully!" : ""}
        type="success"
      />
      <Message
        text={showErrorMessage ? "Error updating item." : ""}
        type="error"
      />
      <br />
      <h3>Our Greatest Needs</h3>
      <table className="adminTable">
        <tbody>
          <tr>
            <th>Name</th>
            <th className="description">Description</th>
            <th>$USD</th>
            <th>KES</th>
            <th>Save</th>
          </tr>
          {ourGreatestNeeds.map((ogn) => (
            <tr key={ogn.id}>
              <td>
                <WordCounter
                  maxLength={20}
                  value={updatedData[ogn.id]?.name ?? ogn.name}
                  onChange={(value) => {
                    setUpdatedData({
                      ...updatedData,
                      [ogn.id]: {
                        ...updatedData[ogn.id],
                        name: value,
                      },
                    });
                  }}
                />
              </td>
              <td className="description">
                <WordCounter
                  maxLength={100}
                  value={updatedData[ogn.id]?.content ?? ogn.content}
                  onChange={(value) => {
                    setUpdatedData({
                      ...updatedData,
                      [ogn.id]: {
                        ...updatedData[ogn.id],
                        content: value,
                      },
                    });
                  }}
                />
              </td>
              <td>
                <WordCounter
                  maxLength={5}
                  value={updatedData[ogn.id]?.usd_price ?? ogn.usd_price}
                  onChange={(value) => {
                    setUpdatedData({
                      ...updatedData,
                      [ogn.id]: {
                        ...updatedData[ogn.id],
                        usd_price: value,
                      },
                    });
                  }}
                />
              </td>
              <td>
                <WordCounter
                  maxLength={6}
                  value={updatedData[ogn.id]?.kes_price ?? ogn.kes_price}
                  onChange={(value) => {
                    setUpdatedData({
                      ...updatedData,
                      [ogn.id]: {
                        ...updatedData[ogn.id],
                        kes_price: value,
                      },
                    });
                  }}
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    handleSave(
                      ogn.id,
                      updatedData[ogn.id].name,
                      updatedData[ogn.id].content,
                      updatedData[ogn.id].usd_price,
                      updatedData[ogn.id].kes_price
                    )
                  }
                >
                  Save changes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageOgn;
