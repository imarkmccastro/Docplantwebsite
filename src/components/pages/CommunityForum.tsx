import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Heart, MessageCircle, Share2, Plus, TrendingUp, Award, Smile, ChevronUp, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { EcoBackground } from '../EcoBackground';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  liked: boolean;
  bookmarked: boolean;
  awards: { type: string; count: number }[];
}

export function CommunityForum() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Sarah Green',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      timeAgo: '2 hours ago',
      content: 'My Monstera finally got a new leaf after months of waiting! So excited to see it unfurl 🌿',
      image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 234,
      comments: 18,
      liked: false,
      bookmarked: false,
      awards: [{ type: '🌱', count: 12 }, { type: '💚', count: 8 }],
    },
    {
      id: 2,
      author: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      timeAgo: '5 hours ago',
      content: 'Question: What\'s the best way to propagate succulents? I have these beautiful babies and want to share them with friends!',
      image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 156,
      comments: 32,
      liked: true,
      bookmarked: true,
      awards: [{ type: '🤔', count: 5 }],
    },
    {
      id: 3,
      author: 'Emily Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      timeAgo: '1 day ago',
      content: 'Updated my plant shelf! Took me all weekend but I\'m so happy with how it turned out. The natural light here is perfect 💚',
      image: 'https://images.unsplash.com/photo-1615420733059-0d97cf9ed9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjI2NTg1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 567,
      comments: 45,
      liked: false,
      bookmarked: false,
      awards: [{ type: '✨', count: 23 }, { type: '👏', count: 15 }],
    },
    {
      id: 4,
      author: 'David Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      timeAgo: '2 days ago',
      content: 'Check out my plant collection! Started with one plant last year, now I have over 50. Help, I can\'t stop! 😅',
      image: 'https://images.unsplash.com/photo-1598838073192-05c942ede858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudCUyMHN0b3JlfGVufDF8fHx8MTc2MjY1ODUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 892,
      comments: 67,
      liked: true,
      bookmarked: false,
      awards: [{ type: '🏆', count: 34 }, { type: '😍', count: 28 }],
    },
  ]);

  const [postComments, setPostComments] = useState<Record<number, Comment[]>>({
    1: [
      {
        id: 1,
        author: 'Lisa Wang',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        timeAgo: '1 hour ago',
        content: 'Congratulations! The wait is always worth it. Mine took 4 months! 🎉',
        likes: 23,
        liked: false,
      },
      {
        id: 2,
        author: 'Tom Anderson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
        timeAgo: '45 min ago',
        content: 'Beautiful! What kind of light does your Monstera get?',
        likes: 12,
        liked: true,
        replies: [
          {
            id: 3,
            author: 'Sarah Green',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            timeAgo: '30 min ago',
            content: 'It gets bright indirect light from an east-facing window 😊',
            likes: 8,
            liked: false,
          },
        ],
      },
    ],
    2: [
      {
        id: 4,
        author: 'Plant Expert',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert',
        timeAgo: '3 hours ago',
        content: 'Just twist off a healthy leaf with the stem attached, let it callus for 2-3 days, then place on soil. Mist lightly every few days!',
        likes: 89,
        liked: true,
      },
      {
        id: 5,
        author: 'Jessica Martinez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
        timeAgo: '2 hours ago',
        content: 'I do the same! Success rate is about 80% for me. Make sure not to water too much!',
        likes: 45,
        liked: false,
      },
    ],
    3: [
      {
        id: 6,
        author: 'Alex Thompson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        timeAgo: '18 hours ago',
        content: 'This looks amazing! Where did you get those shelves?',
        likes: 34,
        liked: false,
      },
      {
        id: 7,
        author: 'Rachel Kim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
        timeAgo: '20 hours ago',
        content: 'Goals! 😍 My plant shelf is nowhere near this organized',
        likes: 28,
        liked: true,
      },
    ],
    4: [
      {
        id: 8,
        author: 'John Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        timeAgo: '1 day ago',
        content: 'One of us! One of us! Welcome to plant addiction 😂',
        likes: 56,
        liked: true,
      },
      {
        id: 9,
        author: 'Maria Garcia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        timeAgo: '1 day ago',
        content: 'I started with 3 plants in January... now I have 42 😅 There\'s no turning back!',
        likes: 67,
        liked: false,
      },
    ],
  });

  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [commentText, setCommentText] = useState<Record<number, string>>({});
  const [showReactions, setShowReactions] = useState<number | null>(null);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const toggleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, bookmarked: !post.bookmarked };
      }
      return post;
    }));
  };

  const toggleComments = (postId: number) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedComments(newExpanded);
  };

  const addAward = (postId: number, emoji: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const awards = [...post.awards];
        const existingAward = awards.find(a => a.type === emoji);
        if (existingAward) {
          existingAward.count += 1;
        } else {
          awards.push({ type: emoji, count: 1 });
        }
        return { ...post, awards };
      }
      return post;
    }));
    setShowReactions(null);
    toast.success(`Award given! ${emoji}`);
  };

  const reactions = ['🌱', '💚', '✨', '🏆', '😍', '👏', '🤔', '🔥'];

  const postComment = (postId: number) => {
    const text = commentText[postId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      timeAgo: 'Just now',
      content: text,
      likes: 0,
      liked: false,
    };

    setPostComments({
      ...postComments,
      [postId]: [newComment, ...(postComments[postId] || [])],
    });

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    }));

    setCommentText({ ...commentText, [postId]: '' });
    toast.success('Comment posted! 💬');
  };

  const handleCommentKeyPress = (e: React.KeyboardEvent, postId: number) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      postComment(postId);
    }
  };

  const toggleCommentLike = (postId: number, commentId: number) => {
    setPostComments({
      ...postComments,
      [postId]: postComments[postId]?.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        // Check replies too
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  liked: !reply.liked,
                  likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      }),
    });
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard! 📋');
  };

  const renderComment = (comment: Comment, postId: number, isReply = false) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : 'mb-4'}`}
    >
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.avatar} alt={comment.author} />
        <AvatarFallback>{comment.author[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-4 py-2">
          <p className="text-sm text-gray-900">{comment.author}</p>
          <p className="text-gray-700 mt-1">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 px-2">
          <button
            onClick={() => toggleCommentLike(postId, comment.id)}
            className={`text-xs ${comment.liked ? 'text-green-600' : 'text-gray-500'} hover:text-green-600 transition-colors`}
          >
            Like · {comment.likes}
          </button>
          <button className="text-xs text-gray-500 hover:text-green-600">
            Reply
          </button>
          <span className="text-xs text-gray-500">{comment.timeAgo}</span>
        </div>
        {comment.replies && comment.replies.map(reply => renderComment(reply, postId, true))}
      </div>
    </motion.div>
  );

  const renderPost = (post: Post) => (
    <Card key={post.id} className="overflow-hidden backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl shadow-lg hover:shadow-xl hover:shadow-emerald-100/50 transition-all">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.avatar} alt={post.author} />
          <AvatarFallback>{post.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-gray-900">{post.author}</p>
          <p className="text-sm text-gray-500">{post.timeAgo}</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="sm" className="hover:bg-emerald-50 rounded-xl">
            Follow
          </Button>
        </motion.div>
        <Button variant="ghost" size="icon" className="hover:bg-emerald-50 rounded-xl">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-700">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="aspect-video">
          <ImageWithFallback
            src={post.image}
            alt="Post image"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Awards Section */}
      {post.awards.length > 0 && (
        <div className="px-4 pt-3 flex items-center gap-2 flex-wrap">
          {post.awards.map((award, idx) => (
            <Badge key={idx} variant="secondary" className="gap-1 bg-white/80 border border-emerald-200 rounded-full">
              <span>{award.type}</span>
              <span className="text-xs">{award.count}</span>
            </Badge>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 flex items-center gap-6 border-t border-white/60">
        <button
          onClick={() => toggleLike(post.id)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
        >
          <motion.div
            whileTap={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                post.liked ? 'fill-red-500 text-red-500' : 'group-hover:scale-110'
              }`}
            />
          </motion.div>
          <span>{post.likes}</span>
        </button>
        
        <button
          onClick={() => toggleComments(post.id)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowReactions(showReactions === post.id ? null : post.id)}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <Award className="w-5 h-5" />
            <span>Award</span>
          </button>
          
          <AnimatePresence>
            {showReactions === post.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-full mb-2 left-0 bg-white shadow-lg rounded-lg p-2 flex gap-1 border z-10"
              >
                {reactions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addAward(post.id, emoji)}
                    className="text-2xl hover:scale-125 transition-transform p-1"
                  >
                    {emoji}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button
          onClick={() => toggleBookmark(post.id)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors ml-auto"
        >
          <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-green-600 text-green-600' : ''}`} />
        </button>

        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {expandedComments.has(post.id) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Separator />
            <div className="p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Comments</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleComments(post.id)}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
              </div>

              {/* Comment Input */}
              <div className="flex gap-3 mb-6">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a comment... (Ctrl+Enter to post)"
                    value={commentText[post.id] || ''}
                    onChange={(e) =>
                      setCommentText({ ...commentText, [post.id]: e.target.value })
                    }
                    onKeyDown={(e) => handleCommentKeyPress(e, post.id)}
                    className="min-h-[60px] resize-none"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!commentText[post.id]?.trim()}
                      onClick={() => postComment(post.id)}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-1">
                {postComments[post.id]?.map(comment => renderComment(comment, post.id))}
                
                {(!postComments[post.id] || postComments[post.id].length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );

  return (
    <div className="min-h-screen relative pb-20 overflow-hidden">
      <EcoBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/40 border-b border-white/30 px-4 sm:px-6 py-6 sm:py-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">Community</h1>
                <p className="text-gray-600">Connect with fellow plant lovers</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Tabs */}
          <Tabs defaultValue="feed" className="mb-6">
            <TabsList className="w-full backdrop-blur-xl bg-white/60 border-2 border-white/40 p-1 rounded-2xl">
              <TabsTrigger value="feed" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                Feed
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="following" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                Following
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="mt-6">
              <div className="space-y-4">
                {posts.map((post) => renderPost(post))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-6">
              <div className="space-y-4">
                {[...posts].sort((a, b) => b.likes - a.likes).map((post) => renderPost(post))}
              </div>
            </TabsContent>

            <TabsContent value="following" className="mt-6">
              <Card className="backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-3xl">
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">You're not following anyone yet</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-2xl">
                      Discover Users
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}