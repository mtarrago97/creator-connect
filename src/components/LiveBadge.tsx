const LiveBadge = () => (
  <div className="flex items-center gap-1.5 bg-live/20 text-live px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
    <span className="h-2 w-2 rounded-full bg-live animate-pulse-live" />
    Live
  </div>
);

export default LiveBadge;
