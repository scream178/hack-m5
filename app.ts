interface ResumeData {
    name: string;
    email: string;
    education: string;
    experience: string;
    skills: string;
}

function generateResume(): void {
    const form = document.getElementById('resumeForm') as HTMLFormElement;

    // Collect form data
    const formData = new FormData(form);

    // Extract values
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const education = formData.get('education') as string;
    const experience = formData.get('experience') as string;
    const skills = formData.get('skills') as string;

    // Check if any field is empty
    if (!name || !email || !education || !experience || !skills) {
        alert('Please fill out all the fields.');
        return;
    }

    // Create resume content with editable fields and buttons
    const resumeContent = `
        <div class="resume-content">
            <h2 contenteditable="true">${name}</h2>
            <p>Email: <a href="mailto:${email}" contenteditable="true">${email}</a></p>
            <h3 contenteditable="true">Education</h3>
            <p contenteditable="true">${education}</p>
            <h3 contenteditable="true">Work Experience</h3>
            <p contenteditable="true">${experience}</p>
            <h3 contenteditable="true">Skills</h3>
            <p contenteditable="true">${skills}</p>
        </div>
        <div class="button-group">
            <button id="editButton" onclick="toggleEdit()">Edit</button>
            <button id="savePdfButton" onclick="downloadPDF()">Save as PDF</button>
            <button id="generateUrlButton" onclick="generateUniqueUrl()">Generate Unique URL</button>
        </div>
    `;

    // Display resume
    const resumeDiv = document.getElementById('resume') as HTMLDivElement;
    resumeDiv.innerHTML = resumeContent;

    // Set up event listeners for the new buttons
    document.getElementById('savePdfButton')?.addEventListener('click', downloadPDF);
    document.getElementById('generateUrlButton')?.addEventListener('click', generateUniqueUrl);
}

function toggleEdit(): void {
    const button = document.getElementById('editButton') as HTMLButtonElement;

    if (button.innerText === 'Edit') {
        button.innerText = 'Update';
        makeFieldsEditable(true);
    } else {
        button.innerText = 'Edit';
        makeFieldsEditable(false);

        // Show alert and redirect to index.html
        alert('Resume updated successfully!');
        window.location.href = 'index.html'; // Adjust the path as needed
    }
}

function makeFieldsEditable(editable: boolean): void {
    const fields = document.querySelectorAll('[contenteditable="true"]');
    fields.forEach(field => {
        field.setAttribute('contenteditable', editable.toString());
    });
}

function downloadPDF(): void {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get resume content
    const resumeContent = document.querySelector('.resume-content');
    if (!resumeContent) {
        alert('No resume content found!');
        return;
    }

    // Extract text from the resume content
    const text = resumeContent.innerText;

    // Add text to PDF
    doc.text(text, 10, 10);

    // Save PDF
    doc.save('resume.pdf');
}

function generateUniqueUrl(): void {
    const username = prompt('Enter your username:');
    if (username) {
        // Assume `username` is valid and generate a URL
        const resumeUrl = `https://${username}.vercel.app/resume`;
        prompt('Copy this link to share your resume:', resumeUrl);
    } else {
        alert('Username is required to generate a URL.');
    }
}
