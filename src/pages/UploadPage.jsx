import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import ChartView from '../components/ChartView';
import { uploadExcelFile, getUserHistory } from '../api/api';
import HistoryList from '../components/HistoryList';

const UploadPage = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartData, setChartData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getUserHistory();
      setHistory(res.data);
    } catch (err) {
      console.error('Fetch history error:', err);
    }
  };

  const handleFile = async e => {
    const file = e.target.files[0];
    if (!file) return;

    // Upload file to backend
    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadExcelFile(formData);
      alert('File uploaded successfully!');
      fetchHistory();
    } catch {
      alert('File upload failed.');
    }

    // Read file locally for visualization
    const reader = new FileReader();
    reader.onload = evt => {
      const workbook = XLSX.read(evt.target.result, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
      if (jsonData.length > 0) setColumns(Object.keys(jsonData[0]));
      else setColumns([]);
      setXAxis('');
      setYAxis('');
      setChartData(null);
    };
    reader.readAsBinaryString(file);
  };

  const buildChartData = () => {
    const labels = data.map(row => row[xAxis]);
    const values = data.map(row => parseFloat(row[yAxis]));
    return {
      labels,
      datasets: [
        {
          label: `${yAxis} vs ${xAxis}`,
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  };

  const handleGenerateChart = () => {
    if (xAxis && yAxis) {
      setChartData(buildChartData());
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx,.xls" onChange={handleFile} />

      {columns.length > 0 && (
        <div style={{ marginTop: 15 }}>
          <label>
            X-Axis:{' '}
            <select value={xAxis} onChange={e => setXAxis(e.target.value)}>
              <option value="">Select</option>
              {columns.map(col => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </label>

          <label style={{ marginLeft: 20 }}>
            Y-Axis:{' '}
            <select value={yAxis} onChange={e => setYAxis(e.target.value)}>
              <option value="">Select</option>
              {columns.map(col => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </label>

          <button onClick={handleGenerateChart} style={{ marginLeft: 20 }}>
            Generate Chart
          </button>
        </div>
      )}

      {chartData && <ChartView chartData={chartData} />}

      <HistoryList history={history} />
    </div>
  );
};

export default UploadPage;
