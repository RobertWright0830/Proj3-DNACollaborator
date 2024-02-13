import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ANCESTOR_BY_WIKITREE_ID } from "../../utils/mutations";
import Spinner from "../Spinner/index";

const WikiTreeAncestor = () => {
  const [wikitreeId, setWikitreeId] = useState("");
  const [addAncestor, { data, loading, error }] = useMutation(
    ADD_ANCESTOR_BY_WIKITREE_ID
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAncestor({ variables: { wikitreeId } });
    } catch (err) {
      console.error("Error adding ancestor:", err);
    }
  };

  return (
    <div className="cards">
      <div className="container custom-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="wikitreeId">WikiTree ID:</label>
          <input
            id="wikitreeId"
            type="text"
            value={wikitreeId}
            onChange={(e) => setWikitreeId(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
        {loading && <Spinner />}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            {data.addAncestorByWikitreeId.wikitreePicUrl && (
              <img
                src={`https://www.wikitree.com${data.addAncestorByWikitreeId.wikitreePicUrl}`}
                alt="Ancestor"
                height="160rem"
                width="auto"
              />
            )}

            <h3>
              {data.addAncestorByWikitreeId.firstName}{" "}
              {data.addAncestorByWikitreeId.lastNameAtBirth}
            </h3>
            <div>Birth Date: {data.addAncestorByWikitreeId.birthDate}</div>
            <div>
              Birth Location: {data.addAncestorByWikitreeId.birthLocation}
            </div>
            <div>Death Date: {data.addAncestorByWikitreeId.deathDate}</div>
            <div>
              Death Location: {data.addAncestorByWikitreeId.deathLocation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiTreeAncestor;
