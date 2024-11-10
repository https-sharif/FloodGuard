import CreatePost from '../components/CreatePost';
import PostsList from '../components/PostList';
import ProfileSection from '../components/ProfileSection';


function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-1">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Volunteer Dashboard</h1>
        
        <div className="grid gap-8">
          <ProfileSection />
          <CreatePost />
          <PostsList />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;