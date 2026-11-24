const STORAGE_KEY = "medicore-prototype-v1";

const accounts = {
  admin: { email: "admin@medicore.com", password: "admin123", name: "Alex Morgan", title: "Administrator" },
  doctor: { email: "doctor@medicore.com", password: "doctor123", name: "Dr. Aisha Patel", title: "Doctor" },
  patient: { email: "patient@medicore.com", password: "patient123", name: "Olivia Bennett", title: "Patient" },
  staff: { email: "staff@medicore.com", password: "staff123", name: "Jordan Lee", title: "Staff" }
};

const definitions = {
  patients: { label: "Patients", singular: "Patient", icon: "♙", roles: ["admin", "doctor", "patient", "staff"], fields: [
    ["name", "Full name", "text", true], ["email", "Email address", "email", true], ["phone", "Phone number", "tel", true], ["dateOfBirth", "Date of birth", "date", true], ["gender", "Gender", "select", true, ["Female", "Male", "Other"]], ["bloodGroup", "Blood group", "select", true, ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]], ["address", "Address", "text"], ["emergencyContact", "Emergency contact", "text"], ["status", "Patient status", "select", true, ["Active", "In treatment", "Discharged"]] ], columns: ["name", "phone", "age", "gender", "bloodGroup", "status"] },
  doctors: { label: "Doctors", singular: "Doctor", icon: "⚕", roles: ["admin"], fields: [
    ["name", "Full name", "text", true], ["email", "Email address", "email", true], ["phone", "Phone number", "tel", true], ["specialization", "Specialization", "text", true], ["departmentId", "Department", "ref:departments", true], ["availability", "Availability", "select", true, ["Available", "On leave", "In surgery"]], ["yearsExperience", "Years of experience", "number", true] ], columns: ["name", "specialization", "departmentId", "phone", "availability"] },
  departments: { label: "Departments", singular: "Department", icon: "▦", roles: ["admin"], fields: [
    ["name", "Department name", "text", true], ["headDoctorId", "Department head", "ref:doctors"], ["location", "Location", "text", true], ["phone", "Contact number", "tel"], ["description", "Description", "textarea"] ], columns: ["name", "headDoctorId", "location", "phone"] },
  staff: { label: "Staff", singular: "Staff member", icon: "♧", roles: ["admin"], fields: [
    ["name", "Full name", "text", true], ["role", "Job title", "text", true], ["email", "Email address", "email", true], ["phone", "Phone number", "tel"], ["departmentId", "Department", "ref:departments"], ["shift", "Shift", "select", true, ["Day", "Evening", "Night"]], ["status", "Status", "select", true, ["Active", "On leave"]] ], columns: ["name", "role", "departmentId", "shift", "phone"] },
  medicalRecords: { label: "Medical Records", singular: "Medical record", icon: "▤", roles: ["admin", "doctor", "patient"], fields: [
    ["patientId", "Patient", "ref:patients", true], ["doctorId", "Doctor", "ref:doctors", true], ["visitDate", "Visit date", "date", true], ["diagnosisId", "Diagnosis", "ref:diagnoses"], ["treatment", "Treatment details", "textarea", true], ["prescription", "Prescription", "textarea"], ["followUpDate", "Follow-up date", "date"] ], columns: ["patientId", "doctorId", "visitDate", "diagnosisId", "treatment", "prescription"] },
  rooms: { label: "Rooms", singular: "Room", icon: "▣", roles: ["admin", "staff"], fields: [
    ["roomNumber", "Room number", "text", true], ["type", "Room type", "select", true, ["General", "Private", "ICU", "Maternity", "Operating"]], ["floor", "Floor", "number", true], ["dailyRate", "Daily rate ($)", "number", true], ["status", "Availability", "select", true, ["Available", "Occupied", "Maintenance"]] ], columns: ["roomNumber", "type", "floor", "dailyRate", "status"] },
  admissions: { label: "Admissions", singular: "Admission", icon: "⇥", roles: ["admin", "doctor", "patient", "staff"], fields: [
    ["patientId", "Patient", "ref:patients", true], ["roomId", "Room", "ref:rooms", true], ["admittingDoctorId", "Admitting doctor", "ref:doctors", true], ["admissionDate", "Admission date", "date", true], ["dischargeDate", "Discharge date", "date"], ["reason", "Reason for admission", "textarea", true], ["status", "Admission status", "select", true, ["Admitted", "Discharged"]] ], columns: ["patientId", "roomId", "admissionDate", "dischargeDate", "status"] },
  bills: { label: "Bills", singular: "Bill", icon: "$", roles: ["admin", "patient", "staff"], fields: [
    ["patientId", "Patient", "ref:patients", true], ["billDate", "Bill date", "date", true], ["description", "Description", "text", true], ["totalAmount", "Total amount ($)", "number", true], ["amountPaid", "Amount paid ($)", "number", true], ["dueDate", "Due date", "date"], ["status", "Status", "select", true, ["Pending", "Partially paid", "Paid", "Overdue"]] ], columns: ["patientId", "billDate", "description", "totalAmount", "amountPaid", "balance", "status"] },
  payments: { label: "Payments", singular: "Payment", icon: "↗", roles: ["admin", "patient", "staff"], fields: [
    ["billId", "Bill", "ref:bills", true], ["paymentDate", "Payment date", "date", true], ["amount", "Amount ($)", "number", true], ["method", "Payment method", "select", true, ["Credit card", "Debit card", "Cash", "Bank transfer", "Insurance"]], ["status", "Status", "select", true, ["Completed", "Pending", "Refunded"]], ["reference", "Reference number", "text"] ], columns: ["billId", "paymentDate", "amount", "method", "status"] },
  diagnoses: { label: "Diagnoses", singular: "Diagnosis", icon: "✚", roles: ["admin", "doctor", "patient"], fields: [
    ["patientId", "Patient", "ref:patients", true], ["doctorId", "Diagnosing doctor", "ref:doctors", true], ["date", "Diagnosis date", "date", true], ["condition", "Condition", "text", true], ["severity", "Severity", "select", true, ["Low", "Moderate", "High", "Critical"]], ["notes", "Clinical notes", "textarea"] ], columns: ["patientId", "condition", "doctorId", "date", "severity"] },
  suppliers: { label: "Suppliers", singular: "Supplier", icon: "⌂", roles: ["admin", "staff"], fields: [
    ["name", "Supplier name", "text", true], ["contactPerson", "Contact person", "text", true], ["email", "Email address", "email", true], ["phone", "Phone number", "tel", true], ["suppliedMedicines", "Supplied medicines", "text"], ["status", "Status", "select", true, ["Active", "Inactive"]] ], columns: ["name", "contactPerson", "email", "phone", "status"] },
  ambulances: { label: "Ambulances", singular: "Ambulance", icon: "✚", roles: ["admin"], fields: [
    ["vehicleNumber", "Vehicle number", "text", true], ["type", "Vehicle type", "select", true, ["Basic life support", "Advanced life support", "Patient transport"]], ["driver", "Assigned driver", "text", true], ["phone", "Contact number", "tel"], ["status", "Availability", "select", true, ["Available", "On call", "Maintenance"]], ["location", "Current location", "text"] ], columns: ["vehicleNumber", "type", "driver", "phone", "status"] },
  insurance: { label: "Insurance", singular: "Insurance policy", icon: "◇", roles: ["admin", "patient"], fields: [
    ["patientId", "Patient", "ref:patients", true], ["provider", "Insurance provider", "text", true], ["policyNumber", "Policy number", "text", true], ["coverage", "Coverage ($)", "number", true], ["validUntil", "Valid until", "date", true], ["status", "Policy status", "select", true, ["Active", "Expired", "Pending"]] ], columns: ["patientId", "provider", "policyNumber", "coverage", "validUntil", "status"] },
  surgeries: { label: "Surgery Operations", singular: "Surgery operation", icon: "⚕", roles: ["admin", "doctor"], fields: [
    ["patientId", "Patient", "ref:patients", true], ["doctorId", "Lead surgeon", "ref:doctors", true], ["procedure", "Procedure", "text", true], ["operationDate", "Operation date", "date", true], ["roomId", "Operating room", "ref:rooms"], ["status", "Status", "select", true, ["Scheduled", "In progress", "Completed", "Cancelled"]], ["notes", "Notes", "textarea"] ], columns: ["patientId", "procedure", "doctorId", "operationDate", "status"] },
  feedback: { label: "Feedback", singular: "Feedback", icon: "☆", roles: ["admin", "patient"], fields: [
    ["patientId", "Patient", "ref:patients", true], ["date", "Submitted on", "date", true], ["service", "Service", "select", true, ["Clinical care", "Nursing", "Facilities", "Billing", "Other"]], ["rating", "Rating (1–5)", "select", true, ["1", "2", "3", "4", "5"]], ["comments", "Comments", "textarea", true], ["status", "Review status", "select", true, ["New", "Reviewed"]] ], columns: ["patientId", "date", "service", "rating", "comments", "status"] },
  emergencyContacts: { label: "Emergency Contacts", singular: "Emergency contact", icon: "☎", roles: ["admin", "patient", "staff"], fields: [
    ["patientId", "Patient", "ref:patients", true], ["name", "Contact name", "text", true], ["relationship", "Relationship", "text", true], ["phone", "Phone number", "tel", true], ["email", "Email address", "email"], ["address", "Address", "text"] ], columns: ["patientId", "name", "relationship", "phone", "email"] },
  medicines: { label: "Medicines", singular: "Medicine", icon: "⊕", roles: ["admin", "staff"], fields: [
    ["name", "Medicine name", "text", true], ["category", "Category", "text", true], ["supplierId", "Supplier", "ref:suppliers"], ["stock", "Stock quantity", "number", true], ["unit", "Unit", "text", true], ["reorderLevel", "Reorder level", "number", true], ["unitPrice", "Unit price ($)", "number", true], ["expiryDate", "Expiry date", "date"] ], columns: ["name", "category", "supplierId", "stock", "unit", "unitPrice", "expiryDate"] }
};

