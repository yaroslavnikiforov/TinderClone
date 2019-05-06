import { reject, filter } from "lodash";

export default (profiles, user) => {
  const rejectMe = reject(profiles, profile => profile.uid === user.uid);

  const filterGender = filter(rejectMe, profile => {
    const userShowMen = user.showMen && profile.gender === "male";
    const userShowWomen = user.showWomen && profile.gender === "female";

    const profileShowMen = profile.showMen && user.gender === "male";
    const profileShowWomen = profile.showWomen && user.gender === "female";

    return (
      (userShowMen || userShowWomen) && (profileShowMen || profileShowWomen)
    );
  });

  return filterGender;
};
