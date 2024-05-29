document.getElementById('calculate').addEventListener('click', function() {
    const M2 = parseFloat(document.getElementById('torque').value);
    const L1 = parseFloat(document.getElementById('wrench-length').value);
    const L2 = parseFloat(document.getElementById('extension-length').value);
    const angle = parseFloat(document.getElementById('angle').value);

    if (isNaN(M2) || isNaN(L1) || isNaN(L2) || isNaN(angle)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const adjustedTorque = (M2 * (L1 + L2 * Math.cos(angle * Math.PI / 180))) / L1;
    document.getElementById('adjusted-torque').innerText = `Adjusted Torque: ${adjustedTorque.toFixed(2)} Nm`;

    const conversion = adjustedTorque * 0.73756;
    document.getElementById('unit-conversion').innerText = `Unit Conversion: ${conversion.toFixed(2)} ft-lb`;
});

document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('torque').value = '';
    document.getElementById('wrench-length').value = '';
    document.getElementById('extension-length').value = '';
    document.getElementById('angle').value = '90';
    document.getElementById('adjusted-torque').innerText = 'Adjusted Torque: ';
    document.getElementById('unit-conversion').innerText = 'Unit Conversion: ';
});

document.getElementById('save-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const M2 = document.getElementById('torque').value;
    const L1 = document.getElementById('wrench-length').value;
    const L2 = document.getElementById('extension-length').value;
    const angle = document.getElementById('angle').value;
    const adjustedTorque = document.getElementById('adjusted-torque').innerText;
    const conversion = document.getElementById('unit-conversion').innerText;

    doc.text('Torque Wrench Extension Calculator', 10, 10);
    doc.text(`Recommended Torque for Fastener (M2): ${M2}`, 10, 20);
    doc.text(`Length of Torque Wrench (L1): ${L1}`, 10, 30);
    doc.text(`Length of Extension (part of L2): ${L2}`, 10, 40);
    doc.text(`Angle of Extension: ${angle}`, 10, 50);
    doc.text(adjustedTorque, 10, 60);
    doc.text(conversion, 10, 70);

    // Create a Blob from the PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open a new window with the PDF preview and download link
    const pdfWindow = window.open();
    pdfWindow.document.write('<html><head><title>PDF Preview</title></head><body>');
    pdfWindow.document.write('<iframe src="' + pdfUrl + '" width="100%" height="90%" style="border:none;"></iframe>');
    pdfWindow.document.write('<br><a href="' + pdfUrl + '" download="torque-wrench-calculation.pdf">Download PDF</a>');
    pdfWindow.document.write('</body></html>');
});
