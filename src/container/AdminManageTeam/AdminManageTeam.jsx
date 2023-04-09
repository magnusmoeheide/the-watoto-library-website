import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import { WordCounter } from "../../components";
import { getTeam, updateTeam, deleteTeam, createTeam } from "../../database";

const AdminManageTeam = () => {
  const [team, setTeam] = useState([]);
  const [updatedData, setUpdatedData] = useState({});

  const [nameInputValue, setNameInputValue] = useState("");
  const [roleInputValue, setRoleInputValue] = useState("");
  const [boardInputValue, setBoardInputValue] = useState(false);

  const [teamIdToDelete, setTeamIdToDelete] = useState("");
  const [deletedTeamMemberId, setDeletedTeamMemberId] = useState(null);

  useEffect(() => {
    getTeam(setTeam);
  }, [deletedTeamMemberId]); // Trigger the effect when a team member is deleted

  useEffect(() => {
    // Set default values of input fields to values in team
    if (team.length) {
      const defaultValues = team.reduce(
        (acc, member) => ({
          ...acc,
          [member.id]: {
            name: member.name,
            role: member.role,
          },
        }),
        {}
      );
      setUpdatedData(defaultValues);
    }
  }, [team]);

  const handleSave = async (id, name, role, board) => {
    const updatedValues = {
      name,
      role,
      board,
    };
    await updateTeam(updatedValues, id);
  };

  const handleDelete = async (id) => {
    await deleteTeam(id);
    setDeletedTeamMemberId(id); // Update the state to trigger a re-render
  };

  const filteredTeam = deletedTeamMemberId
    ? team.filter((member) => member.id !== deletedTeamMemberId)
    : team;

  const handleAdd = async () => {
    const newTeamMember = await createTeam(
      nameInputValue,
      roleInputValue,
      boardInputValue
    );
    if (newTeamMember) {
      setTeam([...team, newTeamMember]);
    }
  };

  return (
    <div className="admin">
      <h1>Admin Manage Team</h1>
      <AdminMenu />
      <br />
      <h3>Add Member</h3>
      <table className="adminTable">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Board member</th>
            <th>Add</th>
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
              <input
                type="text"
                value={roleInputValue}
                onChange={(e) => setRoleInputValue(e.target.value)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={boardInputValue}
                onChange={(e) => setBoardInputValue(e.target.checked)}
              />
            </td>
            <td>
              <button onClick={handleAdd}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <h3>Team</h3>
      <table className="adminTable">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Board member</th>
            <th>Manage</th>
          </tr>
          {filteredTeam.map((member) => (
            <tr key={member.id}>
              <td>
                <WordCounter
                  maxLength={25}
                  height={44}
                  value={updatedData[member.id]?.name ?? member.name}
                  onChange={(value) => {
                    setUpdatedData({
                      ...updatedData,
                      [member.id]: {
                        ...updatedData[member.id],
                        name: value,
                      },
                    });
                  }}
                />
              </td>
              <td>
                <WordCounter
                  maxLength={30}
                  height={44}
                  value={updatedData[member.id]?.role ?? member.role}
                  onChange={(value) => {
                    setUpdatedData({
                      ...updatedData,
                      [member.id]: {
                        ...updatedData[member.id],
                        role: value,
                      },
                    });
                  }}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={updatedData[member.id]?.board ?? member.board}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updatedData,
                      [member.id]: {
                        ...updatedData[member.id],
                        board: e.target.checked,
                      },
                    });
                  }}
                />
              </td>

              <td>
                <button
                  onClick={() =>
                    handleSave(
                      member.id,
                      updatedData[member.id].name,
                      updatedData[member.id].role,
                      updatedData[member.id].board
                    )
                  }
                >
                  Save changes
                </button>

                <button onClick={() => handleDelete(member.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
};

export default AdminManageTeam;
