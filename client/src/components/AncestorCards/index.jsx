// Component for displaying and managing ancestor data from WikiTree via selected segments
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_ANCESTOR_BY_WIKITREE_ID,
  ADD_WIKITREEID_TO_SEGMENT,
  REMOVE_WIKITREEID_FROM_SEGMENT,
} from "../../utils/mutations";
import Spinner from "../Spinner/index";

// State for managing WikiTree ID input and mutations for adding/removing ancestors
const AncestorCards = ({ selectedSegments }) => {
  const [wikitreeId, setWikitreeId] = useState("");
  const [addAncestor, { data, loading, error }] = useMutation(
    ADD_ANCESTOR_BY_WIKITREE_ID
  );
  const [addWikiTreeIdToSegment] = useMutation(ADD_WIKITREEID_TO_SEGMENT);
  const [removeWikiTreeIdFromSegment] = useMutation(
    REMOVE_WIKITREEID_FROM_SEGMENT
  );

  // Handles the submission of the form to add an ancestor by WikiTree ID
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAncestor({ variables: { wikitreeId } });
    } catch (err) {
      console.error("Error adding ancestor:", err);
    }
  };

  // Adds the WikiTree ID to selected segments if not already included
  const handleAddToSegment = async () => {
    // console.log("Selected segments:", selectedSegments);
    selectedSegments.forEach(async (segment) => {
      // console.log("Current segment._id:", segment._id);
      // console.log("Selected segments:", selectedSegments);
      if (!segment.wikitreeIds.includes(wikitreeId)) {
        // Check if wikitreeId is not already in the segment
        try {
          await addWikiTreeIdToSegment({
            variables: {
              segmentId: segment._id,
              wikitreeId,
            },
          });
          // console.log("wikitreeId added to segment:", segment._id);
        } catch (err) {
          console.error(
            `Error adding wikitreeId to segment ${segment._id}:`,
            err
          );
        }
      }
    });
  };

  // Removes the WikiTree ID from selected segments where it's included
  const handleRemoveFromSegment = async () => {
    selectedSegments.forEach(async (segment) => {
      if (segment.wikitreeIds.includes(wikitreeId)) {
        // Check if wikitreeId is in the segment
        try {
          await removeWikiTreeIdFromSegment({
            variables: {
              segmentId: segment._id,
              wikitreeId,
            },
          });
          // console.log("wikitreeId removed from segment:", segment._id);
        } catch (err) {
          console.error(
            `Error removing wikitreeId from segment ${segment._id}:`,
            err
          );
        }
      }
    });
  };

  // Placeholder for future implementation of refresh functionality from wikitree/re-fetching data and updating
  const handleRefresh = async () => {};

  // Renders the ancestor cards with form for WikiTree ID input and action buttons
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
      <div className="card-actions">
        <button className="custom-btn-add" onClick={handleAddToSegment}>
          Add
        </button>
        <button className="custom-btn-remove" onClick={handleRemoveFromSegment}>
          Remove
        </button>
        <button className="custom-btn-refresh" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default AncestorCards;