const navOrder = ["patients", "doctors", "departments", "staff", "medicalRecords", "rooms", "admissions", "bills", "payments", "diagnoses", "suppliers", "ambulances", "insurance", "surgeries", "feedback", "emergencyContacts", "medicines"];

function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function makeSeed() {
  const patients = [
    { id: "p1", name: "Olivia Bennett", email: "patient@medicore.com", phone: "(555) 204-7812", dateOfBirth: "1988-04-15", gender: "Female", bloodGroup: "O+", address: "28 Willow Lane, Brookside", emergencyContact: "Daniel Bennett · (555) 204-7813", status: "Active" },
    { id: "p2", name: "Noah Williams", email: "noah.williams@example.com", phone: "(555) 681-3302", dateOfBirth: "1974-09-22", gender: "Male", bloodGroup: "A+", address: "91 Park Avenue, Brookside", emergencyContact: "Mia Williams · (555) 681-3303", status: "In treatment" },
    { id: "p3", name: "Amara Johnson", email: "amara.j@example.com", phone: "(555) 490-1188", dateOfBirth: "1996-12-03", gender: "Female", bloodGroup: "B+", address: "6 Cedar Court, Fairview", emergencyContact: "Elijah Johnson · (555) 490-1189", status: "Active" },
    { id: "p4", name: "Ethan Chen", email: "ethan.chen@example.com", phone: "(555) 740-6621", dateOfBirth: "1962-02-11", gender: "Male", bloodGroup: "AB+", address: "413 Lake Road, Fairview", emergencyContact: "Grace Chen · (555) 740-6622", status: "In treatment" },
    { id: "p5", name: "Sofia Martinez", email: "sofia.m@example.com", phone: "(555) 355-0974", dateOfBirth: "2001-06-27", gender: "Female", bloodGroup: "A-", address: "77 Maple Street, Brookside", emergencyContact: "Luis Martinez · (555) 355-0975", status: "Discharged" }
  ];
  return {
    patients,
    doctors: [
      { id: "d1", name: "Dr. Aisha Patel", email: "doctor@medicore.com", phone: "(555) 812-9940", specialization: "Cardiology", departmentId: "dep1", availability: "Available", yearsExperience: "12" },
      { id: "d2", name: "Dr. Marcus Reed", email: "marcus.reed@medicore.com", phone: "(555) 731-4062", specialization: "Neurology", departmentId: "dep2", availability: "Available", yearsExperience: "9" },
      { id: "d3", name: "Dr. Elena Kim", email: "elena.kim@medicore.com", phone: "(555) 206-8819", specialization: "Pediatrics", departmentId: "dep3", availability: "On leave", yearsExperience: "15" },
      { id: "d4", name: "Dr. Omar Hassan", email: "omar.hassan@medicore.com", phone: "(555) 411-2250", specialization: "Internal Medicine", departmentId: "dep4", availability: "Available", yearsExperience: "7" }
    ],
    departments: [
      { id: "dep1", name: "Cardiology", headDoctorId: "d1", location: "East Wing · Floor 2", phone: "(555) 800-2001", description: "Heart and cardiovascular care" },
      { id: "dep2", name: "Neurology", headDoctorId: "d2", location: "West Wing · Floor 3", phone: "(555) 800-2002", description: "Neurological diagnosis and treatment" },
      { id: "dep3", name: "Pediatrics", headDoctorId: "d3", location: "North Wing · Floor 1", phone: "(555) 800-2003", description: "Healthcare for infants and children" },
      { id: "dep4", name: "Internal Medicine", headDoctorId: "d4", location: "East Wing · Floor 1", phone: "(555) 800-2004", description: "Adult primary and preventative care" }
    ],
    staff: [
      { id: "s1", name: "Jordan Lee", role: "Patient Services Coordinator", email: "staff@medicore.com", phone: "(555) 345-8012", departmentId: "dep4", shift: "Day", status: "Active" },
      { id: "s2", name: "Priya Shah", role: "Registered Nurse", email: "priya.shah@medicore.com", phone: "(555) 345-8214", departmentId: "dep1", shift: "Evening", status: "Active" },
      { id: "s3", name: "Carlos Rivera", role: "Pharmacy Technician", email: "carlos.r@medicore.com", phone: "(555) 345-8420", departmentId: "dep4", shift: "Day", status: "Active" }
    ],
    diagnoses: [
      { id: "dg1", patientId: "p1", doctorId: "d1", date: dateOffset(-2), condition: "Essential hypertension", severity: "Moderate", notes: "Blood pressure elevated; monitoring plan started." },
      { id: "dg2", patientId: "p2", doctorId: "d2", date: dateOffset(-4), condition: "Migraine", severity: "Moderate", notes: "Intermittent headaches; review in two weeks." },
      { id: "dg3", patientId: "p3", doctorId: "d4", date: dateOffset(-1), condition: "Seasonal allergic rhinitis", severity: "Low", notes: "Symptoms managed with medication." },
      { id: "dg4", patientId: "p4", doctorId: "d1", date: dateOffset(-7), condition: "Atrial fibrillation", severity: "High", notes: "Ongoing cardiology follow-up required." }
    ],
    medicalRecords: [
      { id: "mr1", patientId: "p1", doctorId: "d1", visitDate: dateOffset(-2), diagnosisId: "dg1", treatment: "Blood pressure monitoring and lifestyle counselling.", prescription: "Lisinopril 10 mg once daily", followUpDate: dateOffset(12) },
      { id: "mr2", patientId: "p2", doctorId: "d2", visitDate: dateOffset(-4), diagnosisId: "dg2", treatment: "Neurological assessment completed; hydration and sleep plan discussed.", prescription: "Sumatriptan 50 mg as needed", followUpDate: dateOffset(8) },
      { id: "mr3", patientId: "p3", doctorId: "d4", visitDate: dateOffset(-1), diagnosisId: "dg3", treatment: "Allergy management plan reviewed.", prescription: "Cetirizine 10 mg once daily", followUpDate: dateOffset(28) },
      { id: "mr4", patientId: "p4", doctorId: "d1", visitDate: dateOffset(-7), diagnosisId: "dg4", treatment: "ECG reviewed; continue cardiac monitoring.", prescription: "Metoprolol 25 mg twice daily", followUpDate: dateOffset(4) }
    ],
    rooms: [
      { id: "r101", roomNumber: "101", type: "General", floor: "1", dailyRate: "240", status: "Available" },
      { id: "r102", roomNumber: "102", type: "Private", floor: "1", dailyRate: "420", status: "Occupied" },
      { id: "r203", roomNumber: "203", type: "ICU", floor: "2", dailyRate: "850", status: "Occupied" },
      { id: "r205", roomNumber: "205", type: "General", floor: "2", dailyRate: "240", status: "Available" },
      { id: "r301", roomNumber: "301", type: "Maternity", floor: "3", dailyRate: "500", status: "Maintenance" }
    ],
    admissions: [
      { id: "ad1", patientId: "p1", roomId: "r102", admittingDoctorId: "d1", admissionDate: dateOffset(-2), dischargeDate: "", reason: "Blood pressure observation", status: "Admitted" },
      { id: "ad2", patientId: "p4", roomId: "r203", admittingDoctorId: "d1", admissionDate: dateOffset(-6), dischargeDate: "", reason: "Cardiac monitoring", status: "Admitted" },
      { id: "ad3", patientId: "p5", roomId: "r205", admittingDoctorId: "d4", admissionDate: dateOffset(-14), dischargeDate: dateOffset(-10), reason: "Post-operative observation", status: "Discharged" }
    ],
    bills: [
      { id: "b1", patientId: "p1", billDate: dateOffset(-2), description: "Consultation and diagnostics", totalAmount: "680", amountPaid: "250", dueDate: dateOffset(12), status: "Partially paid" },
      { id: "b2", patientId: "p2", billDate: dateOffset(-4), description: "Neurology consultation", totalAmount: "320", amountPaid: "320", dueDate: dateOffset(10), status: "Paid" },
      { id: "b3", patientId: "p4", billDate: dateOffset(-6), description: "Inpatient cardiac care", totalAmount: "2450", amountPaid: "1000", dueDate: dateOffset(8), status: "Pending" },
      { id: "b4", patientId: "p3", billDate: dateOffset(-1), description: "Outpatient visit", totalAmount: "185", amountPaid: "0", dueDate: dateOffset(14), status: "Pending" }
    ],
    payments: [
      { id: "pay1", billId: "b1", paymentDate: dateOffset(-2), amount: "250", method: "Debit card", status: "Completed", reference: "MC-24091" },
      { id: "pay2", billId: "b2", paymentDate: dateOffset(-3), amount: "320", method: "Insurance", status: "Completed", reference: "MC-24087" },
      { id: "pay3", billId: "b3", paymentDate: dateOffset(-5), amount: "1000", method: "Credit card", status: "Completed", reference: "MC-24066" }
    ],
    suppliers: [
      { id: "sup1", name: "NorthStar Pharmaceuticals", contactPerson: "Maya Chen", email: "orders@northstarpharma.example", phone: "(555) 890-2210", suppliedMedicines: "Cardiovascular, general", status: "Active" },
      { id: "sup2", name: "Everwell Medical Supply", contactPerson: "James Perry", email: "service@everwell.example", phone: "(555) 890-3392", suppliedMedicines: "Pain relief, allergy", status: "Active" },
      { id: "sup3", name: "Crestline Health", contactPerson: "Lena Flores", email: "sales@crestline.example", phone: "(555) 890-4408", suppliedMedicines: "Neurology, specialty", status: "Active" }
    ],
    ambulances: [
      { id: "amb1", vehicleNumber: "MC-AMB-01", type: "Advanced life support", driver: "Frank Davis", phone: "(555) 911-0131", status: "Available", location: "Main entrance" },
      { id: "amb2", vehicleNumber: "MC-AMB-02", type: "Basic life support", driver: "Nina Roberts", phone: "(555) 911-0132", status: "On call", location: "Brookside district" },
      { id: "amb3", vehicleNumber: "MC-AMB-03", type: "Patient transport", driver: "Sam Wilson", phone: "(555) 911-0133", status: "Available", location: "Main entrance" }
    ],
    insurance: [
      { id: "ins1", patientId: "p1", provider: "BlueCross Health", policyNumber: "BC-8841207", coverage: "50000", validUntil: dateOffset(220), status: "Active" },
      { id: "ins2", patientId: "p2", provider: "Evergreen Mutual", policyNumber: "EM-3320915", coverage: "35000", validUntil: dateOffset(95), status: "Active" },
      { id: "ins3", patientId: "p4", provider: "BlueCross Health", policyNumber: "BC-7701422", coverage: "75000", validUntil: dateOffset(160), status: "Active" }
    ],
    surgeries: [
      { id: "surg1", patientId: "p5", doctorId: "d4", procedure: "Laparoscopic appendectomy", operationDate: dateOffset(-12), roomId: "r205", status: "Completed", notes: "No complications reported." },
      { id: "surg2", patientId: "p4", doctorId: "d1", procedure: "Cardiac catheterization", operationDate: dateOffset(2), roomId: "r203", status: "Scheduled", notes: "Pre-operative review scheduled." }
    ],
    feedback: [
      { id: "fb1", patientId: "p1", date: dateOffset(-1), service: "Clinical care", rating: "5", comments: "The care team explained everything clearly.", status: "New" },
      { id: "fb2", patientId: "p2", date: dateOffset(-3), service: "Facilities", rating: "4", comments: "Clean and comfortable waiting area.", status: "Reviewed" }
    ],
    emergencyContacts: [
      { id: "ec1", patientId: "p1", name: "Daniel Bennett", relationship: "Spouse", phone: "(555) 204-7813", email: "daniel.b@example.com", address: "28 Willow Lane, Brookside" },
      { id: "ec2", patientId: "p2", name: "Mia Williams", relationship: "Daughter", phone: "(555) 681-3303", email: "mia.w@example.com", address: "91 Park Avenue, Brookside" },
      { id: "ec3", patientId: "p3", name: "Elijah Johnson", relationship: "Brother", phone: "(555) 490-1189", email: "elijah.j@example.com", address: "6 Cedar Court, Fairview" }
    ],
    medicines: [
      { id: "med1", name: "Lisinopril 10 mg", category: "Cardiovascular", supplierId: "sup1", stock: "128", unit: "tablets", reorderLevel: "35", unitPrice: "0.42", expiryDate: dateOffset(240) },
      { id: "med2", name: "Cetirizine 10 mg", category: "Allergy", supplierId: "sup2", stock: "214", unit: "tablets", reorderLevel: "50", unitPrice: "0.18", expiryDate: dateOffset(310) },
      { id: "med3", name: "Metoprolol 25 mg", category: "Cardiovascular", supplierId: "sup1", stock: "18", unit: "tablets", reorderLevel: "30", unitPrice: "0.35", expiryDate: dateOffset(190) },
      { id: "med4", name: "Sumatriptan 50 mg", category: "Neurology", supplierId: "sup3", stock: "42", unit: "tablets", reorderLevel: "20", unitPrice: "1.25", expiryDate: dateOffset(175) },
      { id: "med5", name: "Amoxicillin 500 mg", category: "Antibiotic", supplierId: "sup2", stock: "8", unit: "capsules", reorderLevel: "25", unitPrice: "0.55", expiryDate: dateOffset(125) }
    ]
  };
}

