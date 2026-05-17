import React from "react";

const Certifications = ({ certifications, setCertifications }) => {
  const addField = () => {
    setCertifications([
      ...certifications,
      { name: "", issuer: "", year: "", link: "" },
    ]);
  };
  const handleDelete = (index) => {
    const newCert = [...certifications];
    newCert.splice(index, 1);
    setCertifications(newCert);
  };
  const handleChange = (index, field, value) => {
    const newField = [...certifications];
    newField[index][field] = value;
    setCertifications(newField);
    // const newCert = [...certifications];
    // newCert[index][field] = value;
    // setCertifications(newCert);
  };
  return (
    <div className="flex flex-col gap-6 mt-4">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-4 border border-gray-600 rounded-lg"
        >
          {index !== 0 && (
            <button
              className="text-xl text-red-500 px-4 py-2 border-2 border-white rounded-lg hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer "
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          )}
          <input
            type="text"
            placeholder="Certification Name"
            className="input w-full bg-transparent text-white outline-none"
            value={cert.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Issuing Organization"
            className="input w-full bg-transparent text-white outline-none"
            value={cert.issuer}
            onChange={(e) => handleChange(index, "issuer", e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Issue Year"
              className="input w-full bg-transparent text-white outline-none"
              value={cert.year}
              onChange={(e) => handleChange(index, "year", e.target.value)}
            />
            <input
              type="text"
              placeholder="link for certificate"
              className="input w-full bg-transparent text-white outline-none"
              value={cert.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
            />
          </div>
        </div>
      ))}

      <button className="btn btn-outline btn-success w-full" onClick={addField}>
        Add More
      </button>
    </div>
  );
};

export default Certifications;
