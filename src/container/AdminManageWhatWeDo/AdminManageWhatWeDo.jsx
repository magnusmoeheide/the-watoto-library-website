import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../components";
import { WordCounter } from "../../components";
import {
  getWhatWeDo,
  getWwdSectionsById,
  updateWwdSectionsById,
} from "../../database";

const AdminManageWhatWeDo = () => {
  const [whatWeDo, setWhatWeDo] = useState([]);
  const [selectedWwd, setSelectedWwd] = useState(null);
  const [wwdSectionsById, setWwdSectionsById] = useState([]);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    getWhatWeDo(setWhatWeDo);
  }, []);

  useEffect(() => {
    // Set default values of input fields to values in wwd
    if (wwdSectionsById.length) {
      const defaultValues = wwdSectionsById.reduce(
        (acc, section) => ({
          ...acc,
          [section.id]: {
            section_header: section.section_header,
            section_text: section.section_text,
            section_number: section.section_number,
          },
        }),
        {}
      );
      setUpdatedData(defaultValues);
    }
  }, [wwdSectionsById]);

  const handleWwdSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedWwd(selectedId);
    getWwdSectionsById(selectedId, setWwdSectionsById);
  };

  const handleSaveChanges = () => {
    console.log("updatedData before saving:", updatedData); // Add this line
    wwdSectionsById.forEach((section) => {
      updateWwdSectionsById(
        section.id,
        updatedData[section.id].section_header,
        updatedData[section.id].section_text,
        updatedData[section.id].section_number
      );
    });
  };

  return (
    <div className="admin">
      <h1>Admin Manage What We Do</h1>
      <AdminMenu />
      <h3>Create new What We Do</h3>
      <table className="fullWidth">
        <tbody>
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Students</th>
            <th>Open from</th>
            <th>Open to</th>
            <th>Create</th>
          </tr>
          <tr>
            <td>
              <input type="text" />
            </td>
            <td>
              <select name="" id="">
                <option value="">Select</option>
              </select>
            </td>
            <td>
              <input type="number" />
            </td>{" "}
            <td>
              <input type="text" />
            </td>{" "}
            <td>
              <input type="text" />
            </td>
            <td>
              <button>Create</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <h3>Change What We Do</h3>
      <select name="" id="" onChange={handleWwdSelect}>
        <option value="">Choose an article to change</option>
        {whatWeDo.map((wwd) => (
          <option key={wwd.id} value={wwd.id}>
            {wwd.name}
          </option>
        ))}
      </select>
      <p>{""}</p>
      <button onClick={handleSaveChanges}>Save changes</button>
      {selectedWwd && (
        <div>
          {wwdSectionsById
            .sort((a, b) => a.section_number - b.section_number)
            .map((section) => (
              <div key={section.id}>
                <div className="article left">
                  <p>
                    Section order:{" "}
                    <select
                      defaultValue={section.section_number}
                      onChange={(e) => {
                        const newSectionNumber = parseInt(e.target.value, 10);
                        setUpdatedData((prevData) => ({
                          ...prevData,
                          [section.id]: {
                            ...prevData[section.id],
                            section_number: newSectionNumber,
                          },
                        }));
                      }}
                    >
                      {Array.from(
                        { length: wwdSectionsById.length },
                        (_, i) => i + 1
                      ).map((sectionNumber) => (
                        <option key={sectionNumber} value={sectionNumber}>
                          {sectionNumber}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <b>Title</b>
                    <WordCounter
                      maxLength={50}
                      value={
                        updatedData[section.id]?.section_header ??
                        section.section_header
                      }
                      onChange={(e) => {
                        setUpdatedData({
                          ...updatedData,
                          [section.id]: {
                            ...updatedData[section.id],
                            section_header: e,
                          },
                        });
                      }}
                    />
                  </p>
                  <p>
                    <b>Content</b>
                    <WordCounter
                      maxLength={500}
                      height={200}
                      value={
                        updatedData[section.id]?.section_text ??
                        section.section_text
                      }
                      onChange={(e) => {
                        setUpdatedData({
                          ...updatedData,
                          [section.id]: {
                            ...updatedData[section.id],
                            section_text: e,
                          },
                        });
                      }}
                    />
                  </p>
                </div>
                <br />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminManageWhatWeDo;
