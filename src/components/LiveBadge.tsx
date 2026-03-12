const LiveBadge = () => (
  <div className="flex items-center gap-1.5 bg-live text-white px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider">
    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-live" />
    Live
  </div>
);

export default LiveBadge;