let state = loadState();
let activeRole = null;
let activeSection = "dashboard";
let toastTimer;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { data: makeSeed(), activity: [] };
    const parsed = JSON.parse(saved);
    return { data: { ...makeSeed(), ...parsed.data }, activity: parsed.activity || [] };
  } catch (error) {
    console.error("Could not load MediCore data from localStorage.", error);
    return { data: makeSeed(), activity: [] };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Could not save MediCore data to localStorage.", error);
    showToast("Changes could not be saved in this browser.", true);
  }
}

function getRows(key) { return state.data[key] || []; }
function getRecord(key, id) { return getRows(key).find((row) => row.id === id); }
function today() { return new Date().toISOString().slice(0, 10); }
function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function initials(name = "") { return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?"; }
function ageFromDob(value) {
  if (!value) return "—";
  const birth = new Date(`${value}T12:00:00`);
  if (Number.isNaN(birth.getTime())) return "—";
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
  return `${age} yrs`;
}
function labelFor(key, id) {
  if (!id) return "—";
  const lookup = { patients: "name", doctors: "name", departments: "name", rooms: "roomNumber", bills: "description", diagnoses: "condition", suppliers: "name" };
  const record = getRecord(key, id);
  return record ? record[lookup[key] || "name"] || id : "—";
}
function displayValue(key, field, row) {
  const value = row[field];
  if (value === undefined || value === null || value === "") return "—";
  if (field === "age") return ageFromDob(row.dateOfBirth);
  if (field === "balance") return `$${(Number(row.totalAmount || 0) - Number(row.amountPaid || 0)).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  if (field === "amount" || field === "totalAmount" || field === "amountPaid" || field === "unitPrice" || field === "dailyRate") return `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  const def = definitions[key];
  const fieldDef = def?.fields.find((item) => item[0] === field);
  if (fieldDef?.[2]?.startsWith("ref:")) return labelFor(fieldDef[2].slice(4), value);
  if (field.toLowerCase().includes("date") || field === "validUntil" || field === "expiryDate") return formatDate(value);
  return String(value);
}
function listForRole(key) {
  let rows = getRows(key);
  if (activeRole === "patient") {
    const patient = getRecord("patients", "p1");
    if (!patient) return [];
    if (key === "patients") return rows.filter((item) => item.id === patient.id);
    const patientOwned = ["medicalRecords", "admissions", "bills", "diagnoses", "insurance", "feedback", "emergencyContacts", "surgeries"];
    if (patientOwned.includes(key)) rows = rows.filter((item) => item.patientId === patient.id);
    if (key === "payments") {
      const billIds = getRows("bills").filter((bill) => bill.patientId === patient.id).map((bill) => bill.id);
      rows = rows.filter((item) => billIds.includes(item.billId));
    }
    if (key === "medicines") return [];
    if (key === "doctors") return [];
    return rows;
  }
  if (activeRole === "doctor") {
    if (key === "patients") {
      const assigned = new Set(getRows("medicalRecords").filter((item) => item.doctorId === "d1").map((item) => item.patientId));
      getRows("admissions").filter((item) => item.admittingDoctorId === "d1").forEach((item) => assigned.add(item.patientId));
      return rows.filter((item) => assigned.has(item.id));
    }
    if (["medicalRecords", "diagnoses", "admissions", "surgeries"].includes(key)) {
      const doctorField = key === "admissions" ? "admittingDoctorId" : "doctorId";
      return rows.filter((item) => item[doctorField] === "d1");
    }
    if (key === "medicines") return [];
  }
  return rows;
}

function permittedSections() {
  return navOrder.filter((key) => definitions[key].roles.includes(activeRole) && (activeRole !== "doctor" || key !== "medicines"));
}
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = isError ? "#9d3e3a" : "#173b4c";
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}
function logActivity(message) {
  state.activity.unshift({ message, time: new Date().toISOString() });
  state.activity = state.activity.slice(0, 8);
}

