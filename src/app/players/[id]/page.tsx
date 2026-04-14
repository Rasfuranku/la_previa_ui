import { getPlayerAction } from "@/actions/player-actions";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Trophy, 
  Calendar, 
  Weight, 
  Ruler, 
  Flag,
  Globe,
  Instagram,
  Twitter
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerDetailPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const playerId = parseInt(id);

  if (isNaN(playerId)) {
    notFound();
  }

  const res = await getPlayerAction(playerId);

  if (res.error || !res.data) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Player Not Found</h1>
        <p className="text-muted mb-8">{res.error || "We couldn't find the player you're looking for."}</p>
        <Link href="/players">
          <Button variant="glass" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Transfer Market
          </Button>
        </Link>
      </div>
    );
  }

  const player = res.data;

  const getPositionName = (id: number) => {
    const positions: Record<number, string> = {
      1: "Goalkeeper",
      2: "Defender",
      3: "Midfielder",
      4: "Forward"
    };
    return positions[id] || "Unknown";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Navigation */}
      <Link href="/players">
        <Button variant="ghost" size="sm" className="gap-2 text-muted hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Market
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-end">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.2)]">
          {player.picture ? (
            <img src={player.picture} alt={player.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-7xl">⚽</span>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                    {getPositionName(player.position_id)}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-muted text-xs font-bold uppercase tracking-wider border border-white/10">
                    {player.status === 'a' ? 'Available' : 'Unavailable'}
                </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight">
              {player.name}<br />{player.last_name}
            </h1>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="text-2xl font-bold text-muted uppercase tracking-widest">{player.current_team_name || player.current_team}</div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="flex items-center gap-2 text-white/60">
                <Flag className="w-4 h-4" />
                <span className="font-medium">{player.nationality}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl md:self-stretch flex flex-col justify-center min-w-[200px]">
            <span className="text-[10px] text-muted uppercase font-bold tracking-widest mb-1">Market Value</span>
            <div className="text-4xl font-black text-green-400">${(player.price / 1000000).toFixed(1)}M</div>
            <Button className="mt-4 w-full" variant="primary">Sign Player</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/5 space-y-4">
            <div className="flex items-center gap-3 text-muted">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Season Form</span>
            </div>
            <div className="text-5xl font-black text-white">{player.form}</div>
            <p className="text-xs text-muted leading-relaxed">Performance rating based on the last 5 matches in the league.</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/5 space-y-4">
            <div className="flex items-center gap-3 text-muted">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Total Points</span>
            </div>
            <div className="text-5xl font-black text-white">{player.total_points}</div>
            <p className="text-xs text-muted leading-relaxed">Total fantasy points accumulated throughout the current season.</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/5 space-y-4">
            <div className="flex items-center gap-3 text-muted">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Reliability</span>
            </div>
            <div className="text-5xl font-black text-white">{player.selected_by_percent || 0}%</div>
            <p className="text-xs text-muted leading-relaxed">Percentage of managers who have selected this player in their squad.</p>
        </div>
      </div>

      {/* Detailed Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Trophy className="w-6 h-6 text-primary" />
                Physical Profile
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-muted text-[10px] uppercase font-bold">
                        <Calendar className="w-3 h-3" /> Age
                    </div>
                    <div className="text-xl font-bold text-white">{player.age} Years</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-muted text-[10px] uppercase font-bold">
                        <Globe className="w-3 h-3" /> Birthdate
                    </div>
                    <div className="text-xl font-bold text-white">{player.birthdate}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-muted text-[10px] uppercase font-bold">
                        <Ruler className="w-3 h-3" /> Height
                    </div>
                    <div className="text-xl font-bold text-white">{player.height} cm</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-muted text-[10px] uppercase font-bold">
                        <Weight className="w-3 h-3" /> Weight
                    </div>
                    <div className="text-xl font-bold text-white">{player.weight} kg</div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Activity className="w-6 h-6 text-primary" />
                Social & Status
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-muted font-medium">Medical Status</span>
                    <span className={`font-bold ${player.medical_status ? 'text-yellow-500' : 'text-green-500'}`}>
                        {player.medical_status || "Fit & Available"}
                    </span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-muted font-medium">Position</span>
                    <span className="text-white font-bold">{getPositionName(player.position_id)}</span>
                </div>
                
                <div className="pt-4 flex gap-4">
                    {player.insta && (
                        <a href={`https://instagram.com/${player.insta}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="glass" size="icon" className="rounded-full">
                                <Instagram className="w-5 h-5" />
                            </Button>
                        </a>
                    )}
                    {player.twitter && (
                        <a href={`https://twitter.com/${player.twitter}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="glass" size="icon" className="rounded-full">
                                <Twitter className="w-5 h-5" />
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
