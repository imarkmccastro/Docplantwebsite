import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Heart, MessageCircle, Share2, Plus, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function CommunityForum() {
  const [posts, setPosts] = useState([
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
    },
  ]);

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-white mb-2">Community</h1>
              <p className="text-green-100">Connect with fellow plant lovers</p>
            </div>
            <Button className="bg-white text-green-600 hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs defaultValue="feed" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="feed" className="flex-1">
              Feed
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                    <Button variant="ghost" size="sm">
                      Follow
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

                  {/* Post Actions */}
                  <div className="p-4 flex items-center gap-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${post.liked ? 'fill-red-500 text-red-500' : ''}`}
                      />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors ml-auto">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <div className="space-y-4">
              {[...posts].sort((a, b) => b.likes - a.likes).map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.author} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.timeAgo}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Follow
                    </Button>
                  </div>

                  <div className="px-4 pb-3">
                    <p className="text-gray-700">{post.content}</p>
                  </div>

                  {post.image && (
                    <div className="aspect-video">
                      <ImageWithFallback
                        src={post.image}
                        alt="Post image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4 flex items-center gap-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${post.liked ? 'fill-red-500 text-red-500' : ''}`}
                      />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors ml-auto">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-6">
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You're not following anyone yet</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Discover Users
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