function login(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const role = form.get("role");
  const account = accounts[role];
  if (!account || form.get("email").trim().toLowerCase() !== account.email || form.get("password") !== account.password) {
    document.getElementById("login-error").textContent = "The email, password and selected role do not match.";
    return;
  }
  activeRole = role;
  sessionStorage.setItem("medicore-role", role);
  activeSection = "dashboard";
  document.getElementById("login-error").textContent = "";
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  initializeApp();
}
function logout() {
  activeRole = null;
  sessionStorage.removeItem("medicore-role");
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("login-form").reset();
  document.getElementById("login-error").textContent = "";
}
function initializeApp() {
  const account = accounts[activeRole];
  document.getElementById("profile-name").textContent = account.name;
  document.getElementById("profile-role").textContent = account.title;
  document.getElementById("profile-avatar").textContent = initials(account.name);
  document.getElementById("today-label").textContent = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  renderNavigation();
  renderPage();
}
function renderNavigation() {
  const nav = document.getElementById("navigation");
  nav.innerHTML = `<button class="nav-item ${activeSection === "dashboard" ? "active" : ""}" data-section="dashboard"><span class="nav-icon">⌂</span>Overview</button>` +
    permittedSections().map((key) => `<button class="nav-item ${activeSection === key ? "active" : ""}" data-section="${key}"><span class="nav-icon">${definitions[key].icon}</span>${definitions[key].label}</button>`).join("");
  nav.querySelectorAll("[data-section]").forEach((button) => button.addEventListener("click", () => {
    activeSection = button.dataset.section;
    document.getElementById("sidebar").classList.remove("open");
    renderNavigation();
    renderPage();
  }));
}
function renderPage() {
  const page = document.getElementById("page-content");
  const sectionName = activeSection === "dashboard" ? "Overview" : definitions[activeSection]?.label;
  document.getElementById("breadcrumb-current").textContent = sectionName || "Overview";
  page.innerHTML = activeSection === "dashboard" ? renderDashboard() : renderEntityPage(activeSection);
  if (activeSection !== "dashboard") attachEntityHandlers(activeSection);
  document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.go)));
  document.querySelectorAll("[data-quick-add]").forEach((button) => button.addEventListener("click", () => openForm(button.dataset.quickAdd)));
  document.getElementById("add-record-button")?.addEventListener("click", () => openForm(activeSection));
  document.getElementById("feedback-button")?.addEventListener("click", () => openForm("feedback"));
}
function navigate(section) {
  if (section !== "dashboard" && !permittedSections().includes(section)) return;
  activeSection = section;
  renderNavigation();
  renderPage();
}

