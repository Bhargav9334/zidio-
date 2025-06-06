import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ChartView = ({ chartData }) => {
  const chartRef = useRef();

  const exportPNG = () => {
    const canvas = chartRef.current.canvas;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.png';
    a.click();
  };

  const exportPDF = () => {
    const canvas = chartRef.current.canvas;
    html2canvas(canvas).then(canvasElem => {
      const imgData = canvasElem.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('chart.pdf');
    });
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Bar ref={chartRef} data={chartData} />
      <div style={{ marginTop: 10 }}>
        <button onClick={exportPNG} style={{ marginRight: 10 }}>Download PNG</button>
        <button onClick={exportPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default ChartView;
