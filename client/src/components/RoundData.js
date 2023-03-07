import React, { Fragment } from "react";

const RoundData = (props) => {
  const {
    interviewersData,
    roundMetaData,
    details,
    handleChange,
    handleFileChange,
  } = props;

  return (
    <div>
      {roundMetaData.map((formObj, i) => {
        return (
          <Fragment key={i}>
            {formObj.mmType !== "radio" && (
              <div style={{ display: "flex" }}>
                <div style={{ width: "160px" }}> {formObj.title} </div>
                {formObj.collection ? (
                  <select
                    style={{
                      width: "80%",
                      padding: "1.5px 35px",
                      marginBottom: "1.5rem",
                      borderRadius: "5px",
                      marginLeft: "1rem",
                      border: "0.5px solid grey",
                      display: formObj.visible === "N" && "none",
                    }}
                    name={formObj.name}
                    onChange={handleChange}
                    required={formObj.required === "N" ? false : true}
                  >
                    <option>Select Interviewer</option>
                    {interviewersData.map((ele, i) => {
                      return (
                        <option key={i} value={ele.inter_email}>
                          {ele.inter_name}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    readOnly={
                      formObj.name === "scheduled_by" ||
                      formObj.name === "inter_round"
                    }
                    style={
                      formObj.mmType !== "File"
                        ? {
                            width: "80%",
                            padding: "4px 35px",
                            marginBottom: "1.5rem",
                            borderRadius: "5px",
                            marginLeft: "1rem",
                            border: "0.5px solid grey",
                            display: formObj.visible === "N" && "none",
                          }
                        : {
                            width: "65%",
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
                      formObj.mmType === "File"
                        ? handleFileChange
                        : handleChange
                    }
                    placeholder={formObj.title}
                    required={formObj.required === "N" ? false : true}
                  />
                )}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default RoundData;