function roleWelcome() {
  if (activeRole === "admin") return ["Good morning, Alex", "Here’s what’s happening across your hospital today."];
  if (activeRole === "doctor") return ["Good morning, Dr. Patel", "Your clinical schedule and patient updates at a glance."];
  if (activeRole === "patient") return ["Welcome back, Olivia", "Your care information, appointments and health updates in one place."];
  return ["Good morning, Jordan", "Your patient services and hospital operations overview."];
}
function dashboardStats() {
  if (activeRole === "admin") return [
    ["Total Patients", getRows("patients").length, "♙", "Registered patients"],
    ["Total Doctors", getRows("doctors").length, "⚕", "Across all departments"],
    ["Total Staff", getRows("staff").length, "♧", "Hospital team members"],
    ["Departments", getRows("departments").length, "▦", "Clinical departments"],
    ["Available Rooms", getRows("rooms").filter((item) => item.status === "Available").length, "▣", `${getRows("rooms").length} total rooms`],
    ["Admissions", getRows("admissions").filter((item) => item.status === "Admitted").length, "⇥", "Currently admitted"],
    ["Pending Bills", getRows("bills").filter((item) => Number(item.totalAmount) > Number(item.amountPaid)).length, "$", `$${getRows("bills").reduce((sum, item) => sum + Number(item.totalAmount) - Number(item.amountPaid), 0).toLocaleString()} outstanding`],
    ["Medicine Stock", getRows("medicines").reduce((sum, item) => sum + Number(item.stock), 0), "⊕", `${getRows("medicines").filter((item) => Number(item.stock) <= Number(item.reorderLevel)).length} items need reorder`]
  ];
  if (activeRole === "doctor") return [
    ["Assigned Patients", listForRole("patients").length, "♙", "In your care"],
    ["Upcoming Follow-ups", getRows("medicalRecords").filter((item) => item.doctorId === "d1" && item.followUpDate >= today()).length, "◷", "Scheduled follow-ups"],
    ["Active Admissions", listForRole("admissions").filter((item) => item.status === "Admitted").length, "⇥", "Under your care"],
    ["Recent Records", listForRole("medicalRecords").length, "▤", "Clinical records"]
  ];
  if (activeRole === "patient") {
    const bills = listForRole("bills");
    return [
      ["Medical Records", listForRole("medicalRecords").length, "▤", "Personal health history"],
      ["Active Prescriptions", listForRole("medicalRecords").filter((item) => item.prescription).length, "⊕", "From your care team"],
      ["Admission History", listForRole("admissions").length, "⇥", "Hospital visits"],
      ["Outstanding Balance", `$${bills.reduce((sum, item) => sum + Number(item.totalAmount) - Number(item.amountPaid), 0).toLocaleString()}`, "$", "Across your bills"]
    ];
  }
  return [
    ["Registered Patients", getRows("patients").length, "♙", "Patient records"],
    ["Available Rooms", getRows("rooms").filter((item) => item.status === "Available").length, "▣", "Ready for admission"],
    ["Active Admissions", getRows("admissions").filter((item) => item.status === "Admitted").length, "⇥", "Current inpatients"],
    ["Low Stock Items", getRows("medicines").filter((item) => Number(item.stock) <= Number(item.reorderLevel)).length, "⊕", "Pharmacy inventory"]
  ];
}
function renderDashboard() {
  const [greeting, description] = roleWelcome();
  const stats = dashboardStats();
  const patients = listForRole("patients").slice(0, activeRole === "patient" ? 1 : 5);
  const records = activeRole === "patient" ? listForRole("medicalRecords") : listForRole("medicalRecords");
  const recent = records.slice().sort((a, b) => b.visitDate.localeCompare(a.visitDate)).slice(0, 4);
  const activities = state.activity.length ? state.activity : [
    { message: "Patient Olivia Bennett checked in for a cardiology follow-up", time: new Date(Date.now() - 24 * 60000).toISOString() },
    { message: "New medical record added for Noah Williams", time: new Date(Date.now() - 60 * 60000).toISOString() },
    { message: "Room 205 marked available after discharge", time: new Date(Date.now() - 120 * 60000).toISOString() },
    { message: "Payment received for bill MC-24087", time: new Date(Date.now() - 180 * 60000).toISOString() }
  ];
  let upperContent = "";
  if (activeRole === "patient") {
    const patient = listForRole("patients")[0];
    upperContent = patient ? `<div class="notice-card"><span>♙</span><span><strong>${escapeHtml(patient.name)}</strong> · ${escapeHtml(ageFromDob(patient.dateOfBirth))} · ${escapeHtml(patient.gender)} · Blood group ${escapeHtml(patient.bloodGroup)} · ${escapeHtml(patient.phone)}</span></div>` : "";
  } else if (activeRole === "doctor") {
    const doctor = getRecord("doctors", "d1");
    const followups = getRows("medicalRecords").filter((item) => item.doctorId === "d1" && item.followUpDate >= today()).slice(0, 3);
    upperContent = `${doctor ? `<div class="notice-card"><span>⚕</span><span><strong>${escapeHtml(doctor.name)} · ${escapeHtml(doctor.specialization)}</strong> ${escapeHtml(labelFor("departments", doctor.departmentId))} · ${escapeHtml(doctor.yearsExperience)} years experience · ${escapeHtml(doctor.phone)}</span></div>` : ""}<div class="panel" style="margin-bottom:16px"><div class="panel-header"><div><h2>Upcoming Follow-ups</h2><div class="subhead">Patients scheduled for review</div></div><button class="text-button" data-go="medicalRecords">View records →</button></div>${followups.length ? tableMarkup("medicalRecords", followups, ["patientId", "followUpDate", "diagnosisId", "doctorId"], false) : '<div class="empty-state">No upcoming follow-ups scheduled.</div>'}</div>`;
  } else if (activeRole === "staff") {
    upperContent = `<div class="quick-grid">
      <button class="quick-card" data-quick-add="patients"><span class="stat-icon">＋</span><span><strong>Register patient</strong><small>Create a patient record</small></span></button>
      <button class="quick-card" data-go="admissions"><span class="stat-icon">⇥</span><span><strong>Manage admissions</strong><small>Admit or discharge patients</small></span></button>
      <button class="quick-card" data-go="rooms"><span class="stat-icon">▣</span><span><strong>Room availability</strong><small>Check current room status</small></span></button>
    </div>`;
  } else {
    upperContent = `<div class="quick-grid">
      <button class="quick-card" data-quick-add="patients"><span class="stat-icon">＋</span><span><strong>Register patient</strong><small>Add a new patient</small></span></button>
      <button class="quick-card" data-go="admissions"><span class="stat-icon">⇥</span><span><strong>Admissions</strong><small>Manage patient stays</small></span></button>
      <button class="quick-card" data-go="bills"><span class="stat-icon">$</span><span><strong>Billing</strong><small>View balances & payments</small></span></button>
    </div>`;
  }
  const tableTitle = activeRole === "patient" ? "Recent Medical Records" : "Patient Overview";
  const tableRows = activeRole === "patient" ? recent : patients;
  const tableKey = activeRole === "patient" ? "medicalRecords" : "patients";
  const tableCols = activeRole === "patient" ? ["visitDate", "doctorId", "diagnosisId", "prescription", "followUpDate"] : ["name", "age", "gender", "bloodGroup", "status"];
  return `<section class="page-heading"><div><h1>${greeting}</h1><p>${description}</p></div><div class="heading-actions">${activeRole === "patient" ? '<button class="button button-primary" id="feedback-button">＋ Share feedback</button>' : ""}</div></section>
    <section class="stat-grid">${stats.map(([label, value, icon, foot]) => `<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon}</span></div><div class="stat-value">${value}</div><div class="stat-foot">${foot}</div></article>`).join("")}</section>
    ${upperContent}
    <section class="dashboard-grid" style="margin-top:16px">
      <article class="panel"><div class="panel-header"><div><h2>${tableTitle}</h2><div class="subhead">${activeRole === "patient" ? "Your latest visit summaries" : "Recently active patient records"}</div></div><button class="text-button" data-go="${tableKey}">View all →</button></div>${tableRows.length ? tableMarkup(tableKey, tableRows, tableCols, false) : '<div class="empty-state"><strong>No records yet</strong>Records will appear here when available.</div>'}</article>
      ${activeRole === "admin" ? `<article class="panel"><div class="panel-header"><div><h2>Hospital Activity</h2><div class="subhead">Recent updates across your facility</div></div><span class="badge badge-active">Live</span></div><div class="activity-list">${activities.slice(0, 4).map(activityMarkup).join("")}</div></article>` :
      activeRole === "patient" ? `<article class="panel"><div class="panel-header"><div><h2>My Care Team</h2><div class="subhead">Your associated care providers</div></div></div><div class="activity-list">${[...new Set(listForRole("medicalRecords").map((item) => item.doctorId))].map((id) => { const doctor = getRecord("doctors", id); return doctor ? `<div class="activity-item"><span class="mini-avatar">${initials(doctor.name)}</span><div><strong>${escapeHtml(doctor.name)}</strong><p>${escapeHtml(doctor.specialization)} · ${escapeHtml(labelFor("departments", doctor.departmentId))}</p></div></div>` : ""; }).join("") || '<div class="empty-state">Your care team will appear here.</div>'}</div></article>` :
      `<article class="panel"><div class="panel-header"><div><h2>${activeRole === "doctor" ? "Recent Medical Records" : "Operations Updates"}</h2><div class="subhead">${activeRole === "doctor" ? "Latest patient visit summaries" : "Recent activity in patient services"}</div></div><button class="text-button" data-go="${activeRole === "doctor" ? "medicalRecords" : "admissions"}">View all →</button></div><div class="activity-list">${activities.slice(0, 4).map(activityMarkup).join("")}</div></article>`}</section>`;
}
function activityMarkup(item) {
  const time = new Date(item.time);
  const minutes = Math.max(0, Math.round((Date.now() - time.getTime()) / 60000));
  const ago = minutes < 60 ? `${minutes}m ago` : minutes < 1440 ? `${Math.floor(minutes / 60)}h ago` : `${Math.floor(minutes / 1440)}d ago`;
  return `<div class="activity-item"><span class="activity-mark">↗</span><div><strong>${escapeHtml(item.message)}</strong><p>Hospital operations update</p></div><span class="activity-time">${ago}</span></div>`;
}

