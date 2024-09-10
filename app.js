function generateResume() {
    var _a, _b;
    var form = document.getElementById('resumeForm');
    // Collect form data
    var formData = new FormData(form);
    // Extract values
    var name = formData.get('name');
    var email = formData.get('email');
    var education = formData.get('education');
    var experience = formData.get('experience');
    var skills = formData.get('skills');
    // Check if any field is empty
    if (!name || !email || !education || !experience || !skills) {
        alert('Please fill out all the fields.');
        return;
    }
    // Create resume content with editable fields and buttons
    var resumeContent = "\n        <div class=\"resume-content\">\n            <h2 contenteditable=\"true\">".concat(name, "</h2>\n            <p>Email: <a href=\"mailto:").concat(email, "\" contenteditable=\"true\">").concat(email, "</a></p>\n            <h3 contenteditable=\"true\">Education</h3>\n            <p contenteditable=\"true\">").concat(education, "</p>\n            <h3 contenteditable=\"true\">Work Experience</h3>\n            <p contenteditable=\"true\">").concat(experience, "</p>\n            <h3 contenteditable=\"true\">Skills</h3>\n            <p contenteditable=\"true\">").concat(skills, "</p>\n        </div>\n        <div class=\"button-group\">\n            <button id=\"editButton\" onclick=\"toggleEdit()\">Edit</button>\n            <button id=\"savePdfButton\" onclick=\"downloadPDF()\">Save as PDF</button>\n            <button id=\"generateUrlButton\" onclick=\"generateUniqueUrl()\">Generate Unique URL</button>\n        </div>\n    ");
    // Display resume
    var resumeDiv = document.getElementById('resume');
    resumeDiv.innerHTML = resumeContent;
    // Set up event listeners for the new buttons
    (_a = document.getElementById('savePdfButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', downloadPDF);
    (_b = document.getElementById('generateUrlButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', generateUniqueUrl);
}
function toggleEdit() {
    var button = document.getElementById('editButton');
    if (button.innerText === 'Edit') {
        button.innerText = 'Update';
        makeFieldsEditable(true);
    }
    else {
        button.innerText = 'Edit';
        makeFieldsEditable(false);
        // Show alert and redirect to index.html
        alert('Resume updated successfully!');
        window.location.href = 'index.html'; // Adjust the path as needed
    }
}
function makeFieldsEditable(editable) {
    var fields = document.querySelectorAll('[contenteditable="true"]');
    fields.forEach(function (field) {
        field.setAttribute('contenteditable', editable.toString());
    });
}
function downloadPDF() {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();
    // Get resume content
    var resumeContent = document.querySelector('.resume-content');
    if (!resumeContent) {
        alert('No resume content found!');
        return;
    }
    // Extract text from the resume content
    var text = resumeContent.innerText;
    // Add text to PDF
    doc.text(text, 10, 10);
    // Save PDF
    doc.save('resume.pdf');
}
function generateUniqueUrl() {
    var username = prompt('Enter your username:');
    if (username) {
        // Assume `username` is valid and generate a URL
        var resumeUrl = "https://".concat(username, ".vercel.app/resume");
        prompt('Copy this link to share your resume:', resumeUrl);
    }
    else {
        alert('Username is required to generate a URL.');
    }
}
