import * as XLSX from "xlsx";

export const exportContacts = (faculty) => {
  if (!faculty || faculty.length === 0) {
    alert("No faculty records to export.");
    return;
  }

  const data = faculty.map((item) => ({
    "Full Name": `${item.title || ""} ${item.fullName || ""}`.trim(),
    "Academic Rank": item.academicRank || "",
    "Current Position": item.currentPosition || "",
    "Telephone": item.phone || "",
    "Email": item.email || "",
    "Country": item.country || "",
    "Status": item.currentStatus || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Faculty Contacts"
  );

  XLSX.writeFile(
    workbook,
    "Faculty_Contacts.xlsx"
  );
};