function renderEntityPage(key) {
  const def = definitions[key];
  const rows = listForRole(key);
  const canWrite = roleCanWrite(key);
  return `<section class="page-heading"><div><h1>${def.label}</h1><p>${sectionDescription(key)}</p></div>${canWrite ? `<div class="heading-actions"><button class="button button-primary" id="add-record-button">＋ Add ${def.singular}</button></div>` : ""}</section>
    <div class="toolbar"><div class="search-box"><span>⌕</span><input id="table-search" type="search" placeholder="Search ${def.label.toLowerCase()}..." /></div>
      <select id="table-filter" class="filter-select" aria-label="Filter by status"><option value="">All records</option>${filterOptions(key).map((value) => `<option>${escapeHtml(value)}</option>`).join("")}</select></div>
    <section class="panel data-panel" id="entity-table">${rows.length ? tableMarkup(key, rows, def.columns, canWrite) : `<div class="empty-state"><strong>No ${def.label.toLowerCase()} found</strong>${activeRole === "patient" ? "Only your associated records are shown here." : "Create a record to get started."}</div>`}<div class="table-footer" id="table-count">${rows.length} ${rows.length === 1 ? "record" : "records"}</div></section>`;
}
function sectionDescription(key) {
  const descriptions = {
    patients: "Manage patient profiles, contact information and care status.", doctors: "Maintain physician profiles, specialties and department assignments.", departments: "Manage hospital departments and clinical leadership.", staff: "Manage staff profiles, responsibilities and shift assignments.",
    medicalRecords: "Review patient histories, diagnoses, treatment details and prescriptions.", rooms: "Track room types, rates and current availability.", admissions: "Coordinate patient admission, room allocation and discharge.", bills: "Review patient charges, payments and outstanding balances.", payments: "Track payment transactions and methods.", diagnoses: "Review and record patient diagnoses and clinical notes.",
    suppliers: "Maintain supplier contacts and medicine supply relationships.", ambulances: "Monitor ambulance fleet assignments and availability.", insurance: "Review patient insurance providers and policy coverage.", surgeries: "Coordinate procedures, operating rooms and surgical schedules.", feedback: "Review patient service ratings and comments.", emergencyContacts: "Manage emergency contact information associated with patients.", medicines: "Track medication stock, suppliers and reorder levels."
  };
  return descriptions[key] || "";
}
function roleCanWrite(key) {
  if (activeRole === "admin") return true;
  if (activeRole === "patient") return key === "feedback";
  if (activeRole === "doctor") return ["medicalRecords", "diagnoses", "surgeries"].includes(key);
  return ["patients", "admissions", "bills", "payments"].includes(key);
}
function filterOptions(key) {
  const statusField = definitions[key].fields.find((item) => item[0] === "status");
  if (statusField) return statusField[4] || [];
  if (key === "payments") return ["Completed", "Pending", "Refunded"];
  if (key === "medicalRecords") return [];
  return [];
}
function tableMarkup(key, rows, columns, actions) {
  const def = definitions[key];
  return `<div class="table-wrap"><table><thead><tr>${columns.map((col) => `<th>${escapeHtml(columnTitle(key, col))}</th>`).join("")}${actions ? "<th>Actions</th>" : ""}</tr></thead><tbody>${rows.map((row) => `<tr data-record-id="${escapeHtml(row.id)}">${columns.map((col) => `<td>${cellMarkup(key, col, row)}</td>`).join("")}${actions ? `<td><div class="row-actions"><button class="row-action edit-row" data-id="${escapeHtml(row.id)}" aria-label="Edit ${escapeHtml(def.singular)}">Edit</button><button class="row-action delete delete-row" data-id="${escapeHtml(row.id)}" aria-label="Delete ${escapeHtml(def.singular)}">Delete</button></div></td>` : ""}</tr>`).join("")}</tbody></table></div>`;
}
function columnTitle(key, field) {
  if (field === "age") return "Age";
  if (field === "balance") return "Balance";
  if (field === "name" && key !== "patients" && key !== "doctors" && key !== "staff" && key !== "suppliers" && key !== "medicines") return "Name";
  const def = definitions[key];
  const item = def.fields.find((fieldDef) => fieldDef[0] === field);
  if (item) return item[1].replace(/\s*\(\$.*\)|\s*\(.*\)$/, "");
  const refMatch = def.fields.find((fieldDef) => fieldDef[0] === field);
  return refMatch ? refMatch[1] : field.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
function cellMarkup(key, field, row) {
  if (field === "name" || (field === "patientId" && key === "patients")) {
    const name = field === "patientId" ? labelFor("patients", row[field]) : row[field];
    return `<div class="person-cell"><span class="mini-avatar">${initials(name)}</span><span><strong>${escapeHtml(name)}</strong>${row.email ? `<small>${escapeHtml(row.email)}</small>` : ""}</span></div>`;
  }
  if (field === "status" || field === "availability") {
    const value = row[field] || "—";
    return `<span class="badge badge-${value.toLowerCase().replace(/[^a-z]+/g, "-")}">${escapeHtml(value)}</span>`;
  }
  if (field === "comments" || field === "treatment" || field === "reason") {
    const value = displayValue(key, field, row);
    return `<span title="${escapeHtml(value)}">${escapeHtml(value.length > 39 ? `${value.slice(0, 36)}…` : value)}</span>`;
  }
  return escapeHtml(displayValue(key, field, row));
}
function attachEntityHandlers(key) {
  document.getElementById("table-search")?.addEventListener("input", updateTable);
  document.getElementById("table-filter")?.addEventListener("change", updateTable);
  document.getElementById("entity-table")?.addEventListener("click", (event) => {
    const edit = event.target.closest(".edit-row");
    const del = event.target.closest(".delete-row");
    if (edit) openForm(key, edit.dataset.id);
    if (del) deleteRecord(key, del.dataset.id);
  });
  function updateTable() {
    const query = document.getElementById("table-search").value.toLowerCase().trim();
    const filter = document.getElementById("table-filter").value;
    const rows = listForRole(key).filter((row) => {
      const haystack = Object.entries(row).map(([field, value]) => `${displayValue(key, field, row)} ${value}`).join(" ").toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      const matchesFilter = !filter || row.status === filter || row.availability === filter;
      return matchesQuery && matchesFilter;
    });
    const table = document.getElementById("entity-table");
    const canWrite = roleCanWrite(key);
    const oldWrap = table.querySelector(".table-wrap");
    const newMarkup = rows.length ? tableMarkup(key, rows, definitions[key].columns, canWrite) : `<div class="empty-state"><strong>No matching records</strong>Try changing your search or filter.</div>`;
    if (oldWrap) oldWrap.outerHTML = newMarkup;
    else table.insertAdjacentHTML("afterbegin", newMarkup);
    if (!rows.length) table.querySelector(".empty-state")?.remove();
    const empty = table.querySelector(".empty-state");
    if (!rows.length && !empty) table.insertAdjacentHTML("afterbegin", newMarkup);
    document.getElementById("table-count").textContent = `${rows.length} ${rows.length === 1 ? "record" : "records"}`;
  }
}

function fieldInput(key, item, value, prefix) {
  const [name, label, type, required, choices] = item;
  const id = `${prefix}-${name}`;
  const requiredAttr = required ? "required" : "";
  const full = type === "textarea" ? " full" : "";
  let input;
  if (type.startsWith("ref:")) {
    const target = type.slice(4);
    const options = activeRole === "doctor" && target === "patients" ? listForRole(target) : getRows(target);
    input = `<select id="${id}" name="${name}" ${requiredAttr}><option value="">Select ${escapeHtml(definitions[target]?.singular.toLowerCase() || "record")}</option>${options.map((option) => `<option value="${escapeHtml(option.id)}" ${String(value) === option.id ? "selected" : ""}>${escapeHtml(labelFor(target, option.id))}</option>`).join("")}</select>`;
  } else if (type === "select") {
    input = `<select id="${id}" name="${name}" ${requiredAttr}><option value="">Select ${escapeHtml(label.toLowerCase())}</option>${choices.map((option) => `<option value="${escapeHtml(option)}" ${String(value) === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>`;
  } else if (type === "textarea") {
    input = `<textarea id="${id}" name="${name}" placeholder="${escapeHtml(label)}" ${requiredAttr}>${escapeHtml(value || "")}</textarea>`;
  } else {
    const fieldValue = value ?? (type === "date" && name === "date" ? today() : "");
    input = `<input id="${id}" name="${name}" type="${type}" value="${escapeHtml(fieldValue)}" ${type === "number" ? 'min="0" step="any"' : ""} ${requiredAttr} />`;
  }
  return `<div class="form-field${full}"><label for="${id}">${escapeHtml(label)}${required ? " *" : ""}</label>${input}</div>`;
}
function openForm(key, id = null) {
  if (!roleCanWrite(key)) return;
  const def = definitions[key];
  const current = id ? getRecord(key, id) : {};
  const fields = def.fields.filter((item) => {
    if (activeRole === "doctor" && ["doctorId", "admittingDoctorId"].includes(item[0])) return false;
    if (activeRole === "patient" && item[0] === "patientId") return false;
    return true;
  });
  let defaults = { ...current };
  if (!id && activeRole === "patient" && ["feedback"].includes(key)) defaults.patientId = "p1";
  if (!id && activeRole === "doctor") {
    defaults.doctorId = "d1";
    if (key === "medicalRecords" || key === "diagnoses" || key === "surgeries") defaults.doctorId = "d1";
  }
  const title = `${id ? "Edit" : "Add"} ${def.singular}`;
  const root = document.getElementById("modal-root");
  root.innerHTML = `<div class="modal-backdrop" id="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><div><h2 id="modal-title">${title}</h2><p>Enter the details below. Fields marked * are required.</p></div><button class="modal-close" type="button" aria-label="Close dialog">×</button></header><form id="record-form" class="modal-form"><div class="form-grid">${fields.map((item) => fieldInput(key, item, defaults[item[0]], "record")).join("")}</div><div class="modal-actions"><button type="button" class="button button-secondary cancel-modal">Cancel</button><button type="submit" class="button button-primary">${id ? "Save changes" : "Create record"}</button></div></form></section></div>`;
  root.querySelector(".modal-close").addEventListener("click", closeModal);
  root.querySelector(".cancel-modal").addEventListener("click", closeModal);
  root.querySelector("#modal-backdrop").addEventListener("click", (event) => { if (event.target.id === "modal-backdrop") closeModal(); });
  root.querySelector("#record-form").addEventListener("submit", (event) => saveRecord(event, key, id, fields));
  root.querySelector("input,select,textarea")?.focus();
}
function closeModal() { document.getElementById("modal-root").innerHTML = ""; }
function saveRecord(event, key, id, fields) {
  event.preventDefault();
  const previous = id ? { ...getRecord(key, id) } : null;
  const formData = new FormData(event.currentTarget);
  const values = {};
  fields.forEach((field) => {
    let value = formData.get(field[0]);
    if (activeRole === "doctor" && ["doctorId", "admittingDoctorId"].includes(field[0])) value = field[0] === "doctorId" ? "d1" : getRecord(key, id)?.[field[0]];
    if (activeRole === "patient" && field[0] === "patientId") value = "p1";
    values[field[0]] = value ?? "";
  });
  if (activeRole === "patient" && key === "feedback") values.patientId = "p1";
  if (activeRole === "doctor" && ["medicalRecords", "diagnoses", "surgeries"].includes(key)) values.doctorId = "d1";
  const record = { ...(id ? getRecord(key, id) : {}), ...values };
  if (activeRole === "staff" && key === "patients" && !id && !record.id) record.status = record.status || "Active";
  if (key === "bills") {
    const total = Number(record.totalAmount || 0);
    const paid = Number(record.amountPaid || 0);
    if (paid > total) { showToast("Amount paid cannot exceed the total bill.", true); return; }
    if (paid >= total) record.status = "Paid";
    else if (paid > 0) record.status = "Partially paid";
    else if (record.status === "Paid") record.status = "Pending";
  }
  if (key === "admissions" && record.status === "Discharged" && !record.dischargeDate) record.dischargeDate = today();
  if (key === "admissions" && record.status === "Admitted" && record.dischargeDate) record.dischargeDate = "";
  if (key === "payments") {
    const bill = getRecord("bills", record.billId);
    if (!bill) { showToast("Select a valid bill for this payment.", true); return; }
    const previousAmount = previous?.status === "Completed" && previous.billId === record.billId ? Number(previous.amount) : 0;
    if (record.status === "Completed" && Number(record.amount) > Number(bill.totalAmount) - Number(bill.amountPaid || 0) + previousAmount) { showToast("Payment exceeds the bill balance.", true); return; }
  }
  if (key === "rooms" && record.status === "Available" && getRows("admissions").some((admission) => admission.roomId === record.id && admission.status === "Admitted")) {
    showToast("This room is assigned to an active admission.", true); return;
  }
  if (id) {
    Object.assign(getRecord(key, id), record);
  } else {
    record.id = `${key.slice(0, 2)}${Date.now().toString(36)}`;
    getRows(key).unshift(record);
  }
  if (key === "admissions") {
    [previous?.roomId, record.roomId].filter(Boolean).forEach((roomId) => {
      const room = getRecord("rooms", roomId);
      if (room) room.status = getRows("admissions").some((admission) => admission.roomId === roomId && admission.status === "Admitted") ? "Occupied" : "Available";
    });
  }
  if (key === "payments") [previous?.billId, record.billId].filter(Boolean).forEach(recalculateBill);
  if (key === "patients" && record.email.toLowerCase() === accounts.patient.email && activeRole === "admin") {
    showToast("Patient profile saved. Demo login profile is unchanged.");
  }
  const verb = id ? "updated" : "added";
  logActivity(`${defForActivity(key)} ${verb} by ${accounts[activeRole].title.toLowerCase()}`);
  saveState();
  closeModal();
  renderPage();
  showToast(`${definitions[key].singular} ${id ? "updated" : "created"} successfully.`);
}
function defForActivity(key) { return definitions[key]?.singular || "Record"; }
function recalculateBill(billId) {
  const bill = getRecord("bills", billId);
  if (!bill) return;
  const paid = getRows("payments").filter((payment) => payment.billId === billId && payment.status === "Completed").reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  bill.amountPaid = String(paid);
  bill.status = paid >= Number(bill.totalAmount) ? "Paid" : paid > 0 ? "Partially paid" : "Pending";
}
function deleteRecord(key, id) {
  const record = getRecord(key, id);
  if (!record) return;
  const linked = {
    patients: ["medicalRecords", "diagnoses", "admissions", "bills", "insurance", "feedback", "emergencyContacts", "surgeries"],
    doctors: ["medicalRecords", "diagnoses", "admissions", "surgeries"],
    departments: ["doctors", "staff"],
    rooms: ["admissions", "surgeries"],
    bills: ["payments"],
    suppliers: ["medicines"],
    diagnoses: ["medicalRecords"]
  };
  const references = (linked[key] || []).some((table) => getRows(table).some((item) => Object.values(item).includes(id)));
  if (references) { showToast("This record is linked to other records and cannot be deleted.", true); return; }
  if (!window.confirm(`Delete this ${definitions[key].singular.toLowerCase()}? This action cannot be undone.`)) return;
  state.data[key] = getRows(key).filter((item) => item.id !== id);
  if (key === "payments") recalculateBill(record.billId);
  if (key === "admissions") {
    const room = getRecord("rooms", record.roomId);
    if (room && !getRows("admissions").some((item) => item.roomId === room.id && item.status === "Admitted")) room.status = "Available";
  }
  logActivity(`${definitions[key].singular} deleted by ${accounts[activeRole].title.toLowerCase()}`);
  saveState();
  renderPage();
  showToast(`${definitions[key].singular} deleted.`);
}

document.getElementById("login-form").addEventListener("submit", login);
document.getElementById("logout-button").addEventListener("click", logout);
document.getElementById("mobile-menu").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
document.querySelector(".notification-button").addEventListener("click", () => showToast("You’re all caught up."));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
const storedRole = sessionStorage.getItem("medicore-role");
if (storedRole && accounts[storedRole]) {
  activeRole = storedRole;
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  initializeApp();
}
