import Achievement from '@main/components/Achievement';
import Profile from '@main/components/Profile';
import { Card } from '@main/components/ui/Card';
import { CardBox } from '@main/components/ui/CardBox';
import { CardContent } from '@main/components/ui/CardContent';
import { Progress } from '@main/components/ui/Progress';
import WorkExperience from '@main/components/WorkExperience';
import { AiFillProject, AiFillExperiment } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';

const Home = () => {
  const skills = [
    { name: 'HTML5 & CSS3', level: 90 },
    { name: 'Javascript', level: 78 },
    { name: 'TypeScript', level: 70 },
    { name: 'ReactJS', level: 80 },
    { name: 'Vue.js', level: 86 },
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
        <Card className="col-span-12 lg:col-span-8">
          <CardContent>
            <h3 className="text-lg font-semibold mb-6 flex items-center justify-start gap-2">
              <AiFillProject size={24} color="#ffb900" />
              Projects
            </h3>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Skills Widget */}
        <Card className="col-span-12 lg:col-span-4">
          <CardContent>
            <h3 className="text-lg font-semibold mb-6 flex items-center justify-start gap-2">
              <ImStatsBars size={24} color="#ffb900" />
              Skills
            </h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between">
                    <p className="text-sm">{skill.name}</p>
                    <p className="text-sm text-amber-300">{skill.level}%</p>
                  </div>
                  <Progress value={skill.level} />
                </div>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
