export const fetchUserSpecs = async (
  isAuthenticated,
  getUserSpecifications,
  setUserSpecs,
  newUserSpecs,
  setNewUserSpecs
) => {
  if (isAuthenticated && newUserSpecs) {
    const userSpecs = await getUserSpecifications();
    if (userSpecs) {
      setUserSpecs(userSpecs);
      setNewUserSpecs(false);
    }
  }
};
