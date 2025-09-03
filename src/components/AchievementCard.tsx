import useGoogleSheet from '@main/hooks/useGoogleSheet';
import { useCallback } from 'react';
import { GrCertificate } from 'react-icons/gr';
import { CardContent } from './ui/CardContent';
import { GiAchievement } from 'react-icons/gi';
import { Button } from './ui/Button';
import { CardBox } from './ui/CardBox';

type AchievementType = {
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  certificate: string;
  id: string;
};

const Achievement = () => {
  const mapData = useCallback(
    (rawData: string[][]): AchievementType[] =>
      rawData.map((row) => ({
        title: row[0],
        desc: row[1],
        startDate: row[2],
        endDate: row[3],
        certificate: row[4],
        id: row[5],
      })),
    []
  );

  const { data, loading, error } = useGoogleSheet<AchievementType>(
    'ACHIEVEMENT!A2:F',
    mapData
  );

  return (
    <CardContent>
      <h3 className="text-lg font-semibold mb-6 flex items-center justify-start gap-2">
        <GiAchievement size={24} color="#ffb900" />
        Achievement
      </h3>
      {loading === true && (
        <span className="text-white">Sedang diproses...</span>
      )}
      {loading === false &&
        data !== null &&
        data.map((achievement, id) => (
          <CardBox
            key={id}
            className="hover:bg-gray-700 transition duration-300"
          >
            <CardContent className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-3xl text-yellow-500">
                    <GrCertificate />
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {achievement.title}
                  </h4>
                </div>
                <p className="text-gray-300">{achievement.desc}</p>
                <p className="text-sm text-gray-500">
                  Achieved on: {achievement.startDate}
                </p>
                <p className="text-sm text-gray-500">
                  Expired on: {achievement.endDate || '-'}
                </p>
              </div>
              <Button
                className="cursor-pointer whitespace-nowrap"
                onClick={() => {
                  window.open(achievement.certificate, '_blank');
                }}
              >
                View Certificate
              </Button>
            </CardContent>
          </CardBox>
        ))}
      {loading === false && error !== null && (
        <span className="text-amber-400">{error}</span>
      )}
    </CardContent>
  );
};

export default Achievement;
