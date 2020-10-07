import React, { useState, useEffect } from "react";
import { getCareerById } from "./careersAPI";
import { useParams } from "react-router-dom";
import "./careers.css";
import "./CareerDetail.css";
const ReactMarkdown = require("react-markdown");

export default function CareerDetail() {
  let { careerid } = useParams();
  const [career, setcareer] = useState({});

  useEffect(() => {
    async function getCareer() {
      let career = await getCareerById(careerid);
      setcareer(career);
    }
    getCareer();
  }, [careerid]);

  return (
    <div>
      {career ? (
        <div className="career-meta">
          <div className="career-title">{career.title}</div>
          <ReactMarkdown
            source={career.description}
            className="career-description-detail"
          />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
