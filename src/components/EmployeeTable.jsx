// Employee table component to display all employees
import EmptyState from './EmptyState';

function EmployeeTable({ employees, onEdit, onDelete }) {
  // Show empty state if no employees
  if (employees.length === 0) {
    return <EmptyState message="No employees found. Add one to get started!" />;
  }

  return (
    <div className="table-container">
      <table className="employee-table">
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
          {employees.map(employee => (
            <tr key={employee.id}>
              <td className="name-cell">{employee.name}</td>
              <td className="email-cell">{employee.email}</td>
              <td className="role-cell">{employee.role}</td>
              <td className="department-cell">{employee.department}</td>
              <td className="actions-cell">
                <button
                  className="btn btn-edit"
                  onClick={() => onEdit(employee)}
                  title="Edit employee"
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => {
                    // Confirm before deleting
                    if (confirm(`Delete ${employee.name}?`)) {
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
  );
}

export default EmployeeTable;
