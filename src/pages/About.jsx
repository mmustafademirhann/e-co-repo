import Firms from "../components/Firms";
import Strc from "../components/Strc";
import Description from "../components/Description";
import HeroOfAbout from "../components/HeroOfAbout";
import VideoOfAbout from "../components/VideoOfAbout";
import TeamSectionOfAbout from "../components/TeamSectionOfAbout";
import CTASectionOfAbout from "../components/CTASectionOfAbout";
const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
     <HeroOfAbout />

      {/* Description Section */}
      <Description />

      {/* Stats Section */}
      <Strc />

      {/* Video Section */}
     <VideoOfAbout />

      {/* Team Section */}
      <TeamSectionOfAbout />
      {/* Companies Section */}
      <Firms />

      {/* CTA Section - Using styles from Lgy component */}
      <CTASectionOfAbout />
    </div>
  )
}

export default About
  