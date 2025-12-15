import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Json } from '@/integrations/supabase/types';

interface CodeAnalysis {
  id: string;
  code: string;
  action: string;
  language: string | null;
  result: Json;
  created_at: string;
}

interface ChatConversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export const useHistory = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<CodeAnalysis[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnalyses = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('code_analyses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setAnalyses(data as CodeAnalysis[]);
    }
    setLoading(false);
  }, [user]);

  const fetchConversations = useCallback(async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setConversations(data as ChatConversation[]);
    }
  }, [user]);

  const saveAnalysis = async (
    code: string,
    action: string,
    language: string | null,
    result: Json
  ) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('code_analyses')
      .insert([{
        user_id: user.id,
        code,
        action,
        language,
        result,
      }])
      .select()
      .single();

    if (!error && data) {
      setAnalyses((prev) => [data as CodeAnalysis, ...prev]);
      return data;
    }
    return null;
  };

  const deleteAnalysis = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('code_analyses')
      .delete()
      .eq('id', id);

    if (!error) {
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const createConversation = async (title?: string) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert([{
        user_id: user.id,
        title: title || 'New Conversation',
      }])
      .select()
      .single();

    if (!error && data) {
      setConversations((prev) => [data as ChatConversation, ...prev]);
      return data as ChatConversation;
    }
    return null;
  };

  const saveMessage = async (
    conversationId: string,
    role: 'user' | 'assistant',
    content: string
  ) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: conversationId,
        user_id: user.id,
        role,
        content,
      }])
      .select()
      .single();

    // Update conversation's updated_at
    await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return error ? null : (data as ChatMessage);
  };

  const getMessages = async (conversationId: string) => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    return error ? [] : (data as ChatMessage[]);
  };

  const deleteConversation = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('chat_conversations')
      .delete()
      .eq('id', id);

    if (!error) {
      setConversations((prev) => prev.filter((c) => c.id !== id));
    }
  };

  useEffect(() => {
    if (user) {
      fetchAnalyses();
      fetchConversations();
    } else {
      setAnalyses([]);
      setConversations([]);
    }
  }, [user, fetchAnalyses, fetchConversations]);

  return {
    analyses,
    conversations,
    loading,
    saveAnalysis,
    deleteAnalysis,
    createConversation,
    saveMessage,
    getMessages,
    deleteConversation,
    refreshAnalyses: fetchAnalyses,
    refreshConversations: fetchConversations,
  };
};
