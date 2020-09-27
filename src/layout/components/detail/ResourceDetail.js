import React, { useState, useEffect } from "react";
import { getResourceById } from "../../../api/resources";
import { useParams } from "react-router-dom";

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
          <div className="resource-title">{resource.title}</div>
          <div className="resource-description">{resource.description}</div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
