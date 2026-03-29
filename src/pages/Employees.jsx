// Employees page - CRUD management page
import { useState, useEffect } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import SearchBar from '../components/SearchBar';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee, searchEmployees } from '../utils/storage';

function Employees() {
  // State management
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Load employees from localStorage on component mount
  useEffect(() => {
    const loadedEmployees = getEmployees();
    setEmployees(loadedEmployees);
    setFilteredEmployees(loadedEmployees);
  }, []);

  // Update filtered employees when employees or search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const results = searchEmployees(searchTerm);
      setFilteredEmployees(results);
    }
  }, [employees, searchTerm]);

  // Show message for 3 seconds then hide
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  // Handle form submission (both add and edit)
  const handleSubmit = (formData) => {
    if (editingEmployee) {
      // Update existing employee
      const updated = updateEmployee(editingEmployee.id, formData);
      setEmployees(getEmployees());
      showMessage(`${formData.name} updated successfully!`, 'success');
      setEditingEmployee(null);
    } else {
      // Add new employee
      addEmployee(formData);
      setEmployees(getEmployees());
      showMessage(`${formData.name} added successfully!`, 'success');
    }
  };

  // Handle edit button click
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    // Scroll to form
    window.scrollTo(0, 0);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    const employee = employees.find(emp => emp.id === id);
    deleteEmployee(id);
    setEmployees(getEmployees());
    setEditingEmployee(null); // Close edit form if editing deleted employee
    showMessage(`${employee.name} deleted successfully!`, 'success');
  };

  // Handle search change
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="employees-page">
      {/* Show message notification */}
      {message && (
        <div className={`message message-${messageType}`}>
          {messageType === 'success' ? '✓' : '✕'} {message}
        </div>
      )}

      <div className="employees-container">
        <h1 className="page-title">Employee Management</h1>

        <div className="content-grid">
          {/* Left Column: Form */}
          <div className="form-section">
            <EmployeeForm 
              onSubmit={handleSubmit}
              initialData={editingEmployee}
              isEditing={!!editingEmployee}
            />
            {editingEmployee && (
              <button
                className="btn btn-cancel"
                onClick={() => setEditingEmployee(null)}
              >
                Cancel Edit
              </button>
            )}
          </div>

          {/* Right Column: Search and Table */}
          <div className="list-section">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={handleSearch}
            />
            
            <div className="employee-count">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>

            <EmployeeTable
              employees={filteredEmployees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
