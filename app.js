/* SMARTVAULT
   Student Digital Locker
*/

let currentUser = null;
let currentCategory = "All";


// SAMPLE DOCUMENTS

let documents = [
    {
        id: 1,
        name: "Aadhaar Card",
        category: "ID",
        file: "aadhaar.pdf",
        important: true,
        date: "2026-09-20"
    },
    {
        id: 2,
        name: "College ID Card",
        category: "ID",
        file: "college-id.pdf",
        important: true,
        date: "2026-09-21"
    },
    {
        id: 3,
        name: "B.Tech 1st Year Marksheet",
        category: "Marksheets",
        file: "marksheet.pdf",
        important: true,
        date: "2026-09-22"
    },
    {
        id: 4,
        name: "Hackathon Certificate",
        category: "Certificates",
        file: "certificate.pdf",
        important: false,
        date: "2026-09-25"
    },
    {
        id: 5,
        name: "College Fee Receipt",
        category: "Fees",
        file: "fee-receipt.pdf",
        important: false,
        date: "2026-09-28"
    }
];


let activities = [
    "Logged into SmartVault",
    "Viewed B.Tech 1st Year Marksheet",
    "Uploaded Hackathon Certificate",
    "Downloaded College ID Card"
];


let personalInfo = {
    name: "Deekshitha",
    college: "ABC Engineering College",
    course: "B.Tech CSE",
    roll: "23CSE101",
    phone: "9876543210",
    email: "student@example.com"
};


// LOGIN

function login() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    if (
        email === "student@example.com" &&
        password === "student123"
    ) {

        currentUser = personalInfo;

        openApplication();

        addActivity("Logged into SmartVault");

    } else {

        alert(
            "Invalid login.\n\nDemo login:\nstudent@example.com\nstudent123"
        );
    }
}


// SIGNUP

function signup() {

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;

    const password =
        document.getElementById("signupPassword").value;

    if (!name || !email || !password) {

        alert("Please fill all fields.");

        return;
    }

    personalInfo.name = name;
    personalInfo.email = email;

    alert(
        "Account created successfully!\nPlease login."
    );

    showLogin();
}


// OPEN APPLICATION

function openApplication() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("signupPage")
        .classList.add("hidden");

    document
        .getElementById("app")
        .classList.remove("hidden");

    updateUserInterface();

    displayDocuments();

    updateDashboard();

    displayActivities();

}


// USER UI

function updateUserInterface() {

    document.getElementById("studentName")
        .textContent = personalInfo.name;

    document.getElementById("welcomeName")
        .textContent = personalInfo.name;

    document.getElementById("personName")
        .value = personalInfo.name;

    document.getElementById("college")
        .value = personalInfo.college;

    document.getElementById("course")
        .value = personalInfo.course;

    document.getElementById("rollNumber")
        .value = personalInfo.roll;

    document.getElementById("phone")
        .value = personalInfo.phone;

    document.getElementById("email")
        .value = personalInfo.email;
}


// PAGE NAVIGATION

function showSection(section) {

    document
        .querySelectorAll(".section")
        .forEach(s => s.classList.add("hidden"));

    document
        .getElementById(section)
        .classList.remove("hidden");

    const titles = {

        dashboard: "Dashboard",

        documents: "My Documents",

        personal: "Personal Information",

        shared: "Shared Documents",

        activity: "Activity History",

        settings: "Settings & Security"
    };

    document.getElementById("pageTitle")
        .textContent = titles[section];

    if (section === "documents") {
        displayDocuments();
    }

    if (section === "activity") {
        displayActivities();
    }
}


// LOGIN / SIGNUP SWITCH

function showSignup() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("signupPage")
        .classList.remove("hidden");
}


function showLogin() {

    document
        .getElementById("signupPage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");
}


// LOGOUT

function logout() {

    currentUser = null;

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

}


// UPLOAD MODAL

function openUpload() {

    document
        .getElementById("uploadModal")
        .classList.remove("hidden");
}


function closeUpload() {

    document
        .getElementById("uploadModal")
        .classList.add("hidden");
}


// UPLOAD DOCUMENT

function uploadDocument() {

    const name =
        document.getElementById("documentName").value;

    const category =
        document.getElementById("documentCategory").value;

    const fileInput =
        document.getElementById("documentFile");

    const important =
        document.getElementById("importantCheck").checked;


    if (!name || fileInput.files.length === 0) {

        alert("Please enter document name and select a file.");

        return;
    }


    const file = fileInput.files[0];


    const newDocument = {

        id: Date.now(),

        name: name,

        category: category,

        file: file.name,

        important: important,

        date: new Date()
            .toISOString()
            .split("T")[0]
    };


    documents.unshift(newDocument);


    addActivity(
        "Uploaded " + name
    );


    closeUpload();

    displayDocuments();

    updateDashboard();


    document.getElementById("documentName")
        .value = "";

    document.getElementById("documentFile")
        .value = "";

    document.getElementById("importantCheck")
        .checked = false;


    alert("Document uploaded successfully!");
}


// DISPLAY DOCUMENTS

