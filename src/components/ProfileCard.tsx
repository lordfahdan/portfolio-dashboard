import useGoogleSheet from '@main/hooks/useGoogleSheet';
import { useCallback } from 'react';
import { CardContent } from './ui/CardContent';
import { Button } from './ui/Button';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';

type ProfileType = {
  name: string;
  position: string;
  email: string;
  linkedin: string;
  github: string;
  cv: string;
};

const Profile = () => {
  const mapData = useCallback(
    (rawData: string[][]): ProfileType[] =>
      rawData.map((row) => ({
        name: row[0],
        position: row[1],
        email: row[2],
        linkedin: row[3],
        github: row[4],
        cv: row[5],
      })),
    []
  );

  const { data, loading, error } = useGoogleSheet<ProfileType>(
    'PROFILE!A2:F',
    mapData
  );

  if (loading) return 'Sedang proses...';

  if (error)
    return (
      <CardContent className="p-6">
        <span className="text-amber-400">{error}</span>
      </CardContent>
    );

  return (
    <CardContent className="p-6">
      <h2 className="text-2xl font-bold text-white">
        {data !== null && data[0].name}
      </h2>
      <p className="text-white">{data !== null && data[0].position}</p>
      <div className="my-6">
        <h3 className="font-semibold text-lg text-amber-400 mb-4">Contact :</h3>
        <ul className="space-y-2 text-base">
          <li className="flex items-center space-x-2">
            <div className="flex items-center justify-start gap-2">
              <AiFillMail size={24} color="#fff" />
            </div>
            <a
              href={data !== null ? data[0].email : ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              {data !== null && data[0].email}
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <div className="flex items-center justify-start gap-2">
              <AiFillLinkedin className="-ml-[2.2px]" size={26} color="#fff" />
            </div>
            <a
              href={data !== null ? data[0].linkedin : ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              {data !== null && data[0].linkedin}
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <div className="flex items-center justify-start gap-2">
              <AiFillGithub size={24} color="#fff" />
            </div>
            <a
              href={data !== null ? data[0].github : ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              {data !== null && data[0].github}
            </a>
          </li>
        </ul>
      </div>
      {data !== null && (
        <Button
          className="mt-4 cursor-pointer whitespace-nowrap"
          onClick={() => {
            window.open(data[0].cv, '_blank');
          }}
        >
          View CV
        </Button>
      )}
    </CardContent>
  );
};

export default Profile;
