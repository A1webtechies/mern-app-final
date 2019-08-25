import React from "react";

import AuthenticatedLinks from "./Navigation.AuthenticatedLinks";
import UnauthenticatedLinks from "./Navigation.UnauthenticatedLinks";
import AdminLink from "./Navigations.Admin";

export default ({ currentUserId, currentUsername, logoutUser }) => (
  <section className="bg-light border-bottom mb-4">
    <div className="container">
      {currentUsername === "admin@admin.com" ? (
        <AdminLink
          currentUserId={currentUserId}
          currentUsername={currentUsername}
          logoutUser={logoutUser}
        />
      ) : currentUserId ? (
        <AuthenticatedLinks
          currentUserId={currentUserId}
          currentUsername={currentUsername}
          logoutUser={logoutUser}
        />
      ) : (
        <UnauthenticatedLinks />
      )}
    </div>
  </section>
);
