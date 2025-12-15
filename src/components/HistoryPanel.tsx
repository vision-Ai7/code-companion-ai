import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History, Code2, MessageSquare, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { useHistory } from '@/hooks/useHistory';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Json } from '@/integrations/supabase/types';

interface HistoryPanelProps {
  onSelectAnalysis?: (analysis: {
    code: string;
    action: string;
    result: Json;
  }) => void;
}

export const HistoryPanel = ({ onSelectAnalysis }: HistoryPanelProps) => {
  const { user } = useAuth();
  const { analyses, conversations, loading, deleteAnalysis, deleteConversation } = useHistory();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteAnalysis = async (id: string) => {
    setDeletingId(id);
    await deleteAnalysis(id);
    setDeletingId(null);
  };

  const handleDeleteConversation = async (id: string) => {
    setDeletingId(id);
    await deleteConversation(id);
    setDeletingId(null);
  };

  if (!user) {
    return (
      <Card variant="glass" className="text-center py-12">
        <CardContent>
          <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Sign in to view history</h3>
          <p className="text-sm text-muted-foreground">
            Your code analyses and chat conversations will be saved here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Your History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analyses">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="analyses" className="flex-1 gap-2">
              <Code2 className="h-4 w-4" />
              Analyses ({analyses.length})
            </TabsTrigger>
            <TabsTrigger value="chats" className="flex-1 gap-2">
              <MessageSquare className="h-4 w-4" />
              Chats ({conversations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyses" className="space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : analyses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Code2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No analyses yet</p>
                <p className="text-sm">Start analyzing code to see your history</p>
              </div>
            ) : (
              analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="group p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary">
                          {analysis.action}
                        </span>
                        {analysis.language && (
                          <span className="px-2 py-0.5 rounded text-xs font-mono bg-secondary text-muted-foreground">
                            {analysis.language}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate font-mono">
                        {analysis.code.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(analysis.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onSelectAnalysis && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onSelectAnalysis({
                            code: analysis.code,
                            action: analysis.action,
                            result: analysis.result,
                          })}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteAnalysis(analysis.id)}
                        disabled={deletingId === analysis.id}
                      >
                        {deletingId === analysis.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="chats" className="space-y-3">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No conversations yet</p>
                <p className="text-sm">Start chatting to see your history</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="group p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{conversation.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteConversation(conversation.id)}
                      disabled={deletingId === conversation.id}
                    >
                      {deletingId === conversation.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
