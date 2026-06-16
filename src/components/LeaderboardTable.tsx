interface LeaderboardEntry {
  userId: number;
  username: string;
  totalScore: number;
  totalHours: number;
}

interface Props {
  data: LeaderboardEntry[];
}

export default function LeaderboardTable({ data }: Props) {

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-700">
        <h3 className="font-semibold text-white">Top Players</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-xs uppercase border-b border-gray-700">
            <th className="px-5 py-3 text-left">Rank</th>
            <th className="px-5 py-3 text-left">Player</th>
            <th className="px-5 py-3 text-right">Score</th>
            <th className="px-5 py-3 text-right">Hours</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr
              key={entry.userId}
              className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
            >
              <td className="px-5 py-3 text-sm">
                {index + 1}
              </td>
              <td className="px-5 py-3 text-sm text-white">{entry.username}</td>
              <td className="px-5 py-3 text-sm text-right text-purple-300">
                {entry.totalScore.toLocaleString()}
              </td>
              <td className="px-5 py-3 text-sm text-right text-gray-400">
                {entry.totalHours}h
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="px-5 py-8 text-center text-gray-500 text-sm">
                No data yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
