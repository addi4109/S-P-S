import { usePageTitle } from '../hooks/usePageTitle'
import HeroSlider from '../components/home/HeroSlider'
import NoticeTicker from '../components/home/NoticeTicker'
import AboutSection from '../components/home/AboutSection'
import DepartmentsSection from '../components/home/DepartmentsSection'
import RecruitersMarquee from '../components/home/RecruitersMarquee'
import LocationSection from '../components/home/LocationSection'
import Reveal from '../components/ui/Reveal'

export default function Home() {
  usePageTitle('Home')

  return (
    <>
      <HeroSlider />

      {/* Notice ticker + about intro */}
      <div className="w-full bg-gray-200">
        <NoticeTicker />
        <AboutSection />
      </div>

      {/* Departments */}
      <DepartmentsSection />

      {/* Recruiters */}
      <Reveal>
        <RecruitersMarquee />
      </Reveal>

      {/* Location */}
      <Reveal>
        <LocationSection />
      </Reveal>
    </>
  )
}
