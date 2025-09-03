import { MdWorkHistory } from 'react-icons/md';
import { CardContent } from '../components/ui/CardContent';
import { Timeline } from '../components/ui/Timeline';
import useGoogleSheet from '@main/hooks/useGoogleSheet';
import { useCallback } from 'react';

type WorkExperienceType = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  status: string;
};

const WorkExperience = () => {
  // Map data mentah ke tipe yang diinginkan
  const mapData = useCallback(
    (rawData: string[][]): WorkExperienceType[] =>
      rawData.map((row) => ({
        company: row[0],
        position: row[1],
        startDate: row[2],
        endDate: row[3],
        status: row[4],
      })),
    []
  );

  const { data, loading, error } = useGoogleSheet<WorkExperienceType>(
    'WORK!A2:E',
    mapData
  );

  return (
    <CardContent>
      <h3 className="text-lg font-semibold mb-6 flex items-center justify-start gap-2">
        <MdWorkHistory size={24} color="#ffb900" />
        Work Experience
      </h3>
      {loading === true && (
        <span className="text-white">Sedang diproses...</span>
      )}
      <Timeline>
        {loading === false &&
          data !== null &&
          data
            .filter((item) => item.status === 'active')
            .map((experience, index) => (
              <Timeline.Item key={index}>
                <h4 className="font-bold">{experience.position}</h4>
                <p>
                  <span className="text-white font-bold text-sm">
                    {experience.startDate} - {experience.endDate}
                  </span>{' '}
                  at {experience.company}
                </p>
              </Timeline.Item>
            ))}
      </Timeline>
      {loading === false && error !== null && (
        <span className="text-amber-400">{error}</span>
      )}
    </CardContent>
  );
};

export default WorkExperience;
