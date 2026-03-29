import { useState } from 'react';

// This component displays all employees in a table and provides edit/delete buttons
function EmployeeList({ employees, onEdit, onDelete, onSearch }) {
  // State for search/filter
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Send search term to parent component
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Employees List</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      {/* If there are no employees, show empty state message */}
      {employees.length === 0 ? (
        <div className="empty-state">
          <p>No employees found. Click "Add New Employee" to get started!</p>
        </div>
      ) : (
        // Otherwise, show the employee table
        <div className="table-wrapper">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through employees and show each one */}
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td className="actions">
                    {/* Edit button */}
                    <button
                      className="btn btn-edit"
                      onClick={() => onEdit(employee)}
                      title="Edit employee"
                    >
                      ✏️ Edit
                    </button>

                    {/* Delete button */}
                    <button
                      className="btn btn-delete"
                      onClick={() => {
                        // Ask user to confirm before deleting
                        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
                          onDelete(employee.id);
                        }
                      }}
                      title="Delete employee"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
