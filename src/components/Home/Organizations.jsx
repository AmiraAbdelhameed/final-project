import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase/supabaseClient";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, error } = await supabase.from("organizations").select("*");

      if (error) {
        console.error("Error fetching organizations:", error.message);
      } else {
        setOrganizations(data);
      }

      setLoading(false);
    };

    fetchOrganizations();
  }, []);
  console.log(organizations);

  return (
    <div>
      <h1>Organizations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {organizations.map((org) => (
            <li key={org.id}>
              <strong>{org.name}</strong>
              <br />
              Email: {org.email}
              <br />
              ID Number: {org.identification_number}
              <br />
              Approved: {org.is_approved ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Organizations;
