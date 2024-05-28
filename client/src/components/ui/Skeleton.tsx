export default function Skeleton({ style }: { style: string }) {
  const styles = 'bg-gray-200  animate-pulse  ' + style;
  return <div className={styles}></div>;
}
