import React from 'react';

const HistoryList = ({ history }) => {
  if (!history || history.length === 0) return <p>No upload history found.</p>;

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Upload & Analysis History</h3>
      <ul>
        {history.map((item, idx) => (
          <li key={idx} style={{ marginBottom: 5 }}>
            <b>File:</b> {item.fileName} | <b>Uploaded:</b> {new Date(item.uploadDate).toLocaleString()} | <b>Chart:</b> {item.chartType || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
