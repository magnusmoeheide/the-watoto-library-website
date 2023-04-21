import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../components";
import { WordCounter } from "../../components";
import {
  getWhatWeDo,
  updateWwd,
  createWwd,
  getWwdSectionsById,
  updateWwdSectionsById,
  createWwdSectionsById,
  deleteWwdSectionsById,
  getTeam,
  deleteWwd,
} from "../../database";

const AdminManageWhatWeDo = () => {
  const [whatWeDo, setWhatWeDo] = useState([]);
  const [selectedWwd, setSelectedWwd] = useState(null);
  const [wwdSectionsById, setWwdSectionsById] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [updatedWwd, setUpdatedWwd] = useState({});
  const [deletedSectionId, setDeletedSectionId] = useState(null);

  const [team, setTeam] = useState([]);

  const [nameInputValue, setNameInputValue] = useState("");
  const [instructorInputValue, setInstructorInputValue] = useState("");
  const [maxPeopleInputValue, setMaxPeopleInputValue] = useState("");
  const [openingHoursInputValue, setOpeningHoursInputValue] = useState("");

  const [deletedWwdId, setDeletedWwdId] = useState(null);

  useEffect(() => {
    getWhatWeDo(setWhatWeDo);
    getTeam(setTeam);
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

  useEffect(() => {
    // Set default values of input fields to values in wwd
    if (whatWeDo.length) {
      const defaultWwdValues = whatWeDo.reduce((acc, wwd) => ({
        ...acc,
        [wwd.id]: {
          instructor: wwd.instructor,
          opening_hours: wwd.opening_hours,
          max_people: wwd.max_people,
        },
      }));
      setUpdatedWwd(defaultWwdValues);
    }
  }, [whatWeDo]);

  useEffect(() => {
    getWhatWeDo(setWhatWeDo);
  }, [deletedWwdId]); // Trigger the effect when a team member is deleted

  const handleWwdSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedWwd(selectedId);
    getWwdSectionsById(selectedId, setWwdSectionsById);

    // If you change wwd:
    const wwd = whatWeDo.find((wwd) => wwd.id === parseInt(selectedId));
    setUpdatedWwd((prevUpdatedWwd) => ({
      ...prevUpdatedWwd,
      [selectedId]: {
        instructor: wwd.instructor,
        opening_hours: wwd.opening_hours,
        max_people: wwd.max_people,
        published: wwd.published,
      },
    }));
  };

  const handleSaveChanges = () => {
    console.log("updatedData before saving:", updatedData);
    wwdSectionsById.forEach((section) => {
      updateWwdSectionsById(
        section.id,
        updatedData[section.id].section_header,
        updatedData[section.id].section_text,
        updatedData[section.id].section_number
      );
    });
  };

  const handleSave = async (
    id,
    instructor,
    opening_hours,
    max_people,
    published
  ) => {
    console.log("values", instructor, opening_hours, max_people, published);
    const updatedWwd = {
      instructor,
      opening_hours,
      max_people,
      published,
    };
    updateWwd(updatedWwd, id);
  };

  const handleAddSection = async () => {
    const totalSections = wwdSectionsById.length;
    const wwdId = Number(selectedWwd);
    const newSection = {
      section_header: "",
      section_text: "",
      section_number: totalSections + 1,
      wwd_id: wwdId,
    };
    console.log("new section ", newSection);
    const createdSection = await createWwdSectionsById(newSection, selectedWwd);
    if (createdSection) {
      setWwdSectionsById([...wwdSectionsById, createdSection]);
      setWwdSectionsById((prev) => [...prev]);
    }
    console.log("created section: ", createdSection);
  };

  const handleDeleteSection = async (id) => {
    await deleteWwdSectionsById(id);
    setDeletedSectionId(id);
    setWwdSectionsById((prev) => prev.filter((section) => section.id !== id));
    console.log("id to delete: ", id);
  };

  const handleAdd = async () => {
    const newWwd = await createWwd(
      nameInputValue,
      instructorInputValue,
      maxPeopleInputValue,
      openingHoursInputValue
    );
    if (newWwd) {
      setWhatWeDo([...whatWeDo, newWwd]);
    }
  };

  const handleDelete = async (id) => {
    deleteWwdSectionsById(id);
    await deleteWwd(id);
    setDeletedWwdId(id); // Update the state to trigger a re-render
  };

  const filteredWwd = deletedWwdId
    ? whatWeDo.filter((wwd) => wwd.id !== deletedWwdId)
    : whatWeDo;

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
            <th>Opening hours</th>
            <th>Create</th>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                value={nameInputValue}
                onChange={(e) => setNameInputValue(e.target.value)}
              />
            </td>
            <td>
              <select name="" id="">
                {team.map((wwd) => (
                  <option key={wwd.id}>{wwd.name}</option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                value={maxPeopleInputValue}
                onChange={(e) => setMaxPeopleInputValue(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={openingHoursInputValue}
                onChange={(e) => setOpeningHoursInputValue(e.target.value)}
              />
            </td>
            <td>
              <button onClick={handleAdd}>Create</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={handleSaveChanges}>Save changes</button>
      <h3>Change What We Do</h3>
      <select name="" id="" onChange={handleWwdSelect}>
        <option value="">Choose an article to change</option>
        {whatWeDo.map((wwd) => (
          <option key={wwd.id} value={wwd.id}>
            {wwd.name}
          </option>
        ))}
      </select>

      {selectedWwd && (
        <div>
          {filteredWwd
            .filter((wwd) => wwd.id === parseInt(selectedWwd))
            .map((wwd) => (
              <div key={wwd.id} className="article">
                <h1>{wwd.name}</h1>
                <table>
                  <tbody>
                    <tr>
                      <td>Instructor</td>
                      <td>Opening hours</td>
                      <td>Max people</td>
                      <td>Published?</td>
                      <td>Save</td>
                      <td>Delete</td>
                    </tr>
                    <tr>
                      <td>
                        <WordCounter
                          maxLength={25}
                          height={60}
                          value={
                            updatedWwd[wwd.id]?.instructor ?? wwd.instructor
                          }
                          onChange={(value) => {
                            setUpdatedWwd({
                              ...updatedWwd,
                              [wwd.id]: {
                                ...updatedWwd[wwd.id],
                                instructor: value,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        {" "}
                        <WordCounter
                          maxLength={25}
                          height={60}
                          value={
                            updatedWwd[wwd.id]?.opening_hours ??
                            wwd.opening_hours
                          }
                          onChange={(value) => {
                            setUpdatedWwd({
                              ...updatedWwd,
                              [wwd.id]: {
                                ...updatedWwd[wwd.id],
                                opening_hours: value,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        <WordCounter
                          maxLength={30}
                          height={60}
                          value={
                            updatedWwd[wwd.id]?.max_people ?? wwd.max_people
                          }
                          onChange={(value) => {
                            setUpdatedWwd({
                              ...updatedWwd,
                              [wwd.id]: {
                                ...updatedWwd[wwd.id],
                                max_people: value,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={
                            updatedWwd[wwd.id]?.published ?? wwd.published
                          }
                          onChange={(e) => {
                            setUpdatedWwd({
                              ...updatedWwd,
                              [wwd.id]: {
                                ...updatedWwd[wwd.id],
                                published: e.target.checked,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            {
                              console.log(
                                "IDddd",
                                wwd.id,
                                updatedWwd[wwd.id].instructor
                              );
                              handleSave(
                                wwd.id,
                                updatedWwd[wwd.id].instructor,
                                updatedWwd[wwd.id].opening_hours,
                                updatedWwd[wwd.id].max_people,
                                updatedWwd[wwd.id].published
                              );
                            }
                          }}
                        >
                          Save changes
                        </button>
                      </td>

                      <td>
                        <button onClick={() => handleDelete(wwd.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

          <br />

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
                      height={150}
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
                  <button onClick={() => handleDeleteSection(section.id)}>
                    Delete section
                  </button>
                </div>
                <br />
              </div>
            ))}

          <button onClick={handleAddSection}>Add Section</button>
        </div>
      )}
    </div>
  );
};

export default AdminManageWhatWeDo;
