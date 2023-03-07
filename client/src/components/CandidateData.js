import React from "react";

const CandidateData = (props) => {
  const { canMetaData, details, handleFileChange, handleChange } = props;

  const employees = ["HariPrasad", "Gopi", "Yashodha", "Raj"];
  const vendors = ["DCT", "Qspider", "Jspider", "ABC", "Sumuka"];

  return (
    <div>
      {canMetaData.map((formObj, i) => {
        return (
          <div key={i} style={{ display: "flex" }}>
            <div style={{ width: "160px" }}> {formObj.title} </div>
            {formObj.collection && formObj.name === "can_emp_refree" && (
              <select
                style={{
                  width: "95%",
                  padding: "4px 35px",
                  marginBottom: "1.5rem",
                  borderRadius: "5px",
                  marginLeft: "1rem",
                  border: "0.5px solid grey",
                  display: formObj.visible === "N" && "none",
                }}
                type={formObj.mmType}
                value={details[formObj.name]}
                name={formObj.name}
                onChange={handleChange}
                required={formObj.required === "N" ? false : true}
              >
                <option> Select Here </option>
                {employees.map((ele, i) => {
                  return <option key={i}> {ele} </option>;
                })}
              </select>
            )}
            {formObj.collection && formObj.name === "can_supp_vendor" && (
              <select
                style={{
                  width: "95%",
                  padding: "4px 35px",
                  marginBottom: "1.5rem",
                  borderRadius: "5px",
                  marginLeft: "1rem",
                  border: "0.5px solid grey",
                  display: formObj.visible === "N" && "none",
                }}
                type={formObj.mmType}
                value={details[formObj.name]}
                name={formObj.name}
                onChange={handleChange}
                required={formObj.required === "N" ? false : true}
              >
                <option> Select Here </option>
                {vendors.map((ele, i) => {
                  return <option key={i}> {ele} </option>;
                })}
              </select>
            )}
            {!formObj.collection && (
              <input
                readOnly={formObj.name === "can_id" ? true : false}
                style={
                  formObj.name === "can_id"
                    ? {
                        width: "80%",
                        padding: "4px 35px",
                        marginBottom: "1.5rem",
                        borderRadius: "5px",
                        color: "white",
                        marginLeft: "1rem",
                        backgroundColor: "grey",
                        cursor: "no-drop",
                        border: "0.5px solid grey",
                        display: formObj.visible === "N" && "none",
                      }
                    : {
                        width: "80%",
                        padding: "4px 35px",
                        marginBottom: "1.5rem",
                        borderRadius: "5px",
                        marginLeft: "1rem",
                        border: "0.5px solid grey",
                        display: formObj.visible === "N" && "none",
                      }
                }
                type={formObj.mmType}
                value={details[formObj.name]}
                name={formObj.name}
                onChange={
                  formObj.mmType === "File" ? handleFileChange : handleChange
                }
                placeholder={formObj.title}
                required={formObj.required === "N" ? false : true}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CandidateData;
