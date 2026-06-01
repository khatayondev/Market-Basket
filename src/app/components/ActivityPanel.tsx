import { Clock, Users, Calendar } from 'lucide-react';

export function ActivityPanel() {
  const upcomingTasks = [
    { id: 1, title: 'Clean dataset', time: '10:00 - 11:00', type: 'task' },
    { id: 2, title: 'Run Apriori algorithm', time: '14:00 - 15:00', type: 'analysis' },
  ];

  const upcomingMeetings = [
    { id: 1, title: 'Team standup meeting', time: 'Tomorrow, 09:00' },
    { id: 2, title: 'Project review', time: 'Thu, 14:00' },
  ];

  const recentAnalysis = [
    { id: 1, name: 'Classification Report', status: 'Completed', accuracy: '96.67%' },
    { id: 2, name: 'Association Rules', status: 'In Progress', rules: '19 rules' },
    { id: 3, name: 'K-Means Clustering', status: 'Completed', clusters: '4 clusters' },
  ];

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Upcoming tasks</h2>
          <a href="#" className="text-xs text-[#C9A86A] hover:underline">View all</a>
        </div>
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 text-sm">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-xs text-gray-500">{task.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Upcoming meetings</h2>
          <a href="#" className="text-xs text-[#C9A86A] hover:underline">View all</a>
        </div>
        <div className="space-y-3">
          {upcomingMeetings.map((meeting) => (
            <div key={meeting.id} className="bg-white rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-gray-400" />
                <div className="font-medium text-sm">{meeting.title}</div>
              </div>
              <div className="text-xs text-gray-500 ml-6">{meeting.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Latest Analysis</h2>
          <a href="#" className="text-xs text-[#C9A86A] hover:underline">View all</a>
        </div>
        <div className="space-y-2">
          {recentAnalysis.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A86A] to-[#B89860] flex items-center justify-center text-white text-xs font-semibold">
                {item.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">
                  {item.status} • {item.accuracy || item.rules || item.clusters}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
