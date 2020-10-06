import React, { useState, useEffect } from "react";
import { getCareerById } from "./careersAPI";
import { useParams } from "react-router-dom";
import "./careers.css";
import "./careerDetail.css";

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
          <div className="career-description">{career.description}</div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
