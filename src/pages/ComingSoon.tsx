import { CardContent } from '@main/components/ui/CardContent';
import { Button } from '@main/components/ui/Button';
import { Progress } from '@main/components/ui/Progress';
import { AiFillClockCircle, AiFillGithub, AiFillRocket } from 'react-icons/ai';

export default function ComingSoon() {
  const openGithub = () => {
    const link = 'https://github.com/lordfahdan';
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="box-widget min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl shadow-xl border border-indigo-100">
        <CardContent className="p-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <AiFillRocket className="w-14 h-14 mx-auto animate-bounce text-[#1447e6]" />
            <h1 className="text-3xl font-bold">🚧 Coming Soon...</h1>
            <p className="max-w-md mx-auto text-gray-400">
              I'm working hard to bring you something amazing. This page is
              currently under construction — stay tuned!
            </p>
          </div>

          {/* Progress Section */}
          {/* <div className="mt-10 space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-400">
              <span>Development Progress</span>
              <span>65%</span>
            </div>
            <Progress value={65} />
          </div> */}

          {/* Countdown / Placeholder */}
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
            <AiFillClockCircle className="w-5 h-5" />
            <span>Estimated launch: -</span>
          </div>

          {/* Actions */}
          <div className="mt-10 flex justify-center gap-4">
            <Button className="rounded-xl px-6 cursor-pointer">
              Notify Me
            </Button>
            <Button
              className="rounded-xl px-6 flex items-center gap-2 cursor-pointer"
              onClick={() => openGithub()}
            >
              <AiFillGithub className="w-5 h-5" />
              GitHub
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
