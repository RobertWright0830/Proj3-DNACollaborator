import React, {useState} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import Upload from "../components/Upload";
import CurrentTable from "../components/Table/CurrentTable";
import AncestorCards from "../components/AncestorCards";

const Dashboard = () => {
  const { profileId } = useParams();
  console.log("profileId:", profileId); // Log the profileId

  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId },
    }
  );

  const [selectedSegments, setSelectedSegments] = useState([]);

  // Additional logging
  console.log("loading:", loading); // Log the loading state
  console.log("data:", data); // Log the data

  const profile = data?.me || data?.profile || {};
  console.log("profile:", profile); // Log the profile

  if (!Auth.loggedIn() || Auth.getProfile().data._id !== profileId) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    console.log("No profile name found"); // Useful for debugging
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  // If the checks pass, render the component's main content
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div
        className="cards-container"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <AncestorCards selectedSegments={selectedSegments} cardId="1" />
        <AncestorCards selectedSegments={selectedSegments} cardId="2" />
      </div>
      <Upload />
      <h3>Chromosome Segment Table</h3>
      <p>Sort in ascending or descending order by selecting the header.</p>
      <CurrentTable onSelectionChange={setSelectedSegments} />
    </div>
  );
};

export default Dashboard;