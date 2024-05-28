import { useChaptersContext } from '../context/chaptersContext';
import Switch from '../../../../components/ui/Switch';

interface PublishChapterProps {
  chapterId: string;
  isPublished: boolean;
}
export default function PublishChapter({
  chapterId,
  isPublished,
}: PublishChapterProps) {
  const { publishChapter } = useChaptersContext();

  return (
    <Switch value={isPublished} onChange={() => publishChapter(chapterId)} />
  );
}