function displayDocuments() {

    const grid =
        document.getElementById("documentsGrid");

    const search =
        document.getElementById("searchBox")?.value
        .toLowerCase() || "";


    let filtered = documents.filter(doc => {

        const matchesSearch =
            doc.name.toLowerCase().includes(search);

        const matchesCategory =
            currentCategory === "All" ||
            doc.category === currentCategory;

        return matchesSearch && matchesCategory;
    });


    grid.innerHTML = "";


    if (filtered.length === 0) {

        grid.innerHTML =
            "<p>No documents found.</p>";

        return;
    }


    filtered.forEach(doc => {

        const card =
            document.createElement("div");

        card.className = "document-card";


        card.innerHTML = `

            <div class="document-icon">
                <i class="fa-solid fa-file-pdf"></i>
            </div>

            <h3>
                ${doc.name}
                ${doc.important ? " ⭐" : ""}
            </h3>

            <p>Category: ${doc.category}</p>

            <p>Uploaded: ${doc.date}</p>

            <div class="doc-actions">

                <button class="view"
                        onclick="viewDocument(${doc.id})">
                    <i class="fa-solid fa-eye"></i>
                </button>

                <button class="share"
                        onclick="shareDocument(${doc.id})">
                    <i class="fa-solid fa-share"></i>
                </button>

                <button class="delete"
                        onclick="deleteDocument(${doc.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;


        grid.appendChild(card);
    });
}


// CATEGORY FILTER

function filterDocuments(category) {

    currentCategory = category;

    displayDocuments();
}


// VIEW DOCUMENT

function viewDocument(id) {

    const doc =
        documents.find(d => d.id === id);

    if (!doc) return;


    addActivity(
        "Viewed " + doc.name
    );

    alert(
        "Document Details\n\n" +
        "Name: " + doc.name + "\n" +
        "Category: " + doc.category + "\n" +
        "File: " + doc.file + "\n" +
        "Uploaded: " + doc.date
    );
}


// DELETE DOCUMENT

function deleteDocument(id) {

    const doc =
        documents.find(d => d.id === id);

    if (!doc) return;


    const confirmDelete =
        confirm(
            "Delete " + doc.name + "?"
        );


    if (!confirmDelete) return;


    documents =
        documents.filter(
            d => d.id !== id
        );


    addActivity(
        "Deleted " + doc.name
    );


    displayDocuments();

    updateDashboard();
}


// SHARE DOCUMENT

function shareDocument(id) {

    const doc =
        documents.find(d => d.id === id);

    if (!doc) return;


    const code =
        "SV-" +
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();


    document.getElementById("shareResult")
        .innerHTML = `

        <h3>Temporary Share Code</h3>

        <h1>${code}</h1>

        <p>
            Document:
            <strong>${doc.name}</strong>
        </p>

        <p>
            This demo sharing code can be
            presented during your hackathon.
        </p>
    `;


    addActivity(
        "Created temporary share code for " +
        doc.name
    );


    showSection("shared");
}


// PERSONAL INFORMATION

function savePersonalInfo() {

    personalInfo.name =
        document.getElementById("personName").value;

    personalInfo.college =
        document.getElementById("college").value;

    personalInfo.course =
        document.getElementById("course").value;

    personalInfo.roll =
        document.getElementById("rollNumber").value;

    personalInfo.phone =
        document.getElementById("phone").value;

    personalInfo.email =
        document.getElementById("email").value;


    updateUserInterface();


    addActivity(
        "Updated personal information"
    );


    alert(
        "Personal information saved securely."
    );
}


// DASHBOARD

function updateDashboard() {

    document.getElementById("totalDocs")
        .textContent = documents.length;


    document.getElementById("importantDocs")
        .textContent =
        documents.filter(
            d => d.important
        ).length;


    document.getElementById("expiringDocs")
        .textContent = 1;


    const important =
        document.getElementById("importantList");


    important.innerHTML = "";


    documents
        .filter(d => d.important)
        .slice(0, 4)
        .forEach(doc => {

            important.innerHTML += `

                <div class="security-item">

                    <i class="fa-solid fa-file"></i>

                    <div>
                        <strong>${doc.name}</strong>
                        <p>${doc.category}</p>
                    </div>

                </div>
            `;
        });


    const recent =
        document.getElementById("recentActivity");


    recent.innerHTML = "";


    activities
        .slice(0, 5)
        .forEach(activity => {

            recent.innerHTML += `

                <div class="security-item">

                    <i class="fa-solid fa-clock"></i>

                    <div>
                        <p>${activity}</p>
                    </div>

                </div>
            `;
        });
}


// ACTIVITY

function addActivity(text) {

    activities.unshift(text);

    displayActivities();

    updateDashboard();
}


function displayActivities() {

    const list =
        document.getElementById("activityList");

    if (!list) return;


    list.innerHTML = "";


    activities.forEach((activity, index) => {

        list.innerHTML += `

            <div class="security-item">

                <i class="fa-solid fa-clock"></i>

                <div>
                    <h3>${activity}</h3>
                    <p>
                        Recent activity
                    </p>
                </div>

                <span class="secure">
                    ${index === 0 ? "New" : "Done"}
                </span>

            </div>
        `;
    });
}