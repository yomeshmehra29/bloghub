// Empty state component when no employees are found
function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📋</div>
      <p className="empty-message">{message}</p>
    </div>
  );
}

export default EmptyState;
