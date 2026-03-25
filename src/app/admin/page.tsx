'use client';

import { useState } from 'react';
import { syncSofaDataAction, getTestIncidentAction, getTestLineupAction, getTestPlayerStatsAction } from '@/actions/sofascore-actions';
import { Loader2, RefreshCw, Database, Activity, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSync() {
    setSyncing(true);
    setError(null);
    try {
      const res = await syncSofaDataAction();
      if (res.error) setError(res.error);
      else setResult(res.data);
    } catch (err) {
      setError("Failed to sync data");
    } finally {
      setSyncing(false);
    }
  }

  async function testAction(action: Function) {
    setSyncing(true);
    setError(null);
    try {
      const res = await action();
      if (res.error) setError(res.error);
      else setResult(res.data);
    } catch (err) {
      setError("Test failed");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">System Administration</h1>
        <p className="text-muted">Manage data synchronization and platform integrity.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <RefreshCw className={syncing ? "animate-spin" : ""} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Data Synchronization</h2>
              <p className="text-sm text-muted">Fetch latest match data from SofaScore.</p>
            </div>
          </div>
          
          <Button 
            className="w-full h-12 gap-2"
            disabled={syncing}
            onClick={handleSync}
          >
            {syncing ? <Loader2 className="animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Trigger Full Sync
          </Button>
        </section>

        <section className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" /> Debugging Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="glass" className="flex-col h-24 gap-2" onClick={() => testAction(getTestIncidentAction)}>
              <Activity className="w-6 h-6" />
              <span className="text-[10px] uppercase">Incident</span>
            </Button>
            <Button variant="glass" className="flex-col h-24 gap-2" onClick={() => testAction(getTestLineupAction)}>
              <Users className="w-6 h-6" />
              <span className="text-[10px] uppercase">Lineup</span>
            </Button>
            <Button variant="glass" className="flex-col h-24 gap-2" onClick={() => testAction(getTestPlayerStatsAction)}>
              <Activity className="w-6 h-6" />
              <span className="text-[10px] uppercase">Stats</span>
            </Button>
          </div>
        </section>
      </div>

      {(error || result) && (
        <section className="glass-panel p-6 rounded-3xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h3 className="font-bold text-white mb-4">Response Preview</h3>
           {error ? (
             <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                {error}
             </div>
           ) : (
             <pre className="p-4 bg-black/40 border border-white/5 rounded-xl text-xs text-primary font-mono overflow-auto max-h-96">
               {JSON.stringify(result, null, 2)}
             </pre>
           )}
        </section>
      )}
    </div>
  );
}
