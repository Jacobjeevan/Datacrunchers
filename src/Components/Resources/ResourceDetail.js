import React, { useState, useEffect } from "react";
import { getResourceById } from "./resourcesAPI";
import { useParams } from "react-router-dom";
import "./ResourceDetail.css";
const ReactMarkdown = require("react-markdown");

export default function ResourceDetail() {
  let { resourceid } = useParams();
  const [resource, setresource] = useState({});

  useEffect(() => {
    async function getResource() {
      let resource = await getResourceById(resourceid);
      setresource(resource);
    }
    getResource();
  }, [resourceid]);

  return (
    <div>
      {resource ? (
        <div className="resource-meta">
          <div className="resource-title-detail">{resource.title}</div>
          <ReactMarkdown
            source={resource.description}
            className="resource-description-detail"
          />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
