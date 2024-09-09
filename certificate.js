function generateCertificate(userName, wpm, accuracy, testDate) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF('landscape'); // Using landscape mode to match the template

    // Background color and border decorations
    doc.setFillColor(255, 255, 255); // White background
    doc.rect(0, 0, 297, 210, 'F'); // A4 landscape dimensions

    // Decorative border at top and bottom
    doc.setFillColor(255, 215, 0); // Golden color
    doc.rect(0, 0, 297, 10, 'F'); // Top golden bar
    doc.rect(0, 200, 297, 10, 'F'); // Bottom golden bar

    // Title "CERTIFICATE"
    doc.setFont('Poppins', 'bold');
    doc.setFontSize(40);
    doc.setTextColor(0, 0, 102); // Dark blue
    doc.text('CERTIFICATE', 148.5, 50, null, null, 'center');

    // Subtitle "Of Achievement"
    doc.setFontSize(16);
    doc.text('Of Achievement', 148.5, 60, null, null, 'center');

    // "This Certificate is Proudly Presented To"
    doc.setFontSize(14);
    doc.text('This Certificate is Proudly Presented To', 148.5, 80, null, null, 'center');

    // Recipient Name (Stylish Font)
    doc.setFont('Poppins', 'italic');
    doc.setFontSize(30);
    doc.setTextColor(0, 0, 0); // Black for the name
    doc.text(userName, 148.5, 100, null, null, 'center');

    // Details: WPM, Accuracy, and Date
    doc.setFont('Poppins', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51); // Gray for details
    doc.text(`Words Per Minute: ${wpm}`, 148.5, 130, null, null, 'center');
    doc.text(`Accuracy: ${accuracy}%`, 148.5, 140, null, null, 'center');
    doc.text(`Date: ${testDate}`, 148.5, 150, null, null, 'center');
    
    // Save the PDF
    const fileName = `typing-certificate-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
}
