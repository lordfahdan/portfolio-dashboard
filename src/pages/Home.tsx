import Achievement from '@main/components/AchievementCard';
import Profile from '@main/components/ProfileCard';
import { Card } from '@main/components/ui/Card';
import { CardBox } from '@main/components/ui/CardBox';
import { CardContent } from '@main/components/ui/CardContent';
import WorkExperience from '@main/pages/WorkExperience';
import { AiFillProject, AiFillExperiment } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';

const Home = () => {
  const skills = [
    {
      category: 'Frontend Development',
      stack: [
        'React',
        'TypeScript',
        'Next.js',
        'Tailwind CSS',
        'Redux',
        'GraphQL',
      ],
    },
    {
      category: 'Backend Development',
      stack: ['Node.js', 'Express', 'REST API', 'GraphQL', 'PostgreSQL'],
    },
    {
      category: 'Data Analysis & AI',
      stack: ['Python', 'Pandas', 'FinBERT', 'Python NLP'],
    },
    {
      category: 'Web Scraping & Data Extraction',
      stack: ['BeautifulSoup4', 'Cloudscraper', 'Requests/HTTPX'],
    },
    {
      category: 'Data Processing & Text Matching',
      stack: ['RapidFuzz', 'Regex', 'Pandas'],
    },
    {
      category: 'Tools, Automation, and Workflow Optimization',
      stack: [
        'Git',
        'GitHub Actions',
        'Docker',
        'Agile/Scrum',
        'tqdm',
        'Multiprocessing / AsyncIO',
        'Cron Job',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Profile Widget */}
        <Card className="col-span-12 lg:col-span-6 xl:col-span-5 !bg-gradient-to-r from-blue-500/70 to-purple-500/70 to-75% border-4 border-amber-400">
          <Profile />
        </Card>

        {/* Work Experience Widget */}
        <Card className="col-span-12 lg:col-span-6 xl:col-span-7 min-h-full">
          <WorkExperience />
        </Card>
      </div>
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Projects Widget */}
        <Card className="col-span-12 lg:col-span-6">
          <CardContent>
            <h3 className="text-lg font-semibold mb-6 flex items-center justify-start gap-2">
              <AiFillProject size={24} color="#ffb900" />
              Projects
            </h3>
            <span className="text-xs text-gray-400">
              <i>Coming soon...</i>
            </span>
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <CardBox>
                  <CardContent>
                    <h4>Todo App</h4>
                    <p>React + TypeScript</p>
                  </CardContent>
                </CardBox>
              </div>
              <div className="col-span-1">
                <CardBox>
                  <CardContent>
                    <h4>Weather Dashboard</h4>
                    <p>Vue + API Integration</p>
                  </CardContent>
                </CardBox>
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* Skills Widget */}
        <Card className="col-span-12 lg:col-span-6">
          <CardContent>
            <h3 className="text-lg font-semibold mb-6 flex items-center justify-start gap-2">
              <ImStatsBars size={24} color="#ffb900" />
              Skills
            </h3>
            <div className="grid md:grid-rows-2 gap-6">
              {skills.map((item, idx) => (
                <CardBox
                  key={idx}
                  className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{item.category}</h2>
                  </div>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {item.stack.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-sm font-medium rounded-full border hover:bg-gray-200 transition-colors`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </CardBox>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Achievements Widget */}
        <Card className="col-span-12 bg-gray-700">
          <Achievement />
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Practices Widget */}
        <Card className="col-span-12">
          <CardContent>
            <h3 className="text-lg font-semibold mb-6 flex items-center justify-start gap-2">
              <AiFillExperiment size={24} color="#ffb900" />
              Practices
            </h3>
            <span className="text-xs text-gray-400">
              <i>Coming soon...</i>
            </span>
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1">
                <CardBox>
                  <CardContent>
                    <h4>Portfolio Website</h4>
                    <p>HTML + CSS + JavaScript</p>
                  </CardContent>
                </CardBox>
              </div>
              <div className="col-span-1">
                <CardBox>
                  <CardContent>
                    <h4>Simple Calculator</h4>
                    <p>JavaScript</p>
                  </CardContent>
                </CardBox>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
