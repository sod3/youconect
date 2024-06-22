import React, { useState, useEffect } from 'react';

const ContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#6a1b9a', // Purple background color
    color: 'white', // Text color
  };
  
  const TitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };
  
  const SectionStyle = {
    marginBottom: '40px',
  };
  
  const SectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };
  
  const TableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };
  
  const TableHeadStyle = {
    backgroundColor: '#f2f2f2',
  };
  
  const TableRowStyle = (even) => ({
    backgroundColor: even ? '#f2f2f2' : 'inherit',
  });
  
  const TableCellStyle = {
    padding: '10px',
    border: '1px solid #ddd',
  };
  
  const WithdrawalRequestListStyle = {
    listStyleType: 'none',
    padding: 0,
  };
  
  const WithdrawalRequestStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
  };
  
  const ApproveButtonStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  
  const RevenueGeneratedStyle = {
    backgroundColor: '#6a1b9a', // Purple background color
    padding: '20px',
    marginTop: '40px',
  };
  
  const RevenueTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };
  
  const RevenueValueStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  };

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [revenueGenerated, setRevenueGenerated] = useState(59342.32); // Example value

  useEffect(() => {
    // Fetch users data from backend API
    fetchUsersData();
    // Fetch withdrawal requests data from backend API
    fetchWithdrawalRequests();
  }, []);

  const fetchUsersData = () => {
    // Fetch users data from backend API
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users data:', error));
  };

  const fetchWithdrawalRequests = () => {
    // Fetch withdrawal requests data from backend API
    fetch('/api/withdrawal-requests')
      .then(response => response.json())
      .then(data => setWithdrawalRequests(data))
      .catch(error => console.error('Error fetching withdrawal requests:', error));
  };

  const approveWithdrawalRequest = (requestId) => {
    // Send approval request to backend API
    fetch(`/api/withdrawal-requests/${requestId}/approve`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          // Update withdrawal requests list
          fetchWithdrawalRequests();
        } else {
          throw new Error('Failed to approve withdrawal request');
        }
      })
      .catch(error => console.error('Error approving withdrawal request:', error));
  };

  return (
    <div style={ContainerStyle}>
      <h1 style={TitleStyle}>Admin Dashboard</h1>
      <div style={SectionStyle}>
        <h2 style={SectionTitleStyle}>Users Earnings and Balances</h2>
        <table style={TableStyle}>
          <thead style={TableHeadStyle}>
            <tr>
              <th>Username</th>
              <th>Earnings</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} style={TableRowStyle(index % 2 === 0)}>
                <td style={TableCellStyle}>{user.username}</td>
                <td style={TableCellStyle}>${user.earnings}</td>
                <td style={TableCellStyle}>${user.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={SectionStyle}>
        <h2 style={SectionTitleStyle}>Withdrawal Requests</h2>
        <ul style={WithdrawalRequestListStyle}>
          {withdrawalRequests.map(request => (
            <li key={request.id} style={WithdrawalRequestStyle}>
              <div>
                <span>User: {request.user}</span>
                <span>Amount: ${request.amount}</span>
              </div>
              <button style={ApproveButtonStyle} onClick={() => approveWithdrawalRequest(request.id)}>Approve</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Additional features for handling disputes or issues related to earnings */}

      {/* Revenue Generated Section */}
      <div style={RevenueGeneratedStyle}>
        <h2 style={RevenueTitleStyle}>Revenue Generated</h2>
        <p style={RevenueValueStyle}>${revenueGenerated.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
