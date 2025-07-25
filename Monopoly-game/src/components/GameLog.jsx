export default function GameLog({ logs }) {
  return (
    <div className="bg-white border-2 border-black rounded-lg p-4 w-64">
      <h3 className="text-lg font-bold mb-3 text-center">Game Log</h3>
      <div className="text-sm max-h-40 overflow-y-auto space-y-2">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center italic">No events yet...</div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={index} 
              className="p-2 bg-gray-50 rounded border-l-4 border-blue-400 text-gray-700"
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  )
}